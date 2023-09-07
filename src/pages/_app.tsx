import { Providers } from '@/providers'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Noto_Sans, Rubik } from 'next/font/google'
import 'react-toastify/dist/ReactToastify.css'
import Container from "./container"

const rubik = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik'
})

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ["400"],
  variable: '--font-noto-sans'
})

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {

  return (
    <main className={`${notoSans.variable} ${rubik.variable} text-gray-800 relative flex flex-col items-center justify-center gap-20 min-h-screen overflow-x-hidden font-sans bg-background pb-20`}>
      <Providers pageProps={pageProps}>
        <Container Component={Component} pageProps={pageProps} />
      </Providers>

    </main>
  )
}
