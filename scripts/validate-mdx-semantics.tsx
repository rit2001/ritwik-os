import { renderToStaticMarkup } from "react-dom/server";

import { CaseStudyCopy } from "../src/components/work/TraceForgeBlocks";

type TagToken = {
  closing: boolean;
  name: string;
};

function tokenizeTags(markup: string): TagToken[] {
  return Array.from(
    markup.matchAll(/<\/?([a-zA-Z][a-zA-Z0-9-]*)\b[^>]*>/g),
  ).map(([raw, name]) => ({
    closing: raw.startsWith("</"),
    name: name.toLowerCase(),
  }));
}

function findNestedParagraph(markup: string) {
  let paragraphDepth = 0;

  for (const token of tokenizeTags(markup)) {
    if (token.name !== "p") {
      continue;
    }

    if (token.closing) {
      paragraphDepth = Math.max(0, paragraphDepth - 1);
      continue;
    }

    paragraphDepth += 1;

    if (paragraphDepth > 1) {
      return true;
    }
  }

  return false;
}

function findNestedAnchor(markup: string) {
  let anchorDepth = 0;

  for (const token of tokenizeTags(markup)) {
    if (token.name !== "a") {
      continue;
    }

    if (token.closing) {
      anchorDepth = Math.max(0, anchorDepth - 1);
      continue;
    }

    anchorDepth += 1;

    if (anchorDepth > 1) {
      return true;
    }
  }

  return false;
}

const cases = [
  {
    name: "single paragraph",
    element: (
      <CaseStudyCopy>
        <p>One paragraph.</p>
      </CaseStudyCopy>
    ),
  },
  {
    name: "two paragraphs",
    element: (
      <CaseStudyCopy>
        <p>First paragraph.</p>
        <p>Second paragraph.</p>
      </CaseStudyCopy>
    ),
  },
  {
    name: "paragraph followed by list",
    element: (
      <CaseStudyCopy>
        <p>Intro paragraph.</p>
        <ul>
          <li>First item</li>
          <li>Second item</li>
        </ul>
      </CaseStudyCopy>
    ),
  },
] as const;

const errors: string[] = [];

for (const testCase of cases) {
  const markup = renderToStaticMarkup(testCase.element);

  if (findNestedParagraph(markup)) {
    errors.push(`${testCase.name}: rendered nested paragraph markup.`);
  }

  if (findNestedAnchor(markup)) {
    errors.push(`${testCase.name}: rendered nested anchor markup.`);
  }
}

if (errors.length > 0) {
  console.error("MDX semantic validation failed.");
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated ${cases.length} MDX semantic wrapper cases.`);
