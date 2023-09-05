import React, { useState, useEffect, useContext } from "react";

import axios from "axios";

import { AiOutlineSearch } from "react-icons/ai";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

// Styling
import "../styles/Components_styles/SearchBar.scss";
import { GlobalValue } from "../context/GlobalValue";

interface SearchBarProps {
  setSearchBar: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Product {
  id: string;
  name: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ setSearchBar }) => {
  const [userSearch, setUserSearch] = useState<string>("");
  const [searchItems, setSearchItems] = useState<Product[] | null>();
  const [searchError, setSearchError] = useState<string>();

  const { setUserProSearch } = useContext(GlobalValue);

  const navigate = useNavigate();

  const productSearch = (userSearch: string) => {
    axios
      .post("http://127.0.0.1:8000/product_search/search/", {
        search_text: userSearch,
      })
      .then(function (response) {
        console.log("Product Search", JSON.parse(response.data));
        setSearchError("");
        setSearchItems(JSON.parse(response.data));
      })
      .catch(function (error) {
        console.log("error", error);
        setSearchError(error.response.data.message);
        setSearchItems(null);
      });
  };

  useEffect(() => {
    if (userSearch !== "" && userSearch.length >= 2) {
      productSearch(userSearch);
    }

    if (userSearch == "") {
      setSearchItems(null);
    }
  }, [userSearch]);

  // Search for Men or any other catergory:
  const userProductSearch = (product_text: string) => {
    navigate("/search");
    setUserProSearch(product_text);
    setSearchBar(false);
    localStorage.setItem("userProSearch", product_text);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      userProductSearch(userSearch);
    }
  };

  return (
    <div>
      <div
        onClick={() => setSearchBar(false)}
        className="navbar_container_search"
      />
      <div className="navbar_user_search">
        <div
          className="navbar_search_close"
          onClick={() => setSearchBar(false)}
        >
          <p>
            <RxCross1 />
          </p>
        </div>
        <div className="navbar_search_input">
          <p>
            <AiOutlineSearch />{" "}
          </p>
          <input
            type="text"
            placeholder="Search the Shop"
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
            autoFocus={true}
            minLength={2}
            onKeyDown={handleKeyPress}
          />
          <span onClick={() => userProductSearch(userSearch)}>
            <MdOutlineArrowForwardIos />
          </span>
        </div>
        {/* {searchItems && (
          <div className="navbar_search_result">
            {searchItems.map((product) => (
              <p key={product.id} onClick={() => userProductSearch(product.name)}>
                {product.name}
              </p>
            ))}
          </div>
        )} */}
        <div className="navbar_search_result">
          <p>Men 1</p>
          <p>Men 1</p>
          <p>Men 1</p>
          <p>Men 1</p>
          <p>Men 1</p>
        </div>
        {searchError && (
          <div className="navbar_search_result">
            <span>{searchError}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
