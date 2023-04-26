import { FC, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { addBook, deleteAllBook, deleteBook } from '../redux/actions/actionBooks';

interface BooksProps {
  title?: string;
  author?: string;
}

const AddBooks: FC<BooksProps> = () => {
  const initialState: BooksProps = {
    title: '',
    author: ''
  }
  
  const [newData, setNewData] = useState<BooksProps>(initialState);

  const libraryData: any[] = useSelector((state: RootState) => state.library);

  const dispatch = useDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    dispatch(addBook(newData));
    setNewData(initialState);
  }

  const handleDelete = (id: string) => {
    dispatch(deleteBook(id));
  }

  const handleAllDelete = () => {
    dispatch(deleteAllBook());
  }

  const displayData =
    libraryData.length > 0 ? (
      libraryData.map((data) => {
        return (
            <li
              key={data.id}
              className="list-group-item list-group-item-light d-flex justify-content-between align-items-center"
            >
              <span className="w-50">{data.title}</span>
              <span className="w-50">{data.author}</span>
              <span
                data-delete-book
                className="btn btn-danger"
                onClick={() => handleDelete(data.id)}
              >
                X
              </span>
            </li>
        );
      })
    ) : (
      <p className="text-center">Il n'y a aucun livre dans la collection</p>
    );

  const displayBtn = libraryData.length > 0 && (
    <div className="d-flex justify-content-center">
      <button
        data-delete-allbook
        className="btn btn-danger mt-4 mb-3"
        onClick={() => handleAllDelete()}
      >
        Effacer la collection
      </button>
    </div>
  );

 return (
    <main role="main">
      <div className="d-flex rounded">
        <div className="container text-center">
          <h2 className="display-4">Collections</h2>
          <p>Ajouter un livre à votre collections</p>

          <form className="justify-content-center" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Titre du livre"
                  required
                  value={newData.title}
                  onChange={(e) => {
                    setNewData({ ...newData, title: e.target.value });
                  }}
                />
              </div>

              <div className="col">
                <input
                  type="text"
                  className="form-control ml-3"
                  placeholder="Auteur du livre"
                  required
                  value={newData.author}
                  onChange={(e) => {
                    setNewData({ ...newData, author: e.target.value });
                  }}
                />
              </div>

              <div className="col">
                <button
                  data-add-book
                  className="btn btn-outline-secondary ml-3"
                >
                  Ajouter un livre
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="container mt-4" style={{ minHeight: "200px" }}>
        <div className="row">
          <div className="col-md-12">
            <ul className="list-group">
              {displayData}
            </ul>
          </div>
 
          {displayBtn}
        </div>
      </div>
    </main>
  );
}

export default AddBooks