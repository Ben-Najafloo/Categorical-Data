import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import "./Home.css";
import { useEffect } from "react";
import { fetchBooksByCategory } from "../redux/bookSlice";
import BookList from "../components/BookList";

const Home: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const booksByCategory = useSelector(
    (state: RootState) => state.books.BooksByCategory
  );

  console.log(booksByCategory);
  useEffect(() => {
    const categories = [
      "Science Fiction",
      "Fantasy",
      "Romance",
      "Mystery",
      "Cooking",
    ];
    categories.forEach((category) => {
      if (!booksByCategory[category]) {
        dispatch(fetchBooksByCategory(category));
      }
    });
  }, [dispatch, booksByCategory]);

  return (
    <div>
      <div className="parent">
        {Object.keys(booksByCategory).map((category, index) => {
          const books = booksByCategory[category];
          return (
            <div key={index} className="div1">
              <h3>{category}</h3>
              <BookList books={books} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
