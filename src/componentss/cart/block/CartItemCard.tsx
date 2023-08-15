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

import { Items, TShippingItems } from "../../../redux/types";
import { useAppDispatch } from "../../../redux/hooks";
import {
  synchronizeBasket,
} from "../../../redux/basket/basketSlice";
import { useNavigate } from "react-router-dom";
import { setCurrentItem } from "../../../redux/home/homeSlice";


export default function BasketItemBlock(props: TShippingItems) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function getCurrentItem() {
    dispatch(setCurrentItem(props));
    navigate("/catalog/item");

    const recentlyReviewed = JSON.parse(
      localStorage.getItem("recentlyReviewed") || "{}"
    );

    if (recentlyReviewed !== undefined) {
      const itemIndex = recentlyReviewed.findIndex(
        (item: Items) => item.name === props.name
      );

      if (itemIndex === -1) {
        recentlyReviewed.push(props);
        localStorage.setItem(
          "recentlyReviewed",
          JSON.stringify(recentlyReviewed)
        );
      }
    }
  }


  async function basketItem_APPEND() {
    const basketItems = JSON.parse(localStorage.getItem("basketItems") || "{}");
    if (basketItems !== undefined) {
      const itemIndex = basketItems.findIndex(
        (item: TShippingItems) => item.name === props.name
      );
        console.log(props.fields);
      if (itemIndex !== -1) {
        basketItems[itemIndex] = {
          _id: props._id,
          name: props.name,
          description: props.description,
          category: props.category,
          price: props.price,
          sale: props.sale,
          rating: props.rating,
          image: props.image,
          amount: props.amount + 1,
          fields: props.fields,
        };
        
      }
      else{
        basketItems.push(
          {
            _id: props._id,
            name: props.name,
            description: props.description,
            category: props.category,
            price: props.price,
            sale: props.sale,
            rating: props.rating,
            image: props.image,
            amount: 1,
            fields: props.fields,
          }
        )
      }
    }
    localStorage.setItem("basketItems", JSON.stringify(basketItems));
    console.log(props.quantity);
    
    dispatch(synchronizeBasket());
  }

  async function basketItem_REDUCE() {
    const basketItems = JSON.parse(localStorage.getItem("basketItems") || "{}");
    if (basketItems !== undefined) {
      const itemIndex = basketItems.findIndex(
        (item: TShippingItems) => item.name === props.name
      );

      if (itemIndex !== -1) {
        if (basketItems[itemIndex].amount - 1 !== 0) {
          basketItems[itemIndex] = {
            _id: props._id,
            name: props.name,
            description: props.description,
            category: props.category,
            price: props.price,
            sale: props.sale,
            rating: props.rating,
            image: props.image,
            amount: props.amount - 1,
            fields: props.fields,
          };
          localStorage.setItem("basketItems", JSON.stringify(basketItems));
        } else {
          basketItem_DELETE(basketItems[itemIndex]._id);
        }
      }
    }
    
    dispatch(synchronizeBasket());
  }

  async function basketItem_DELETE(itemId: string) {
    const basketItems = JSON.parse(localStorage.getItem("basketItems") || "{}");
    if (basketItems !== undefined) {
      const itemIndex = basketItems.findIndex(
        (item: TShippingItems) => item._id === props._id
      );
      console.log("itemId " + props._id)
      basketItems.splice(itemIndex, 1);
      localStorage.setItem("basketItems", JSON.stringify(basketItems));
    }
    
    dispatch(synchronizeBasket());
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
        {props.sale ? (
          <img
            style={{
              position: "absolute",
              marginBottom: 425,
              zIndex: 2,
              height: 70,
              width: 70,
            }}
            src="https://www.svgrepo.com/show/250306/percentage-percent.svg"
            alt=""
          />
        ) : (
          <></>
        )}
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
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              flexDirection={"row"}
            >
              <Typography
                paddingLeft={0.3}
                fontSize={22}
                fontFamily={"Comfortaa"}
                color={"error"}
              >
                {props.price} ₴
              </Typography>
            </Box>

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
            <IconButton onClick={basketItem_REDUCE}>
              <RemoveCircleIcon color="info" sx={{ width: 40, height: 40 }} />
            </IconButton>
          </Box>

          <IconButton onClick={() => basketItem_DELETE(props._id)}>
            <DeleteForeverIcon color="error" sx={{ width: 40, height: 40 }} />
          </IconButton>
        </Box>
      </Card>
    </>
  );
}
