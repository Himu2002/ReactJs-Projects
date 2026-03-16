import { configureStore } from '@reduxjs/toolkit'
import counterSlice from '../counterSlice'
import cartReducer from '../cartSlice'


export const store = configureStore({
    reducer: {
        counter: counterSlice,
        cart: cartReducer,
    },
})