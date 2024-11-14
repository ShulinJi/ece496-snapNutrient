import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/components/auth/AuthProvider'

const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  // This allows full-screen mode on iOS
  title: 'SnapNutrient',
  description: 'AI-Powered Nutrition Tracking and Social Platform',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'SnapNutrient'
  },
}

export default function RootLayout(
  {
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <main className="flex-grow w-full">
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}