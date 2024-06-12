import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar'
import '@/styles/globals.css'
import { Montserrat } from "next/font/google";
import Head from "next/head";

const montserrat = Montserrat(
  {
    subsets: ["latin"],
    variable: "--font-mont"
  }
)

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewpoint" content="widht=device-width, initial-scale=1" />
        <link rel="shortcut icon" href='../fav/favicon.ico' />
      </Head><main className={`${montserrat.variable} font-mont`}>
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </main>
    </>

  )
}
