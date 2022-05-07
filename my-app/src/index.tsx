import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './localization/i18n';
import Loader from './components/Loader/Loader';
import { Provider } from 'react-redux';
import { store } from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>
);
