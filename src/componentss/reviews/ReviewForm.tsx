import {
  Box,
  Button,
  OutlinedInput,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { createReview, getItemReviews } from "../../redux/review/asyncActions";
import ErrorDialog from "../dialogs/ErrorDialog";
import InfoDialog from "../dialogs/InfoDialog";
import {
  disableNoMoreReviews,
  nullifyTotalRating,
  setTotalRating,
} from "../../redux/review/reviewSlice";
import { updateItem } from "../../redux/home/asyncActions";
import { Items, TShippingItems } from "../../redux/types";
import { synchronizeBasket } from "../../redux/basket/basketSlice";

export default function ReviewForm(props: Items | TShippingItems) {
  const { user } = useAppSelector((state) => state.user);
  const { category } = useAppSelector((state) => state.home);
  const { item_totalRating, item_reviewsAmount, item_noMoreReviews } =
    useAppSelector((state) => state.reviews);

  const [description, setDescription] = useState<string>("");
  const [advantages, setAdvantages] = useState<string>("");
  const [disadvantages, setDisadvantages] = useState<string>("");
  const [rating, setRating] = useState<number>(0);

  const [errorMessage, setErrorMessage] = useState<string>("Unhandled error");
  const [infoMessage, setInfoMessage] = useState<string>("Some info");

  const [openError, setOpenError] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);

  const dispatch = useAppDispatch();

  function ErrorDialog_close() {
    setOpenError(false);
  }
  function ErrorDialog_open() {
    setOpenError(true);
  }

  function InfoDialog_close() {
    setOpenInfo(false);
  }
  function InfoDialog_open() {
    setOpenInfo(true);
  }

  function handleRatingChange(e: any) {
    setRating(e.target.value);
  }

  useEffect(() => {
    if (item_totalRating !== 0 || item_noMoreReviews) {
      dispatch(
        updateItem({
          itemId: props._id,
          params: {
            category: category,
            rating: item_totalRating,
            reviewsAmount: item_reviewsAmount,
          },
        })
      ).then((result: any) => {
        if (result.meta.requestStatus === "fulfilled") {
          dispatch(synchronizeBasket());
        }
      });
      dispatch(disableNoMoreReviews());
    }

    dispatch(nullifyTotalRating());
  }, [item_totalRating]);

  async function review_POST() {
    if (user.authorized) {
      if (rating === 0) {
        ErrorDialog_open();
        setErrorMessage("Оберіть кількість зірок");
        return;
      }

      await dispatch(
        createReview({
          _id: "",
          item: props._id,
          userName: user.name,
          description: description.replace(/\s+/g, " "),
          rating: rating,
          replies: [],
          advantages: advantages.replace(/\s+/g, " "),
          disadvantages: disadvantages.replace(/\s+/g, " "),
        })
      ).then((result: any) => {
        console.log("result.status " + result.meta.requestStatus);
        if (result.meta.requestStatus === "fulfilled") {
          InfoDialog_open();
          setInfoMessage("Дякуємо за відгук");
          dispatch(getItemReviews(props._id));
          dispatch(
            setTotalRating({ prevStars: 0, stars: rating, func: "append" })
          );
        } else if (result.meta.requestStatus === "rejected") {
          ErrorDialog_open();
          setErrorMessage("Схоже при обробці запиту виникла помилка");
        }
      });
    } else {
      ErrorDialog_open();
      setErrorMessage("Авторизуйтесь для того, щоб залишити відгук");
    }
  }

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"flex-start"}
      flexDirection={"column"}
      sx={{ border: "2px solid black", borderRadius: 1.5 }}
      margin={"0 auto"}
      width={"87%"}
    >
      <Typography
        variant={"h3"}
        fontSize={window.innerWidth > 1024 ? 20 : 15}
        height={window.innerWidth > 1024 ? 20 : 15}
        fontWeight={"bold"}
        padding={1.5}
        paddingBottom={2}
        fontFamily={"'Roboto light', sans-serif"}
      >
        Залиште відгук
      </Typography>
      <Box
        paddingBottom={3}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        margin={"0 auto"}
        sx={{
          width: "95%",
          height: {
            xs: 440,
            md: 350,
          },
        }}
      >
        <Box
          display={"flex"}
          sx={{
            flexDirection: "column",
            margin: "0 auto",
          }}
          justifyContent={"space-between"}
          alignItems={"center"}
          width={"100%"}
        >
          <Rating
            name="simple-controlled"
            value={rating}
            size="large"
            sx={{ color: "black", margin: "0 auto", marginBottom: 3 }}
            onChange={handleRatingChange}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              width: "100%",
            }}
          >
            <Typography>Коментар</Typography>
            <OutlinedInput
              id="outlined-multiline-static"
              fullWidth
              value={description}
              multiline
              rows={4}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              md: "row",
            },
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              width: "100%",
              padding: 1,
              paddingLeft: 0,
              paddingRight: {
                xs: 0,
                md: 1,
              },
            }}
          >
            <Typography>Переваги</Typography>
            <OutlinedInput
              margin="dense"
              value={advantages}
              fullWidth
              onChange={(e) => setAdvantages(e.target.value)}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              width: "100%",
              padding: 1,
              paddingRight: {
                xs: 1,
                md: 0,
              },
              paddingLeft: {
                xs: 0,
                md: 1,
              },
            }}
          >
            <Typography>Недоліки</Typography>
            <OutlinedInput
              margin="dense"
              value={disadvantages}
              fullWidth
              onChange={(e) => setDisadvantages(e.target.value)}
            />
          </Box>
        </Box>

        <Button
          sx={{
            width: {
              xs: 240,
              md: 300,
            },
            marginTop: 3,
            alignSelf: {
              xs: "center",
              md: "flex-end",
            },
            fontSize: {
              xs: 13,
              md: 15,
            },
            paddingLeft: 8,
            paddingRight: 8,
            fontWeight: 'bold',
            background: "black",
            
            color: "white",
            "&:hover": {
              backgroundColor: "black",
              color: "white",
            },
          }}
          variant="contained"
          size="small"
          onClick={review_POST}
        >
          Додати відгук
        </Button>
      </Box>
      <ErrorDialog
        openError={openError}
        ErrorDialog_close={ErrorDialog_close}
        errorMessage={errorMessage}
      />
      <InfoDialog
        openInfo={openInfo}
        InfoDialog_close={InfoDialog_close}
        infoMessage={infoMessage}
      />
    </Box>
  );
}
