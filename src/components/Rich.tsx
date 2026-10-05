import { Fragment } from "react";
import ui from "./ui.module.css";

/** Renders copy with {{chip}} and **emphasis** markers (see content/site.ts). */
export default function Rich({ text }: { text: string }) {
  return text.split(/(\{\{.+?\}\}|\*\*.+?\*\*)/).map((part, i) => {
    if (part.startsWith("{{")) return <span key={i} className={ui.chip}>{part.slice(2, -2)}</span>;
    if (part.startsWith("**")) return <span key={i} className={ui.em}>{part.slice(2, -2)}</span>;
    return <Fragment key={i}>{part}</Fragment>;
  });
}
