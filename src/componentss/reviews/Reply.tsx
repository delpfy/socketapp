import {
  Box,
  Button,
  IconButton,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { TReplyGET, IReviewGET, IReviewPOST } from "../../redux/types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect, useState } from "react";
import { getItemReviews, updateReview } from "../../redux/review/asyncActions";
import ErrorDialog from "../dialogs/ErrorDialog";
import { formatDate } from "../../utils/usefulFunc";
import DeleteDialog from "../dialogs/DeleteDialog";

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
        userName: user.name,
        description: description,
        createdAt: new Date(reply.createdAt),
        updatedAt: new Date(),
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

    if (description.trim() === "" && execute_POST) {
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
        flexDirection={"column"}
        justifyContent={"space-between"}
        alignItems={"flex-start"}
        width={300}
        padding={2}
      >
        <Typography fontWeight={"bold"}>{reply.userName}</Typography>
        <Typography width={"100%"}>
          {reply.createdAt !== reply.updatedAt
            ? formatDate(reply.createdAt.toString()) +
              "\n" +
              "Оновлено " +
              formatDate(reply.updatedAt.toString()) +
              " "
            : formatDate(reply.createdAt.toString())}
        </Typography>
      </Box>

      {editMode ? (
        <Box
          padding={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            margin: "0 auto",
            width: {
              xs: '90%',
              sm: '96%'
            },
          }}
        >
          <Typography> {editMode ? "Коментар" : ""}</Typography>
          {editMode ? (
            <OutlinedInput
              id="outlined-multiline-static"
              fullWidth
              value={editMode ? description : reply.description}
              disabled={editMode ? false : true}
              multiline
              rows={4}
              onChange={(e) => setDescription(e.target.value)}
            />
          ) : (
            <Box padding={2}>
              <Typography>{reply.description}</Typography>
            </Box>
          )}
        </Box>
      ) : (
        <Typography paddingLeft={2} paddingBottom={2}>
          {reply.description}
        </Typography>
      )}

      {user.id === reply.user || user.role === "admin" ? (
        <Box
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"flex-end"}
          width={"100%"}
          padding={1}
          paddingLeft={0}
        >
          {editMode ? (
            <>
              <Button
                color="warning"
                variant="contained"
                sx={{
                  marginRight: 2,
                  marginLeft: {
                    xs: 2,
                    sm: 0
                  },
                  fontFamily: "Comfortaa",
                  fontSize: 15,
                  width: 200,
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
                onClick={executeReply_PATCH}
              >
                зберігти
              </Button>
              <Button
                onClick={() => handleEditCall()}
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
              src={require("../../img/basket/trashIcon.png")}
              style={{ width: 15, height: 20 }}
              alt="sdf"
            />
          </Button>
        </Box>
      ) : (
        ""
      )}
      <ErrorDialog
        openError={openError}
        ErrorDialog_close={ErrorDialog_close}
        errorMessage={errorMessage}
      />
      <DeleteDialog
        openDelete={openDelete}
        DeleteDialog_close={DeleteDialog_close}
        DeleteFunc={executeReply_DELETE}
      />
    </Box>
  );
}
