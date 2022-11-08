import '../styles/globals.css';
import { SessionProvider } from "next-auth/react"
import { Provider as ReduxStoreProvider } from 'react-redux';
import store from '../store/store';

function MyApp({ Component, pageProps }) {
  return (
    <ReduxStoreProvider store={store}>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ReduxStoreProvider>
  )
}

export default MyApp
