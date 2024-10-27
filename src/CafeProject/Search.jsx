import React, { useState, useContext } from "react";
import SearchContext from "./SearchContext";

function Search() {
  const [value, setValue] = useState("");
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setValue(e.target.value);
    handleSearch(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const { handleSearch } = useContext(SearchContext);
  return (
    <div className="search-box">
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            value={value}
            onChange={handleInputChange}
            placeholder="카페를 검색해보세요."
          />
          <i className="xi-search"></i>
        </label>
      </form>
    </div>
  );
}

export default Search;
