import React, { useEffect } from "react";

import { Routes, Route } from "react-router-dom";
import NotFoundPage from "./Pages/NotFound/NotFoundPage";
import HomePage from "./Pages/Home/HomePage";

import { useAppDispatch } from "./redux/hooks";
import "./styles/style.css";
import AppBarMenu from "./Components/Menu/AppBar/AppBarMenu";
import { checkAuthorization } from "./redux/user/asyncActions";
import { TestPage } from "./Pages/Home/TestPage";
import ItemPage from "./Pages/Item/ItemPage";
import BasketPage from "./Pages/Basket/BasketPage";
function App() {
  
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(checkAuthorization());
  })
  return (
    <>
      {/* <AppBarMenu /> */}
      <Routes>
        <Route path="/" element={<TestPage/>} />
        <Route path="/catalog" element={<HomePage/>} />
         {/* <Route path="/socketapp/catalog/item" element={<ItemPage />} /> 
         <Route path="/socketapp/catalog/basket" element={<BasketPage />} />  */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
