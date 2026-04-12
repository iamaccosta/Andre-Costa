import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({subsets: ["latin"]});

export const metadata = {
  title: "André Costa",
  description: "Full-stack developer based in Porto, Portugal.",
  openGraph: {
    title: "André Costa",
    description: "Full-stack developer based in Porto, Portugal.",
    url: "https://iamaccosta.dev",
    siteName: "André Costa",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body className={outfit.className}>{children}</body>
    </html>
  );
}
