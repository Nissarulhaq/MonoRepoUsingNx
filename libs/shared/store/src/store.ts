import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { baseApi } from './baseQuery';
import { rtkQueryErrorLogger } from './middlewares/errorHandling';
import { authSlice } from './features/auth/slice';
import { testSlice } from './features/doctor/slice';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const rootReducer = combineReducers({
    auth: authSlice.reducer,
    test: testSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        persistedReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }).concat(baseApi.middleware, rtkQueryErrorLogger),
});

export const persistor = persistStore(store);
// Infer the RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;