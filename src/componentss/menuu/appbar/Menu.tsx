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
import {  useNavigate } from "react-router-dom";
import { getBasketItemsByUser } from "../../../redux/basket/asyncActions";
import { useEffect } from "react";
import Search from "../search/Search";
import SortBy from "../../sort/SortBy";

type Anchor = "top" | "left" | "bottom" | "right";

type Catgory = {
  id: number;
  name: string;
  image: string;
};

export default function AppBarMenu() {
  const CATEGORIES = useAppSelector((state) => state.home.categories);
  const { user } = useAppSelector((state) => state.user);
  const { itemsAmount } = useAppSelector((state) => state.basket);
  const [active, setActive] = React.useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleCategoryChange(category: Catgory) {
    dispatch(SetCategory(category.name));
    navigate("/catalog");
  }

  useEffect(() => {
    dispatch(getBasketItemsByUser(user.id));
  }, [user, itemsAmount]);


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
    <Box
      width={250}
      role="presentation"
      
    >
      <List onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}>
        {CATEGORIES.map((category) => (
          <ListItem key={category.id} disablePadding>
            <ListItemButton onClick={() => handleCategoryChange(category)}>
              <ListItemIcon></ListItemIcon>
              <ListItemText primary={category.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx= {{width: '100%'}}>
          <SortBy/>
          </Box>
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
        zIndex={2}
        sx={{ backgroundColor: "#0c061a", backgroundAttachment: "fixed" }}
      >
        <Box
          width={"95%"}
          height={"90%"}
          margin={"auto"}
          justifySelf={"center"}
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{
                mr: 2,
              }}
              onClick={toggleDrawer("left", true)}
            >
              <MenuIcon
                color="info"
                sx={{
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
          <Box>
            <Basket />
          </Box>
        </Box>
      </Box>
    </>
  );
}
