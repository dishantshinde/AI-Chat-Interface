import "./globals.css";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat App",
  description: "Chat with AI using streaming responses",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
