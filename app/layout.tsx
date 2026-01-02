import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Memory Game - La Brodadora',
  description: 'Juego de memoria interactivo de La Brodadora. Encuentra las parejas de productos y desafía tu memoria.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'Memory Game - La Brodadora',
    description: 'Juego de memoria interactivo de La Brodadora',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <script src="https://apps.abacus.ai/chatllm/appllm-lib.js"></script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
