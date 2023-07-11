import '@/styles/globals.css'
import { lightTheme } from '@/themes'
import { CssBaseline, ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr/_internal'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
    value={{
      fetcher: (...args:[key:string]) => fetch(...args).then((res) => res.json())
    }}
    >
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </SWRConfig>
  )
}
