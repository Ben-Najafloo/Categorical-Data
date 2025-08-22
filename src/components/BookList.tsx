//BookList.tsx
import { Link } from "react-router-dom";
import "./BookList.css";

interface Book {
  author_name?: string[];
  authors?: { name: string }[];
  title: string;
  key: string;
  cover_id?: number;
  cover_i?: number;
}

interface BookListProps {
  books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  return (
    <div className="container">
      {books.length > 0 ? (
        books.map((book, index) => {
          const authorName =
            book.authors && book.authors.length > 0
              ? book.authors[0].name
              : book.author_name && book.author_name.length > 0
              ? book.author_name[0]
              : "Unknown Author";

          return (
            <Link
              to={`/works/${book.key.replace("/works/", "")}`}
              key={book.key || index}
              className="card"
            >
              {book.cover_id || book.cover_i ? (
                <img
                  src={`https://covers.openlibrary.org/b/id/${
                    book.cover_id || book.cover_i
                  }-M.jpg`}
                  alt={`${book.title} cover`}
                />
              ) : (
                <span>No cover available</span>
              )}
              <div>
                <h4>
                  <b>{book.title} </b>
                </h4>
                <h5> {authorName} </h5>
              </div>
            </Link>
          );
        })
      ) : (
        <div>No books found.</div>
      )}
    </div>
  );
};

export default BookList;
