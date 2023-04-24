import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <header className="d-flex justify-content-between align-items-center p-4">
      <h1>
        <a href="/">NinArt Ts</a>
      </h1>

      <nav className="btn-group">
        <Link to="/" className="btn btn-light">
          Acceuil
        </Link>
        <Link to="/search" className="btn btn-light">
          Rechercher un livre
        </Link>
      </nav>
    </header>
  );
};

export default NavBar;
