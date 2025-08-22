import { configureStore } from "@reduxjs/toolkit";
import boolsReducer from './bookSlice'

const store = configureStore({
    reducer: {
        books: boolsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store