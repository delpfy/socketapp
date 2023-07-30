import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import NotFoundPage from "./pagess/PageAbsence";
import Catalog from "./pagess/Home/Catalog";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import "./styles/style.css";
import { checkAuthorization } from "./redux/user/asyncActions";
import { Home } from "./pagess/Home/Home";
import Footer from "./componentss/Footer";
import ItemPage from "./pagess/items/CatalogItemPage";
import AppBarMenu from "./componentss/menuu/appbar/Menu";
import User from "./pagess/user/User";
import OrderPage from "./pagess/order/OrderPage";
import { synchronizeBasket } from "./redux/basket/basketSlice";

function App() {
  const dispatch = useAppDispatch();
  if (!localStorage.getItem("recentlyReviewed")) {
    localStorage.setItem(
      "recentlyReviewed",
      JSON.stringify([])
    );
  }
  if (!localStorage.getItem("basketItems")) {
    localStorage.setItem(
      "basketItems",
      JSON.stringify([])
    );
  }

  useEffect(() => {
    dispatch(checkAuthorization());
  }, []);

  React.useEffect(() => {
    dispatch(synchronizeBasket());
  }, [dispatch, JSON.parse(localStorage.getItem("basketItems") || "{}")]);
  return (
    <>
      <AppBarMenu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/item" element={<ItemPage />} />
        <Route path="/user" element={<User />} />
        <Route path="/order" element={<OrderPage />} />
        {/*  <Route path="/socketapp/catalog/basket" element={<BasketPage />} />   */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
