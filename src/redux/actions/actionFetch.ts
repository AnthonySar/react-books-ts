import { FETCH_BOOKS_LOADING, FETCH_BOOKS_SUCCESS, FETCH_BOOKS_ERROR, ApiBook } from '../type';
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

export const fetchBooks = (title: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(fetchBooksLoading());

    return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${title}&maxResults=20`)
      .then((response) => {
        const booksItemArray = response.data.items;
        // On éxècute un premier map pour fetch les données qui nous intéresse
        // Celle qu'on à stocker dans notre interface ApiBook
        const books: ApiBook[] = booksItemArray.map((item: ApiBook) => ({
          id: item.id,
          volumeInfo: item.volumeInfo
        }))
        dispatch(fetchBooksSuccess(books));
      })
      .catch((error) => {
        dispatch(fetchBooksError(error.message));
      });
  };
};
