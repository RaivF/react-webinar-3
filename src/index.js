import { createRoot } from 'react-dom/client';
import App from './app';
import Store from './store';
import { StoreContext } from './store/context';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from './context/intl-context';
const store = new Store();

const root = createRoot(document.getElementById('root'));

// Первый рендер приложения
root.render(
  <BrowserRouter>
    <IntlProvider>
      <StoreContext.Provider value={store}>
        <App />
      </StoreContext.Provider>
    </IntlProvider>
  </BrowserRouter>,
);
