import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const repositoryName =
  process.env.GITHUB_REPOSITORY?.split("/")[1] ??
  "engineering-internship-highlights";
const faviconPath =
  process.env.GITHUB_PAGES === "true"
    ? `/${repositoryName}/favicon.svg`
    : "/favicon.svg";

const introStateScript = `
(function () {
  var key = "engineering-portfolio-intro-seen";
  try {
    var shouldSkip =
      window.sessionStorage.getItem(key) === "1" ||
      window.location.hash === "#outcomes";
    if (shouldSkip) {
      document.documentElement.classList.add("skip-portfolio-intro");
    } else {
      window.sessionStorage.setItem(key, "1");
    }
  } catch (_) {
    if (window.location.hash === "#outcomes") {
      document.documentElement.classList.add("skip-portfolio-intro");
    }
  }
})();
`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Engineering Internship Highlights",
  description: "An interactive portfolio of engineering, automation, supply-chain, and operations projects.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: faviconPath,
    shortcut: faviconPath,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#080909",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: introStateScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
