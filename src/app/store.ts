import { createSlice, configureStore, combineReducers } from '@reduxjs/toolkit'
import { reduxPgSlice } from '../components/ReduxPG/reduxPgSlice'
import { cardSlice } from "../components/Card/cardSlice"

export const store = configureStore({
  reducer: {
    reduxPGreducer: reduxPgSlice.reducer,
    reduxCardreducer: cardSlice.reducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch