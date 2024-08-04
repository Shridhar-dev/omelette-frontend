import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'WebRTC Peer Connection',
  description: 'WebRTC peer connection example using Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
