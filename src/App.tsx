import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import NotFoundPage from "./pagess/PageAbsence";
import Catalog from "./pagess/Home/Catalog";
import { useAppDispatch } from "./redux/hooks";
import "./styles/style.css";
import { checkAuthorization } from "./redux/user/asyncActions";
import { Home } from "./pagess/Home/Home";
import ItemPage from "./pagess/items/CatalogItemPage";
import User from "./pagess/user/User";
import OrderPage from "./pagess/order/Checkout";
import { synchronizeBasket } from "./redux/basket/basketSlice";
import About from "./pagess/footerPages/About";
import Return from "./pagess/footerPages/Return";
import DeliveryInfo from "./pagess/footerPages/DeliveryInfo";
import Posts from "./pagess/footerPages/Posts";
import PostPage from "./pagess/footerPages/PostPage";
import AddPostPage from "./pagess/footerPages/AddPostPage";
import Contact from "./pagess/footerPages/Contact";
import AddItem from "./pagess/items/AddItem";
import UserOrder from "./pagess/order/UserOrder";
import ConfirmEmail from "./pagess/ConfirmEmail";
import Layout from "./componentss/Layout";
import Guarantees from "./pagess/footerPages/Guarantees";
import { synchronizeComparison, synchronizeFavorites } from "./redux/home/homeSlice";
import { getAllItems } from "./redux/home/asyncActions";
import ComputerPartsSubcategory from "./pagess/subcategories/ComputerPartsSubcategory";
import GamingSubcategory from "./pagess/subcategories/GamingSubcategory";
import ReviewsPage from "./pagess/items/ReviewsPage";
import AdminPage from "./pagess/admin/AdminPage";
import AdminAuthorize from "./pagess/admin/AdminAuthorize";
import { getAllCategories } from "./redux/admin/asyncActions";
import ShowSubcategories from "./pagess/subcategories/ShowSubcategories";

function App() {
  const dispatch = useAppDispatch();
  if (!localStorage.getItem("recentlyReviewed")) {
    localStorage.setItem("recentlyReviewed", JSON.stringify([]));
  }
  if (!localStorage.getItem("basketItems")) {
    localStorage.setItem("basketItems", JSON.stringify([]));
  }
  if (!localStorage.getItem("favoriteItems")) {
    localStorage.setItem("favoriteItems", JSON.stringify([]));
  }
  if (!localStorage.getItem("comparisonItems")) {
    localStorage.setItem("comparisonItems", JSON.stringify([]));
  }

  useEffect(() => {
    dispatch(getAllItems());
    dispatch(checkAuthorization());
    dispatch(getAllCategories()).then((result: any) => {
      if(result.meta.requestStatus === 'fulfilled'){
        
      }
    })
  }, []);
 
  
  React.useEffect(() => {
    dispatch(synchronizeBasket());
    dispatch(synchronizeFavorites());
    dispatch(synchronizeComparison());
  }, [dispatch]);
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />

          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin-auth" element={<AdminAuthorize />} />


          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/item" element={<ItemPage />} />
          <Route path="/catalog/item/reviews" element={<ReviewsPage />} />
          <Route path="/computer-compl" element={<ComputerPartsSubcategory />} />
          <Route path="/gaming-compl" element={<GamingSubcategory />} />
          <Route path="/subcategories" element={<ShowSubcategories />} />
          
          <Route path="/add-item" element={<AddItem />} />

          <Route path="/user" element={<User />} />
          <Route path="/user-order" element={<UserOrder />} />
          <Route path="/confirm-email/:token" element={<ConfirmEmail />} />

          <Route path="/order" element={<OrderPage />} />

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/return" element={<Return />} />
          <Route path="/delivery" element={<DeliveryInfo />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/post" element={<PostPage />} />
          <Route path="/addpost" element={<AddPostPage />} />
          <Route path="/quarantees" element={<Guarantees />} />

          

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
