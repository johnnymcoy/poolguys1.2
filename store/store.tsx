import { configureStore } from "@reduxjs/toolkit"
import configReducer from "./config-store"

const store = configureStore({
    reducer: {
        config: configReducer,
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch