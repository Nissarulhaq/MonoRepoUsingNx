import { AppRegistry } from 'react-native';
import App from './app/App';
import { persistor } from '@nx-apps/store';
import { Provider } from 'react-redux';
import { store } from '@nx-apps/store';
import { PersistGate } from 'redux-persist/es/integration/react';


const Root = () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
);

AppRegistry.registerComponent('ClinicApp', () => Root);
