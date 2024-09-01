import '@/app/globals.css'
import type { Metadata } from 'next'

import NextTopLoader from 'nextjs-toploader'
import { ReactNode } from 'react'
import { Archivo } from 'next/font/google'
import { Libre_Franklin } from 'next/font/google'

import { Providers } from './providers'
import { Header } from './_header/header'

import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'

const archivo = Archivo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-archivo',
})
const libre_franklin = Libre_Franklin({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-libre_franklin',
})

export const metadata: Metadata = {
  title: 'WDC Template',
  icons: [{ rel: 'icon', type: 'image/png', sizes: '48x48', url: '/favicon.ico' }],
  keywords: 'yolo',
  description: 'A simple next.js template including drizzle and lucia auth',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html suppressHydrationWarning lang='en'>
      <body
        className={cn(
          'min-h-screen bg-background antialiased',
          archivo.variable + ' ' + libre_franklin.variable,
        )}
      >
        <Providers>
          <NextTopLoader />
          <Header />
          <div className='container mx-auto w-full py-12'>{children}</div>
        </Providers>
        <Toaster />
      </body>
    </html>
  )
}
