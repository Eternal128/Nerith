import type { Metadata } from "next";
import "./globals.css";
import { CustomCursor } from "@/components/motion/CustomCursor";

export const metadata: Metadata = {
  title: "Coverly — Cover letters that don't read like a robot wrote them",
  description:
    "Upload your resume once. Generate tailored, human-sounding cover letters for every job you want.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
