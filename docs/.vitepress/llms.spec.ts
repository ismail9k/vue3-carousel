import { toAgentMarkdown } from './llms'

const siteUrl = 'https://example.test'

describe('toAgentMarkdown', () => {
  it('drops frontmatter and top-level script blocks but keeps scripts inside fences', () => {
    const src = [
      '---',
      'outline: deep',
      '---',
      '# Title',
      '',
      '```vue',
      '<script setup>',
      "import { Carousel } from 'vue3-carousel'",
      '</script>',
      '```',
      '',
      '<script setup>',
      "import Features from './.vitepress/components/Features.vue'",
      '</script>',
    ].join('\n')
    const out = toAgentMarkdown(src, { siteUrl })
    expect(out).not.toContain('outline: deep')
    expect(out).toContain("import { Carousel } from 'vue3-carousel'")
    expect(out).not.toContain('Features.vue')
    expect(out.startsWith('# Title')).toBe(true)
  })

  it('leaves indented fences inside list items untouched and keeps fence state', () => {
    const src = [
      '- item',
      '',
      '  ```vue',
      '  <Carousel dir="ttb" :height="300"><Badge text="9.9.9"/></Carousel>',
      '  ```',
      '',
      'after <Badge text="0.18.0"/>',
    ].join('\n')
    const out = toAgentMarkdown(src, { siteUrl })
    expect(out).toContain('<Badge text="9.9.9"/>')
    expect(out).toContain('after (added in 0.18.0)')
  })

  it('replaces Badge with "(added in X)" for both self-closing spellings', () => {
    const out = toAgentMarkdown('a <Badge text="0.13.0" /> b <Badge text="0.17.0"/>', {
      siteUrl,
    })
    expect(out).toBe('a (added in 0.13.0) b (added in 0.17.0)\n')
  })

  it('drops the html badge row (a <p> containing <img>) but keeps other html', () => {
    const src =
      '<p style="display: flex">\n  <a href="x"><img src="y" /></a>\n</p>\n\n<kbd>Tab</kbd>'
    const out = toAgentMarkdown(src, { siteUrl })
    expect(out).not.toContain('<img')
    expect(out).toContain('<kbd>Tab</kbd>')
  })

  it('inlines a live-codes embed as a vue code block', () => {
    const resolveExample = (name: string) =>
      name === 'BasicExample' ? '<template>\n  <Carousel />\n</template>\n' : undefined
    const out = toAgentMarkdown(
      '## Basic\n\n<live-codes :code="examples.BasicExample" />\n',
      {
        siteUrl,
        resolveExample,
      }
    )
    expect(out).toBe('## Basic\n\n```vue\n<template>\n  <Carousel />\n</template>\n```\n')
  })

  it('removes a live-codes embed whose example is unknown and does not throw', () => {
    const out = toAgentMarkdown(
      '## Gallery\n\n<live-codes :code="examples.NopeExample" height="455px" />\n\nText',
      { siteUrl }
    )
    expect(out).toBe('## Gallery\n\nText\n')
  })

  it('rewrites root-relative page links to absolute .md urls, not assets or anchors', () => {
    const src =
      '[Config](/config) [Wheel](/config#wheel-options) [Logo](/logo.svg) [i18n](#i18n)'
    const out = toAgentMarkdown(src, { siteUrl })
    expect(out).toBe(
      '[Config](https://example.test/config.md) [Wheel](https://example.test/config.md#wheel-options) [Logo](/logo.svg) [i18n](#i18n)\n'
    )
  })

  it('collapses runs of blank lines to one blank line and ends with a single newline', () => {
    expect(toAgentMarkdown('a\n\n\n\n\nb\n\n\n', { siteUrl })).toBe('a\n\nb\n')
  })

  it('keeps a fenced code block with consecutive blank lines byte-identical', () => {
    const fence = '```ts\nconst a = 1\n\n\n\nconst b = 2\n```'
    const out = toAgentMarkdown(`Intro\n\n${fence}\n\n\n\nOutro`, { siteUrl })
    expect(out).toBe(`Intro\n\n${fence}\n\nOutro\n`)
  })

  it('inlines a live-codes example containing a double blank line unchanged', () => {
    const code = '<script setup>\nconst a = 1\n\n\nconst b = 2\n</script>'
    const resolveExample = (name: string) => (name === 'BasicExample' ? code : undefined)
    const out = toAgentMarkdown(
      '## Basic\n\n<live-codes :code="examples.BasicExample" />\n',
      {
        siteUrl,
        resolveExample,
      }
    )
    expect(out).toBe('## Basic\n\n```vue\n' + code + '\n```\n')
  })
})
