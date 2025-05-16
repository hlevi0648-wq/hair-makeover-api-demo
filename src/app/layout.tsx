import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { TextToImageProvider } from '@/contexts/TextToImageContext';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Runway Hair Makeover',
  description: "Generate hair makeovers using Runway's API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#EFEEE6]">
        <TextToImageProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            {children}
            <Footer />
          </div>
        </TextToImageProvider>
      </body>
    </html>
  );
}
