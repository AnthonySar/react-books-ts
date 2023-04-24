import { ADD_BOOKS, DELETE_ALL_BOOKS, DELETE_BOOKS } from "../type";

export const addBook = (data: object) => {
  return {
    type: ADD_BOOKS,
    payload: data
  } 
};

export const deleteBook = (id: number) => {
  return {
    type: DELETE_BOOKS,
    payload: id
  }
};

export const deleteAllBook = () => {
  return {
    type: DELETE_ALL_BOOKS
  }
};