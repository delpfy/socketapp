import React, { useState } from "react";
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
  TextField,
} from "@mui/material";

import { Items, TShippingItems } from "../../../redux/types";
import { useAppDispatch } from "../../../redux/hooks";
import { synchronizeBasket } from "../../../redux/basket/basketSlice";
import { useNavigate } from "react-router-dom";

import { getItemById } from "../../../redux/home/asyncActions";
import { getItemReviews } from "../../../redux/review/asyncActions";
import InfoDialog from "../../dialogs/InfoDialog";

export default function BasketItemBlock(props: TShippingItems) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [openInfo, setOpenInfo] = useState(false);
  const [infoMessage, setInfoMessage] = useState<string>("Some info");

  function InfoDialog_open() {
    setOpenInfo(true);
  }

  function InfoDialog_close() {
    dispatch(synchronizeBasket());
    setOpenInfo(false);
  }

  function getCurrentItem() {
    dispatch(getItemById(props._id)).then((result: any) => {
      if (result.meta.requestStatus === "fulfilled") {
        dispatch(getItemReviews(props._id)).then((result: any) => {
          if (result.meta.requestStatus === "fulfilled") {
            navigate("/catalog/item");
          }
        });
      }
      if (result.meta.requestStatus === "rejected") {
        setInfoMessage("Такого товару вже нема. Його буде видалено");
        InfoDialog_open();
        const recentlyReviewed = JSON.parse(
          localStorage.getItem("recentlyReviewed") || "{}"
        );
        const basketItems = JSON.parse(
          localStorage.getItem("basketItems") || "{}"
        );
        localStorage.setItem(
          "recentlyReviewed",
          JSON.stringify(
            recentlyReviewed.filter((item: any) => item._id !== props._id)
          )
        );
        localStorage.setItem(
          "basketItems",
          JSON.stringify(
            basketItems.filter((item: any) => item._id !== props._id)
          )
        );
      }
    });

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
      if (props.quantity === 0) {
        setInfoMessage("Цей товар закінчився. Його буде видалено");
        InfoDialog_open();
        const basketItems = JSON.parse(
          localStorage.getItem("basketItems") || "{}"
        );
        localStorage.setItem(
          "basketItems",
          JSON.stringify(
            basketItems.filter((item: any) => item._id !== props._id)
          )
        );
        return;
      }
      const itemIndex = basketItems.findIndex(
        (item: TShippingItems) => item.name === props.name
      );
      console.log(props.fields);
      if (itemIndex !== -1) {
        if (basketItems[itemIndex].amount + 1 > props.quantity) {
          setInfoMessage(
            "Кількість товару у кошику перевищує його загальну кількість"
          );
          InfoDialog_open();
          return;
        }
        basketItems[itemIndex] = {
          _id: props._id,
          name: props.name,
          description: props.description,
          category: props.category,
          price: props.price,
          sale: props.sale,
          rating: props.rating,
          quantity: props.quantity,
          image: props.image,
          amount: props.amount + 1,
          fields: props.fields,
        };
      } else {
        basketItems.push({
          _id: props._id,
          name: props.name,
          description: props.description,
          category: props.category,
          price: props.price,
          sale: props.sale,
          quantity: props.quantity,
          rating: props.rating,
          image: props.image,
          amount: 1,
          fields: props.fields,
        });
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
            quantity: props.quantity,
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
      console.log("itemId " + props._id);
      basketItems.splice(itemIndex, 1);
      localStorage.setItem("basketItems", JSON.stringify(basketItems));
    }

    dispatch(synchronizeBasket());
  }
  return (
    <>
      <Box
        sx={{
          maxWidth: "100%",
          minWidth: "100%",
          minHeight: 120,
          maxHeight: 120,
          display: "flex",
          flexDirection: "row", 
          justifyContent: "space-between",
          alignItems: 'center',
          padding: "2%",
          borderBottom: '2px solid black'
        }}
      >
        <CardMedia
          sx={{
            display: "flex",
            maxHeight: 80,
            minHeight: 80,
            maxWidth: 80,
            minWidth: 80,
            objectFit: "contain",
            overflow: "hidden",
            cursor: 'pointer',
          }}
          image={`https://www.sidebyside-tech.com${props.image[0]}`}
          title={props.name}
          onClick={getCurrentItem}
        />

        <CardContent   onClick={getCurrentItem} sx={{ paddingBottom: 1, width: '100%', cursor: 'pointer'}}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            
            fontSize={16}
            overflow={"hidden"}
            fontFamily={"Comfortaa"}
            textAlign={"left"}
            paddingLeft={4}
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
          <Box display={"flex"} height={120} justifyContent={'space-between'} alignItems={'flex-end'} flexDirection={"column"}>
            <IconButton
              sx={{ width: 37, height: 37 }}
              onClick={() => basketItem_DELETE(props._id)}
            >
              <img
                src={require("../../../img/basket/trashIcon.png")}
                style={{ width: 19, height: 25 }}
                alt="sdf"
              />
            </IconButton>
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              width={200}
            >
              <Box
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <IconButton
                  sx={{ width: 37, height: 37 }}
                  onClick={basketItem_REDUCE}
                >
                  <img
                    src={require("../../../img/basket/minusIcon.png")}
                    style={{ width: 15, height: 1.3 }}
                    alt="sdf"
                  />
                </IconButton>

                <Box
                  width={47}
                  height={36}
                  textAlign={"center"}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  sx={{ border: "1px solid black", borderRadius: 1.4 }}
                >
                  {props.amount}
                </Box>

                <IconButton
                  sx={{ width: 37, height: 37 }}
                  onClick={basketItem_APPEND}
                >
                  <img
                    src={require("../../../img/basket/plusIcon.png")}
                    style={{ width: 16, height: 16 }}
                    alt="sdf"
                  />
                </IconButton>
              </Box>

              <Typography
                paddingLeft={0.3}
                fontSize={16}
                fontFamily={"Comfortaa"}
              >
                {props.price} ₴
              </Typography>
            </Box>
          </Box>
          <Box
            display={"flex"}
            width={"80%"}
            alignSelf={"center"}
            justifyContent={"space-between"}
            alignItems={"flex-end"}
            flexDirection={"row"}
          ></Box>
        </CardActions>
      </Box>
      <InfoDialog
        openInfo={openInfo}
        InfoDialog_close={InfoDialog_close}
        infoMessage={infoMessage}
      />
    </>
  );
}
