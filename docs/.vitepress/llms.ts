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
