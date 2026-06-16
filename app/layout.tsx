import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Najee | Portfolio",
  description: "Creative developer and designer portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
