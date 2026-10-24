"use client";

import { useState } from "react";
import { actionClass, type ActionTone, type ActionVariant } from "../home.actions";

type Props = {
  email: string;
  label?: string;
  variant?: ActionVariant;
  tone?: ActionTone;
};

export function CopyEmailButton({ email, label, variant = "ghost", tone = "paper" }: Props) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <button type="button" onClick={copy} className={actionClass(variant, tone)}>
      <span aria-live="polite">{copied ? "Email copied" : (label ?? email)}</span>
    </button>
  );
}
