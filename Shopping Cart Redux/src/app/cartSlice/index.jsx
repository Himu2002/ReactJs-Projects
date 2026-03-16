import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [
        { id: 1, name: "Product 1", price: 100 },
        { id: 2, name: "Product 2", price: 200 },
        { id: 3, name: "Product 3", price: 300 },
    ],
    cart: [],
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.cart.push(action.payload)
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload)
        },
        cleearCart: (state) => {
            state.cart = []
        },
    }
})

export const { addToCart, removeFromCart, cleearCart } = cartSlice.actions

export default cartSlice.reducer