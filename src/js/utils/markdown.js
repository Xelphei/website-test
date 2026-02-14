import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

export async function renderMarkdown(path) {
  const response = await fetch(path);
  const text = await response.text();
  return md.render(text);
}
