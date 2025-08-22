import Category from "./components/Category";
import Search from "./components/Search";
import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchResults from "./pages/SearchResults";
import BookDetails from "./pages/BookDetails";

//App.tsx
function App() {
  return (
    <BrowserRouter>
      <Search />
      <div className="main-container">
        <Category />
        <div className="book-container">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/works/:id" element={<BookDetails />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
