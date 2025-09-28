import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice.js"
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
//import rootReducer from "./reducers"


const persistConfig = {
    key: "root",
    storage
}

const rootReducer = combineReducers({
    auth: authReducer,
    
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>{
        return getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],

            },
    })
    }

})



export default store;
export const persistor = persistStore(store);