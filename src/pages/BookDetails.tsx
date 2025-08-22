import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { fetchBookDetails } from "../redux/bookSlice";

const BookDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const bookDetails = useSelector(
    (state: RootState) => state.books.Booksdetails
  );
  const isLoading = useSelector((state: RootState) => state.books.isLoading);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchBookDetails(id));
    }
  }, [dispatch, id]);
  return (
    <div>
      <button onClick={() => navigate("/")}>Back</button>
      {!isLoading ? (
        <div>
          {bookDetails?.covers && bookDetails?.covers.length > 0 && (
            <img
              src={`https://covers.openlibrary.org/b/id/${bookDetails?.covers[0]}-M.jpg`}
              alt=""
            />
          )}
          <h2>{bookDetails?.title}</h2>
        </div>
      ) : (
        <span>Is Loading....</span>
      )}
    </div>
  );
};

export default BookDetails;
