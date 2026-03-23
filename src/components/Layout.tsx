'use client';

import Navbar from './Navbar';
import Footer from './Footer';
import FloatingContact from './FloatingContact';
import { usePathname } from 'next/navigation';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      {isHomePage && <Footer />}
      <FloatingContact />
    </div>
  );
}
