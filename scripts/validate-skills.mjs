import { readdir, readFile, stat } from 'node:fs/promises'
import path from 'node:path'

const repoRoot = new URL('..', import.meta.url).pathname
const skillsDir = path.join(repoRoot, 'skills')
const skillNamePattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const versionPattern = /^\d+\.\d+\.\d+$/

async function pathExists(filePath) {
  try {
    await stat(filePath)
    return true
  } catch {
    return false
  }
}

function parseFrontmatter(content, filePath) {
  const match = content.match(/^---\n([\s\S]*?)\n---/)

  if (!match) {
    throw new Error(`${filePath} is missing YAML frontmatter`)
  }

  return match[1]
}

function getScalar(frontmatter, field) {
  const match = frontmatter.match(new RegExp(`^${field}:\\s*(.+)$`, 'm'))
  if (!match) {
    return null
  }

  return match[1].trim().replace(/^['"]|['"]$/g, '')
}

function getMetadataVersion(frontmatter) {
  const match = frontmatter.match(
    /^\s{2}version:\s*["']?(\d+\.\d+\.\d+)["']?(?:\s+#.*)?\s*$/m,
  )
  return match?.[1] ?? null
}

function getMarkdownLinkTargets(content) {
  return [...content.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)]
    .map((match) => match[1])
    .filter((target) => !target.startsWith('http://') && !target.startsWith('https://'))
    .filter((target) => !target.startsWith('mailto:'))
    .filter((target) => !target.startsWith('#'))
}

function normalizeLocalMarkdownTarget(target) {
  return target.split('#')[0].split('?')[0]
}

async function collectMarkdownFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    if (entry.name === '.git' || entry.name === 'node_modules' || entry.name === 'dist') {
      continue
    }

    const entryPath = path.join(directory, entry.name)

    if (entry.isDirectory()) {
      files.push(...(await collectMarkdownFiles(entryPath)))
      continue
    }

    if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(entryPath)
    }
  }

  return files.sort()
}

async function validateMarkdownLinks() {
  const markdownFiles = await collectMarkdownFiles(repoRoot)

  for (const markdownFile of markdownFiles) {
    const content = await readFile(markdownFile, 'utf8')
    const linkTargets = getMarkdownLinkTargets(content)

    for (const target of linkTargets) {
      const normalizedTarget = normalizeLocalMarkdownTarget(target)

      if (!normalizedTarget) {
        continue
      }

      const targetPath = path.resolve(path.dirname(markdownFile), normalizedTarget)

      if (!(await pathExists(targetPath))) {
        throw new Error(`${markdownFile} links to missing local file ${target}`)
      }
    }
  }
}

async function validateSkill(skillName) {
  const skillDir = path.join(skillsDir, skillName)
  const skillFile = path.join(skillDir, 'SKILL.md')

  if (!(await pathExists(skillFile))) {
    throw new Error(`${skillName} is missing SKILL.md`)
  }

  const content = await readFile(skillFile, 'utf8')
  const frontmatter = parseFrontmatter(content, skillFile)
  const name = getScalar(frontmatter, 'name')
  const description = getScalar(frontmatter, 'description')
  const version = getMetadataVersion(frontmatter)

  if (name !== skillName) {
    throw new Error(`${skillFile} name must match directory name "${skillName}"`)
  }

  if (!skillNamePattern.test(name)) {
    throw new Error(`${skillFile} name must be lowercase kebab-case`)
  }

  if (!description || description.length > 1024) {
    throw new Error(`${skillFile} description is required and must be <= 1024 characters`)
  }

  if (!version || !versionPattern.test(version)) {
    throw new Error(`${skillFile} metadata.version must be semver, for example "0.1.0"`)
  }

  const lineCount = content.trimEnd().split('\n').length

  if (lineCount > 500) {
    throw new Error(`${skillFile} has ${lineCount} lines; keep SKILL.md under 500 lines and move details to commands/ or playbooks/`)
  }

  const linkTargets = getMarkdownLinkTargets(content)

  for (const target of linkTargets) {
    const normalizedTarget = normalizeLocalMarkdownTarget(target)
    const targetPath = path.join(skillDir, normalizedTarget)

    if (!(await pathExists(targetPath))) {
      throw new Error(`${skillFile} links to missing reference ${target}`)
    }
  }

  return { name, version }
}

const entries = await readdir(skillsDir, { withFileTypes: true })
const skillNames = entries
  .filter((entry) => entry.isDirectory() && !entry.name.startsWith('.'))
  .map((entry) => entry.name)
  .sort()

if (skillNames.length === 0) {
  throw new Error('No skills found in skills/')
}

const validatedSkills = []

for (const skillName of skillNames) {
  validatedSkills.push(await validateSkill(skillName))
}

await validateMarkdownLinks()

for (const skill of validatedSkills) {
  console.log(`OK ${skill.name} ${skill.version}`)
}
