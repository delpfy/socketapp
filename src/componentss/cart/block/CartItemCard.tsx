import React from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  Box,
  Typography,
  CardMedia,
  CardContent,
  CardActions,
  Card,
  Rating,
  IconButton,
} from "@mui/material";

import { ShippingItems } from "../../../redux/types";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { addBasketItem, deleteBasketItem, removeBasketItem } from "../../../redux/basket/asyncActions";
import { SetItemsAmount } from "../../../redux/basket/basketSlice";
import { useNavigate } from "react-router-dom";
import { setCurrentItem } from "../../../redux/home/homeSlice";

export const BasketItemBlock = (props: ShippingItems) => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.user);
  const { itemsAmount } = useAppSelector((state) => state.basket);

  const navigate = useNavigate();


  function getCurrentItem(){
    dispatch(setCurrentItem(props))
    navigate('/catalog/item');
  }


  async function basketItem_APPEND() {
    await dispatch(
      addBasketItem({
        _id: user.id,
        name: props.name,
        description: props.description,
        category: props.category,
        price: props.price,
        rating: props.rating,
        image: props.image,
        amount: 1,
      } as ShippingItems)
    );

    dispatch(SetItemsAmount(itemsAmount + 1));
  }

  async function basketItem_REDUCE() {
    await dispatch(
      removeBasketItem({
        _id: props._id,
        name: props.name,
        description: props.description,
        category: props.category,
        price: props.price,
        rating: props.rating,
        image: props.image,
        amount: props.amount,
      } as ShippingItems)
    );

    dispatch(SetItemsAmount(itemsAmount - 1));
  }

  async function basketItem_DELETE() {
    await dispatch(
      deleteBasketItem({
        _id: props._id,
        name: props.name,
        description: props.description,
        category: props.category,
        price: props.price,
        rating: props.rating,
        image: props.image,
        amount: props.amount,
      } as ShippingItems)
    );

    dispatch(SetItemsAmount(itemsAmount - props.amount));
  }
  return (
    <>
      <Card
        sx={{
          maxWidth: 345,
          minHeight: 490,
          maxHeight: 490,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
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
          onClick={getCurrentItem}
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
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 0,
            paddingBottom: "16px",
            paddingLeft: "16px",
            paddingRight: "16px",
          }}
        >
          <Box display={"flex"} flexDirection={"column"}>
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
          </Box>
        </CardActions>
        <Box
          display={"flex"}
          width={"80%"}
          alignSelf={"center"}
          justifyContent={"space-between"}
          alignItems={"flex-end"}
          flexDirection={"row"}
        >
          <Box
            display={"flex"}
            width={"55%"}
            justifyContent={"space-between"}
            alignItems={"flex-end"}
            flexDirection={"row"}
          >
            <IconButton onClick={basketItem_APPEND}>

              <AddCircleIcon color="info" sx={{ width: 40, height: 40 }} />

            </IconButton>
            <IconButton onClick = {basketItem_REDUCE}>
              <RemoveCircleIcon color="info" sx={{ width: 40, height: 40 }} />
            </IconButton>
          </Box>

          <IconButton onClick={basketItem_DELETE}>
            <DeleteForeverIcon color="error" sx={{ width: 40, height: 40 }} />
          </IconButton>
        </Box>
      </Card>

    </>
  );
};

export default BasketItemBlock;
