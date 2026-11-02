"use client";

import { useEffect, useRef, useState } from "react";
import s from "./ProjectCommand.module.css";

export default function ProjectCommand({ command }: { command: string }) {
  const [status, setStatus] = useState("Copy command");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const copy = async () => {
    if (timer.current) clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(command);
      setStatus("Copied");
    } catch {
      setStatus("Select text to copy");
    }
    timer.current = setTimeout(() => setStatus("Copy command"), 3000);
  };

  return (
    <div className={s.terminal}>
      <div className={s.bar}>
        <span>Terminal</span>
        <button type="button" onClick={copy} aria-live="polite">{status}</button>
      </div>
      <pre tabIndex={0} aria-label="Terminal command"><code>{command}</code></pre>
    </div>
  );
}
