import { SearchAction, SearchState, FETCH_BOOKS_LOADING, FETCH_BOOKS_SUCCESS, FETCH_BOOKS_ERROR } from "../type";

const initialState: SearchState = {
  isLoading: false,
  error: "",
  fetchedBooks: []
};

const reducerFetchedBooks = (state = initialState, action: SearchAction) => {
  switch (action.type) {
    case FETCH_BOOKS_LOADING:
      return {
        ...state,
        isLoading: true,
        error: ""
      };
    case FETCH_BOOKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        fetchedBooks: action.payload
      };
    case FETCH_BOOKS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default reducerFetchedBooks;