import * as React from "react";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  SetCategory,
  synchronizeComparison,
  synchronizeFavorites,
} from "../../../redux/home/homeSlice";

import Logo from "../logotype/Logo";
import Basket from "../cart&user/ActionIcons";

import {
  Divider,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Typography,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Search from "../search/Search";
import SortBy from "../../sort/SortBy";
import ContactUs from "../ContactUs";
import { checkAuthorization } from "../../../redux/user/asyncActions";
import { Category } from "../../../redux/types";
import CatalogButton from "../CatalogButton";
import { checkItemById } from "../../../redux/home/asyncActions";
import { actualizeBasket } from "../../../utils/actuilizeBasket";
import ComparisonDialog from "../../dialogs/ComparisonDialog";
import FavoritesDialog from "../../dialogs/FavoritesDialog";

type Anchor = "top" | "left" | "bottom" | "right";

export default function AppBarMenu() {
  const { user } = useAppSelector((state) => state.user);
  const [active, setActive] = useState(false);

  const [openRegister, setOpenRegister] = useState(false);

  const [openFavorites, setOpenFavorites] = useState(false);
  const [openComparison, setOpenComparison] = useState(false);

  const navigate = useNavigate();

  const [openLogin, setOpenLogin] = useState(false);

  const dispatch = useAppDispatch();

  function RegisterDialog_close() {
    setOpenRegister(false);
  }
  function LoginDialog_close() {
    setOpenLogin(false);
  }

  function FavoritesDialog_open() {
    RegisterDialog_close();
    LoginDialog_close();
    setOpenFavorites(true);
  }
  function FavoritesDialog_close() {
    setOpenFavorites(false);
  }

  function ComparisonDialog_open() {
    RegisterDialog_close();
    LoginDialog_close();
    setOpenComparison(true);
  }
  function ComparisonDialog_close() {
    setOpenComparison(false);
  }

  function LoginDialog_open() {
    if (user.authorized === true) {
      navigate("/user");
    } else {
      RegisterDialog_close();
      setOpenLogin(true);
    }
  }

  useEffect(() => {
    dispatch(checkAuthorization());
  }, []);

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setActive(open);
    };

  const list = (anchor: Anchor) => (
    <Box width={250} role="presentation">
      <List
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <Box
          paddingLeft={3}
          marginTop={2}
          paddingBottom={3}
          width={"100%"}
          borderBottom={"1px solid black"}
        >
          <CatalogButton />
        </Box>
        <Box
          paddingLeft={3}
          marginTop={2}
          paddingBottom={2}
          width={"100%"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          borderBottom={"1px solid black"}
        >
          <Link
            marginBottom={2}
            underline="none"
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            minWidth={185}
            maxWidth={185}
            color={"black"}
            onClick={() => {
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

                ComparisonDialog_open();
              });
            }}
          >
            <IconButton
              sx={{
                paddingLeft: 0,
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "translateY(-3px)",
                },
                "&:active": {
                  transform: "translateY(0)",
                },
              }}
            >
              <img
                src={require("../../../img/comparisonBlackIcon.png")}
                style={{ width: 43, height: 23 }}
                alt="sdf"
              />
            </IconButton>
            <Typography fontSize={15} minWidth={130} maxWidth={130}>
              Порівняти товари
            </Typography>
          </Link>

          <Link
            marginBottom={2}
            underline="none"
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            minWidth={185}
            maxWidth={185}
            color={"black"}
            onClick={() => {
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

                FavoritesDialog_open();
              });
            }}
          >
            <IconButton
              sx={{
                paddingLeft: 0,
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "translateY(-3px)",
                },
                "&:active": {
                  transform: "translateY(0)",
                },
              }}
            >
              <img
                src={require("../../../img/favoritesBlackIcon.png")}
                style={{ width: 25, height: 23 }}
                alt="sdf"
              />
            </IconButton>

            <Typography fontSize={15} minWidth={130} maxWidth={130}>
              Обране
            </Typography>
          </Link>

          <Link
            marginBottom={2}
            underline="none"
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            minWidth={185}
            maxWidth={185}
            color={"black"}
            onClick={LoginDialog_open}
          >
            <IconButton
              sx={{
                paddingLeft: 0,
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "translateY(-3px)",
                },
                "&:active": {
                  transform: "translateY(0)",
                },
              }}
            >
              <img
                src={require("../../../img/userBlackIcon.png")}
                style={{ width: 25, height: 25 }}
                alt="sdf"
              />
            </IconButton>

            <Typography fontSize={15} minWidth={130} maxWidth={130}>
              Акаунт
            </Typography>
          </Link>
        </Box>
        <Box
          paddingLeft={3}
          marginTop={2}
          paddingBottom={2}
          width={"100%"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          borderBottom={"1px solid black"}
        >
          <Link
            marginBottom={2}
            underline="none"
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            minWidth={95}
            maxWidth={95}
            color={"black"}
            href="https://www.facebook.com/"
          >
            <IconButton
              sx={{
                paddingLeft: 0,
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "translateY(-3px)",
                },
                "&:active": {
                  transform: "translateY(0)",
                },
              }}
            >
              <img
                src={require("../../../img/facebookBlackIcon.png")}
                style={{ width: 13, height: 26 }}
                alt="sdf"
              />
            </IconButton>
            <Typography fontSize={15} minWidth={50} maxWidth={50}>
              Facebook
            </Typography>
          </Link>

          <Link
            marginBottom={2}
            underline="none"
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            minWidth={95}
            maxWidth={95}
            color={"black"}
            href="https://twitter.com/"
          >
            <IconButton
              sx={{
                paddingLeft: 0,
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "translateY(-3px)",
                },
                "&:active": {
                  transform: "translateY(0)",
                },
              }}
            >
              <img
                src={require("../../../img/twitterBlackIcon.png")}
                style={{ width: 28, height: 23 }}
                alt="sdf"
              />
            </IconButton>

            <Typography fontSize={15} minWidth={50} maxWidth={50}>
              Twitter
            </Typography>
          </Link>

          <Link
            marginBottom={2}
            underline="none"
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            minWidth={95}
            maxWidth={95}
            color={"black"}
            href="https://www.linkedin.com"
          >
            <IconButton
              sx={{
                paddingLeft: 0,
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "translateY(-3px)",
                },
                "&:active": {
                  transform: "translateY(0)",
                },
              }}
            >
              <img
                src={require("../../../img/inBlackIcon.png")}
                style={{ width: 25, height: 23 }}
                alt="sdf"
              />
            </IconButton>

            <Typography fontSize={15} minWidth={50} maxWidth={50}>
              LinkedIn
            </Typography>
          </Link>

          <Link
            marginBottom={2}
            underline="none"
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            minWidth={95}
            maxWidth={95}
            color={"black"}
            href="https://www.instagram.com/"
          >
            <IconButton
              sx={{
                paddingLeft: 0,
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "translateY(-3px)",
                },
                "&:active": {
                  transform: "translateY(0)",
                },
              }}
            >
              <img
                src={require("../../../img/instaBlackIcon.png")}
                style={{ width: 24, height: 23 }}
                alt="sdf"
              />
            </IconButton>
            <Typography fontSize={15} minWidth={50} maxWidth={50}>
              Instagram
            </Typography>
          </Link>
        </Box>
        <Box
          paddingLeft={3}
          marginTop={2}
          paddingBottom={2}
          width={"100%"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          borderBottom={"1px solid black"}
        >
          <Typography fontSize={17} fontWeight={"bold"} paddingBottom={2}>
            Компанія
          </Typography>
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
            marginTop={2}
          >
            <Typography
              sx={{
                paddingBottom: 2,
              }}
              fontFamily={"Comfortaa"}
              onClick={() => navigate("/about")}
            >
              О компанії
            </Typography>
            <Typography
              sx={{
                paddingBottom: 2,
              }}
              fontFamily={"Comfortaa"}
              onClick={() => navigate("/posts")}
            >
              Статті
            </Typography>
            <Typography
              sx={{
                paddingBottom: 2,
              }}
              fontFamily={"Comfortaa"}
              onClick={() => navigate("/contact")}
            >
              Контакти
            </Typography>
          </Box>
        </Box>
        <Box
          paddingLeft={3}
          marginTop={2}
          paddingBottom={2}
          width={"100%"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
        >
          <Typography fontSize={17} fontWeight={"bold"} paddingBottom={2}>
            Покупцям
          </Typography>
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
            marginTop={2}
          >
            <Typography
              sx={{
                paddingBottom: 2,
              }}
              fontFamily={"Comfortaa"}
              onClick={() => navigate("/return")}
            >
              Повернення товару
            </Typography>
            <Typography
              sx={{
                paddingBottom: 2,
              }}
              fontFamily={"Comfortaa"}
              onClick={() => navigate("/delivery")}
            >
              Доставка
            </Typography>

            <Typography
              sx={{
                paddingBottom: 2,
              }}
              fontFamily={"Comfortaa"}
              onClick={() => navigate("/quarantees")}
            >
              Гарантії
            </Typography>
          </Box>
        </Box>
      </List>
      {/* <Divider />
      <Box sx={{ width: "100%" }}>
        {window.location.pathname.includes("/catalog") &&
        !window.location.pathname.includes("/catalog/item") ? (
          <SortBy />
        ) : (
          <></>
        )}
      </Box> */}
      <List></List>
    </Box>
  );

  return (
    <>
      <FavoritesDialog
        openFavorites={openFavorites}
        FavoritesDialog_close={FavoritesDialog_close}
      />

      <ComparisonDialog
        openComparison={openComparison}
        ComparisonDialog_close={ComparisonDialog_close}
      />
      <React.Fragment>
        <SwipeableDrawer
          anchor={"left"}
          open={active}
          onClose={toggleDrawer("left", false)}
          onOpen={toggleDrawer("left", true)}
        >
          {list("left")}
        </SwipeableDrawer>
      </React.Fragment>

      <Box
        width={"100%"}
        position={"fixed"}
        margin={0}
        zIndex={2}
        sx={{ backgroundColor: "black", backgroundAttachment: "fixed" }}
      >
        <Box
          height={"90%"}
          sx={{
            width: {
              xs: "95%",
              sm: "100%",
              md: "95%",
            },
            margin: {
              xs: "0 auto",
              sm: "0",
              md: "0 auto",
            },
            justifyContent: {
              xs: "space-between",
              sm: "space-evenly",
              md: "space-between",
            },
          }}
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
        >
          <Box
            display={"flex"}
            sx={{
              width: {
                xs: "15%",
                sm: "15%",
                md: "23%",
              },
              margin: {
                xs: "0 auto",
                sm: 0,
                md: 0,
              },
              justifyContent: {
                xs: "center",
                md: "space-evenly",
              },
            }}
            flexDirection={"row"}
            alignItems={"center"}
          >
            <IconButton
              size="large"
              edge="start"
              aria-label="menu"
              sx={{ display: { xs: "flex", md: "none" } }}
              onClick={toggleDrawer("left", true)}
            >
              <MenuIcon
                color="info"
                sx={{
                  color: "white",
                  height: 35,
                  width: 35,
                }}
              />
            </IconButton>
            <Box>
              <Logo />
            </Box>
          </Box>
          <Box
            sx={{
              display: {
                xs: "none",
                sm: "none",
                md: "flex",
              },
            }}
          >
            <CatalogButton />
          </Box>

          <Search />
          <Box
            display={"flex"}
            sx={{
              width: {
                xs: "15%",
                md: "32%",
              },
            }}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"space-evenly"}
          >
            {/* <ContactUs/> */}

            <Basket />
          </Box>
        </Box>
      </Box>
    </>
  );
}
