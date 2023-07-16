import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFoundPage from "./pages/PageAbsence";
import Catalog from "./pages/home/Catalog";
import { useAppDispatch } from "./redux/hooks";
import "./styles/style.css";
import { checkAuthorization } from "./redux/user/asyncActions";
import { Home } from "./pages/home/Home";
import Footer from "./components/Footer";

function App() {
  
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(checkAuthorization());
  })
  return (
    <>
      {/* <AppBarMenu /> */}
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/catalog" element={<Catalog/>} />
         {/* <Route path="/socketapp/catalog/item" element={<ItemPage />} /> 
         <Route path="/socketapp/catalog/basket" element={<BasketPage />} />  */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
