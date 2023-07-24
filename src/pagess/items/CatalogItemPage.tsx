import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Carousel from "react-material-ui-carousel";
import { IReviewGET, ShippingItems, Status } from "../../redux/types";

import { Box, Button, Rating, Typography } from "@mui/material";
import { NotFoundPage } from "../PageAbsence";
import { addBasketItem } from "../../redux/basket/asyncActions";
import { SetItemsAmount } from "../../redux/basket/basketSlice";
import InfoDialog from "../../componentss/dialogs/InfoDialog";
import { useNavigate } from "react-router-dom";
import Review from "../../componentss/Review";
import ReviewForm from "../../componentss/ReviewForm";
import { getItemReviews, updateReview } from "../../redux/review/asyncActions";
import { set_status_PROCESS_review } from "../../redux/review/reviewSlice";

export const ItemPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { status, itemCurrent } = useAppSelector((state) => state.home);
  const { user } = useAppSelector((state) => state.user);
  const { reviews, status_review, status_PROCESS_review} = useAppSelector(state => state.review);

  const { itemsAmount } = useAppSelector((state) => state.basket);
  const [openInfo, setOpenInfo] = useState(false);
  const [infoMessage, setInfoMessage] = useState<string>("Unhandled error");

  function closeInfoDialog() {
    setOpenInfo(false);
  }

  function openInfoDialog() {
    setOpenInfo(true);
  }

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [dispatch])



  function basketItem_APPEND() {
    if (user.authorized === true) {
      dispatch(
        addBasketItem({
          _id: user.id,
          name: itemCurrent.name,
          description: itemCurrent.description,
          category: itemCurrent.category,
          price: itemCurrent.price,
          sale: itemCurrent.sale,
          rating: itemCurrent.rating,
          image: itemCurrent.image,
          amount: 1,
        } as ShippingItems)
      );

      dispatch(SetItemsAmount(itemsAmount + 1));
    } else {
      setInfoMessage("Не так швидко...\nСпочатку увійдіть -_-");
      openInfoDialog();
      // Tip, dunno if i`ll use it.
      // setOpen(true)
    }
  }

  


  const Item = () => {
    return (
      <>
        <Button
          sx={{ fontFamily: "Comfortaa", marginTop: 15, fontSize: 15 }}
          onClick={() => navigate("/catalog")}
          variant="contained"
        >
          Каталог
        </Button>

        <Box
          width={"100%"}
          height={"100%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"column"}
        >
          <Box>
            <Carousel
              sx={{
                width: {
                  xs: 350,
                  md: 825,
                  lx: 1200,
                },

                height: {
                  xs: 500,
                  md: 700,
                },

                /*  width: 'calc(100%-30px)',
              height: 'calc(100%-30px)', */

                /* maxWidth: '100%',
              minWidth: '100%', */

                display: "flex",
                alignContent: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Box>
                <img
                  src={itemCurrent.image[0]}
                  alt="img1"
                  style={{ width: "100%", height: "100%", objectFit: "fill" }}
                />
              </Box>
              <Box>
                <img
                  src={itemCurrent.image[1]}
                  alt="img2"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>
              <Box>
                <img
                  src={itemCurrent.image[2]}
                  alt="img3"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>
              {/* <Box display = {'flex'} justifyContent={'center'} alignItems={'center'} width={400}>
          <img src={props.image[1]} style={{display : 'flex', objectFit: 'contain'}}/>
        </Box>
        <Box display = {'flex'} justifyContent={'center'} alignItems={'center'} width={400}>
          <img src={props.image[2]} style={{display : 'flex', objectFit: 'contain'}}/>
        </Box> */}
            </Carousel>
          </Box>

          <Box display={"flex"} flexDirection={"column"} alignItems={"left"}>
            <Typography
              fontFamily={"Comfortaa"}
              sx={{ paddingLeft: 0.3 }}
              fontSize={25}
            >
              {itemCurrent.name}
            </Typography>
            <Box
              display={"flex"}
              width={100}
              justifyContent={"space-between"}
              flexDirection={"row"}
            >
              <Typography
                paddingLeft={0.3}
                fontFamily={"Comfortaa"}
                color={itemCurrent.sale ? "info" : "error"}
                sx={
                  itemCurrent.sale
                    ? {
                        fontSize: 17,
                        textDecoration: "line-through !important",
                      }
                    : { fontSize: 22 }
                }
              >
                {itemCurrent.price}₴
              </Typography>
              {itemCurrent.sale ? (
                <Typography
                  paddingLeft={0.3}
                  fontSize={22}
                  fontFamily={"Comfortaa"}
                  color={"error"}
                >
                  {itemCurrent.price -
                    Math.round((itemCurrent.price * itemCurrent.sale) / 100)}
                  ₴
                </Typography>
              ) : (
                <></>
              )}
            </Box>
            <Rating name="read-only" value={itemCurrent.rating} readOnly />

            <Typography
              fontFamily={"Comfortaa"}
              sx={{ paddingLeft: 0.3, paddingTop: 3 }}
            >
              {itemCurrent.description}
            </Typography>
          </Box>
          <Box>
            <Button
              onClick={() => basketItem_APPEND()}
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
              Покласти у кошик
            </Button>

            <Button
              sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
              onClick={() => navigate("/")}
            >
              Продовжити покупки
            </Button>
          </Box>
          <Box paddingTop={10}>
            <Typography
              fontFamily={"Comfortaa"}
              sx={{ textAlign: "center" }}
              fontSize={25}
            >
              Відгуки
            </Typography>
            <ReviewForm itemId = {itemCurrent._id}/>
            <Box>
              {
                StatusReviewHandler(status_review)
              }

            </Box>
          </Box>
        </Box>
        <InfoDialog
          openInfo={openInfo}
          closeInfoDialog={closeInfoDialog}
          infoMessage={infoMessage}
        />
      </>
    );
  };

  function StatusReviewHandler(status_review: Status) {
    switch (status_review) {
      case "success":
        console.log("StatusReviewHandler success")
        if (reviews !== undefined) {
          return (reviews.reviews.map((review) => {
            return (<Review {...review}/>)
          }));
        } else {
          console.log("StatusReviewHandler else")
          return ''
        }
      case "pending":
        console.log("StatusReviewHandler pending")
        return ''
      case "error":
        console.log("StatusReviewHandler error")
        return ''
      default:
        console.log("StatusReviewHandler default")
        return ''
  }
}

  function StatusItemHandler(status: Status) {
    switch (status) {
      case "success":
        console.log("ITEM_CURRENT " + itemCurrent);
        if (itemCurrent !== undefined) {
          return <Item />;
        } else {
          return <NotFoundPage />;
        }
      case "pending":
        console.log("ITEM_CURRENT " + itemCurrent);
        return <NotFoundPage />;
      case "error":
        console.log("ITEM_CURRENT " + itemCurrent);
        return <NotFoundPage />;
      default:
        navigate("/catalog");
        return <NotFoundPage />;
    }
  }

  return StatusItemHandler(status);
};

export default ItemPage;
