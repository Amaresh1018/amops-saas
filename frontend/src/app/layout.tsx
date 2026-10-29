import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = localFont({
  src: "./fonts/geist-sans.woff2",
  variable: "--font-sans",
  display: "swap",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/geist-mono.woff2",
  variable: "--font-mono",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "amops — One connected workspace",
  description: "Explore amops: a modular workspace in development for software projects, team knowledge, conversations, and client work. Try the project workspace preview.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col font-sans bg-background text-foreground transition-colors duration-200"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
