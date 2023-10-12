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
import DeleteDialog from "../dialogs/DeleteDialog";

export default function Review(props: IReviewGET) {
  const { user } = useAppSelector((state) => state.user);
  const [editMode, setEditMode] = useState(false);
  const [replyMode, setReplyMode] = useState(false);
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
    setReplyMode(false);
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

  function handleReplyMode() {
    setReplyMode(!replyMode);
  }

  const [openDelete, setOpenDelete] = useState(false);
  function DeleteDialog_close() {
    setOpenDelete(false);
  }
  function DeleteDialog_open() {
    setOpenDelete(true);
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
            fontSize={window.innerWidth > 1024 ? 20 : 15}
            height={window.innerWidth > 1024 ? 20 : 15}
            fontWeight={"bold"}
            padding={1.5}
            paddingBottom={0.5}
            fontFamily={"'Roboto light', sans-serif"}
          >
            {props.userName}
          </Typography>
          <Typography padding={1.5} sx={{ width: { xs: "100%", md: 400 } }}>
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
            size={window.innerWidth < 600 ? "medium" : "large"}
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
        paddingBottom={3}
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
            flexDirection: {
              xs: "column",
              sm: "row",
            },
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
                paddingLeft: {
                  xs: 0,
                  sm: 1,
                },
                paddingRight: {
                  xs: 0,
                  sm: 1,
                },
              }}
            >
              <Typography>{editMode ? "Переваги" : ""}</Typography>
              {editMode ? (
                <OutlinedInput
                  margin="dense"
                  value={advantages}
                  disabled={editMode ? false : true}
                  multiline
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
                paddingRight: {
                  xs: 0,
                  sm: 1,
                },
                paddingLeft: {
                  xs: 0,
                  sm: 1,
                },
              }}
            >
              <Typography>{editMode ? "Недоліки" : ""}</Typography>
              {editMode ? (
                <OutlinedInput
                  margin="dense"
                  value={disadvantages}
                  multiline
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
        {replyMode && !editMode ? <ReplyForm {...props} /> : ""}
        <Box
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"flex-end"}
        >
          {user.id !== props.user && !editMode ? (
            <Button
              sx={{
                width: 300,
                marginLeft: {
                  xs: "auto",
                  sm: 0,
                },
                marginRight: {
                  xs: "auto",
                  sm: 0,
                },
                marginTop: 3,
                marginBottom: 3,
                alignSelf: "flex-end",
                fontSize: {
                  xs: 13,
                  md: 15,
                },
                paddingLeft: 8,
                paddingRight: 8,
                fontWeight: "bold",
                background: "white",
                border: "1px solid black",
                color: "black",
                "&:hover": {
                  backgroundColor: "black",
                  color: "white",
                },
              }}
              variant="contained"
              size="small"
              onClick={handleReplyMode}
            >
              {replyMode ? "Відмінити" : "Відповісти"}
            </Button>
          ) : (
            <></>
          )}

          {(user.id === props.user || user.role === "admin") && !replyMode ? (
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
                      fontSize: {
                        xs: 13,
                        md: 15,
                      },
                      width: {
                        xs: 120,
                        sm: 200,
                      },
                      height: 30,
                      alignSelf: "flex-end",
                      fontWeight: "bold",
                      background: "white",
                      border: "1px solid black",
                      color: "black",
                      "&:hover": {
                        backgroundColor: "black",
                        color: "white",
                      },
                    }}
                    onClick={handleSaveChangesCall}
                  >
                    зберігти
                  </Button>

                  <Button
                    onClick={() => handleEditCall()}
                    sx={{
                      width: 40,
                      height: 40,
                      marginLeft: 2,
                      marginRight: 2,
                      background: "white",
                      border: "1px solid black",
                      "&:hover": {
                        background: "white",
                      },
                    }}
                    variant="contained"
                  >
                    <img
                      src={require("../../img/cross_sign.png")}
                      style={{ width: 15, height: 15 }}
                      alt="sdf"
                    />
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => handleEditCall()}
                  sx={{
                    width: 40,
                    height: 40,
                    marginLeft: 2,
                    marginRight: 2,
                    background: "white",
                    border: "1px solid black",
                    "&:hover": {
                      background: "white",
                    },
                  }}
                  variant="contained"
                >
                  <img
                    src={require("../../img/editBlackIcon.png")}
                    style={{ width: 20, height: 20 }}
                    alt="sdf"
                  />
                </Button>
              )}

              <Button
                onClick={() => DeleteDialog_open()}
                sx={{
                  width: 40,
                  height: 40,

                  background: "white",
                  border: "1px solid black",
                  "&:hover": {
                    background: "white",
                  },
                }}
                variant="contained"
              >
                <img
                  src={require("../../img/basket/trashIcon.png")}
                  style={{ width: 15, height: 20 }}
                  alt="sdf"
                />
              </Button>
            </Box>
          ) : (
            ""
          )}
        </Box>

        {props.replies.length === 0 ? (
          ""
        ) : (
          <Box marginBottom={10}>
            <Typography fontFamily={"Comfortaa"} paddingTop={3} fontSize={20}>
              Відповіді
            </Typography>

            <Box width={"100%"} paddingTop={4}>
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
      <DeleteDialog
        openDelete={openDelete}
        DeleteDialog_close={DeleteDialog_close}
        DeleteFunc={handleDeleteCall}
      />
    </Box>
  );
}
