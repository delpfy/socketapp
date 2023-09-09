import { Box, CircularProgress, Typography } from "@mui/material";
import Review from "../../componentss/reviews/Review";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  setRatingAmount,
  setReviewsAmount,
} from "../../redux/review/reviewSlice";
import { Status } from "../../redux/types";
import ReviewForm from "../../componentss/reviews/ReviewForm";
import { useNavigate } from "react-router-dom";
import { getItemById } from "../../redux/home/asyncActions";

export default function ReviewsPage() {
  const { itemCurrent, category, subcategory } = useAppSelector(
    (state) => state.home
  );
  const { reviews, status_review } = useAppSelector((state) => state.reviews);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  function StatusReviewHandler(status_review: Status) {
    switch (status_review) {
      case "success":
        if (reviews !== undefined) {
          let countRatingAmount = 0;
          dispatch(
            setReviewsAmount(parseInt(reviews.reviews.length.toString()))
          );
          if (reviews.reviews.length === 0) {
            dispatch(setRatingAmount(0));
          }
          return reviews.reviews
            .slice()
            .reverse()
            .map((review, index) => {
              countRatingAmount =
                parseInt(countRatingAmount.toString()) +
                parseInt(review.rating.toString());
              if (index === reviews.reviews.length - 1) {
                dispatch(setRatingAmount(countRatingAmount));
              }
              return <Review {...review} />;
            });
        } else {
          return (
            <Typography fontFamily={"Comfortaa"} fontSize={20}>
              Пусто...
            </Typography>
          );
        }
      case "pending":
        <CircularProgress />;
        return "";
      case "error":
        return (
          <Typography fontFamily={"Comfortaa"} fontSize={20}>
            Пусто...
          </Typography>
        );
      default:
        return (
          <Typography fontFamily={"Comfortaa"} fontSize={20}>
            Пусто...
          </Typography>
        );
    }
  }

  function RedirectToItem() {
    if (window.location.pathname.includes("/reviews")) {
      dispatch(getItemById(itemCurrent.items._id)).then((result: any) => {
        if (result.meta.requestStatus === "fulfilled") {
          navigate("/catalog/item");
        }
      });
    }
  }

  return (
    <>
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
            width: 350,
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
            onClick={RedirectToItem}
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
            onClick={() => navigate("/catalog/item/reviews")}
          >
            Відгуки
          </Typography>
        </Box>
      </Box>

      <Box paddingTop={10}>
        <Typography
          fontFamily={"Comfortaa"}
          sx={{ textAlign: "center" }}
          fontSize={25}
        >
          Відгуки
        </Typography>
        <ReviewForm {...itemCurrent.items} />
        <Box>{StatusReviewHandler(status_review)}</Box>
      </Box>
    </>
  );
}
