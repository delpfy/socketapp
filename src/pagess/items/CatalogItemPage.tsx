import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Carousel from "react-material-ui-carousel";
import { TShippingItems, Status } from "../../redux/types";

import {
  Box,
  Breadcrumbs,
  Button,
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
  Link,
} from "@mui/material";
import { NotFoundPage } from "../PageAbsence";
import {
  setAfterOrder,
  synchronizeBasket,
} from "../../redux/basket/basketSlice";
import InfoDialog from "../../componentss/dialogs/InfoDialog";
import { useNavigate, useParams } from "react-router-dom";
import Review from "../../componentss/reviews/Review";
import ReviewForm from "../../componentss/reviews/ReviewForm";
import {
  setReviewsAmount,
  setRatingAmount,
} from "../../redux/review/reviewSlice";
import LoadingPage from "../LoadingPage";
import {
  SetCategory,
  SetCategorySlug,
  setComparisonId,
  setEditItemMode,
  setFavoritesId,
  setSearchedId,
  synchronizeComparison,
  synchronizeFavorites,
} from "../../redux/home/homeSlice";
import {
  checkItemById,
  deleteItem,
  getCategoryBySlug,
  getItemById,
  getItemBySlug,
  getItemsByCategory,
} from "../../redux/home/asyncActions";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { getItemReviews } from "../../redux/review/asyncActions";
import CategoryItems from "../../componentss/CategoryItems";
import slugify from "slugify";

