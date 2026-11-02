import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { THEME_KEY } from "@/lib/theme";
import { site } from "@/content/site";
import { asset } from "@/lib/asset";
import { publicUrl } from "@/lib/discovery";
import { pageMetadata } from "@/lib/metadata";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"], weight: ["400", "500", "600"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], weight: ["400", "500"] });
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  ...pageMetadata(`${site.name} · ${site.role}`, site.description),
  metadataBase: new URL(site.url),
  authors: [{ name: site.name, url: publicUrl() }],
  creator: site.name,
  alternates: {
    canonical: publicUrl(),
    types: { "application/json": publicUrl("profile.json") },
  },
};

export const viewport: Viewport = {
  themeColor: "#0f0f0d",
};

// Runs before paint: restore the saved theme and opt into entrance motion (avoids a flash).
const boot = `try{var t=localStorage.getItem(${JSON.stringify(THEME_KEY)});if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}
if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion')`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${geist.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="describedby" type="text/plain" href={asset("llms.txt")} title="Portfolio guide for agents" />
        <link rel="sitemap" type="application/xml" href={asset("sitemap.xml")} />
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      {/* Extensions (e.g. ColorZilla's cz-shortcut-listen) add attributes to <body> before hydration. */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
