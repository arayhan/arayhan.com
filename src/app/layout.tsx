import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rayhan",
  // TODO(content): description
  description: "TODO(content)",
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
