"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProjectImage } from "@/content/site";
import { asset } from "@/lib/asset";
import s from "./ProjectGallery.module.css";

export default function ProjectGallery({ name, images }: { name: string; images: ProjectImage[] }) {
  const [selected, setSelected] = useState(0);
  const image = images[selected];

  return (
    <div className={s.gallery}>
      <figure className={s.figure}>
        <a className={s.stage} href={asset(`projects/${image.src}`)} target="_blank" rel="noopener noreferrer" aria-label={`Open full-size ${name} image`}>
          <Image key={image.src} src={asset(`projects/${image.src}`)} alt={image.alt} width={image.width} height={image.height} sizes="(max-width: 1440px) 92vw, 1320px" preload={selected === 0} className={s.image} />
        </a>
        <figcaption className={s.caption} aria-live="polite">{image.caption}</figcaption>
      </figure>
      {images.length > 1 && (
        <div className={s.choices} role="group" aria-label={`${name} image views`}>
          {images.map((item, index) => (
            <button key={item.src} type="button" className={s.choice} onClick={() => setSelected(index)} aria-pressed={selected === index} aria-label={`Show ${item.alt}`}>
              <Image src={asset(`projects/${item.src}`)} alt="" width={item.width} height={item.height} sizes="120px" />
              <span>{index === 0 ? "Overview" : "A closer look"}</span>
            </button>
          ))}
        </div>
      )}
      <noscript>
        {images.slice(1).map((item) => <p key={item.src}><a href={asset(`projects/${item.src}`)}>{item.alt}</a></p>)}
      </noscript>
    </div>
  );
}
