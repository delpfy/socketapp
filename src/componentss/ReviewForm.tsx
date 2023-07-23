import { Box, Button, Rating, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { checkAuthorization } from "../redux/user/asyncActions";
import { createReview, getItemReviews } from "../redux/review/asyncActions";
import ErrorDialog from "./dialogs/ErrorDialog";
import InfoDialog from "./dialogs/InfoDialog";

type ReviewFormProps = {
  itemId: string
}

export default function ReviewForm({itemId}: ReviewFormProps) {
  const [description, setDescription] = useState<string>("");
  const [advantages, setAdvantages] = useState<string>("");
  const [disadvantages, setDisadvantages] = useState<string>("");
  const [rating, setRating] = useState<number>(0);

  const [errorMessage, setErrorMessage] = useState<string>("Unhandled error");
  const [infoMessage, setInfoMessage] = useState<string>("Some info");

  const [openError, setOpenError] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);

  const dispatch = useAppDispatch();

  function closeErrorDialog() {
    setOpenError(false);
  }
  function openErrorDialog() {
    setOpenError(true);
  }

  function closeInfoDialog() {
    setOpenInfo(false);
  }
  function openInfoDialog() {
    setOpenInfo(true);
  }

  function handleRatingChange(e: any) {
    setRating(e.target.value);
  }

 

  async function review_POST() {
    if (description === "") {
      openErrorDialog();
      setErrorMessage("Ви не додали опису");
      return;
    }

    if (rating === 0) {
      openErrorDialog();
      setErrorMessage("Ви не обрали кількість зірок");
      return;
    }
    if (advantages === "") {
      openErrorDialog();
      setErrorMessage("Ви не додали опису переваг");
      return;
    }
    if (disadvantages === "") {
      openErrorDialog();
      setErrorMessage("Ви не додали опису недоліків");
      return;
    }

    await dispatch(createReview({
      item: itemId,
      description: description,
      rating: rating,
      advantages: advantages,
      disadvantages: disadvantages
    })).then((result: any) => {
      console.log("result.status " + result.meta.requestStatus);
      if (result.meta.requestStatus === "fulfilled") {
        openInfoDialog();
        setInfoMessage("Дякуємо за відгук");
        dispatch(checkAuthorization());
        dispatch(getItemReviews(itemId))
      } else if (result.meta.requestStatus === "rejected") {
        openErrorDialog();
        setErrorMessage("Схоже при авторизації виникла помилка");
      }
    });
  }

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
    >
      <Typography fontFamily={"Comfortaa"} fontSize={20}>
        Напишіть ваш відгук
      </Typography>
      <Box
        padding={5}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        height={350}
        sx={{
          width: {
            xs: 400,
            md: 700,
          },
        }}
      >
        <Box
          display={"flex"}
          sx={{
            flexDirection: {
              xs: "column",
              md: "row",
            },
          }}
          justifyContent={"space-between"}
          alignItems={"flex-end"}
        >
          <TextField
            id="outlined-multiline-static"
            label="Опис"
            fullWidth
            value={description}
            multiline
            rows={4}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Rating
            name="simple-controlled"
            value={rating}
            sx={{ marginLeft: 10 }}
            onChange={handleRatingChange}
          />
        </Box>

        <TextField
          margin="dense"
          label="Переваги"
          value={advantages}
          fullWidth
          variant="standard"
          onChange={(e) => setAdvantages(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Недоліки"
          value={disadvantages}
          fullWidth
          variant="standard"
          onChange={(e) => setDisadvantages(e.target.value)}
        />
        <Button
          color="warning"
          variant="contained"
          sx={{
            fontFamily: "Comfortaa",
            fontSize: 15,
            width: 300,
            alignSelf: "flex-end",
          }}
          onClick={review_POST}
        >
          Додати відгук
        </Button>
      </Box>
      <ErrorDialog
        openError={openError}
        closeErrorDialog={closeErrorDialog}
        errorMessage={errorMessage}
      />
      <InfoDialog
        openInfo={openInfo}
        closeInfoDialog={closeInfoDialog}
        infoMessage={infoMessage}
      />
    </Box>
  );
}
