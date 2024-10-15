import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBarForProducts() {
  let history = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      history(`/?searchTerm=${searchTerm}`);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <span style={{ display: "flex" }} className="">
          <input
            type="text"
            value={searchTerm}
            placeholder="search products"
            className="form-control"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-primary ml-2 button-focus-css"
          >
            <i className="fas fa-search"></i>
          </button>
        </span>
      </form>
    </div>
  );
}

export default SearchBarForProducts;
