type LexicalNode = {
  type?: string
  text?: string
  format?: number
  tag?: string
  listType?: string
  children?: LexicalNode[]
  fields?: Record<string, unknown>
  url?: string
  [key: string]: unknown
}

type LexicalState = {
  root?: LexicalNode
}

const isLexicalState = (value: unknown): value is LexicalState =>
  typeof value === 'object' && value !== null && 'root' in (value as Record<string, unknown>)

const isLexicalNode = (value: unknown): value is LexicalNode =>
  typeof value === 'object' && value !== null

export function renderRichText(content: unknown): string {
  if (typeof content === 'string') return content
  if (isLexicalState(content) && isLexicalNode(content.root)) {
    return extractTextFromLexical(content.root)
  }
  return ''
}

function extractTextFromLexical(node: LexicalNode | undefined): string {
  if (!node) return ''

  let text = ''
  if (typeof node.text === 'string') {
    text += node.text
  }
  if (Array.isArray(node.children)) {
    node.children.forEach((child) => {
      text += extractTextFromLexical(child)
    })
  }
  return text
}

export function richTextToHTML(content: unknown): string {
  if (typeof content === 'string') return content
  if (isLexicalState(content) && isLexicalNode(content.root)) {
    return lexicalToHTML(content.root)
  }
  return ''
}

export function richTextToPlainText(content: unknown): string {
  if (typeof content === 'string') return content
  if (isLexicalState(content) && isLexicalNode(content.root)) {
    return extractTextFromLexical(content.root)
  }
  return ''
}

function lexicalToHTML(node: LexicalNode | undefined): string {
  if (!node) return ''

  if (node.text !== undefined) {
    let text = escapeHTML(String(node.text))
    if (typeof node.format === 'number') {
      if (node.format & 1) text = `<strong>${text}</strong>`
      if (node.format & 2) text = `<em>${text}</em>`
      if (node.format & 8) text = `<s>${text}</s>`
      if (node.format & 4) text = `<u>${text}</u>`
      if (node.format & 16) text = `<code class="inline-code">${text}</code>`
      if (node.format & 32) text = `<sub>${text}</sub>`
      if (node.format & 64) text = `<sup>${text}</sup>`
    }
    return text
  }

  const childHTML = (node.children ?? []).map((child) => lexicalToHTML(child)).join('')

  switch (node.type) {
    case 'root':
      return childHTML
    case 'paragraph':
      return `<p>${childHTML || '<br>'}</p>`
    case 'heading': {
      const level = typeof node.tag === 'string' ? node.tag : 'h2'
      return `<${level}>${childHTML}</${level}>`
    }
    case 'list': {
      const tag = node.listType === 'number' ? 'ol' : 'ul'
      return `<${tag}>${childHTML}</${tag}>`
    }
    case 'listitem':
      return `<li>${childHTML}</li>`
    case 'link': {
      const url = typeof node.url === 'string' ? node.url : getString(node.fields?.url, '#')
      const targetAttr =
        isRecord(node.fields) && node.fields.newTab ? ' target="_blank" rel="noopener noreferrer"' : ''
      return `<a href="${escapeHTML(url)}"${targetAttr}>${childHTML}</a>`
    }
    case 'quote':
      return `<blockquote>${childHTML}</blockquote>`
    case 'code':
      return `<pre><code>${childHTML}</code></pre>`
    case 'linebreak':
      return '<br>'
    default:
      return childHTML
  }
}

function escapeHTML(text: string): string {
  const replacements: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (match) => replacements[match])
}

function getString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}
