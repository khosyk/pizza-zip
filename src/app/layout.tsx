import type { Metadata } from 'next'
import './globals.css'
import { Noto_Sans_KR } from 'next/font/google'
import Header from '@/components/layout/Home/Header'
import Footer from '@/components/layout/Home/Footer'
import AppProvider from '@/components/layout/AppProvider'
import { Toaster } from 'react-hot-toast'

const noto = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={noto.className}>
        <main className="max-w-4xl mx-auto">
          <AppProvider>
          <Toaster/>
            <Header />
            {children}
            <Footer />
          </AppProvider>
        </main>
      </body>
    </html>
  )
}
