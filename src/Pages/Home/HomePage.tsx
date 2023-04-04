import React, { useEffect } from "react";

import CatalogField from "../../Components/Catalog/Field/CatalogField";



import "./homepage.scss";
import { useAppDispatch } from "../../redux/hooks";
import { getAllItems } from "../../redux/home/asyncActions";

export const HomePage = () => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllItems());
  }, []);

  return (
    <div className="home_body">
      <CatalogField />
    </div>
  );
};

export default HomePage;
