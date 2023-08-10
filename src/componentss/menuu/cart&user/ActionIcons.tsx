import React, { useEffect, useState } from "react";

import { Avatar, Badge, Box, CircularProgress, IconButton, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

import LockPersonRoundedIcon from "@mui/icons-material/LockPersonRounded";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import InfoDialog from "../../dialogs/InfoDialog";
import ErrorDialog from "../../dialogs/ErrorDialog";
import LoginDialog from "../../dialogs/LoginDialog";
import RegisterDialog from "../../dialogs/RegisterDialog";
import BasketDialog from "../../dialogs/BasketDialog";
import { useNavigate } from "react-router-dom";

export const ActionIcons = () => {
  const { user, user_status} = useAppSelector((state) => state.user);
  const { items } = useAppSelector((state) => state.basket);
  const navigate = useNavigate();

  const [cartSelected, setCartSelected] = useState(false);

  const [openLogin, setOpenLogin] = useState(false);

  const [openError, setOpenError] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [openBasket, setOpenBasket] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string>("Unhandled error");
  const [infoMessage, setInfoMessage] = useState<string>("Some info");

  function CartDialog_open() {
    RegisterDialog_close();
    LoginDialog_close();
    setOpenBasket(true);
    setCartSelected(true);
  }
  function CartDialog_close() {
    setOpenBasket(false);
    setCartSelected(false);
  }
  function LoginDialog_open() {
    if (user.authorized === true) {
      navigate("/user");
    } else {
      RegisterDialog_close();
      setOpenLogin(true);
    }
  }

  function closeRegAfterSuccess() {
    setOpenRegister(false);
    setInfoMessage("Все добре, теперь увійдіть");
    InfoDialog_open();
  }

  function InfoDialog_open() {
    setOpenInfo(true);
  }

  function InfoDialog_close() {
    setOpenInfo(false);
  }

  function ErrorDialog_close() {
    setOpenError(false);
  }

  function LoginDialog_close() {
    setOpenLogin(false);
  }

  function RegisterDialog_close() {
    setOpenRegister(false);
  }

  const Locker = () => {
    if (user.authorized === true) {
      return user.avatar === undefined ? (
        <Typography sx={{ color: "#fff" }} fontFamily={"Comfortaa"}>
          {user.name}
        </Typography>
      ) : (
        <Avatar
          alt="user_avatar"
          src={user.avatar}
          sx={{ width: 50, height: 50 }}
        />
      );
    } else {
      return (
      user_status === "pending"
      ?
      
       <CircularProgress size = {20}/>
      
      :
      
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
          {window.location.pathname.includes("/order") ? (
            <></>
          ) : (
            <>
              <IconButton onClick={CartDialog_open}>
                {items.length === 0 ? (
                  <Badge badgeContent={"пусто"} color="warning">
                    <ShoppingCartIcon
                      color={cartSelected ? "info" : "warning"}
                      sx={{
                        width: 40,
                        height: 40,
                      }}
                    />
                  </Badge>
                ) : (
                  <Badge badgeContent={items.length} color="warning">
                    <ShoppingCartIcon
                      color={cartSelected ? "info" : "warning"}
                      sx={{
                        width: 40,
                        height: 40,
                      }}
                    />
                  </Badge>
                )}
              </IconButton>
            </>
          )}
        </Box>
        <Box>
          <IconButton onClick={LoginDialog_open}>
            <Locker />
          </IconButton>
        </Box>
      </Box>

      <LoginDialog
        openLogin={openLogin}
        LoginDialog_close={LoginDialog_close}
        ErrorDialog_open={setOpenError}
        InfoDialog_open={setOpenInfo}
        RegisterDialog_open={setOpenRegister}
        LoginDialog_open={setOpenLogin}
        setErrorMessage={setErrorMessage}
        setInfoMessage={setInfoMessage}
      />

      <ErrorDialog
        openError={openError}
        ErrorDialog_close={ErrorDialog_close}
        errorMessage={errorMessage}
      />
      <InfoDialog
        openInfo={openInfo}
        InfoDialog_close={InfoDialog_close}
        infoMessage={infoMessage}
      />

      <RegisterDialog
        openRegister={openRegister}
        closeRegisterDialog={RegisterDialog_close}
        ErrorDialog_open={setOpenError}
        LoginDialog_open={LoginDialog_open}
        closeRegAfterSuccess={closeRegAfterSuccess}
        setErrorMessage={setErrorMessage}
      />

      {/*<Basket Dialog>*/}
      <BasketDialog
        openBasket={openBasket}
        CartDialog_close={CartDialog_close}
        user={user}
      />
      {/*</Basket Dialog>*/}
    </>
  );
};

export default ActionIcons;
