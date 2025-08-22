//SearchTesult.tsx
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect } from "react";
import BookList from "../components/BookList";

const SearchResults: React.FC = () => {
  const { searchResult, isLoading, error } = useSelector(
    (state: RootState) => state.books
  );

  console.log("Search r", searchResult);

  useEffect(() => {
    window.scrollTo({ top: 650, behavior: "smooth" });
  });

  return (
    <>
      {isLoading ? (
        <span>Is Loading......</span>
      ) : error ? (
        <span>{error}</span>
      ) : searchResult && searchResult.length > 0 ? (
        <BookList books={searchResult.slice(0, 16)} />
      ) : (
        <span>opsssss</span>
      )}
    </>
  );
};

export default SearchResults;
