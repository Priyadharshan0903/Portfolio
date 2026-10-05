"use client";

import { useEffect, useState } from "react";

export default function CopyEmail({ email, className }: { email: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(t);
  }, [copied]);
  const copy = () => {
    navigator.clipboard?.writeText(email).catch(() => {});
    setCopied(true);
  };
  return (
    <button type="button" onClick={copy} data-magnetic className={className}>
      {copied ? "Copied" : "Copy email"}
    </button>
  );
}
