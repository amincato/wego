import { cn } from "@/lib/utils";

/**
 * Wego wordmark — faithful reproduction of the Figma splash logo.
 * It's a lowercase rounded wordmark in Quicksand Bold, rendered in the
 * requested color via currentColor.
 */
export function WegoLogo({
  className,
  as: Tag = "span",
}: {
  className?: string;
  as?: "span" | "h1" | "div";
}) {
  return (
    <Tag
      className={cn(
        "inline-block font-bold tracking-tight leading-none select-none",
        className,
      )}
      style={{ fontFamily: "var(--font-quicksand), sans-serif" }}
    >
      wego
    </Tag>
  );
}
