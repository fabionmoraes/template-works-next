import type { AppProps } from 'next/app'

import GlobalStyle from 'styles/global'

import { AppProvider } from 'hooks'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </>
  )
}

export default MyApp
