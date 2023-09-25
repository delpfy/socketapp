import {
  Box,
  Button,
  IconButton,
  OutlinedInput,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { IReviewGET, IReviewPOST } from "../../redux/types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useState } from "react";
import {
  deleteReview,
  getItemReviews,
  updateReview,
} from "../../redux/review/asyncActions";
import { setTotalRating } from "../../redux/review/reviewSlice";
import ReplyForm from "./ReplyForm";
import Reply from "./Reply";
import { formatDate } from "../../utils/usefulFunc";
import ErrorDialog from "../dialogs/ErrorDialog";
import InfoDialog from "../dialogs/InfoDialog";

export default function Review(props: IReviewGET) {
  const { user } = useAppSelector((state) => state.user);
  const [editMode, setEditMode] = useState(false);
  const [replyMode, setreplyMode] = useState(false);
  const [description, setDescription] = useState<string>(props.description);
  const [advantages, setAdvantages] = useState<string>(props.advantages);
  const [disadvantages, setDisadvantages] = useState<string>(
    props.disadvantages
  );
  const [rating, setRating] = useState<number>(props.rating);

  const dispatch = useAppDispatch();

  function discardChanges() {
    setDescription(props.description);
    setAdvantages(props.advantages);
    setDisadvantages(props.disadvantages);
    setRating(props.rating);
  }

  function handleEditCall() {
    setEditMode(!editMode);
    if (editMode === false) {
      discardChanges();
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
        replies: props.replies,
        disadvantages: disadvantages,
        rating: rating,
      } as IReviewPOST)
    ).then((result: any) => {
      if (result.meta.requestStatus === "fulfilled") {
        dispatch(
          setTotalRating({
            prevStars: props.rating,
            stars: rating,
            func: "change",
          })
        );

        dispatch(getItemReviews(props.item));
      }
    });
  }

  function handleDeleteCall() {
    dispatch(deleteReview({ _id: props._id })).then((result: any) => {
      if (result.meta.requestStatus === "fulfilled") {
        dispatch(
          setTotalRating({
            prevStars: props.rating,
            stars: props.rating,
            func: "reduce",
          })
        );
        dispatch(getItemReviews(props.item));
      }
    });
  }

  function handleRatingChange(e: any) {
    setRating(e.target.value);
  }

  function handlereplyMode() {
    setreplyMode(!replyMode);
  }

  return (
    <Box
      display={"flex"}
      justifyContent={"flex-start"}
      alignItems={"flex-start"}
      flexDirection={"column"}
      sx={{ border: "2px solid black", borderRadius: 1.5 }}
      margin={"0 auto"}
      marginTop={4}
      marginBottom={4}
      height={"100%"}
      width={"96%"}
    >
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"flex-end"}
        width={"96%"}
        margin={"0 auto"}
        flexDirection={"row"}
      >
        <Box>
          <Typography
            variant={"h3"}
            fontSize={window.innerWidth > 600 ? 20 : 15}
            height={window.innerWidth > 600 ? 20 : 15}
            fontWeight={"bold"}
            padding={1.5}
            paddingBottom={0.5}
            fontFamily={"'Roboto light', sans-serif"}
          >
            {props.userName}
          </Typography>
          <Typography padding={1.5} width={400}>
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
          <Rating
            name="simple-controlled"
            value={rating}
            size="large"
            sx={{ color: "black", marginBottom: 3 }}
            onChange={handleRatingChange}
          />
        ) : (
          <Rating
            name="simple-controlled"
            value={props.rating}
            size="medium"
            sx={{ color: "black", marginBottom: 3 }}
            readOnly
          />
        )}
      </Box>

      <Box
        padding={3}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        margin={"0 auto"}
        sx={{
          width: "95%",
        }}
      >
        <Box
          display={"flex"}
          sx={{
            flexDirection: "column",
          }}
          justifyContent={"space-between"}
          alignItems={"center"}
          width={"100%"}
        >
          {props.description.trim() === "" && !editMode ? (
            <></>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                width: "100%",
              }}
            >
              <Typography> {editMode ? "Коментар" : ""}</Typography>
              {editMode ? (
                <OutlinedInput
                  id="outlined-multiline-static"
                  fullWidth
                  value={editMode ? description : props.description}
                  disabled={editMode ? false : true}
                  multiline
                  rows={4}
                  onChange={(e) => setDescription(e.target.value)}
                />
              ) : (
                <Box margin={1} marginBottom={3}>
                  <Typography>{props.description}</Typography>
                </Box>
              )}
            </Box>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          {props.advantages.trim() === "" && !editMode ? (
            <></>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                width: "100%",
                padding: 1,
                paddingLeft: 0,
              }}
            >
              <Typography>{editMode ? "Переваги" : ""}</Typography>
              {editMode ? (
                <OutlinedInput
                  margin="dense"
                  value={advantages}
                  disabled={editMode ? false : true}
                  fullWidth
                  onChange={(e) => setAdvantages(e.target.value)}
                />
              ) : (
                <Box
                  sx={{
                    border: "2px solid black",
                    borderRadius: 1.5,
                    padding: 1.5,
                  }}
                >
                  <Typography fontWeight={"bold"} marginBottom={1.5}>
                    {editMode ? "" : "Переваги"}
                  </Typography>
                  <Typography>{props.advantages}</Typography>
                </Box>
              )}
            </Box>
          )}

          {props.disadvantages.trim() === "" && !editMode ? (
            <></>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                width: "100%",
                padding: 1,
                paddingRight: 0,
              }}
            >
              <Typography>{editMode ? "Недоліки" : ""}</Typography>
              {editMode ? (
                <OutlinedInput
                  margin="dense"
                  value={disadvantages}
                  fullWidth
                  onChange={(e) => setDisadvantages(e.target.value)}
                />
              ) : (
                <Box
                  sx={{
                    border: "2px solid black",
                    borderRadius: 1.5,
                    padding: 1.5,
                  }}
                >
                  <Typography fontWeight={"bold"} marginBottom={1.5}>
                    {editMode ? "" : "Недоліки"}
                  </Typography>
                  <Typography> {props.disadvantages}</Typography>
                </Box>
              )}
            </Box>
          )}
        </Box>

        <Button
          sx={{
            width: 300,
            marginTop: 3,
            marginBottom: 3,
            alignSelf: "flex-end",
            fontSize: 15,
            paddingLeft: 8,
            paddingRight: 8,
            background: "black",
            color: "white",
            "&:hover": {
              backgroundColor: "black",
              color: "white",
            },
          }}
          variant="contained"
          size="small"
          onClick={handlereplyMode}
        >
          {replyMode ? "Відмінити" : "Відповісти"}
        </Button>
        {user.id === props.user || user.role === "admin" ? (
          <Box
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"flex-end"}
          >
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
        {replyMode ? <ReplyForm {...props} /> : ""}
        {props.replies.length === 0 ? (
          ""
        ) : (
          <Box marginBottom={10}>
            <Typography fontFamily={"Comfortaa"} paddingTop={3} fontSize={20}>
              Відповіді
            </Typography>

            <Box width={600} marginLeft={10} paddingTop={4}>
              {props.replies
                .slice()
                .reverse()
                .map((reply) => {
                  return <Reply review={props} reply={reply} />;
                })}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
