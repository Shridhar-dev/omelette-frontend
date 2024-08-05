"use client"
import './globals.css'
import { Montserrat } from 'next/font/google'
import { ThirdwebProvider } from "thirdweb/react";

const inter = Montserrat({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThirdwebProvider>
          {children}
        </ThirdwebProvider>
      </body>
    </html>
  )
}
