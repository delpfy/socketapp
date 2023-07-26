import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { TReplyGET, IReviewGET, IReviewPOST } from "../../redux/types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect, useState } from "react";
import { getItemReviews, updateReview } from "../../redux/review/asyncActions";
import ErrorDialog from "../dialogs/ErrorDialog";

type ReplyProps = {
  reply: TReplyGET;
  review: IReviewGET;
};

export default function Reply({ reply, review }: ReplyProps) {
  const { user } = useAppSelector((state) => state.user);
  const [editMode, setEditMode] = useState(false);

  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("Unhandled error");

  const [description, setDescription] = useState<string>(reply.description);
  const [userName, setUserName] = useState<string>(reply.userName);
  const [replies, setReplies] = useState<TReplyGET[]>(review.replies);
  const [execute_POST, setExecute_POST] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  function ErrorDialog_close() {
    setOpenError(false);
  }
  function ErrorDialog_open() {
    setOpenError(true);
  }

  function discardChanges() {
    setDescription(reply.description);
  }

  function handleEditCall() {
    setEditMode(!editMode);
    if (editMode === false) {
      discardChanges();
    }
  }

  function executeReply_PATCH() {
    const itemIndex = replies.findIndex((item) => item._id === reply._id);
    setReplies([
      ...replies.slice(0, itemIndex),
      {
        _id: reply._id,
        user: user.id,
        userName: userName,
        description: description,
      },
      ...replies.slice(itemIndex + 1),
    ]);
    setExecute_POST(true);
  }

  function executeReply_DELETE() {
    console.log("reply.id " + reply._id);
    setReplies(replies.filter((item) => item._id !== reply._id));
    setExecute_POST(true);
  }

  useEffect(() => {
    if (userName === "" && execute_POST) {
      ErrorDialog_open();
      setErrorMessage("Ви не вказали ім'я");
      return;
    }

    if (description === "" && execute_POST) {
      ErrorDialog_open();
      setErrorMessage("Ви не написали повідомлення");
      return;
    }

    if (execute_POST) {
      dispatch(
        updateReview({
          _id: review._id,
          item: "",
          user: "",
          userName: review.userName,
          description: review.description,
          advantages: review.advantages,
          replies: replies,
          disadvantages: review.disadvantages,
          rating: review.rating,
        } as IReviewPOST)
      ).then((result: any) => {
        if (result.meta.requestStatus === "fulfilled") {
          dispatch(getItemReviews(review.item));
        }
      });
    }
  }, [replies]);

  return (
    <Box
      sx={{ background: "#DDE6ED" }}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
      marginBottom={editMode ? 5 : 2}
      height={editMode ? 200 : 100}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        alignItems={"flex-start"}
        width={100}
      >
        {editMode ? (
          <TextField
            id="outlined-multiline-static"
            label="Iм'я"
            fullWidth
            value={userName}
            size="small"
            onChange={(e) => setUserName(e.target.value)}
          />
        ) : (
          <Typography>{reply.userName}</Typography>
        )}
      </Box>

      {editMode ? (
        <TextField
          id="outlined-multiline-static"
          label="Опис"
          fullWidth
          value={description}
          multiline
          size="small"
          rows={3}
          onChange={(e) => setDescription(e.target.value)}
        />
      ) : (
        <Typography paddingBottom={user.id === reply.user ? 0 : 5}>
          {reply.description}
        </Typography>
      )}

      {user.id === reply.user ? (
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
                onClick={executeReply_PATCH}
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
            onClick={executeReply_DELETE}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ) : (
        ""
      )}
      <ErrorDialog
        openError={openError}
        ErrorDialog_close={ErrorDialog_close}
        errorMessage={errorMessage}
      />
    </Box>
  );
}
