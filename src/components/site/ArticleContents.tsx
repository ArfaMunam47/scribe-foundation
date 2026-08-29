/** Builds an "in this article" rail from the markdown H2 headings. */
export function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .replace(/[*`_[\]()]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);
}

export function extractHeadings(markdown: string) {
  return markdown
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("## "))
    .map((line) => line.slice(3).replace(/\*\*/g, ""))
    .map((text) => ({ text, id: slugifyHeading(text) }));
}

export function ArticleContents({ content }: { content: string }) {
  const headings = extractHeadings(content);
  if (headings.length < 3) return null;

  return (
    <nav aria-label="In this article" className="mb-12 lg:hidden">
      <p className="eyebrow">In this article</p>
      <ol className="mt-4 space-y-0.5">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a href={`#${heading.id}`} className="toc-link">
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function ArticleContentsRail({ content }: { content: string }) {
  const headings = extractHeadings(content);
  if (headings.length < 3) return null;

  return (
    <nav
      aria-label="In this article"
      className="hidden lg:sticky lg:top-28 lg:block lg:h-fit lg:w-52"
    >
      <p className="eyebrow">Contents</p>
      <ol className="mt-4 space-y-0.5">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a href={`#${heading.id}`} className="toc-link">
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
