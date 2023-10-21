import * as React from "react";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { SetCategory } from "../../../redux/home/homeSlice";

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
import { useEffect } from "react";
import Search from "../search/Search";
import SortBy from "../../sort/SortBy";
import ContactUs from "../ContactUs";
import { checkAuthorization } from "../../../redux/user/asyncActions";
import { Category } from "../../../redux/types";
import CatalogButton from "../CatalogButton";

type Anchor = "top" | "left" | "bottom" | "right";

export default function AppBarMenu() {
  const CATEGORIES = useAppSelector((state) => state.home.categories);
  const [active, setActive] = React.useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleCategoryChange(category: Category) {
    dispatch(SetCategory(category.name));
    navigate(`/${category.slugString}`);
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
