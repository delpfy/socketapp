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
import slugify from "slugify";

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
            return (
              <Typography fontFamily={"Comfortaa"} padding={1.5} fontSize={20}>
                Пусто...
              </Typography>
            );
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
        navigate(`${slugify(itemCurrent.items.category)}`);
        return (
          <Typography fontFamily={"Comfortaa"} fontSize={20}>
            Пусто...
          </Typography>
        );
      default:
        navigate(`${slugify(itemCurrent.items.category)}`);
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
          navigate(
            `/${slugify(itemCurrent.items.category)}/${
              itemCurrent.items.slugString
            }`
          );
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
            onClick={() =>
              navigate(
                `/${slugify(itemCurrent.items.category)}/${
                  itemCurrent.items.slugString
                }/reviews`
              )
            }
          >
            Відгуки
          </Typography>
        </Box>
      </Box>

      <Box paddingTop={5}>
        <ReviewForm {...itemCurrent.items} />
        <Box
          sx={{
            border: "2px solid black",
            borderRadius: 1.5,
            marginTop: 3,
            marginBottom: 10,
          }}
          margin={"0 auto"}
          width={"85%"}
        >
          <Typography
            variant={"h3"}
            fontSize={window.innerWidth > 600 ? 20 : 15}
            height={window.innerWidth > 600 ? 20 : 15}
            fontWeight={"bold"}
            padding={1.5}
            paddingBottom={0.5}
            fontFamily={"'Roboto light', sans-serif"}
          >
            Відгуки
          </Typography>
          <Box>{StatusReviewHandler(status_review)}</Box>
        </Box>
      </Box>
    </>
  );
}
