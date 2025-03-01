import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { JobProvider } from '@/context/JobContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Job Finder',
  description: 'Find your dream job',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <JobProvider>
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
        </JobProvider>
      </body>
    </html>
  );
}