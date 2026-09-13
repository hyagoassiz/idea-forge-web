import { GlobalLoading } from "@/components/GlobalLoading";
import { APP_NAME } from "@/constants/app";
import { Providers } from "@/providers/providers";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: APP_NAME,
  description: "Transforme ideias em oportunidades",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        <AppRouterCacheProvider>
          <Providers>
            {children}

            <GlobalLoading />
          </Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