export const ItemPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { item_slug } = useParams();
  const { category_slug } = useParams();

  const {
    category,
    subcategory,
    itemAppendingId,
    itemCurrent,
    item_status,
    editItemMode,
    itemsComparison,
    itemsFavorites,
  } = useAppSelector((state) => state.home);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getCategoryBySlug(category_slug as string)).then((result: any) => {
      if (result.meta.requestStatus === "fulfilled") {
        console.log(result.payload);
        dispatch(SetCategory(result.payload.name));
        dispatch(SetCategorySlug(category_slug as string));
        dispatch(getItemsByCategory(result.payload.name));
      }
    });
    dispatch(getItemBySlug(item_slug as string)).then((result: any) => {
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
            recentlyReviewed.filter(
              (item: any) => item._id !== itemCurrent.items._id
            )
          )
        );
        localStorage.setItem(
          "basketItems",
          JSON.stringify(
            basketItems.filter(
              (item: any) => item._id !== itemCurrent.items._id
            )
          )
        );
      }
    });
    if (afterOrder) {
      dispatch(synchronizeBasket());
      dispatch(setAfterOrder(false));
    }
    if (editItemMode) {
      dispatch(setEditItemMode(false));
    }
  }, [dispatch]);

  const { afterOrder, items } = useAppSelector((state) => state.basket);

  const attributesRef = useRef<HTMLDivElement | null>(null);

  const executeScroll = () => {
    if (attributesRef.current) {
      attributesRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };
  const { user } = useAppSelector((state) => state.user);

  const [openInfo, setOpenInfo] = useState(false);
  const [infoMessage, setInfoMessage] = useState<string>("Some info");

  function InfoDialog_open() {
    setOpenInfo(true);
  }

  function InfoDialog_close() {
    setOpenInfo(false);
  }

  function adjustPrice() {
    if (itemCurrent.items.sale === 0) {
      return itemCurrent.items.price;
    } else {
      return (
        itemCurrent.items.price -
        Math.round((itemCurrent.items.price * itemCurrent.items.sale) / 100)
      );
    }
  }

  async function basketItem_APPEND() {
    dispatch(setSearchedId(itemCurrent.items._id));

    if (itemCurrent.items.quantity === 0) {
      setInfoMessage("Цей товар закінчився");
      InfoDialog_open();
      return;
    }
    const basketItems = JSON.parse(localStorage.getItem("basketItems") || "{}");
    if (basketItems !== undefined) {
      const itemIndex = basketItems.findIndex(
        (item: TShippingItems) => item.name === itemCurrent.items.name
      );

      if (itemIndex !== -1) {
        localStorage.setItem(
          "basketItems",
          JSON.stringify(
            basketItems.filter(
              (item: any) => item._id !== itemCurrent.items._id
            )
          )
        );
        dispatch(synchronizeBasket());
      } else {
        basketItems.push({
          _id: itemCurrent.items._id,
          name: itemCurrent.items.name,
          description: itemCurrent.items.description,
          category: itemCurrent.items.category,
          price: adjustPrice(),
          sale: itemCurrent.items.sale,
          rating: itemCurrent.items.rating,
          image: itemCurrent.items.image,
          quantity: itemCurrent.items.quantity,
          amount: 1,
          fields: itemCurrent.items.fields,
        });

        localStorage.setItem("basketItems", JSON.stringify(basketItems));
        dispatch(synchronizeBasket());
      }
    }
  }

  async function favoriteItem_APPEND() {
    dispatch(setFavoritesId(itemCurrent.items._id));

    if (itemCurrent.items.quantity === 0) {
      setInfoMessage("Цей товар закінчився");
      InfoDialog_open();
      return;
    }
    const favoriteItems = JSON.parse(
      localStorage.getItem("favoriteItems") || "{}"
    );
    if (favoriteItems !== undefined) {
      const itemIndex = favoriteItems.findIndex(
        (item: TShippingItems) => item.name === itemCurrent.items.name
      );

      if (itemIndex !== -1) {
        localStorage.setItem(
          "favoriteItems",
          JSON.stringify(
            favoriteItems.filter(
              (item: any) => item._id !== itemCurrent.items._id
            )
          )
        );
        dispatch(synchronizeFavorites());
        return;
      } else {
        favoriteItems.push({
          _id: itemCurrent.items._id,
          name: itemCurrent.items.name,
          description: itemCurrent.items.description,
          category: itemCurrent.items.category,
          price: itemCurrent.items.price,
          sale: itemCurrent.items.sale,
          rating: itemCurrent.items.rating,
          image: itemCurrent.items.image,
          quantity: itemCurrent.items.quantity,
          fields: itemCurrent.items.fields,
        });
      }
    }
    localStorage.setItem("favoriteItems", JSON.stringify(favoriteItems));
    dispatch(synchronizeFavorites());
  }

  async function comparisonItem_APPEND() {
    dispatch(setComparisonId(itemCurrent.items._id));

    if (itemCurrent.items.quantity === 0) {
      setInfoMessage("Цей товар закінчився");
      InfoDialog_open();
      return;
    }
    const comparisonItems = JSON.parse(
      localStorage.getItem("comparisonItems") || "{}"
    );
    if (comparisonItems !== undefined) {
      const itemIndex = comparisonItems.findIndex(
        (item: TShippingItems) => item.name === itemCurrent.items.name
      );

      if (itemIndex !== -1) {
        localStorage.setItem(
          "comparisonItems",
          JSON.stringify(
            comparisonItems.filter(
              (item: any) => item._id !== itemCurrent.items._id
            )
          )
        );
        dispatch(synchronizeComparison());
        return;
      } else {
        comparisonItems.push({
          _id: itemCurrent.items._id,
          name: itemCurrent.items.name,
          description: itemCurrent.items.description,
          category: itemCurrent.items.category,
          price: itemCurrent.items.price,
          sale: itemCurrent.items.sale,
          rating: itemCurrent.items.rating,
          image: itemCurrent.items.image,
          quantity: itemCurrent.items.quantity,
          fields: itemCurrent.items.fields,
        });
      }
    }
    localStorage.setItem("comparisonItems", JSON.stringify(comparisonItems));
    dispatch(synchronizeComparison());
  }

  function RedirectToReviews() {
    dispatch(getItemReviews(itemCurrent.items._id)).then((result: any) => {
      if (result.meta.requestStatus === "fulfilled") {
        navigate(
          `/${slugify(itemCurrent.items.category)}/${
            itemCurrent.items.slugString
          }/reviews`
        );
      }
    });
  }
  const Item = () => {
    return (
      <>
        {/* <Button
          sx={{ fontFamily: "Comfortaa", marginTop: 15, fontSize: 15 }}
          onClick={handleBackToCatalog}
          variant="contained"
        >
          Каталог
        </Button> */}

        <Box
          width={"85%"}
          alignSelf={"flex-end"}
          marginBottom={3}
          paddingTop={12}
          marginLeft={"auto"}
          marginRight={"auto"}
          paddingBottom={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",
            borderBottom: "2px solid black",
          }}
        >
          <Breadcrumbs aria-label="breadcrumb">
            <Link fontSize={20} underline="hover" color="inherit" href="/">
              Головна
            </Link>
            {subcategory === "" ? (
              <Link
                fontSize={20}
                underline="hover"
                color="inherit"
                href={`/${slugify(category)}`}
              >
                {category}
              </Link>
            ) : (
              <>
                <Link
                  fontSize={20}
                  underline="hover"
                  color="inherit"
                  href={`/${slugify(category)}/subcategories`}
                >
                  {category}
                </Link>
                <Link
                  fontSize={20}
                  underline="hover"
                  color="inherit"
                  href={`/${slugify(subcategory)}`}
                >
                  {subcategory}
                </Link>
              </>
            )}
            <Link
            fontSize={20}
            underline="hover"
            color="inherit"
            
          >
            {itemCurrent.items.name}
          </Link>
          </Breadcrumbs>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: {
                xs: "100%",
                md: 350,
              },
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 3,
            }}
          >
            <Typography
              sx={{ cursor: "pointer" }}
              variant={"h3"}
              fontSize={16}
              fontFamily={"Comfortaa"}
            >
              Все про товар
            </Typography>
            <Typography
              sx={{ cursor: "pointer" }}
              variant={"h3"}
              fontSize={16}
              fontFamily={"Comfortaa"}
              onClick={() => executeScroll()}
            >
              Характеристики
            </Typography>
            <Typography
              sx={{ cursor: "pointer" }}
              variant={"h3"}
              fontSize={16}
              fontFamily={"Comfortaa"}
              onClick={RedirectToReviews}
            >
              Відгуки
            </Typography>
          </Box>
        </Box>
        <Box
          width={"87%"}
          height={"100%"}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"flex-start"}
          sx={{
            flexDirection: {
              xs: "column",
              md: "row",
            },
          }}
          margin={"0 auto"}
        >
          <Box margin={"0 auto"}>
            <Carousel
              sx={{
                marginRight: {
                  xs: "auto",
                  md: 7,
                },
                marginLeft: "auto",
                width: {
                  xs: window.innerWidth - 70,
                  md: 555,
                },

                height: {
                  xs: 450,
                  md: 550,
                },

                display: "flex",
                alignContent: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              {itemCurrent.items.image.map((url: string) => {
                return (
                  <Box margin={"0 auto"}>
                    <img
                      src={`https://enthusiastic-pear-scarf.cyclic.app${url}`}
                      /* src={itemCurrent.items.image[0]} */
                      alt="img1"
                      style={{
                        width: "100%",
                        height: 500,
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                );
              })}

              {/* <Box display = {'flex'} justifyContent={'center'} alignItems={'center'} width={400}>
          <img src={itemCurrent.items.image[1]} style={{display : 'flex', objectFit: 'contain'}}/>
        </Box>
        <Box display = {'flex'} justifyContent={'center'} alignItems={'center'} width={400}>
          <img src={itemCurrent.items.image[2]} style={{display : 'flex', objectFit: 'contain'}}/>
        </Box> */}
            </Carousel>
          </Box>

          <Box
            display={"flex"}
            sx={{
              width: {
                xs: "100%",
                md: "50%",
              },
            }}
            flexDirection={"column"}
            alignItems={"left"}
          >
            <Typography
              fontFamily={"Comfortaa"}
              sx={{ paddingLeft: 0.3, paddingBottom: 2 }}
              fontSize={25}
            >
              {itemCurrent.items.name}
            </Typography>
            <Rating
              name="read-only"
              value={itemCurrent.items.rating}
              sx={{ color: "black", paddingBottom: 2 }}
              readOnly
            />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-start",
                border: "2px solid black",
                borderRadius: 1.5,
                marginBottom: 3,
                marginLeft: {
                  xs: "auto",
                  md: 0,
                },
                marginRight: {
                  xs: "auto",
                  md: 0,
                },
                width: "100%",
                height: 200,
              }}
            >
              <Box width={"100%"}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    borderBottom: "2px solid black",

                    padding: 2,
                  }}
                >
                  <Typography
                    width={window.innerWidth > 1024 ? 206 : 155}
                    fontSize={window.innerWidth > 1024 ? 17 : 13}
                    alignItems={"flex-end"}
                    display={"flex"}
                    justifyContent={"space-between"}
                  >
                    Продавець:{" "}
                    <Box
                      flexDirection={"row"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      color={"black"}
                      /* paddingBottom={1} */

                      sx={{
                        cursor: "pointer",
                        color: "black",
                        transition: "transform 0.3s ease",

                        display: "flex",
                      }}
                    >
                      <Typography
                        variant={"h3"}
                        fontSize={window.innerWidth > 1024 ? 20 : 15}
                        height={window.innerWidth > 1024 ? 20 : 15}
                        fontWeight={"bold"}
                        /* paddingTop={1} */
                        fontFamily={"'Roboto light', sans-serif"}
                      >
                        Socket
                      </Typography>
                      <Typography
                        variant={"h3"}
                        fontSize={window.innerWidth > 1024 ? 14 : 12}
                        height={window.innerWidth > 1024 ? 14 : 12}
                        fontWeight={"bold"}
                        paddingBottom={window.innerWidth > 1024 ? 2.2 : 1.6}
                        fontFamily={"'Roboto light', sans-serif"}
                      >
                        .store
                      </Typography>
                    </Box>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: {
                      xs: 280,
                      md: 310,
                    },
                    padding: 2,
                    paddingBottom: 0,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      width: 100,
                      paddingBottom: 2,
                    }}
                  >
                    <Typography
                      paddingLeft={0.3}
                      fontFamily={"Comfortaa"}
                      color={itemCurrent.items.sale ? "info" : "error"}
                      sx={
                        itemCurrent.items.sale
                          ? {
                              fontSize: {
                                xs: 14,
                                md: 16,
                              },
                              textDecoration: "line-through !important",
                            }
                          : {
                              fontSize: {
                                xs: 14,
                                md: 16,
                              },
                              color: "white",
                              userSelect: "none",
                            }
                      }
                    >
                      {itemCurrent.items.price + "₴"}
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
                            fontSize={window.innerWidth > 1024 ? 24 : 20}
                            fontFamily={"Comfortaa"}
                            color={"error"}
                          >
                            {itemCurrent.items.sale
                              ? itemCurrent.items.price -
                                Math.round(
                                  (itemCurrent.items.price *
                                    itemCurrent.items.sale) /
                                    100
                                )
                              : itemCurrent.items.price}{" "}
                            ₴
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>

                  <Button
                    onClick={() => basketItem_APPEND()}
                    sx={{
                      width: 76,
                      height: 40,
                      marginLeft: 3,
                      marginRight: 3,
                      background: "black",
                      "&:hover": {
                        background: "black",
                      },
                    }}
                    variant="contained"
                  >
                    {items.findIndex(
                      (item: any) => item._id === itemCurrent.items._id
                    ) !== -1 ? (
                      <img
                        src={require("../../img/basketAddedIconWhite.png")}
                        style={{ width: 20, height: 20 }}
                        alt="sdf"
                      />
                    ) : (
                      <img
                        src={require("../../img/cartIcon.png")}
                        style={{ width: 22, height: 20 }}
                        alt="sdf"
                      />
                    )}
                  </Button>
                  <IconButton onClick={() => comparisonItem_APPEND()}>
                    {itemsComparison.findIndex(
                      (item: any) => item._id === itemCurrent.items._id
                    ) !== -1 ? (
                      <img
                        src={require("../../img/comparisonAddedIcon.png")}
                        style={{ width: 26, height: 22 }}
                        alt="sdf"
                      />
                    ) : (
                      <img
                        src={require("../../img/comparisonIconBlack.png")}
                        style={{ width: 26, height: 24 }}
                        alt="sdf"
                      />
                    )}
                  </IconButton>

                  <IconButton onClick={() => favoriteItem_APPEND()}>
                    {itemsFavorites.findIndex(
                      (item: any) => item._id === itemCurrent.items._id
                    ) !== -1 ? (
                      <img
                        src={require("../../img/favoritesAddedIcon.png")}
                        style={{ width: 24, height: 22 }}
                        alt="sdf"
                      />
                    ) : (
                      <img
                        src={require("../../img/favoritesIconBlack.png")}
                        style={{ width: 24, height: 22 }}
                        alt="sdf"
                      />
                    )}
                  </IconButton>
                </Box>
                {itemCurrent.items.quantity <= 10 ? (
                  <Typography
                    paddingLeft={2}
                    fontSize={window.innerWidth > 1024 ? 15 : 14}
                    sx={{ background: "#fdfacf" }}
                  >
                    Товар закінчується! Залишилось: {itemCurrent.items.quantity}
                  </Typography>
                ) : (
                  <Typography
                    fontFamily={"Comfortaa"}
                    paddingLeft={2}
                    fontSize={window.innerWidth > 1024 ? 15 : 14}
                  >
                    Є в наявності
                  </Typography>
                )}
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-start",
                border: "2px solid black",
                borderRadius: 1.5,
                marginBottom: 3,
                height: 160,
              }}
            >
              <Box width={"100%"}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    borderBottom: "2px solid black",

                    padding: 2,
                  }}
                >
                  <Box
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                    width={window.innerWidth > 1024 ? 165 : 130}
                  >
                    <Box>
                      <img
                        src={require("../../img/locationIcon.png")}
                        style={{ width: 16, height: 22 }}
                        alt="sdf"
                      />
                    </Box>
                    <Typography
                      width={window.innerWidth > 1024 ? 135 : 105}
                      fontSize={window.innerWidth > 1024 ? 17 : 13}
                      height={20}
                      alignItems={"flex-center"}
                      display={"flex"}
                      justifyContent={"space-between"}
                    >
                      Доставка в:{" "}
                      <Box
                        flexDirection={"row"}
                        justifyContent={"space-between"}
                        alignItems={"flex-end"}
                        color={"black"}
                        /* paddingBottom={1} */

                        sx={{
                          cursor: "pointer",
                          color: "black",
                          transition: "transform 0.3s ease",

                          display: "flex",
                        }}
                      >
                        <Typography
                          variant={"h3"}
                          fontSize={window.innerWidth > 1024 ? 17 : 13}
                          height={17}
                          fontWeight={"bold"}
                          /* paddingTop={1} */
                          fontFamily={"'Roboto light', sans-serif"}
                        >
                          Київ
                        </Typography>
                      </Box>
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    padding: 2,
                    paddingBottom: 1,
                    paddingTop: 3,
                  }}
                >
                  <Typography
                    width={window.innerWidth > 1024 ? 250 : 220}
                    fontSize={window.innerWidth > 1024 ? 14 : 12}
                    height={20}
                    alignItems={"center"}
                    display={"flex"}
                    justifyContent={"space-between"}
                  >
                    <Box>
                      <img
                        src={require("../../img/novaCourierIcon.png")}
                        style={{ width: 29, height: 22 }}
                        alt="sdf"
                      />
                    </Box>
                    Доставка кур'єром Нової Пошти
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    padding: 2,
                  }}
                >
                  <Typography
                    width={window.innerWidth > 1024 ? 331 : 290}
                    fontSize={window.innerWidth > 1024 ? 14 : 12}
                    height={20}
                    alignItems={"center"}
                    display={"flex"}
                    justifyContent={"space-between"}
                  >
                    <Box>
                      <img
                        src={require("../../img/takeawayIcon.png")}
                        style={{ width: 29, height: 29 }}
                        alt="sdf"
                      />
                    </Box>
                    Самовивіз із відділень поштових операторів
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-start",
                border: "2px solid black",
                borderRadius: 1.5,
                marginBottom: 3,
                height: window.innerWidth > 1024 ? 125 : 135,
              }}
            >
              <Box width={"100%"}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    borderBottom: "2px solid black",
                    padding: 2,
                    paddingBottom: 2,
                    paddingTop: 3,
                  }}
                >
                  <Typography
                    width={window.innerWidth > 1024 ? 320 : 285}
                    fontSize={window.innerWidth > 1024 ? 14 : 12}
                    height={20}
                    alignItems={"center"}
                    display={"flex"}
                    justifyContent={"space-between"}
                  >
                    <Box>
                      <img
                        src={require("../../img/walletIcon.png")}
                        style={{ width: 25, height: 21 }}
                        alt="sdf"
                      />
                    </Box>

                    <Typography
                      marginLeft={1}
                      fontSize={window.innerWidth > 1024 ? 14 : 12}
                      fontWeight={"bold"}
                    >
                      Оплата.
                    </Typography>

                    <Typography
                      marginRight={1}
                      fontSize={window.innerWidth > 1024 ? 14 : 12}
                    >
                      Оплата карткою Visa/MasterCard
                    </Typography>
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "flex-start",

                    padding: 2,
                    paddingTop: 3,
                  }}
                >
                  <Typography
                    width={window.innerWidth > 1024 ? 463 : 265}
                    fontSize={window.innerWidth > 1024 ? 14 : 12}
                    height={20}
                    paddingLeft={0.3}
                    alignItems={"center"}
                    display={"flex"}
                    justifyContent={"space-between"}
                  >
                    <Box>
                      <img
                        src={require("../../img/guaranteeIcon.png")}
                        style={{ width: 21, height: 25 }}
                        alt="sdf"
                      />
                    </Box>

                    <Typography
                      marginLeft={1}
                      fontSize={window.innerWidth > 1024 ? 14 : 12}
                      fontWeight={"bold"}
                    >
                      Гарантія.
                    </Typography>

                    <Typography
                      marginRight={1}
                      textAlign={
                        window.innerWidth > 1024 ? "inherit" : "center"
                      }
                      paddingTop={window.innerWidth > 1024 ? 0 : 2.1}
                      fontSize={window.innerWidth > 1024 ? 14 : 12}
                    >
                      24 місяці Обмін/повернення
                      {window.innerWidth < 600 ? <br /> : <></>} товару протягом
                      14 днів
                    </Typography>
                  </Typography>
                </Box>
              </Box>
            </Box>
            {/* <Box
              display={"flex"}
              width={100}
              justifyContent={"space-between"}
              flexDirection={"row"}
            >
              <Typography
                paddingLeft={0.3}
                fontFamily={"Comfortaa"}
                color={itemCurrent.items.sale ? "info" : "error"}
                sx={
                  itemCurrent.items.sale
                    ? {
                        fontSize: 17,
                        textDecoration: "line-through !important",
                      }
                    : { fontSize: 22 }
                }
              >
                {itemCurrent.items.price} ₴
              </Typography>
              {itemCurrent.items.sale ? (
                <Typography
                  paddingLeft={0.3}
                  fontSize={22}
                  fontFamily={"Comfortaa"}
                  color={"error"}
                >
                  {itemCurrent.items.price -
                    Math.round(
                      (itemCurrent.items.price * itemCurrent.items.sale) / 100
                    )}
                  ₴
                </Typography>
              ) : (
                <></>
              )}
            </Box>
             */}
          </Box>
        </Box>
        <Box
          sx={{
            flexDirection: {
              xs: "column-reverse",
              md: "row",
            },
          }}
          paddingBottom={4}
          justifyContent={"space-between"}
          display={"flex"}
          margin={"0 auto"}
          width={"87%"}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",

              alignItems: "flex-start",
              border: "2px solid black",
              borderRadius: 1.5,
              marginBottom: 3,
              marginLeft: {
                xs: "auto",
                md: 0,
              },
              marginRight: {
                xs: "auto",
                md: 0,
              },
              width: {
                xs: "100%",
                md: "45%",
              },
              overflowY: "auto",
              overflowX: "none",

              "&::-webkit-scrollbar": {
                width: "10px",
                height: "10px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#000000",
                borderRadius: "5px",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "#D9D9D9",
                borderRadius: "5px",
              },
              height: "100%",
              maxHeight: 400,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-start",

                padding: 2,
              }}
            >
              <Typography
                width={window.innerWidth > 1024 ? 206 : 155}
                fontSize={window.innerWidth > 1024 ? 17 : 13}
                alignItems={"flex-end"}
                display={"flex"}
                justifyContent={"space-between"}
              >
                <Typography
                  ref={attributesRef}
                  variant={"h3"}
                  fontSize={window.innerWidth > 1024 ? 20 : 15}
                  height={window.innerWidth > 1024 ? 20 : 15}
                  fontWeight={"bold"}
                  /* paddingTop={1} */
                  fontFamily={"'Roboto light', sans-serif"}
                >
                  Характеристики
                </Typography>
              </Typography>
            </Box>
            <Box
              component={Paper}
              sx={{ width: "100%", alignSelf: "center", paddingBottom: 4 }}
            >
              <Box>
                <Box sx={{ width: { xs: "90%", md: "95%" } }} margin={"0 auto"}>
                  {Object.values(itemCurrent.items.fields).map((field: any) => {
                    return (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "flex-end",
                          maxWidth: 550,
                          width: "100%",
                          marginBottom: 2,
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          sx={{
                            paddingRight: { xs: 1, md: 2 },
                            fontSize: { xs: 13, md: 16 },
                          }}
                        >
                          {Object.keys(field)[0]}
                        </Typography>

                        <div
                          style={{
                            flex: 1,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              flex: 1,
                              borderBottom: "2px solid black",
                            }}
                          ></div>
                        </div>

                        <Typography
                          textAlign={"left"}
                          sx={{
                            paddingLeft: { xs: 1, md: 2 },
                            fontSize: { xs: 13, md: 16 },
                          }}
                        >
                          {Object.values(field)[0] as string}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",

              alignItems: "flex-start",
              border: "2px solid black",
              borderRadius: 1.5,
              marginBottom: 3,
              marginLeft: {
                xs: "auto",
                md: 0,
              },
              marginRight: {
                xs: "auto",
                md: 0,
              },
              width: {
                xs: "100%",
                md: "50%",
              },
              overflowY: "auto",
              overflowX: "none",

              "&::-webkit-scrollbar": {
                width: "10px",
                height: "10px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#000000",
                borderRadius: "5px",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "#D9D9D9",
                borderRadius: "5px",
              },
              height: "100%",
              maxHeight: 400,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-start",

                padding: 2,
              }}
            >
              <Typography
                width={window.innerWidth > 1024 ? 206 : 155}
                fontSize={window.innerWidth > 1024 ? 17 : 13}
                alignItems={"flex-end"}
                display={"flex"}
                justifyContent={"space-between"}
              >
                <Typography
                  variant={"h3"}
                  fontSize={window.innerWidth > 1024 ? 20 : 15}
                  height={window.innerWidth > 1024 ? 20 : 15}
                  fontWeight={"bold"}
                  /* paddingTop={1} */
                  fontFamily={"'Roboto light', sans-serif"}
                >
                  Опис
                </Typography>
              </Typography>
            </Box>
            <Typography
              fontFamily={"Comfortaa"}
              sx={{
                paddingLeft: 2,
                paddingRight: 2,
                paddingBottom: 2,
                textAlign: "justify",
                fontSize: { xs: 13, md: 16 },
              }}
            >
              {itemCurrent.items.description}
            </Typography>
          </Box>
        </Box>
        <ReviewForm {...itemCurrent.items} />
        <CategoryItems />
        <InfoDialog
          openInfo={openInfo}
          InfoDialog_close={InfoDialog_close}
          infoMessage={infoMessage}
        />
      </>
    );
  };

  function StatusItemHandler(status: Status) {
    switch (status) {
      case "success":
        if (itemCurrent.items !== undefined) {
          return <Item />;
        } else {
          navigate(`${slugify(category)}`);
          return <NotFoundPage />;
        }
      case "pending":
        return <LoadingPage />;
      case "error":
        navigate(`${slugify(category)}`);
        return <NotFoundPage />;
      default:
        navigate(`${slugify(category)}`);
        return <NotFoundPage />;
    }
  }

  return StatusItemHandler(item_status);
};

export default ItemPage;
