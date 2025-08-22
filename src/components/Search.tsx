import React, { useState } from "react";
import "./Search.css";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchSearchresults } from "../redux/bookSlice";

const Search: React.FC = () => {
  const [query, setQuery] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(fetchSearchresults(query));
      navigate("/search");
      setQuery("");
      console.log("query: ", query);
    }
  };
  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          value={query}
        />
        <button type="submit"> Searhc </button>
      </form>
    </div>
  );
};

export default Search;
