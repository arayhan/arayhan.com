import type { ReactNode } from "react";

type Props = {
  path: string;
  title: string;
  intro?: string;
  children?: ReactNode;
};

/** Shell for a page whose real content is not written yet; each one is a TODO(content). */
export function StubPage({ path, title, intro, children }: Props) {
  return (
    <main id="main" className="mx-auto grid max-w-page gap-6 px-4 pt-16 pb-28 sm:px-8 md:pt-24 lg:px-14">
      <p className="fade-rise font-mono text-sm text-accent">rayhan.dev{path}</p>
      <h1 className="fade-rise text-hero font-semibold tracking-[-0.04em]" style={{ "--i": 1 } as React.CSSProperties}>
        {title}
      </h1>
      {intro && (
        <p className="fade-rise max-w-[60ch] text-sub text-mute" style={{ "--i": 2 } as React.CSSProperties}>
          {intro}
        </p>
      )}
      {children}
      <p className="mt-6 border-t border-line pt-5 font-mono text-xs text-mute">This page is being written.</p>
    </main>
  );
}
