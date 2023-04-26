import { FormEvent, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { fetchBooks } from '../redux/actions/actionFetch';
import { useAppDispatch } from '../redux/store';
import { addBook } from '../redux/actions/actionBooks';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Accordion from "react-bootstrap/Accordion";
import { ApiBook } from '../redux/type';


const SearchBooks = () => {
  const [title, setTitle] = useState<string>('');
  const searchResult = useSelector((state: RootState) => state.search);
  const dispatch = useAppDispatch();

  console.log('searchresult', searchResult)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(fetchBooks(title))
  }

  const handleSave = (title: string, author: string) => {
    const bookSave = {
      title,
      author
    };

    dispatch(addBook(bookSave));
    toast.info("Le livre a bien été ajouté à votre collection", {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  }

  const displayFetchBooks = searchResult.isLoading ? (
    <div className="d-flex justify-content-center">
      <div className="spinner-border text-info" role="status"></div>
    </div>
  ) : searchResult.error !== "" ? (
    <p>{searchResult.error}</p>
  ) : (
    searchResult.fetchedBooks.map((data: object) => {
      const book = data as ApiBook;
      return (
        <Accordion.Item eventKey={book.id} key={book.id}>
          <Accordion.Header>{book.volumeInfo.title}</Accordion.Header>
          <Accordion.Body>
            {book.volumeInfo.imageLinks ? (
              <img
                src={book.volumeInfo.imageLinks.thumbnail}
                alt={book.volumeInfo.title}
              />
            ) : (
              ""
            )}
            <hr />
            <h3>{book.volumeInfo.title}</h3>
            <h4>{book.volumeInfo.authors}</h4>
            <hr />
            {book.volumeInfo.description ? (
              <p>{book.volumeInfo.description}</p>
            ) : (
              ""
            )}
            <a
              className="btn btn-outline-secondary m-1"
              target="_blank"
              rel="noopener noreferrer"
              href={book.volumeInfo.previewLink}
            >
              Plus d'infos
            </a>
            <button
              className="btn btn-outline-secondary m-1"
              onClick={() => {
                handleSave(book.volumeInfo.title, book.volumeInfo.authors.join(', '));
              }}
            >
              Ajouter à la collection
            </button>
          </Accordion.Body>
        </Accordion.Item>
      );
    })
  );

  return (
    <main role="main">
      <div className="d-flex rounded">
        <div className="container text-center">
          <h2 className="display-4">Collections</h2>
          <p>Indiquer le sujet du livre à rechercher (Google API)</p>

          <ToastContainer />

          <form className="justify-content-center" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col">
                <input
                  data-input-book
                  type="text"
                  className="form-control ml-3"
                  placeholder="Mots-clés, phrases..."
                  required
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>

              <div className="col">
                <button
                  data-search-book
                  className="btn btn-outline-secondary ml-3"
                >
                  Rechercher
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="container mt-4" style={{ minHeight: "200px" }}>
        <Accordion>{displayFetchBooks}</Accordion>
      </div>
    </main>
  );
};

export default SearchBooks;