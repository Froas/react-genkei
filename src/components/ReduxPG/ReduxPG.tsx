import React from 'react'
import { selectPgSlice, decrement, increment } from './reduxPgSlice'
import { use } from "../../utils"
import { useDispatch } from 'react-redux'

export const ReduxPG = () => {

  const dispatch = useDispatch()
  const counter = use(selectPgSlice)
  
  return (
    <div>
      <button onClick={() => dispatch(increment())}>+</button>
      <div>{counter.counter}</div>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>

  )
}
