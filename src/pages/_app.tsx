import { Providers } from '@/providers'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Rubik } from 'next/font/google'
import 'react-toastify/dist/ReactToastify.css'
import Container from "./container"

const rubik = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik'
})

export default function App({ Component, pageProps }: AppProps) {
  
  return (
    <main className={`${rubik.variable} 
    text-gray-800 relative grid grid-rows-[100px_1fr] grid-cols-[192px_1fr] min-h-screen overflow-x-hidden font-sans bg-background`}>
      <Providers>
        <Container Component={Component} pageProps={pageProps} />
      </Providers>

    </main>
  )
}
