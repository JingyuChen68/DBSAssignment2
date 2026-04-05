import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "EmbedPrep — Embedded Systems Interview Prep",
  description:
    "Practice questions, company research, checklists, and progress tracking for embedded systems & hardware interviews.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col bg-gray-50">
        <AppProvider>
          <Navbar />
          <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full">
            {children}
          </main>
        </AppProvider>
      </body>
    </html>
  );
}
