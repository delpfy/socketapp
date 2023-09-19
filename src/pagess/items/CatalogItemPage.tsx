import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Carousel from "react-material-ui-carousel";
import { TShippingItems, Status } from "../../redux/types";

import {
  Box,
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
} from "@mui/material";
import { NotFoundPage } from "../PageAbsence";
import {
  setAfterOrder,
  synchronizeBasket,
} from "../../redux/basket/basketSlice";
import InfoDialog from "../../componentss/dialogs/InfoDialog";
import { useNavigate } from "react-router-dom";
import Review from "../../componentss/reviews/Review";
import ReviewForm from "../../componentss/reviews/ReviewForm";
import {
  setReviewsAmount,
  setRatingAmount,
} from "../../redux/review/reviewSlice";
import LoadingPage from "../LoadingPage";
import {
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
  getItemById,
  getItemsByCategory,
} from "../../redux/home/asyncActions";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { getItemReviews } from "../../redux/review/asyncActions";
const font = {
  fontFamily: "Ubuntu",
};


export const ItemPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  const { afterOrder, items } = useAppSelector((state) => state.basket);

  const { user } = useAppSelector((state) => state.user);

  const [openInfo, setOpenInfo] = useState(false);
  const [infoMessage, setInfoMessage] = useState<string>("Some info");

  function redirectToAddItemPage() {
    dispatch(setEditItemMode(true));
    dispatch(setSearchedId(itemCurrent.items._id));
    dispatch(getItemById(itemCurrent.items._id)).then((result: any) => {
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/add-item");
      }
    });
  }

  function InfoDialog_open() {
    setOpenInfo(true);
  }

  function InfoDialog_close() {
    setOpenInfo(false);
  }

  useEffect(() => {
    window.scrollTo(0, 0);

    if (afterOrder) {
      dispatch(synchronizeBasket());
      dispatch(setAfterOrder(false));
    }
    if (editItemMode) {
      dispatch(setEditItemMode(false));
    }
  }, [dispatch]);

  

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
        navigate("/catalog/item/reviews");
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
          <Typography variant={"h3"} fontSize={30} fontFamily={"Comfortaa"}>
            {subcategory === "" ? category : category + "/" + subcategory}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: {
                xs: "100%",
                md: 350
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
          margin={'0 auto'}
        >
          <Box margin={'0 auto'}>
            <Carousel
              sx={{
                marginRight: {
                  xs: 'auto',
                  md: 7,
                },
                marginLeft: 'auto',
                width: {
                  xs: window.innerWidth  - 70,
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
                  <Box margin={'0 auto'}>
                    <img
                      src={`https://www.sidebyside-tech.com${url}`}
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
                    width={window.innerWidth > 600 ? 206 : 155}
                    fontSize={window.innerWidth > 600 ? 17 : 13}
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

                        display: 'flex'
                      }}
                    >
                      <Typography
                        variant={"h3"}
                        fontSize={window.innerWidth > 600 ? 20 : 15}
                        height={window.innerWidth > 600 ? 20 : 15}
                        fontWeight={"bold"}
                        /* paddingTop={1} */
                        fontFamily={"'Roboto light', sans-serif"}
                      >
                        Socket
                      </Typography>
                      <Typography
                        variant={"h3"}
                        fontSize={window.innerWidth > 600 ? 14 : 12}
                        height={window.innerWidth > 600 ? 14 : 12}
                        fontWeight={"bold"}
                        paddingBottom={window.innerWidth > 600 ? 2.2 : 1.6}
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
                      md: 310
                    } ,
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
                              } ,
                              textDecoration: "line-through !important",
                            }
                          : { fontSize: {
                            xs: 14,
                            md: 16,
                          }, color: "white", userSelect: "none" }
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
                            fontSize={window.innerWidth > 600 ? 24 : 20}
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
                    fontSize={window.innerWidth > 600 ? 15 : 14}
                    sx={{ background: "#fdfacf" }}
                  >
                    Товар закінчується! Залишилось: {itemCurrent.items.quantity}
                  </Typography>
                ) : (
                  <Typography
                    fontFamily={"Comfortaa"}
                    paddingLeft={2}
                    fontSize={window.innerWidth > 600 ? 15 : 14}
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
                  <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} width={window.innerWidth > 600 ? 165 : 130}>
                  <Box>
                      <img
                        src={require("../../img/locationIcon.png")}
                        style={{ width: 16, height: 22 }}
                        alt="sdf"
                      />
                    </Box>
                    <Typography
                    width={window.innerWidth > 600 ? 135 : 105}
                    fontSize={window.innerWidth > 600 ? 17 : 13}
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
                        fontSize={window.innerWidth > 600 ? 17 : 13}
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
                    width={window.innerWidth > 600 ? 250 : 220}
                    fontSize={window.innerWidth > 600 ? 14 : 12}
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
                    width={window.innerWidth > 600 ? 331 : 290}
                    fontSize={window.innerWidth > 600 ? 14 : 12}
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
                height: window.innerWidth > 600 ? 125 : 135,
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
                    width={window.innerWidth > 600 ? 320 : 285}
                    fontSize={window.innerWidth > 600 ? 14 : 12}
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

                    <Typography marginLeft={1} fontSize={window.innerWidth > 600 ? 14 : 12} fontWeight={"bold"}>
                      Оплата.
                    </Typography>

                    <Typography marginRight={1} fontSize={window.innerWidth > 600 ? 14 : 12}>
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
                    width={window.innerWidth > 600 ? 463 : 265}
                    fontSize={window.innerWidth > 600 ? 14 : 12}
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

                    <Typography marginLeft={1} fontSize={window.innerWidth > 600 ? 14 : 12} fontWeight={"bold"}>
                      Гарантія.
                    </Typography>

                    <Typography
                      marginRight={1}
                      textAlign={window.innerWidth > 600 ? "inherit" : "center"}
                      paddingTop={window.innerWidth > 600 ? 0 : 2.1}
                      fontSize={window.innerWidth > 600 ? 14 : 12}
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

            <Typography
              fontFamily={"Comfortaa"}
              sx={{ paddingLeft: 0.3, paddingTop: 3 }}
            >
              {itemCurrent.items.description}
            </Typography>
          </Box>
        </Box>
        <TableContainer
      component={Paper}
      sx={{ width: "50%", alignSelf: "center", paddingBottom: 4 }}
    >
      <Table>
        <TableBody>
          {Object.values(itemCurrent.items.fields).map((field: any) => {
            return (
              <TableRow>
                <TableCell style={font}>{Object.keys(field)[0]}</TableCell>
                <TableCell>{Object.values(field)[0] as string}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          width={"100%"}
          flexDirection={"row"}
        >
          {itemCurrent.items.user === user.id ? (
            <Box
              display={"flex"}
              alignSelf={"center"}
              justifyContent={"space-between"}
              alignItems={"flex-end"}
              flexDirection={"row"}
            >
              <IconButton
                onClick={() => {
                  dispatch(deleteItem({ itemId: itemCurrent.items._id })).then(
                    (result: any) => {
                      if (result.meta.requestStatus === "fulfilled") {
                        dispatch(getItemsByCategory(category));
                        navigate("/catalog");
                      }
                    }
                  );
                }}
              >
                <DeleteForeverIcon
                  color="error"
                  sx={{ width: 40, height: 40 }}
                />
              </IconButton>
              {itemAppendingId === itemCurrent.items._id ? (
                <CircularProgress size={20} />
              ) : (
                <IconButton onClick={redirectToAddItemPage}>
                  <EditIcon color="warning" sx={{ width: 40, height: 40 }} />
                </IconButton>
              )}
            </Box>
          ) : (
            <></>
          )}
        </Box>

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
          navigate("/catalog");
          return <NotFoundPage />;
        }
      case "pending":
        return <LoadingPage />;
      case "error":
        navigate("/catalog");
        return <NotFoundPage />;
      default:
        navigate("/catalog");
        return <NotFoundPage />;
    }
  }

  return StatusItemHandler(item_status);
};

export default ItemPage;
