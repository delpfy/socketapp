import React, { useEffect, useState } from "react";

import {
  Badge,
  Box,
  IconButton,
  Typography,
} from "@mui/material";

import {  useAppDispatch, useAppSelector } from "../../../redux/hooks";

import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LockPersonRoundedIcon from "@mui/icons-material/LockPersonRounded";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import InfoDialog from "../../dialogs/InfoDialog";
import ErrorDialog from "../../dialogs/ErrorDialog";
import LoginDialog from "../../dialogs/LoginDialog";
import LogoutDialog from "../../dialogs/LogoutDialog";
import RegisterDialog from "../../dialogs/RegisterDialog";
import BasketDialog from "../../dialogs/BasketDialog";
import { checkAuthorization } from "../../../redux/user/asyncActions";
import { useNavigate } from "react-router-dom";
import { ShippingItems, ShippingItemsDisplay } from "../../../redux/types";

export const ActionIcons = () => {
  const { user } = useAppSelector((state) => state.user);
  const { isOnItemPage, itemsAmount, items } = useAppSelector((state) => state.basket);
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [cartSelected, setCartSelected] = useState(false);
  const [personSelected, setPersonSelected] = useState(false);

  const [openLogin, setOpenLogin] = useState(false);
 
  const [openError, setOpenError] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [openBasket, setOpenBasket] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string>("Unhandled error");
  const [infoMessage, setInfoMessage] = useState<string>("Some info");


  useEffect(() => {
    closeBasketDialog();
  }, [isOnItemPage]);

  useEffect(() => {dispatch(checkAuthorization())}, [])

  function openBasketDialog() {
    dispatch(checkAuthorization());
    if (user.authorized === true) {
      closeRegDialog();
      closeLoginDialog();
      setOpenBasket(true);
      setCartSelected(true);
      
    } else {
      openLoginDialog();
    }
  }
  function closeBasketDialog() {
    setOpenBasket(false);
    setCartSelected(false);
   
  }
  function openLoginDialog() {
    if (user.authorized === true) {
      navigate('/user')
    } else {
      closeRegDialog();
      setOpenLogin(true);
    }
  }

  function closeRegAfterSuccess() {
    setOpenRegister(false);
    setInfoMessage("Все добре, теперь увійдіть");
    openInfoDialog();
  }

  function openInfoDialog() {
    setOpenInfo(true);
  }

  function closeInfoDialog() {
    setOpenInfo(false);
  }

  


  function closeErrorDialog() {
    setOpenError(false);
  }

  function closeLoginDialog() {
    setOpenLogin(false);
  }

  function closeRegDialog() {
    setOpenRegister(false);
  }




   const Locker = () => {
    if (user.authorized === true) {
     
        return user.avatar === undefined 
        ? <Typography sx = {{color: '#fff'}} fontFamily={'Comfortaa'}>{user.name}</Typography>
        : <img src={user.avatar} alt={user.name} style = {{width: 50, height: 50}}/>
       
    } else {
      return (
        <LockPersonRoundedIcon
          color="warning"
          sx={{
            width: 45,
            height: 45,
          }}
        />
      );
    }
  };

  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        maxWidth={200}
      >
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          maxWidth={180}
        >
          <IconButton onClick={openBasketDialog}>
            {
              

              items.items === undefined
              ? <Badge badgeContent={'пусто'} color="warning">
              <ShoppingCartIcon
                color={cartSelected ? "info" : "warning"}
                sx={{
                  width: 40,
                  height: 40,
                }}
              />
             </Badge>
             : <Badge badgeContent={items.items.length} color="warning">
             <ShoppingCartIcon
               color={cartSelected ? "info" : "warning"}
               sx={{
                 width: 40,
                 height: 40,
               }}
             />
            </Badge>
              
            }
            
          </IconButton>
        </Box>
        <Box>
          <IconButton onClick={openLoginDialog}>
            <Locker />
          </IconButton>
        </Box>
      </Box>

      <LoginDialog
        openLogin={openLogin}
        closeLoginDialog={closeLoginDialog}
        openErrorDialog={setOpenError}
        openRegisterDialog={setOpenRegister}
        openLoginDialog={setOpenLogin}
        setErrorMessage={setErrorMessage}
      />

      

      <ErrorDialog
        openError={openError}
        closeErrorDialog={closeErrorDialog}
        errorMessage={errorMessage}
      />
      <InfoDialog
        openInfo={openInfo}
        closeInfoDialog={closeInfoDialog}
        infoMessage={infoMessage}
      />

      
      <RegisterDialog
        openRegister={openRegister}
        closeRegisterDialog={closeRegDialog}
        openErrorDialog={setOpenError}
        openLoginDialog={openLoginDialog}
        closeRegAfterSuccess={closeRegAfterSuccess}
        setErrorMessage={setErrorMessage}
      />

     

      {/*<Basket Dialog>*/}
      <BasketDialog
        openBasket={openBasket}
        closeBasketDialog={closeBasketDialog}
        user = {user}
       />
      {/*</Basket Dialog>*/}
    </>
  );
};

export default ActionIcons;
