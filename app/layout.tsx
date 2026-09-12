import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { AmbientBackground } from "@/components/layout/AmbientBackground";
import { site } from "@/data/site";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} | ${site.title}`,
    template: `%s | ${site.name}`,
  },
  description: site.tagline,
  applicationName: site.name,
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: site.name,
    title: `${site.name} | ${site.title}`,
    description: site.tagline,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.title}`,
    description: site.tagline,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} h-full scroll-smooth antialiased`}
    >
      <body
        className="relative flex min-h-full flex-col overflow-x-hidden bg-[#FAFAFD] font-sans text-[#090D16]"
        suppressHydrationWarning
      >
        <AmbientBackground />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
