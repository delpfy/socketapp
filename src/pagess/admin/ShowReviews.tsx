import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setProcess } from "../../redux/admin/adminSlice";
import {
  deleteUser,
  getAllUsers,
  getUserById,
} from "../../redux/admin/asyncActions";
import { useEffect, useState } from "react";
import InfoDialog from "../../componentss/dialogs/InfoDialog";
import SearchReviewsByItems from "../../componentss/menuu/search/SearchReviewsByItems";
import Review from "../../componentss/reviews/Review";
import {
  setReviewsAmount,
  setRatingAmount,
} from "../../redux/review/reviewSlice";
import { Status } from "../../redux/types";

export default function ShowReviews() {
  const { _users, _orders } = useAppSelector((state) => state.admin);
  const dispatch = useAppDispatch();
  const [openInfo, setOpenInfo] = useState(false);
  const [infoMessage, setInfoMessage] = useState<string>("Some info");
  function InfoDialog_open() {
    setOpenInfo(true);
  }
  function InfoDialog_close() {
    setOpenInfo(false);
  }
  const { reviews, status_review } = useAppSelector((state) => state.reviews);

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
            Оберіть товар
          </Typography>
        );
    }
  }
  useEffect(() => {}, []);
  return (
    <>
      <InfoDialog
        openInfo={openInfo}
        InfoDialog_close={InfoDialog_close}
        infoMessage={infoMessage}
      />
      <SearchReviewsByItems />
      <Box>{StatusReviewHandler(status_review)}</Box>
    </>
  );
}
