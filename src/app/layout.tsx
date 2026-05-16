import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SparesLink | Premium Auto Spares Marketplace Zambia",
  description: "Connect with verified spares shops for Cars, Motorcycles, Trucks, and Agricultural vehicles across Southern Africa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
