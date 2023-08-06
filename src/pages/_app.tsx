import AuthProvider from '@/Context/auth/AuthProvider'
import CartProvider from '@/Context/cart/CartProvider'
import UiProvider from '@/Context/ui/UiProvider'
import '@/styles/globals.css'
import { lightTheme } from '@/themes'
import { CssBaseline, ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr/_internal'
import { SessionProvider } from "next-auth/react"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <SWRConfig
        value={{
          fetcher: (...args: [key: string]) => fetch(...args).then((res) => res.json())
        }}
      >
        <AuthProvider isLoggedIn={false}>
          <CartProvider>
            <UiProvider isMenuOpen>
              <ThemeProvider theme={lightTheme}>
                <CssBaseline />
                <Component {...pageProps} />
              </ThemeProvider>
            </UiProvider>
          </CartProvider>
        </AuthProvider>
      </SWRConfig>
    </SessionProvider>

  )
}
