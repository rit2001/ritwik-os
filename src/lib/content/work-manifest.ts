import { statefulAgenticAiAssistantMeta } from "../../content/work/stateful-agentic-ai-assistant.meta";
import { thesisLensMeta } from "../../content/work/thesislens.meta";
import { traceforgeMeta } from "../../content/work/traceforge.meta";

export const workMetaEntries = [
  {
    meta: thesisLensMeta,
    mdxPath: "src/content/work/thesislens.mdx",
  },
  {
    meta: traceforgeMeta,
    mdxPath: "src/content/work/traceforge.mdx",
  },
  {
    meta: statefulAgenticAiAssistantMeta,
    mdxPath: "src/content/work/stateful-agentic-ai-assistant.mdx",
  },
] as const;
