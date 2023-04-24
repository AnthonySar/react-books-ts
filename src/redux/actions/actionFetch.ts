import { FETCH_BOOKS_LOADING, FETCH_BOOKS_SUCCESS, FETCH_BOOKS_ERROR } from '../type';
import axios from 'axios';
import { AppDispatch } from '../store';

const fetchBooksLoading = () => {
  return {
    type: FETCH_BOOKS_LOADING
  }
};

const fetchBooksSuccess = (data: object) => {
  return {
    type: FETCH_BOOKS_SUCCESS,
    payload: data
  }
};

const fetchBooksError = (error: string) => {
  return {
    type: FETCH_BOOKS_ERROR,
    payload: error
  }  
};

export const fetchBooks = (title: string): any => {
  return (dispatch: AppDispatch) => {
    dispatch(fetchBooksLoading());

    return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${title}&maxResults=20`)
      .then((response) => {
        const booksItemArray = response.data.items;
        dispatch(fetchBooksSuccess(booksItemArray));
      })
      .catch((error) => {
        dispatch(fetchBooksError(error.message));
      });
  };
};
