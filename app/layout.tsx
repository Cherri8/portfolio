import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Charan Reddy - Full Stack Developer & Cybersecurity Enthusiast',
  description: 'Portfolio of Charan Reddy - B.Tech Cyber Security student at MIT with expertise in full-stack development, AI/ML, and cybersecurity.',
  keywords: 'Charan Reddy, Full Stack Developer, Cybersecurity, AI, ML, React, Node.js, Python, Portfolio',
  authors: [{ name: 'Charan Reddy' }],
  viewport: 'width=device-width, initial-scale=1',
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
