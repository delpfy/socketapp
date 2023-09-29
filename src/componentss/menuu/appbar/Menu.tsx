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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Search from "../search/Search";
import SortBy from "../../sort/SortBy";
import ContactUs from "../ContactUs";
import { checkAuthorization } from "../../../redux/user/asyncActions";
import { Category } from "../../../redux/types";

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
        {CATEGORIES.map((category: Category) => (
          <ListItem key={category._id} disablePadding>
            <ListItemButton onClick={() => handleCategoryChange(category)}>
              <ListItemIcon></ListItemIcon>
              <ListItemText primary={category.name} />
            </ListItemButton>
          </ListItem>
        ))}
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
              xs: '95%',
              sm: '100%',
              md: '95%',
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
            }
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
