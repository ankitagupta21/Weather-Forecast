import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    onSearch(city);
    setCity("");
  };

  return (
    <div className="searchBar">
      <input
        type="text"
        value={city}
        onChange={handleInputChange}
        placeholder="Enter City Name"
      />
      <FontAwesomeIcon
        icon={faSearch}
        onClick={handleSearch}
        className="icon"
      />
    </div>
  );
};

export default SearchBar;
