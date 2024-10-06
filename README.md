#### Additional libraries for fast ui development.
    @mui/x-data-grid 
    @mui/material
    @emotion/react
    @emotion/styled
    lucide-react 
    numeral
    recharts
    uuid
    axios

#### Type Dependences
    @types/node
    @types/uuid 
    @types/numeral

#### Tailwind CSS color theme 
    tw-colors : for fast color theme switches like from dark to light

#### Redux ToolKit, redux-persist, 
 Default RTK has some probelm beacuse Nextjs by default support server side rendering and this blocks global store and 
    Nextjs support RSC and to use Redux we need to some addtional changes and follwing code in application. 
```
    import { useRef } from "react";
    import { combineReducers, configureStore } from "@reduxjs/toolkit";
    import {
    TypedUseSelectorHook,
    useDispatch,
    useSelector,
    Provider,
    } from "react-redux";
    import globalReducer from "@/state";
    import { api } from "@/state/api";
    import { setupListeners } from "@reduxjs/toolkit/query";
    
    import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    } from "redux-persist";
    import { PersistGate } from "redux-persist/integration/react";
    import createWebStorage from "redux-persist/lib/storage/createWebStorage";
    
    /* REDUX PERSISTENCE */
    const createNoopStorage = () => {
    return {
    getItem(_key: any) {
    return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
    return Promise.resolve(value);
    },
    removeItem(_key: any) {
    return Promise.resolve();
    },
    };
    };
    
    const storage =
    typeof window === "undefined"
    ? createNoopStorage()
    : createWebStorage("local");
    
    const persistConfig = {
    key: "root",
    storage,
    whitelist: ["global"],
    };
    const rootReducer = combineReducers({
    global: globalReducer,
    [api.reducerPath]: api.reducer,
    });
    const persistedReducer = persistReducer(persistConfig, rootReducer);
    
    /* REDUX STORE */
    export const makeStore = () => {
    return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
    serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
    }).concat(api.middleware),
    });
    };
    
    /* REDUX TYPES */
    export type AppStore = ReturnType<typeof makeStore>;
    export type RootState = ReturnType<AppStore["getState"]>;
    export type AppDispatch = AppStore["dispatch"];
    export const useAppDispatch = () => useDispatch<AppDispatch>();
    export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
    
    /* PROVIDER */
    export default function StoreProvider({
    children,
    }: {
    children: React.ReactNode;
    }) {
    const storeRef = useRef<AppStore>();
    if (!storeRef.current) {
    storeRef.current = makeStore();
    setupListeners(storeRef.current.dispatch);
    }
    const persistor = persistStore(storeRef.current);
    
    return (
    <Provider store={storeRef.current}>
    <PersistGate loading={null} persistor={persistor}>
    {children}
    </PersistGate>
    </Provider>
    );
    }
```
#### Explanation
    This code sets up a Redux store configuration for a Next.js application, incorporating Redux Toolkit and Redux Persist. Let's break it down:

    1. Imports:
       The code imports necessary functions and types from Redux Toolkit, React-Redux, Redux Persist, and custom state files.
    
    2. Redux Persistence Setup:
       ```typescript
       const createNoopStorage = () => { ... }
       const storage = typeof window === "undefined" ? createNoopStorage() : createWebStorage("local");
       ```
       This creates a storage mechanism that works both on the server-side (where `window` is undefined) and client-side.
    
    3. Persist Configuration:
       ```typescript
       const persistConfig = {
         key: "root",
         storage,
         whitelist: ["global"],
       };
       ```
       This configures Redux Persist, specifying which parts of the state to persist (in this case, the "global" reducer).
    
    4. Root Reducer:
       ```typescript
       const rootReducer = combineReducers({
         global: globalReducer,
         [api.reducerPath]: api.reducer,
       });
       const persistedReducer = persistReducer(persistConfig, rootReducer);
       ```
       Combines reducers and wraps them with the persist reducer.
    
    5. Store Creation:
       ```typescript
       export const makeStore = () => {
         return configureStore({ ... });
       };
       ```
       This function creates the Redux store with the persisted reducer and custom middleware.
    
    6. Type Definitions:
       ```typescript
       export type AppStore = ReturnType<typeof makeStore>;
       export type RootState = ReturnType<AppStore["getState"]>;
       export type AppDispatch = AppStore["dispatch"];
       ```
       These type definitions ensure type safety when using Redux throughout the application.
    
    7. Custom Hooks:
       ```typescript
       export const useAppDispatch = () => useDispatch<AppDispatch>();
       export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
       ```
       These custom hooks provide typed versions of `useDispatch` and `useSelector`.
    
    8. StoreProvider Component:
       ```typescript
       export default function StoreProvider({ children }: { children: React.ReactNode }) {
         // ...
       }
       ```
       This component wraps the application with the Redux Provider and PersistGate, ensuring that the store is available throughout the app and that persisted state is loaded before rendering the app.
    
    The main benefits of this setup are:
    - It provides a consistent Redux configuration for Next.js applications.
    - It incorporates Redux Persist for state persistence across page reloads.
    - It ensures type safety with TypeScript.
    - It sets up a structure that's ready for adding more slices and API endpoints.
    
    To use this in a Next.js application, you would wrap your `_app.tsx` component with this `StoreProvider`. Then, you can add more slices to the store as needed and use the `useAppDispatch` and `useAppSelector` hooks in your components to interact with the Redux store.


## Backend

#### Helmet 
    Helmet helps secure Express apps by settings HTTP response headers.

#### Morgan 
    HTTP request logger middleware for node.js

#### Concurrently
    Run multiple commands concurrently. 

#### rimraf
    build TypeScript files
    clean and compile old typescript files for production by removing the old build folder

#### some dev commands
    nodemon @types/cors @types/express @types/


## AWS
Note: I have migrated AWS RBD PostgreSQL to Neon PostgreSQL beacuse just of cost. And, for one database instace neon is free. 

