import React, { useState } from "react";


import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { IBasketItems } from "../../../redux/types";

import {
  SetItemPage, SetItemsAmount,
} from "../../../redux/basket/basketSlice";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import {
  Box,
  ClickAwayListener,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  IconButton,
  Rating,
  Tooltip,
  createTheme,
} from "@mui/material";
import "./basketitem.scss";
import { getItemById } from "../../../redux/home/asyncActions";
import { getBasketItemById } from "../../../redux/basket/asyncActions";
import BasketItemPage from "../../../Pages/Item/BasketItemPage";

export const BasketItemBlock = (props: IBasketItems) => {
  
  const {itemsAmount} = useAppSelector((state) => state.basket)

  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");
  const [maxWidth, setMaxWidth] = React.useState<DialogProps["maxWidth"]>("lg");
  const [openItem, setOpenItem] = React.useState(false);
  const dispatch = useAppDispatch();

  
    
  
 
  const POP_ITEM = (item: IBasketItems) => {};

  const PUSH_ITEM = (item: IBasketItems) => {};

  const REMOVE_ITEM = (id: string) => {};

  function openItemDialog() {
    setOpenItem(true);
  }
  function closeItemDialog() {
    setOpenItem(false);
  }

  // Redirecting to ItemPage
  /* function Redirect() {
    dispatch(SetItemPage(true));
    dispatch(getBasketItemById(props._id));

    console.log("props._id " + props._id);
    navigate("/socketapp/item");
  } */

  return (
    <>
    
      <Card
        sx={{
          maxWidth: 345,
          minHeight: 490,
          maxHeight: 490,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "2%",
        }}
      >
        <CardMedia
          sx={{
            display: "flex",
            maxHeight: 200,
            minHeight: 200,
            objectFit: "contain",
            overflow: "hidden",
          }}
          image={props.image[0]}
          title={props.name}
          onClick={openItemDialog}
        />

        <CardContent sx={{ paddingBottom: 1 }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            minHeight={60}
            maxHeight={60}
            overflow={"hidden"}
            fontFamily={"Comfortaa"}
            textAlign={"justify"}
            paddingBottom={1}
          >
            {props.name}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 0,
            paddingBottom: "16px",
            paddingLeft: "16px",
            paddingRight: "16px",
          }}
        >
          <Box display={"flex"} flexDirection={"column"} width={138}>
            <Typography
              paddingLeft={0.3}
              fontSize={22}
              fontFamily={"Comfortaa"}
              color={"error"}
            >
              {props.price}₴
            </Typography>

            <Rating name="read-only" value={props.rating} readOnly />
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography
                paddingLeft={0.3}
                fontSize={22}
                fontFamily={"Comfortaa"}
              >
                У кошику:
              </Typography>
              <Typography
                paddingLeft={0.3}
                fontSize={22}
                fontFamily={"Comfortaa"}
                color={"error"}
              >
                {props.amount}
              </Typography>
            </Box>
            <Box sx={{ paddingTop: 1 }}>
              <Button
                sx={{
                  width: {
                    xs: 210,
                    md: 225,
                  },
                  fontSize: {
                    xs: 12,
                    md: 14,
                  },
                }}
                variant="contained"
              >
                Оформити замовлення
              </Button>
            </Box>
            {/*  <ClickAwayListener onClickAway={() => setOpen(false)}>
            <Box>
              <Tooltip
                PopperProps={{
                  disablePortal: true,
                }}
                onClose={() => setOpen(false)}
                open={open}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title="You sould be authorized"
              >
                <IconButton sx={{ paddind: 0 }} onClick={() => PutInBasket()}>
                  <AddShoppingCartIcon
                    sx={{ height: 35, width:35 }}
                    color={active ? "secondary" : "disabled"}
                  />
                </IconButton>
              </Tooltip>
            </Box>
          </ClickAwayListener>*/}
          </Box>
        </CardActions>
      </Card>
      <Dialog
        open={openItem}
        onClose={closeItemDialog}
        scroll={scroll}
        maxWidth={maxWidth}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">{props.name}</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            <BasketItemPage {...props} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeItemDialog}>Вийти</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BasketItemBlock;
