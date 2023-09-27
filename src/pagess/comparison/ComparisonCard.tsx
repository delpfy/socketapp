import * as React from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  IconButton,
  Paper,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ScaleIcon from "@mui/icons-material/Scale";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { TShippingItems, Items } from "../../redux/types";
import { synchronizeBasket } from "../../redux/basket/basketSlice";
import { useNavigate } from "react-router-dom";
import { getItemReviews } from "../../redux/review/asyncActions";
import {
  checkItemById,
  deleteItem,
  getItemById,
  getItemsByCategory,
} from "../../redux/home/asyncActions";

import { useState } from "react";
import {
  setEditItemMode,
  setSearchedId,
  synchronizeComparison,
  synchronizeFavorites,
} from "../../redux/home/homeSlice";
import InfoDialog from "../../componentss/dialogs/InfoDialog";
import slugify from "slugify";

export default function ComparisonCard(props: Items) {
  const { user } = useAppSelector((state) => state.user);
  const { differencesMode, itemsComparison, itemAppendingId } = useAppSelector(
    (state) => state.home
  );

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
            navigate(`/${slugify(props.category)}/${props.slugString}`);
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
  const font = {
    fontFamily: "Ubuntu",
  };

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
            if (
              basketItems[itemIndex].amount + 1 >
              result.payload.items.quantity
            ) {
              setInfoMessage(
                "Кількість товару у кошику перевищує його загальну кількість"
              );
              InfoDialog_open();
              return;
            }
            basketItems[itemIndex] = {
              _id: result.payload.items._id,
              name: result.payload.items.name,
              description: result.payload.items.description,
              category: result.payload.items.category,
              price: adjustPrice(result.payload.items),
              sale: result.payload.items.sale,
              quantity: result.payload.items.quantity,
              rating: result.payload.items.rating,
              image: result.payload.items.image,
              amount: basketItems[itemIndex].amount + 1,
              fields: result.payload.items.fields,
            };
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
          }
        }
        localStorage.setItem("basketItems", JSON.stringify(basketItems));
        dispatch(synchronizeBasket());
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
    dispatch(setSearchedId(props._id));
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
    dispatch(setSearchedId(props._id));
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
        <Card
          sx={{
            maxWidth: 345,
            minWidth: 345,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "2%",
          }}
        >
          {props.sale ? (
            <img
              style={{ position: "absolute", zIndex: 1, height: 70, width: 70 }}
              src="https://www.svgrepo.com/show/250306/percentage-percent.svg"
              alt=""
            />
          ) : (
            <></>
          )}
          <IconButton
            sx={{
              position: "absolute",
              zIndex: 1,
              height: 50,
              width: 50,
              right: 0,
            }}
            onClick={() => comparisonItem_APPEND()}
          >
            <ScaleIcon
              color={"warning"}
              sx={{
                width: 30,
                height: 30,
              }}
            />
          </IconButton>
          <IconButton
            sx={{
              position: "absolute",
              zIndex: 1,
              height: 50,
              width: 50,
              right: 0,
              top: 80,
            }}
            onClick={() => favoriteItem_APPEND()}
          >
            <FavoriteBorderIcon
              color={"warning"}
              sx={{
                width: 30,
                height: 30,
              }}
            />
          </IconButton>
          <CardMedia
            sx={{
              maxHeight: 200,
              minHeight: 200,
              objectFit: "fill",
              overflow: "hidden",
            }}
            image={props.image[0]}
            title={props.name}
            onClick={getCurrentItem}
          />

          <CardContent sx={{ paddingBottom: 2 }}>
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
              maxHeight={100}
              minHeight={100}
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
                  fontFamily={"Comfortaa"}
                  color={props.sale ? "info" : "error"}
                  sx={
                    props.sale
                      ? {
                          fontSize: 17,
                          textDecoration: "line-through !important",
                        }
                      : { fontSize: 22 }
                  }
                >
                  {props.price} ₴
                </Typography>
                {props.sale ? (
                  <Typography
                    paddingLeft={0.3}
                    fontSize={22}
                    fontFamily={"Comfortaa"}
                    color={"error"}
                  >
                    {props.price - Math.round((props.price * props.sale) / 100)}{" "}
                    ₴
                  </Typography>
                ) : (
                  <></>
                )}
              </Box>

              <Rating name="read-only" value={props.rating} readOnly />
            </Box>

            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"flex-end"}
              flexDirection={"row"}
            >
              <Box>
                <IconButton
                  sx={{ paddind: 0 }}
                  onClick={() => basketItem_APPEND()}
                >
                  {itemAppendingId === props._id ? (
                    <CircularProgress size={20} />
                  ) : (
                    <AddShoppingCartIcon
                      sx={{ height: 35, width: 35 }}
                      color={"disabled"}
                    />
                  )}
                </IconButton>
              </Box>
            </Box>
          </CardActions>
          <TableContainer
            component={Paper}
            sx={{ width: "100%", alignSelf: "center", paddingBottom: 4 }}
          >
            <Table>
              <TableBody>
                {props.fields.map((field: any, index: number) => {
                  return (
                    <TableRow sx={{ height: 75 }}>
                      <TableCell style={font}>
                        {Object.keys(field)[0]}
                      </TableCell>
                      <TableCell>
                        {differencesMode
                          ? itemsComparison.map((item: any) => {
                              console.log(Object.values(item.fields[index])[0]);
                              if (
                                Object.values(item.fields[index])[0] !==
                                Object.values(field)[0]
                              ) {
                                return Object.values(field)[0];
                              }
                            })
                          : (Object.values(field)[0] as string)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </>
    </>
  );
}
