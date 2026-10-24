type Props = { id: string; title: string; summary: string };

export function SectionHead({ id, title, summary }: Props) {
  return (
    <div className="mb-2 flex flex-wrap items-baseline justify-between gap-3 border-b border-ink pb-2.5">
      <h2 id={id} className="font-display text-h2 font-bold tracking-tight">
        {title}
      </h2>
      <p className="font-mono text-xs text-mute">{summary}</p>
    </div>
  );
}
