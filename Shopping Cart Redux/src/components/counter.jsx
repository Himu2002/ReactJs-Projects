import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increaseby1, increaseby10, decreaseby1, decreaseby10, increaseByValue, decreaseByValue } from '../app/counterSlice'

const counter = () => {
    const count = useSelector((state) => state.counter)
    const dispatch = useDispatch()
    return (
        <div>
            <h1>Counter Value : {count}</h1>
            <button onClick={() => dispatch(increaseby1())}>increaseby1</button>
            <button onClick={() => dispatch(increaseby10())}>increaseby10</button>
            <button onClick={() => dispatch(decreaseby1())}>descreaseby1</button>
            <button onClick={() => dispatch(decreaseby10())}>descreaseby10</button>
            <button onClick={() => dispatch(increaseByValue(5))}>increaseByValue</button>
            <button onClick={() => dispatch(decreaseByValue(5))}>decreaseByValue</button>
        </div>
    )
}

export default counter 