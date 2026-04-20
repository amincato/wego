import { StatusBar } from "./status-bar";

export function ComingSoon({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <>
      <StatusBar />
      <div className="px-4">
        <h1 className="h-display text-fg">{title}</h1>
        {description && (
          <p className="mt-1 text-[14px] text-fg-muted">{description}</p>
        )}
        <div className="mt-8 rounded-[20px] bg-surface p-10 text-center ring-1 ring-divider">
          <div className="text-4xl">🚧</div>
          <p className="mt-4 text-[14px] text-fg-muted">
            This section is under construction.
          </p>
        </div>
      </div>
    </>
  );
}
