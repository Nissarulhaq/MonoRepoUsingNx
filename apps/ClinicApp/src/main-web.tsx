import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/App';
import { persistor } from '@nx-apps/store';
import { Provider } from 'react-redux';
import { store } from '@nx-apps/store';
import { PersistGate } from 'redux-persist/es/integration/react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);
