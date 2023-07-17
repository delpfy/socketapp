import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/* import cross_sign from "../../../assets/img/cross_sign.png"; */
import { Items } from "../../../redux/types";
//import { SetID } from "../../../redux/home/homeSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

import "./search.scss";

export const Search = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.home.itemsDisplay);

  const [searchItem, setSearchItem] = useState("");
  const [localDisplayItems, setLocalItems] = useState<Items[]>([] as Items[]);

  const filterSearch = (entry: string) => {
    if (!entry) {
      return items;
    } else {
      return items.filter((el) =>
        el.name.toLowerCase().includes(entry.toLowerCase())
      );
    }
  };
  useEffect(() => {
    const Debounce = setTimeout(() => {
      const filteredSearch = filterSearch(searchItem);
      setLocalItems(filteredSearch);
    }, 300);

    return () => clearTimeout(Debounce);
  }, [searchItem]);
  return (
    <div className="block">
      <div className="search">
        <input
          value={searchItem}
          className="input"
          placeholder="Type here"
          onChange={(e) => setSearchItem(e.target.value)}
        />
        <img
          className="logo"
          /* src={cross_sign} */
          alt="searchLogo"
          onClick={() => setSearchItem("")}
        />
      </div>
      <ul className={searchItem ? "display" : "display_invise"}>
        {localDisplayItems.map((el) => (
          <Link
            key={el.name}
            to="/marketplace_soket/item"
            onClick={() => setSearchItem("")}
          >
            {" "}
            <div key={el._id} className="item">
              {el.name}
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Search;
