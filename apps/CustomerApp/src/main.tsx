import { AppRegistry } from 'react-native';
import App from './app/App';
import { Provider } from 'react-redux';
import { store, persistor } from '@nx-apps/store';
import { PersistGate } from 'redux-persist/es/integration/react';
const Root = () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
);

AppRegistry.registerComponent('CustomerApp', () => Root);

