export const ADD_BOOKS = "ADD_BOOKS";
export const DELETE_BOOKS = "DELETE_BOOKS";
export const DELETE_ALL_BOOKS = "DELETE_ALL_BOOKS";

interface AddBooksAction {
  type: typeof ADD_BOOKS;
  payload: {
    title: string;
    author: string;
  }
}

interface DeleteBooksAction {
  type: typeof DELETE_BOOKS;
  payload: string;
}

interface DeleteAllBooksAction {
  type: typeof DELETE_ALL_BOOKS;
}

export type BooksAction =
  | AddBooksAction
  | DeleteBooksAction
  | DeleteAllBooksAction;


// Fetch API
export interface SearchState {
  isLoading: boolean;
  error: string;
  fetchedBooks: object[];
}

export interface ApiBook {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    description?: string;
    previewLink: string;
    imageLinks?: {
      thumbnail: string;
    }
  }
}

export const FETCH_BOOKS_LOADING = "FETCH_BOOKS_LOADING";
export const FETCH_BOOKS_SUCCESS = "FETCH_BOOKS_SUCCESS";
export const FETCH_BOOKS_ERROR = "FETCH_BOOKS_ERROR";

interface FetchBooksLoadingAction {
  type: typeof FETCH_BOOKS_LOADING;
}

interface FetchBooksSuccessAction {
  type: typeof FETCH_BOOKS_SUCCESS;
  payload: object[];
}

interface FetchBooksErrorAction {
  type: typeof FETCH_BOOKS_ERROR;
  payload: string;
}

export type SearchAction =
  | FetchBooksLoadingAction
  | FetchBooksSuccessAction
  | FetchBooksErrorAction;
