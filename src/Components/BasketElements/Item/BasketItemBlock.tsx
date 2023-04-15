import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import cross_sign from "../../../assets/img/cross_sign.png";
import append_icon from "../../../assets/img/append_icon.png";
import reduce_icon from "../../../assets/img/reduce_icon.png";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { IBasketItems, IItems} from "../../../redux/types";
import { SetID, SetCategory } from "../../../redux/home/homeSlice";
import {
  IncExpences,
  DecExpences,
  SetItemPage,
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
  IconButton,
  Rating,
  Tooltip,
  createTheme,
} from "@mui/material";
import "./basketitem.scss";
import { getItemById } from "../../../redux/home/asyncActions";
import { getBasketItemById } from "../../../redux/basket/asyncActions";

export const BasketItemBlock = (props: IBasketItems) => {
  const {items} = useAppSelector((state) => state.basket.items);
  const ITEMS = useAppSelector((state) => state.basket.items);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [images] = useState(props.image);

  const INC_EXPENCES = (price: number) => {
    dispatch(IncExpences(price));
  };

  const DEC_EXPENCES = (price: number) => {
    dispatch(DecExpences(price));
  };


  const POP_ITEM = (item: IBasketItems) => {
    
  };

  const PUSH_ITEM = (item: IBasketItems) => {
    
  };

  const REMOVE_ITEM = (id: string) => {
    
  };

 

  // Redirecting to ItemPage
  function Redirect() {
    dispatch(SetItemPage(true))
    dispatch(getBasketItemById(props._id));
    
    console.log("props._id " + props._id)
    navigate("/socketapp/item");
  }



  

  return (
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
        onClick={() => Redirect()}
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
        <Typography
          variant="body2"
          maxHeight={50}
          minHeight={50}
          color="text.secondary"
          overflow={"hidden"}
          fontFamily={"Comfortaa"}
          textAlign={"justify"}
        >
          {props.description}
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
        <Box display={"flex"} flexDirection={"row"} justifyContent={'space-between'} alignItems={'center'} >
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
        <Box sx = {{paddingTop : 1}}>
        <Button sx = {{ width: {
          xs : 210,
          md : 225
        },
         fontSize : {
          xs : 12,
          md : 14

         }}}  variant="contained">Оформити замовлення</Button>

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
  );
};

export default BasketItemBlock;
