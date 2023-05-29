import Head from 'next/head'
import type { AppProps } from 'next/app'
import '@/styles/globals.css'
import { UserDataProvider } from '@/contexts/UserDataContext'
import { AuthProvider } from '@/contexts/AuthContext'

export default function App ({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>Nextflix</title>
      </Head>
      <AuthProvider>
        <UserDataProvider>
          <Component {...pageProps} />
        </UserDataProvider>
      </AuthProvider>
    </>
  )
}
