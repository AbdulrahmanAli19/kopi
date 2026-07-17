import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kopi Menu",
  description:
    "Browse Kopi cafe menu in English and Arabic, including coffee, matcha, bakery, salads, sandwiches, pizza, and desserts.",
  openGraph: {
    title: "Kopi Menu",
    description:
      "Browse Kopi cafe menu in English and Arabic, including coffee, matcha, bakery, salads, sandwiches, pizza, and desserts.",
    siteName: "Kopi",
    locale: "en_US",
    alternateLocale: ["ar_EG"],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#4f332f",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
