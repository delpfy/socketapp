import * as React from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ScaleIcon from "@mui/icons-material/Scale";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { TShippingItems, Items } from "../../../redux/types";
import { synchronizeBasket } from "../../../redux/basket/basketSlice";
import { useNavigate } from "react-router-dom";
import { getItemReviews } from "../../../redux/review/asyncActions";
import {
  checkItemById,
  deleteItem,
  getItemById,
  getItemsByCategory,
} from "../../../redux/home/asyncActions";
import InfoDialog from "../../dialogs/InfoDialog";
import { useState } from "react";
import {
  setComparisonId,
  setEditItemMode,
  setFavoritesId,
  setSearchedId,
  synchronizeComparison,
  synchronizeFavorites,
} from "../../../redux/home/homeSlice";

export default function HomeCard(props: Items) {
  const { items } = useAppSelector((state) => state.basket);
  const {
    category,
    itemAppendingId,
    itemCompareId,
    itemFavoritesId,
    itemsComparison,
    itemsFavorites,
  } = useAppSelector((state) => state.home);

  const [openInfo, setOpenInfo] = useState(false);
  const [infoMessage, setInfoMessage] = useState<string>("Some info");
  function InfoDialog_open() {
    setOpenInfo(true);
  }

  function InfoDialog_close() {
    dispatch(synchronizeBasket());
    dispatch(synchronizeFavorites());
    dispatch(synchronizeComparison());
    setOpenInfo(false);
  }
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function compareObjects(obj1: any, obj2: any) {
    for (const key in obj1) {
      if (obj1.hasOwnProperty(key)) {
        if (obj1[key] !== obj2[key]) {
          obj2[key] = obj1[key];
        }
      }
    }

    for (const key in obj2) {
      if (obj2.hasOwnProperty(key) && !obj1.hasOwnProperty(key)) {
        delete obj2[key];
      }
    }
  }

  function setAsRecentlyReviewed() {
    const recentlyReviewed = JSON.parse(
      localStorage.getItem("recentlyReviewed") || "{}"
    );

    if (recentlyReviewed !== undefined) {
      const itemIndex = recentlyReviewed.findIndex(
        (item: Items) => item.name === props.name
      );

      if (itemIndex === -1) {
        recentlyReviewed.push(props);
      } else {
        compareObjects(props, recentlyReviewed[itemIndex]);
      }
      localStorage.setItem(
        "recentlyReviewed",
        JSON.stringify(recentlyReviewed)
      );
    }
  }

  function getCurrentItem() {
    dispatch(getItemById(props._id)).then((result: any) => {
      if (result.meta.requestStatus === "fulfilled") {
        dispatch(getItemReviews(props._id)).then((result: any) => {
          if (result.meta.requestStatus === "fulfilled") {
            navigate("/catalog/item");
            setAsRecentlyReviewed();
          }
        });
      }

      if (result.meta.requestStatus === "rejected") {
        setInfoMessage("Такого товару вже нема");
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
  }

  function adjustPrice(item: any) {
    if (item.sale === 0) {
      return item.price;
    } else {
      return item.price - Math.round((item.price * item.sale) / 100);
    }
  }

  async function basketItem_APPEND() {
    dispatch(setSearchedId(props._id));
    dispatch(checkItemById(props._id)).then((result: any) => {
      if (result.meta.requestStatus === "fulfilled") {
        if (result.payload.items.quantity === 0) {
          setInfoMessage("Цей товар закінчився");
          InfoDialog_open();
          return;
        }
        const basketItems = JSON.parse(
          localStorage.getItem("basketItems") || "{}"
        );
        if (basketItems !== undefined) {
          const itemIndex = basketItems.findIndex(
            (item: TShippingItems) => item.name === result.payload.items.name
          );

          if (itemIndex !== -1) {
            localStorage.setItem(
              "basketItems",
              JSON.stringify(
                basketItems.filter((item: any) => item._id !== props._id)
              )
            );
            dispatch(synchronizeBasket());
          } else {
            basketItems.push({
              _id: result.payload.items._id,
              name: result.payload.items.name,
              description: result.payload.items.description,
              category: result.payload.items.category,
              price: adjustPrice(result.payload.items),
              sale: result.payload.items.sale,
              rating: result.payload.items.rating,
              image: result.payload.items.image,
              quantity: result.payload.items.quantity,
              amount: 1,
              fields: result.payload.items.fields,
            });

            localStorage.setItem("basketItems", JSON.stringify(basketItems));
            dispatch(synchronizeBasket());
          }
        }
      }
      if (result.meta.requestStatus === "rejected") {
        setInfoMessage("Такого товару вже нема");
        InfoDialog_open();
        const recentlyReviewed = JSON.parse(
          localStorage.getItem("recentlyReviewed") || "{}"
        );
        const basketItems = JSON.parse(
          localStorage.getItem("basketItems") || "{}"
        );
        const favoriteItems = JSON.parse(
          localStorage.getItem("favoriteItems") || "{}"
        );
        const comparisonItems = JSON.parse(
          localStorage.getItem("comparisonItems") || "{}"
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
        localStorage.setItem(
          "favoriteItems",
          JSON.stringify(
            favoriteItems.filter((item: any) => item._id !== props._id)
          )
        );
        localStorage.setItem(
          "comparisonItems",
          JSON.stringify(
            comparisonItems.filter((item: any) => item._id !== props._id)
          )
        );
      }
    });
  }

  async function favoriteItem_APPEND() {
    dispatch(setFavoritesId(props._id));
    dispatch(checkItemById(props._id)).then((result: any) => {
      if (result.meta.requestStatus === "fulfilled") {
        if (result.payload.items.quantity === 0) {
          setInfoMessage("Цей товар закінчився");
          InfoDialog_open();
          return;
        }
        const favoriteItems = JSON.parse(
          localStorage.getItem("favoriteItems") || "{}"
        );
        if (favoriteItems !== undefined) {
          const itemIndex = favoriteItems.findIndex(
            (item: TShippingItems) => item.name === result.payload.items.name
          );

          if (itemIndex !== -1) {
            localStorage.setItem(
              "favoriteItems",
              JSON.stringify(
                favoriteItems.filter((item: any) => item._id !== props._id)
              )
            );
            dispatch(synchronizeFavorites());
            return;
          } else {
            favoriteItems.push({
              _id: result.payload.items._id,
              name: result.payload.items.name,
              description: result.payload.items.description,
              category: result.payload.items.category,
              price: result.payload.items.price,
              sale: result.payload.items.sale,
              rating: result.payload.items.rating,
              image: result.payload.items.image,
              quantity: result.payload.items.quantity,
              fields: result.payload.items.fields,
            });
          }
        }
        localStorage.setItem("favoriteItems", JSON.stringify(favoriteItems));
        dispatch(synchronizeFavorites());
      }
      if (result.meta.requestStatus === "rejected") {
        setInfoMessage("Такого товару вже нема");
        InfoDialog_open();
        const recentlyReviewed = JSON.parse(
          localStorage.getItem("recentlyReviewed") || "{}"
        );
        const basketItems = JSON.parse(
          localStorage.getItem("basketItems") || "{}"
        );
        const favoriteItems = JSON.parse(
          localStorage.getItem("favoriteItems") || "{}"
        );
        const comparisonItems = JSON.parse(
          localStorage.getItem("comparisonItems") || "{}"
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
        localStorage.setItem(
          "favoriteItems",
          JSON.stringify(
            favoriteItems.filter((item: any) => item._id !== props._id)
          )
        );
        localStorage.setItem(
          "comparisonItems",
          JSON.stringify(
            comparisonItems.filter((item: any) => item._id !== props._id)
          )
        );
      }
    });
  }

  async function comparisonItem_APPEND() {
    dispatch(setComparisonId(props._id));
    dispatch(checkItemById(props._id)).then((result: any) => {
      if (result.meta.requestStatus === "fulfilled") {
        if (result.payload.items.quantity === 0) {
          setInfoMessage("Цей товар закінчився");
          InfoDialog_open();
          return;
        }
        const comparisonItems = JSON.parse(
          localStorage.getItem("comparisonItems") || "{}"
        );
        if (comparisonItems !== undefined) {
          const itemIndex = comparisonItems.findIndex(
            (item: TShippingItems) => item.name === result.payload.items.name
          );

          if (itemIndex !== -1) {
            localStorage.setItem(
              "comparisonItems",
              JSON.stringify(
                comparisonItems.filter((item: any) => item._id !== props._id)
              )
            );
            dispatch(synchronizeComparison());
            return;
          } else {
            comparisonItems.push({
              _id: result.payload.items._id,
              name: result.payload.items.name,
              description: result.payload.items.description,
              category: result.payload.items.category,
              price: result.payload.items.price,
              sale: result.payload.items.sale,
              rating: result.payload.items.rating,
              image: result.payload.items.image,
              quantity: result.payload.items.quantity,
              fields: result.payload.items.fields,
            });
          }
        }
        localStorage.setItem(
          "comparisonItems",
          JSON.stringify(comparisonItems)
        );
        dispatch(synchronizeComparison());
      }
      if (result.meta.requestStatus === "rejected") {
        setInfoMessage("Такого товару вже нема");
        InfoDialog_open();
        const recentlyReviewed = JSON.parse(
          localStorage.getItem("recentlyReviewed") || "{}"
        );
        const basketItems = JSON.parse(
          localStorage.getItem("basketItems") || "{}"
        );
        const favoriteItems = JSON.parse(
          localStorage.getItem("favoriteItems") || "{}"
        );
        const comparisonItems = JSON.parse(
          localStorage.getItem("comparisonItems") || "{}"
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
        localStorage.setItem(
          "favoriteItems",
          JSON.stringify(
            favoriteItems.filter((item: any) => item._id !== props._id)
          )
        );
        localStorage.setItem(
          "comparisonItems",
          JSON.stringify(
            comparisonItems.filter((item: any) => item._id !== props._id)
          )
        );
      }
    });
  }

  return (
    <>
      <>
        <InfoDialog
          openInfo={openInfo}
          InfoDialog_close={InfoDialog_close}
          infoMessage={infoMessage}
        />
        <Box
          sx={{
            maxWidth: 200,
            minWidth: 200,
            minHeight: 320,
            maxHeight: 320,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "11%",
          }}
        >
          <IconButton
            sx={{
              position: "absolute",
              zIndex: 1,
              height: 40,
              width: 40,
              right: 0,
            }}
            onClick={() => comparisonItem_APPEND()}
          >
            {itemCompareId === props._id ? (
              <CircularProgress size={30} />
            ) : (
              <img
                src={require("../../../img/comparisonIconBlack.png")}
                style={{ width: 48, height: 23 }}
                alt="sdf"
              />
            )}
          </IconButton>

          <CardMedia
            component="img"
            sx={{
              maxHeight: 200,
              minHeight: 200,
              objectFit: "contain",
              overflow: "hidden",
            }}
            image={props.image[0]}
            title={props.name}
            onClick={getCurrentItem}
          />

          <CardContent sx={{ paddingLeft: 1.2 }}>
            <Typography
              padding={0}
              minHeight={50}
              maxHeight={50}
              overflow={"hidden"}
              fontSize={16}
              textAlign={"left"}
              marginBottom={3}
            >
              {props.name}
            </Typography>
          </CardContent>
          <CardActions
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              minHeight: "40%",
              maxHeight: "40%",
              paddingTop: 0,
            }}
          >
            <Box
              display={"flex"}
              flexDirection={"column"}
              width={"100%"}
              textAlign={"left"}
              justifyContent={"flex-start"}
            >
              <Typography
                paddingLeft={0.3}
                fontFamily={"Comfortaa"}
                color={props.sale ? "info" : "error"}
                sx={
                  props.sale
                    ? {
                        fontSize: 15,
                        textDecoration: "line-through !important",
                      }
                    : { fontSize: 18, color: "white", userSelect: "none" }
                }
              >
                {props.price + "₴"}
              </Typography>
              <Box
                display={"flex"}
                alignItems={"center"}
                flexDirection={"row"}
                width={"100%"}
                justifyContent={"space-between"}
              >
                <Box
                  display={"flex"}
                  width={"100%"}
                  justifyContent={"center"}
                  flexDirection={"column"}
                >
                  <Box
                    display={"flex"}
                    justifyContent={"flex-end"}
                    flexDirection={"column"}
                    alignItems={"flex-start"}
                  >
                    <Typography
                      paddingLeft={0.3}
                      paddingTop={0}
                      fontSize={18}
                      fontFamily={"Comfortaa"}
                      color={"error"}
                    >
                      {props.sale
                        ? props.price -
                          Math.round((props.price * props.sale) / 100)
                        : props.price}{" "}
                      ₴
                    </Typography>
                  </Box>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"flex-end"}
                  alignItems={"center"}
                  flexDirection={"row"}
                  width={"100%"}
                >
                  <Box
                    display={"flex"}
                    flexDirection={"row"}
                    alignItems={"center"}
                    justifyContent={"space-evenly"}
                    height={30}
                    width={"100%"}
                  >
                    <IconButton
                      sx={{
                        paddingTop: 0,
                        paddingBottom: 0,
                        height: 30,
                        width: 30,
                        transition: "transform 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-3px)",
                        },
                        "&:active": {
                          transform: "translateY(0)",
                        },
                      }}
                      onClick={() => favoriteItem_APPEND()}
                    >
                      {itemFavoritesId === props._id ? (
                        <CircularProgress size={30} />
                      ) : itemsFavorites.findIndex(
                          (item: any) => item._id === props._id
                        ) !== -1 ? (
                        <img
                          src={require("../../../img/favoritesAddedIcon.png")}
                          style={{ width: 24, height: 22 }}
                          alt="sdf"
                        />
                      ) : (
                        <img
                          src={require("../../../img/favoritesIconBlack.png")}
                          style={{ width: 24, height: 22 }}
                          alt="sdf"
                        />
                      )}
                    </IconButton>

                    <IconButton
                      sx={{
                        paddingTop: 0,
                        paddingBottom: 0,
                        height: 30,
                        width: 30,
                        transition: "transform 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-3px)",
                        },
                        "&:active": {
                          transform: "translateY(0)",
                        },
                      }}
                      onClick={() => basketItem_APPEND()}
                    >
                      {itemAppendingId === props._id ? (
                        <CircularProgress size={30} />
                      ) : items.findIndex(
                          (item: any) => item._id === props._id
                        ) !== -1 ? (
                        <img
                          src={require("../../../img/cartAddedIcon.png")}
                          style={{ width: 23, height: 21 }}
                          alt="sdf"
                        />
                      ) : (
                        <img
                          src={require("../../../img/cartIconBlack.png")}
                          style={{ width: 24, height: 22 }}
                          alt="sdf"
                        />
                      )}
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Box>
          </CardActions>
        </Box>
      </>
    </>
  );
}
