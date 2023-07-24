import {
  Box,
  Button,
  IconButton,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { IReviewGET, IReviewPOST, ReviewsDisplay } from "../redux/types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { hover } from "@testing-library/user-event/dist/hover";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useState } from "react";
import {
  deleteReview,
  getItemReviews,
  updateReview,
} from "../redux/review/asyncActions";

export default function Review(props: IReviewGET) {
  const { user } = useAppSelector((state) => state.user);
  const [editMode, setEditMode] = useState(false);

  const [description, setDescription] = useState<string>(props.description);
  const [advantages, setAdvantages] = useState<string>(props.advantages);
  const [disadvantages, setDisadvantages] = useState<string>(
    props.disadvantages
  );
  const [rating, setRating] = useState<number>(props.rating);

  const dispatch = useAppDispatch();

  function formatDate(time: string) {
    const date = new Date(time);

    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1; // Месяцы в объекте Date индексируются с 0, поэтому добавляем 1
    const year = date.getUTCFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // Шаг 3: Формирование строки с желаемым форматом
    const formattedDate = `${day.toString().padStart(2, "0")}.${month
      .toString()
      .padStart(2, "0")}.${year} ${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    return formattedDate;
  }

  function disgardChanges() {
    setDescription(props.description);
    setAdvantages(props.advantages);
    setDisadvantages(props.disadvantages);
    setRating(props.rating);
  }

  function handleEditCall() {
    setEditMode(!editMode);
    if (editMode === false) {
      disgardChanges();
    }
  }

  function handleSaveChangesCall() {
    dispatch(
      updateReview({
        _id: props._id,
        item: "",
        user: "",
        userName: "",
        description: description,
        advantages: advantages,
        disadvantages: disadvantages,
        rating: rating,
      } as IReviewPOST)
    ).then((result: any) => {
      if (result.meta.requestStatus === "fulfilled") {
        dispatch(getItemReviews(props.item));
      }
    });
  }

  function handleDeleteCall() {
    dispatch(deleteReview({ _id: props._id })).then((result: any) => {
      if (result.meta.requestStatus === "fulfilled") {
        dispatch(getItemReviews(props.item));
      }
    });
  }

  function handleRatingChange(e: any) {
    setRating(e.target.value);
  }
  return (
    <Box
      padding={5}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
      height={editMode ? 450 : 250}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        alignItems={"flex-start"}
        width={100}
      >
        <Typography>{props.userName}</Typography>
        <Typography width={400}>
          {props.createdAt !== props.updatedAt
            ? formatDate(props.createdAt) +
              "\n" +
              "Оновлено " +
              formatDate(props.updatedAt) +
              " "
            : formatDate(props.createdAt)}
        </Typography>
      </Box>
      {editMode ? (
        <Rating value={rating} onChange={handleRatingChange} />
      ) : (
        <Rating value={props.rating} readOnly />
      )}

      {editMode ? (
        <TextField
          id="outlined-multiline-static"
          label="Опис"
          fullWidth
          value={description}
          multiline
          rows={4}
          onChange={(e) => setDescription(e.target.value)}
        />
      ) : (
        <Typography>{props.description}</Typography>
      )}

      <Box>
        <Box>
          {editMode ? (
            <TextField
              margin="dense"
              label="Переваги"
              value={advantages}
              fullWidth
              variant="standard"
              onChange={(e) => setAdvantages(e.target.value)}
            />
          ) : (
            <>
              <Typography>Переваги:</Typography>

              <Typography> {props.advantages}</Typography>
            </>
          )}
        </Box>
        <Box>
          {editMode ? (
            <TextField
              margin="dense"
              label="Недоліки"
              value={disadvantages}
              fullWidth
              variant="standard"
              onChange={(e) => setDisadvantages(e.target.value)}
            />
          ) : (
            <>
              <Typography>Недоліки:</Typography>

              <Typography> {props.disadvantages}</Typography>
            </>
          )}
        </Box>
      </Box>
      {user.id === props.user ? (
        <Box display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
          {editMode ? (
            <>
              <Button
                color="warning"
                variant="contained"
                sx={{
                  marginRight: 2,
                  fontFamily: "Comfortaa",
                  fontSize: 15,
                  width: 200,
                  height: 30,
                  alignSelf: "flex-end",
                }}
                onClick={handleSaveChangesCall}
              >
                зберігти
              </Button>
              <IconButton
                sx={{
                  marginRight: 2,
                  backgroundColor: "#fca258",
                  width: 40,
                  height: 40,
                  "&:hover": { backgroundColor: "#fc8019" },
                }}
                onClick={handleEditCall}
              >
                <CloseIcon />
              </IconButton>
            </>
          ) : (
            <IconButton
              sx={{
                marginRight: 2,
                backgroundColor: "#fca258",
                width: 40,
                height: 40,
                "&:hover": { backgroundColor: "#fc8019" },
              }}
              onClick={handleEditCall}
            >
              <EditIcon />
            </IconButton>
          )}

          <IconButton
            sx={{
              backgroundColor: "#e83a3a",
              width: 40,
              height: 40,
              "&:hover": { backgroundColor: "#eb0909" },
            }}
            onClick={handleDeleteCall}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
}
