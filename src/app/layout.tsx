import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { Providers } from "@/components/Providers"
import "./globals.css"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" })

export const metadata: Metadata = {
  title: "DevBoard",
  description: "Personal developer dashboard",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full antialiased">
        <div className="w-full h-screen ">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  )
}
