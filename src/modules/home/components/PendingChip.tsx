// Visible form of a TODO(content) marker: drafts show it, production must not.
export function PendingChip() {
  return (
    <span className="inline-flex w-fit items-center gap-1.5 rounded-md bg-pend-bg px-2 py-1 font-mono text-xs text-pend">
      ± impact number pending
    </span>
  );
}
