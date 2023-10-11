import { Box, Button, OutlinedInput, TextField, Typography } from "@mui/material";
import { TReplyPOST, IReviewGET, IReviewPOST } from "../../redux/types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect, useState } from "react";
import { getItemReviews, updateReview } from "../../redux/review/asyncActions";
import ErrorDialog from "../dialogs/ErrorDialog";
import DeleteDialog from "../dialogs/DeleteDialog";

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
          userName: user.name,
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

  return (
    <>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        alignItems={"space-between"}
        marginBottom={2}
        paddingTop={2}
        height={190}
      >
        

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
              onChange={(e) => setDescription(e.target.value.replace(/\s+/g, " "))}
            />
          </Box>
        

        <Box display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
          <Button
            
            variant="contained"
            sx={{
              marginRight: 2,
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
