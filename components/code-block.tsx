import { highlight } from "@/lib/highlight";
import { cn } from "@/lib/utils";

/** A highlighted code block, rendered at build time. */
export function CodeBlock({
  code,
  lang = "plum",
  label,
  className,
}: {
  code: string;
  lang?: string;
  label?: string;
  className?: string;
}) {
  return (
    <div className={cn("code-block", className)} data-lang={label ?? lang}>
      <pre>
        <code className={`language-${lang}`} dangerouslySetInnerHTML={{ __html: highlight(code.trim(), lang) }} />
      </pre>
    </div>
  );
}
