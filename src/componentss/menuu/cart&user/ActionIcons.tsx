import React, { useState } from "react";

import {
  Avatar,
  Badge,
  Box,
  CircularProgress,
  IconButton,
  Link,
  Typography,
  makeStyles,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

import LockPersonRoundedIcon from "@mui/icons-material/LockPersonRounded";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ScaleIcon from "@mui/icons-material/Scale";
import InfoDialog from "../../dialogs/InfoDialog";
import ErrorDialog from "../../dialogs/ErrorDialog";
import LoginDialog from "../../dialogs/LoginDialog";
import RegisterDialog from "../../dialogs/RegisterDialog";
import BasketDialog from "../../dialogs/BasketDialog";
import { useNavigate } from "react-router-dom";
import { checkItemById } from "../../../redux/home/asyncActions";
import { actualizeBasket } from "../../../utils/actuilizeBasket";
import { synchronizeBasket } from "../../../redux/basket/basketSlice";
import {
  synchronizeComparison,
  synchronizeFavorites,
} from "../../../redux/home/homeSlice";
import FavoritesDialog from "../../dialogs/FavoritesDialog";
import ComparisonDialog from "../../dialogs/ComparisonDialog";
import "./iconsStyles.css";

export const ActionIcons = () => {
  const { user, user_status } = useAppSelector((state) => state.user);
  const { items } = useAppSelector((state) => state.basket);
  const { itemsComparison, itemsFavorites } = useAppSelector(
    (state) => state.home
  );
  const [basketLoading, setBasketLoading] = useState(false);
  const [comparisonLoading, setComparisonLoading] = useState(false);
  const [favoritesLoading, setFavoritesLoading] = useState(false);
  const navigate = useNavigate();

  const [cartSelected, setCartSelected] = useState(false);
  const [favoritesSelected, setFavoritesSelected] = useState(false);
  const [comparisonSelected, setComparisonSelected] = useState(false);

  const [openLogin, setOpenLogin] = useState(false);

  const [openError, setOpenError] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [openBasket, setOpenBasket] = useState(false);
  const [openFavorites, setOpenFavorites] = useState(false);
  const [openComparison, setOpenComparison] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string>("Unhandled error");
  const [infoMessage, setInfoMessage] = useState<string>("Some info");
  const dispatch = useAppDispatch();
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

  function FavoritesDialog_open() {
    RegisterDialog_close();
    LoginDialog_close();
    setOpenFavorites(true);
    setFavoritesSelected(true);
  }
  function FavoritesDialog_close() {
    setOpenFavorites(false);
    setFavoritesSelected(false);
  }

  function ComparisonDialog_open() {
    RegisterDialog_close();
    LoginDialog_close();
    setOpenComparison(true);
    setComparisonSelected(true);
  }
  function ComparisonDialog_close() {
    setOpenComparison(false);
    setComparisonSelected(false);
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
    setInfoMessage(
      "На вашу пошту було надіслано повідомлення з підтвердженням"
    );
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
        <img
          src={require("../../../img/userIcon.png")}
          style={{ width: 30, height: 30 }}
          alt="sdf"
        />
      ) : (
        <Avatar
          alt="user_avatar"
          src={user.avatar}
          sx={{ width: 45, height: 45 }}
        />
      );
    } else {
      return user_status === "pending" ? (
        <CircularProgress size={30} />
      ) : (
        <img
          src={require("../../../img/userIcon.png")}
          style={{ width: 30, height: 30 }}
          alt="sdf"
        />
      );
    }
  };

  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"flex-start"}
        alignItems={"center"}
        maxWidth={"80%"}
        sx={{
          paddingRight: {
            xs: '0',
            sm: 7,
            md: 3
          }
        }}
      >
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          
          sx={{
            paddingRight: {
              xs: '0',
              sm: '0',
              md: 8
            }
          }}
          maxWidth={"43%"}
          minWidth={"43%"}
        >
          <>
            <IconButton
            sx={{
              display: {
                xs: 'none',
                sm: 'flex'
              },
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "translateY(-3px)",
              },
              "&:active": {
                transform: "translateY(0)",
              },
            }}
              onClick={() => {
                setComparisonLoading(true);
                const newComparison = JSON.parse(
                  localStorage.getItem("comparisonItems") || "{}"
                );
                const promises = newComparison.map(
                  async (item: any, index: number) => {
                    const resultItem = await dispatch(checkItemById(item._id));
                    if (resultItem.meta.requestStatus === "fulfilled") {
                      actualizeBasket(newComparison, resultItem.payload);
                    }
                    if (resultItem.meta.requestStatus === "rejected") {
                      newComparison.splice(index, 1);
                    }
                  }
                );

                Promise.all(promises).then(() => {
                  localStorage.setItem(
                    "comparisonItems",
                    JSON.stringify(newComparison)
                  );
                  dispatch(synchronizeComparison());
                  setComparisonLoading(false);
                  ComparisonDialog_open();
                });
              }}
            >
              {comparisonLoading ? (
                <CircularProgress size={30} />
              ) : (
                <Badge
                  badgeContent={itemsComparison.length}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  classes={{ badge: "transparent-badge" }}
                >
                  <img
                    src={require("../../../img/comparisonIcon.png")}
                    style={{ width: 26, height: 24 }}
                    alt="sdf"
                  />
                </Badge>
              )}
            </IconButton>
          </>

          <>
            <IconButton
            sx={{
              display: {
                xs: 'none',
                sm: 'flex'
              },
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "translateY(-3px)",
              },
              "&:active": {
                transform: "translateY(0)",
              },
            }}
              onClick={() => {
                setFavoritesLoading(true);
                const newFavorites = JSON.parse(
                  localStorage.getItem("favoriteItems") || "{}"
                );
                const promises = newFavorites.map(
                  async (item: any, index: number) => {
                    const resultItem = await dispatch(checkItemById(item._id));
                    if (resultItem.meta.requestStatus === "fulfilled") {
                      actualizeBasket(newFavorites, resultItem.payload);
                    }
                    if (resultItem.meta.requestStatus === "rejected") {
                      newFavorites.splice(index, 1);
                    }
                  }
                );

                Promise.all(promises).then(() => {
                  localStorage.setItem(
                    "favoriteItems",
                    JSON.stringify(newFavorites)
                  );
                  dispatch(synchronizeFavorites());
                  setFavoritesLoading(false);
                  FavoritesDialog_open();
                });
              }}
            >
              {favoritesLoading ? (
                <CircularProgress size={25} />
              ) : (
                <Badge
                  sx={{ fontSize: 23 }}
                  badgeContent={itemsFavorites.length}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  classes={{ badge: "transparent-badge" }}
                >
                  <img
                    src={require("../../../img/favoritesIcon.png")}
                    style={{ width: 25, height: 23 }}
                    alt="sdf"
                  />
                  {/* <FavoriteBorderIcon
                      color={favoritesSelected ? "info" : "warning"}
                      sx={{
                        width: 30,
                        height: 30,
                      }}
                    /> */}
                </Badge>
              )}
            </IconButton>
          </>

          {window.location.pathname.includes("/order") ? (
            <></>
          ) : (
            <>
              <IconButton
                sx={{
                  
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-3px)",
                  },
                  "&:active": {
                    transform: "translateY(0)",
                  },
                }}
                onClick={() => {
                  setBasketLoading(true);
                  const newBasketItems = JSON.parse(
                    localStorage.getItem("basketItems") || "{}"
                  );
                  const promises = newBasketItems.map(
                    async (item: any, index: number) => {
                      const resultItem = await dispatch(
                        checkItemById(item._id)
                      );
                      if (resultItem.meta.requestStatus === "fulfilled") {
                        actualizeBasket(newBasketItems, resultItem.payload);
                      }
                      if (resultItem.meta.requestStatus === "rejected") {
                        newBasketItems.splice(index, 1);
                      }
                    }
                  );

                  Promise.all(promises).then(() => {
                    localStorage.setItem(
                      "basketItems",
                      JSON.stringify(newBasketItems)
                    );
                    dispatch(synchronizeBasket());
                    setBasketLoading(false);
                    CartDialog_open();
                  });
                }}
              >
                {basketLoading ? (
                  <CircularProgress size={25} />
                ) : (
                  <Badge
                    sx={{ fontFamily: "'Roboto light', sans-serif" }}
                    badgeContent={items.length}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    classes={{ badge: "transparent-badge" }}
                  >
                    <img
                      src={require("../../../img/cartIcon.png")}
                      style={{ width: 25, height: 23 }}
                      alt="sdf"
                    />

                    {/* <ShoppingCartIcon
                        color={cartSelected ? "info" : "warning"}
                        sx={{
                          width: 30,
                          height: 30,
                        }}
                      /> */}
                  </Badge>
                )}
              </IconButton>
            </>
          )}
          <Box sx = {{
            display: {
              xs: 'none',
              sm: 'flex'
            },
          }}>
            <IconButton sx={{
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "translateY(-3px)",
              },
              "&:active": {
                transform: "translateY(0)",
              },
            }} onClick={LoginDialog_open}>
              <Locker />
            </IconButton>
          </Box>
        </Box>
        <Box
          
          justifyContent={"space-between"}
          alignItems={"flex-end"}
          paddingRight={5}
          maxWidth={"40%"}
          minWidth={"40%"}
          sx={{
            display: {
              xs: 'none',
              md: 'flex'
            },
          }}
        >
          <Link href="https://www.facebook.com/">
            <IconButton sx={{
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "translateY(-3px)",
              },
              "&:active": {
                transform: "translateY(0)",
              },
            }}>
              <img
                src={require("../../../img/facebookIcon.png")}
                style={{ width: 13, height: 26 }}
                alt="sdf"
              />
            </IconButton>
          </Link>
          <Link href="https://twitter.com/">
            <IconButton sx={{
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "translateY(-3px)",
              },
              "&:active": {
                transform: "translateY(0)",
              },
            }}>
              <img
                src={require("../../../img/twitterIcon.png")}
                style={{ width: 28, height: 23 }}
                alt="sdf"
              />
            </IconButton>
          </Link>

          <Link href="https://www.linkedin.com">
            <IconButton sx={{
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "translateY(-3px)",
              },
              "&:active": {
                transform: "translateY(0)",
              },
            }}>
              <img
                src={require("../../../img/inIcon.png")}
                style={{ width: 25, height: 23 }}
                alt="sdf"
              />
            </IconButton>
          </Link>

          <Link href="https://www.instagram.com/">
            <IconButton sx={{
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "translateY(-3px)",
              },
              "&:active": {
                transform: "translateY(0)",
              },
            }}>
              <img
                src={require("../../../img/instaIcon.png")}
                style={{ width: 25, height: 23 }}
                alt="sdf"
              />
            </IconButton>
          </Link>
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

      <FavoritesDialog
        openFavorites={openFavorites}
        FavoritesDialog_close={FavoritesDialog_close}
      />

      <ComparisonDialog
        openComparison={openComparison}
        ComparisonDialog_close={ComparisonDialog_close}
      />
    </>
  );
};

export default ActionIcons;
