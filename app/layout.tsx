import type { Metadata } from "next";
import "./globals.css";
import dynamic from 'next/dynamic';

const BGMPlayer = dynamic(() => import('@/components/BGMPlayer'), { ssr: false });

export const metadata: Metadata = {
  title: "StockDragonfly v6.0 | Tactical Terminal",
  description: "AI-Powered Momentum Trading System",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body>
        <div className="app-wrapper">
          <BGMPlayer />
          <div className="content-area">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
