import type { ReactNode } from "react";
import { site } from "@/content/site";
import { Card } from "./ui/Card";
import { Notice } from "./ui/Notice";

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
      <Card className="fade-rise grid gap-4 p-6 sm:p-8">
        <p className="font-mono text-sm text-accent-text">
          {site.host}
          {path}
        </p>
        <h1 className="text-hero font-semibold tracking-[-0.04em]">{title}</h1>
        {intro && <p className="max-w-[60ch] text-sub text-mute">{intro}</p>}
        <Notice title="In progress" className="mt-2">
          This page is being written.
        </Notice>
      </Card>
      {children}
    </main>
  );
}
