import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFoundPage from "./pages/PageAbsence";
import Catalog from "./Pages/Home/Catalog";
import { useAppDispatch } from "./redux/hooks";
import "./styles/style.css";
import { checkAuthorization } from "./redux/user/asyncActions";
import { Home } from "./Pages/Home/Home";
import Footer from "./Components/Footer";

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
