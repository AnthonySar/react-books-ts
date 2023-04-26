import { ADD_BOOKS, BooksAction, DELETE_ALL_BOOKS, DELETE_BOOKS } from "../type";
import { v4 as uuidv4 } from "uuid";

interface Book {
  id: string;
  title: string;
  author: string;
}

interface State {
  books: Book[];
}

const initialState: State = {
  books: [],
};

const helperAddData = (action: BooksAction): Book | null => {
  if (action.type === ADD_BOOKS && action.payload) {
    return {
      id: uuidv4(),
      title: action.payload.title,
      author: action.payload.author,
    };
  }
  return null;
};

const helperDeleteData = (state: Book[], id: string): Book[] => {
  const books = state.filter((book) => book.id !== id);
  return books;
};

// Reducer
const addBooksReducer = (state: Book[] = initialState.books, action: BooksAction) => {
  // On vérifie si on à déjà la data en localStorage ou non
  const booksData = localStorage.getItem("booksData");
  if (typeof booksData === "string") {
    state = JSON.parse(booksData) as Book[];
  }

  switch (action.type) {
    case ADD_BOOKS:
      // On caps et check si on à qqchose à traiter
      const newBook = helperAddData(action);

      // Spread operator pour récupéré ce qui nous intéresse
      // On passe l'action au niveau de helperAddData pour récupéré les datas
      if (newBook) {
        state = [...state, newBook];

        // On Enregistre une copie de la data en localStorage
        localStorage.setItem("booksData", JSON.stringify(state));
      }

      return state;

    case DELETE_BOOKS:
      // On se base du l'ID du livre : payload: uuid()
      state = helperDeleteData(state, action.payload);
      localStorage.setItem("booksData", JSON.stringify(state));

      return state;

    case DELETE_ALL_BOOKS:
      state = [];
      localStorage.setItem("booksData", JSON.stringify(state));

      return state;

    default:
      return state;
  }
};

export default addBooksReducer;
