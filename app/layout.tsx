import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Character Canvas",
  description: "Upload and edit characters with Fabric.js and AI prompt tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
