import { useSelector } from 'react-redux';
import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';
import { AppSelector, selector } from '../../utils';
import { v4 } from "uuid"
import * as R from "ramda"

type ReduxPGState = {
  counter: number
  title: string
  text: string
  todoItems: [string, string][]
}

const initialState: ReduxPGState = {
  counter: 0,
  title: "",
  text: "",
  todoItems: [["", ""]]
}

export const reduxPgSlice = createSlice({
  name: 'reduxPg',
  initialState,
  reducers: {
    increment: (state) => {
      state.counter = state.counter + 1
    },
    decrement: (state) => {
      state.counter = state.counter - 1
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload
    },
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload
    },
    addTodoItem: (state, action: PayloadAction<[string, string]>) => {
      state.todoItems = [...state.todoItems, action.payload]
    }
  
  }
})

export const selectPgSlice: AppSelector<ReduxPGState> = selector(state => state.reduxPGreducer)

export const { increment, decrement, setText, setTitle, addTodoItem } = reduxPgSlice.actions