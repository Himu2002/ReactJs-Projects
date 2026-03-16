import { createSlice } from '@reduxjs/toolkit'

//we have to make state and reducer for counter component because we are using redux for state management instead of useState hook
//const[counter,setCounter] = useState(0)

export const counterSlice = createSlice({
    name: 'counter',
    initialState: 100,
    reducers: {
        increaseby1: (state) => state + 1,
        increaseby10: (state) => state + 10,
        decreaseby1: (state) => state - 1,
        decreaseby10: (state) => state - 10,
        increaseByValue: (state, action) => state + action.payload,
        decreaseByValue: (state, action) => state - action.payload,
    }
})

// Action creators are generated for each case reducer function
export const { increaseby1, increaseby10, decreaseby1, decreaseby10, increaseByValue, decreaseByValue } = counterSlice.actions

export default counterSlice.reducer