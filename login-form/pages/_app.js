import '../styles/globals.css'
import { IntlProvider } from 'react-intl'
import messages from '../translations/en'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = ({ Component, pageProps }) => (
  <IntlProvider locale='en' messages={messages}>
    <Component {...pageProps} />
    <ToastContainer />
  </IntlProvider>
)

export default App
