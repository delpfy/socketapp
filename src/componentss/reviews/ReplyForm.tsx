import { Box, Button, TextField } from "@mui/material";
import { TReplyPOST, IReviewGET, IReviewPOST } from "../../redux/types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect, useState } from "react";
import { getItemReviews, updateReview } from "../../redux/review/asyncActions";
import ErrorDialog from "../dialogs/ErrorDialog";

export default function ReplyForm(review: IReviewGET) {
  const { user } = useAppSelector((state) => state.user);
  const [description, setDescription] = useState<string>("");
  const [userName, setUserName] = useState<string>(user.name);
  const [replies, setReplies] = useState<TReplyPOST[]>(review.replies);

  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("Unhandled error");

  const [execute_POST, setExecute_POST] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  function ErrorDialog_close() {
    setOpenError(false);
  }
  function ErrorDialog_open() {
    setOpenError(true);
  }

  function executeReply_POST() {
    if(user.authorized){
      setExecute_POST(true);
      setReplies((current) => [
        ...current,
        {
          user: user.id,
          userName: userName,
          description: description,
        },
      ]);
    }
    else{
      ErrorDialog_open();
      setErrorMessage("Авторизуйтесь для того, щоб відповісти на відгук");
    }
   
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
    <>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        alignItems={"space-between"}
        marginBottom={2}
        paddingTop={2}
        height={180}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          alignItems={"flex-start"}
          width={100}
        >
          <TextField
            id="outlined-multiline-static"
            label="Iм'я"
            fullWidth
            value={userName}
            size="small"
            onChange={(e) => setUserName(e.target.value.replace(/\s+/g, ""))}
          />
        </Box>

        <TextField
          id="outlined-multiline-static"
          label="Опис"
          fullWidth
          value={description}
          multiline
          size="small"
          rows={3}
          onChange={(e) => setDescription(e.target.value.replace(/\s+/g, " "))}
        />

        <Box display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
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
            onClick={executeReply_POST}
          >
            Відправити
          </Button>
        </Box>
      </Box>
      <ErrorDialog
        openError={openError}
        ErrorDialog_close={ErrorDialog_close}
        errorMessage={errorMessage}
      />
    </>
  );
}
