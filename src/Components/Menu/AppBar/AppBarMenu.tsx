import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../LogotypeArea/Logo";
import Basket from "../BasketArea/Basket";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { SetCategory} from "../../../redux/home/homeSlice";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from "@mui/material";

type Anchor = "top" | "left" | "bottom" | "right";

export default function AppBarMenu() {
  const CATEGORIES = useAppSelector((state) => state.home.categories);
  const dispatch = useAppDispatch();


  const [active, setActive] = React.useState(false);

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
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {CATEGORIES.map((category) => (
          <ListItem key={category.id} disablePadding>
            <ListItemButton onClick = {() => dispatch(SetCategory(category.name))}>
              <ListItemIcon></ListItemIcon>
              <ListItemText primary={category.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
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

      <Box sx={{ flexGrow: 1 }} position={'sticky'}>
        <AppBar position="static">
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={toggleDrawer("left", true)}
              >
                <MenuIcon />
              </IconButton>
              <Box>
                <Logo />
              </Box>
            </Box>

            <Box>
              <Basket />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
