import { Fragment, type CSSProperties } from "react";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import type { Profile } from "@/domain/portfolio";
import { actionClass } from "../home.actions";
import { RotatingPhrase } from "./RotatingPhrase";

const step = (i: number) => ({ "--i": i }) as CSSProperties;

export function Hero({ profile }: { profile: Profile }) {
  const words = profile.headline.lead.split(" ");
  const afterHeadline = words.length + 2;

  return (
    <section
      aria-labelledby="hero-title"
      className="mx-auto grid min-h-[calc(100dvh-var(--header-h))] max-w-page content-center gap-10 px-4 pt-16 pb-14 sm:px-8 md:gap-14 md:pt-24 md:pb-20 lg:px-14"
    >
      <div className="grid gap-5">
        <p className="fade-rise text-sm font-medium text-mute" style={step(0)}>
          {profile.role}
        </p>
        <h1 id="hero-title" className="text-hero font-semibold tracking-tighter text-ink">
          <span className="block">
            {words.map((word, i) => (
              <Fragment key={`${word}-${i}`}>
                {i > 0 && " "}
                <span className="mask-word">
                  <span style={step(i + 1)}>{word}</span>
                </span>
              </Fragment>
            ))}
          </span>
          <RotatingPhrase phrases={profile.headline.phrases} enterIndex={words.length + 1} />
        </h1>
      </div>

      <div className="grid md:grid-cols-[7fr_5fr]">
        <div className="grid gap-7 md:col-start-2">
          <p className="fade-rise max-w-[42ch] text-sub text-mute" style={step(afterHeadline)}>
            {profile.subtext}
          </p>
          <div className="fade-rise flex flex-wrap gap-3" style={step(afterHeadline + 1)}>
            <a href={`mailto:${profile.email}`} className={actionClass("primary")}>
              Email me
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={actionClass("secondary")}>
              LinkedIn
              <ArrowUpRightIcon size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
