import { FormEvent, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { fetchBooks } from '../redux/actions/actionFetch';
import { useAppDispatch } from '../redux/store';
import { addBook } from '../redux/actions/actionBooks';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Accordion from "react-bootstrap/Accordion";

interface Data {
  id: number;
  title: string;
  author: string;
  description: string;
}

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
    searchResult.fetchedBooks.map((data: any) => {

      return (
        <Accordion.Item eventKey={data.id}>
          <Accordion.Header>{data.volumeInfo.title}</Accordion.Header>
          <Accordion.Body>
            {data.volumeInfo.hasOwnProperty("imageLinks") ? (
              <img
                src={data.volumeInfo.imageLinks.thumbnail}
                alt={data.volumeInfo.title}
              />
            ) : (
              ""
            )}
            <hr />
            <h3>{data.volumeInfo.title}</h3>
            <h4>{data.volumeInfo.authors}</h4>
            <hr />
            {data.volumeInfo.description ? (
              <p>{data.volumeInfo.description}</p>
            ) : (
              ""
            )}
            <a
              className="btn btn-outline-secondary m-1"
              target="_blank"
              rel="noopener noreferrer"
              href={data.volumeInfo.previewLink}
            >
              Plus d'infos
            </a>
            <button
              className="btn btn-outline-secondary m-1"
              onClick={() => {
                handleSave(data.volumeInfo.title, data.volumeInfo.authors);
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