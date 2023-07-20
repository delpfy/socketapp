import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFoundPage from "./pagess/PageAbsence";
import Catalog from "./pagess/Home/Catalog";
import { useAppDispatch } from "./redux/hooks";
import "./styles/style.css";
import { checkAuthorization } from "./redux/user/asyncActions";
import { Home } from "./pagess/Home/Home";
import Footer from "./componentss/Footer";
import ItemPage from "./pagess/items/CatalogItemPage";
import AppBarMenu from "./componentss/menuu/appbar/Menu";

function App() {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(checkAuthorization());
    if (!localStorage.getItem("recentlyReviewed")) {
      localStorage.setItem(
        "recentlyReviewed",
        JSON.stringify([[]])
      );
    }
  }, []);
  return (
    <>
      <AppBarMenu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/item" element={<ItemPage />} />
        {/*  <Route path="/socketapp/catalog/basket" element={<BasketPage />} />   */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
