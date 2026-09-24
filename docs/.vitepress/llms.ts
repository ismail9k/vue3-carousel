export const SITE_URL = 'https://vue3-carousel.ismail9k.com'

export interface TransformOptions {
  siteUrl: string
  /** Source of `examples.<name>` from a `<live-codes :code="examples.<name>">` embed. */
  resolveExample?: (name: string) => string | undefined
}

const FRONTMATTER = /^---\n[\s\S]*?\n---\n/
/** Captures fenced code blocks (optionally indented) so they can be skipped. */
const FENCE = /(^[ \t]*```[^\n]*\n[\s\S]*?^[ \t]*```[ \t]*$)/m

function transformText(text: string, opts: TransformOptions): string {
  return text
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '')
    .replace(/<p\b[^>]*>[\s\S]*?<\/p>/g, (block) => (block.includes('<img') ? '' : block))
    .replace(/<Badge\s+text="([^"]*)"\s*\/>/g, '(added in $1)')
    .replace(/<live-codes\s+:code="examples\.(\w+)"[^>]*\/>/g, (_match, name: string) => {
      const code = opts.resolveExample?.(name)
      return code ? '```vue\n' + code.trimEnd() + '\n```' : ''
    })
    .replace(
      /\]\(\/([\w\-/]+)(#[^)]*)?\)/g,
      (_match, page: string, hash: string = '') => `](${opts.siteUrl}/${page}.md${hash})`
    )
    .replace(/\n{3,}/g, '\n\n')
}

export function toAgentMarkdown(source: string, opts: TransformOptions): string {
  const body = source.replace(FRONTMATTER, '')
  const out = body
    .split(FENCE)
    .map((segment, i) => (i % 2 === 1 ? segment : transformText(segment, opts)))
    .join('')
  return out.replace(/\n{3,}/g, '\n\n').trim() + '\n'
}
