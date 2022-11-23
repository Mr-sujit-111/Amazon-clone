import '../styles/globals.css';
import { SessionProvider } from "next-auth/react"
import { Provider as ReduxStoreProvider } from 'react-redux';
import store from '../store/store';
import { AnimatePresence } from "framer-motion"

function MyApp({ Component, pageProps }) {
  return (
    <AnimatePresence exitBeforeEnter>
      <ReduxStoreProvider store={store}>
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
        </SessionProvider>
      </ReduxStoreProvider>
    </AnimatePresence>
  )
}

export default MyApp
