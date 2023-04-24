import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from './components/NavBar';
import AddBooks from './containers/AddBooks';
import SearchBooks from './components/SearchBooks';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />

        <Routes>
          <Route path='/' element={<AddBooks />} />
          <Route path="/search" element={<SearchBooks />} />
        </Routes>
        
      </Router>
    </div>
  );
}

export default App;
