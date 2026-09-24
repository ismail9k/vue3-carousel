export const SITE_URL = 'https://vue3-carousel.ismail9k.com'

export interface TransformOptions {
  siteUrl: string
  /** Source of `examples.<name>` from a `<live-codes :code="examples.<name>">` embed. */
  resolveExample?: (name: string) => string | undefined
}

const FRONTMATTER = /^---\n[\s\S]*?\n---\n/
/** Captures fenced code blocks (optionally indented) so they can be skipped. */
const FENCE = /(^[ \t]*```[^\n]*\n[\s\S]*?^[ \t]*```[ \t]*$)/m

/** Stands in for an inlined example so prose-only rewrites never touch its code. */
const EMBED_PLACEHOLDER = /\u0000(\d+)\u0000/g

function transformText(text: string, opts: TransformOptions): string {
  const embeds: string[] = []
  return text
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '')
    .replace(/<p\b[^>]*>[\s\S]*?<\/p>/g, (block) => (block.includes('<img') ? '' : block))
    .replace(/<Badge\s+text="([^"]*)"\s*\/>/g, '(added in $1)')
    .replace(/<live-codes\s+:code="examples\.(\w+)"[^>]*\/>/g, (_match, name: string) => {
      const code = opts.resolveExample?.(name)
      if (!code) return ''
      embeds.push('```vue\n' + code.trimEnd() + '\n```')
      return `\u0000${embeds.length - 1}\u0000`
    })
    .replace(
      /\]\(\/([\w\-/]+)(#[^)]*)?\)/g,
      (_match, page: string, hash: string = '') => `](${opts.siteUrl}/${page}.md${hash})`
    )
    .replace(/\n{3,}/g, '\n\n')
    .replace(EMBED_PLACEHOLDER, (_match, index: string) => embeds[Number(index)])
}

/**
 * Fenced code (and inlined example code) is emitted byte-identical: only the prose
 * segments between fences are rewritten and have blank-line runs collapsed.
 */
export function toAgentMarkdown(source: string, opts: TransformOptions): string {
  const body = source.replace(FRONTMATTER, '')
  const out = body
    .split(FENCE)
    .map((segment, i) => (i % 2 === 1 ? segment : transformText(segment, opts)))
    .join('')
  return out.trim() + '\n'
}

export interface SidebarItem {
  text: string
  link: string
}
export interface SidebarGroup {
  text: string
  items: SidebarItem[]
}
export interface DocPage {
  title: string
  section: string
  /** Page path without leading slash or extension, e.g. `components/carousel`. */
  path: string
}
export interface AgentDoc extends DocPage {
  markdown: string
}
export interface SiteInfo {
  title: string
  description: string
  siteUrl: string
}

export function pagesFromSidebar(sidebar: SidebarGroup[]): DocPage[] {
  return sidebar.flatMap((group) =>
    group.items.map((item) => ({
      title: item.text,
      section: group.text,
      path: item.link.replace(/^\//, ''),
    }))
  )
}

export function firstParagraph(markdown: string): string {
  let inFence = false
  for (const raw of markdown.split('\n')) {
    const line = raw.trim()
    if (line.startsWith('```')) {
      inFence = !inFence
      continue
    }
    if (inFence || !line || /^[#|<>*-]/.test(line)) continue
    return line.replace(/:$/, '')
  }
  return ''
}

const pageUrl = (site: SiteInfo, doc: DocPage) => `${site.siteUrl}/${doc.path}.md`

export function buildLlmsTxt(site: SiteInfo, docs: AgentDoc[]): string {
  const sections = new Map<string, AgentDoc[]>()
  for (const doc of docs) {
    sections.set(doc.section, [...(sections.get(doc.section) ?? []), doc])
  }
  const lines = [
    `# ${site.title}`,
    '',
    `> ${site.description}`,
    '',
    'Install with `npm i vue3-carousel`, import `vue3-carousel/carousel.css`, and import `Carousel`, `Slide`, `Navigation` and `Pagination` from `vue3-carousel`.',
    `Every page below is also served as Markdown at its \`.md\` URL. The whole documentation in one file: ${site.siteUrl}/llms-full.txt`,
    '',
  ]
  for (const [section, items] of sections) {
    lines.push(`## ${section}`, '')
    for (const doc of items) {
      const summary = firstParagraph(doc.markdown)
      lines.push(
        `- [${doc.title}](${pageUrl(site, doc)})${summary ? `: ${summary}` : ''}`
      )
    }
    lines.push('')
  }
  lines.push(
    '## Optional',
    '',
    '- [GitHub repository](https://github.com/ismail9k/vue3-carousel)',
    '- [Changelog](https://github.com/ismail9k/vue3-carousel/blob/master/CHANGELOG.md)',
    ''
  )
  return lines.join('\n')
}

function withSource(site: SiteInfo, doc: AgentDoc): string {
  const source = `Source: ${pageUrl(site, doc)}`
  const h1 = doc.markdown.match(/^# .*$/m)
  if (!h1 || h1.index === undefined)
    return `# ${doc.title}\n\n${source}\n\n${doc.markdown}`
  const end = h1.index + h1[0].length
  return `${doc.markdown.slice(0, end)}\n\n${source}${doc.markdown.slice(end)}`
}

export function buildLlmsFull(site: SiteInfo, docs: AgentDoc[]): string {
  const header = `# ${site.title} — full documentation\n\n> ${site.description}\n\nIndex: ${site.siteUrl}/llms.txt\n`
  return [header, ...docs.map((doc) => withSource(site, doc))].join('\n---\n\n')
}
