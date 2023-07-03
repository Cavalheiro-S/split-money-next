import { NavBar } from '@/components/NavBar/NavBar'
import { Wrapper } from '@/components/Wrapper/Wrapper'
import { store } from '@/store'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Noto_Sans, Rubik } from 'next/font/google'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const rubik = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik'
})

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ["400"],
  variable: '--font-noto-sans'
})

export default function App({ Component, pageProps }: AppProps) {

  return (
    <main className={`${notoSans.variable} ${rubik.variable} text-gray-800 relative flex flex-col items-center justify-center gap-20 min-h-screen overflow-x-hidden font-sans bg-background pb-20`}>
      <Provider store={store}>
        <NavBar />
        <Wrapper>
          <Component {...pageProps} />
        </Wrapper>
        <ToastContainer />
      </Provider>
    </main>
  )
}
