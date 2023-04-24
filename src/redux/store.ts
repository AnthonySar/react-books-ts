import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from "redux";
import { useDispatch } from 'react-redux'
import addBooksReducer from "./reducers/reducerBook";
import reducerFetchedBooks from './reducers/reducerFetch';

const reducer = combineReducers({
  library: addBooksReducer,
  search: reducerFetchedBooks
});

const store = configureStore({
  reducer

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;