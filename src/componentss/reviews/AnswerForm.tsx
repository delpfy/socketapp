import {
  Box,
  Button,
  TextField,
} from "@mui/material";
import {
  IAnswerPOST,
  IReviewGET,
  IReviewPOST,
} from "../../redux/types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect, useState } from "react";
import {
  getItemReviews,
  updateReview,
} from "../../redux/review/asyncActions";
import ErrorDialog from "../dialogs/ErrorDialog";


export default function AnswerForm(review: IReviewGET) {
  const { user } = useAppSelector((state) => state.user);
  const [description, setDescription] = useState<string>("");
  const [userName, setUserName] = useState<string>(user.name);
  const [answers, setAnswers] = useState<IAnswerPOST[]>(review.answers);

  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("Unhandled error");
  
  const [execute_POST, setExecute_POST] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  
  function closeErrorDialog() {
    setOpenError(false);
  }
  function openErrorDialog() {
    setOpenError(true);
  }

  function appendAnswers() {
    setExecute_POST(true);
    setAnswers((current) => [
      ...current,
      {
        user: user.id,
        userName: userName,
        description: description,
      },
    ]);
  }

  useEffect(() => {
    if (userName === "" && execute_POST) {
      openErrorDialog();
      setErrorMessage("Ви не вказали ім'я");
      return;
    }

    if (description === "" && execute_POST) {
      openErrorDialog();
      setErrorMessage("Ви не написали повідомлення");
      return;
    }

    if(execute_POST){
        dispatch(
            updateReview({
              _id: review._id,
              item: "",
              user: "",
              userName: review.userName,
              description: review.description,
              advantages: review.advantages,
              answers: answers,
              disadvantages: review.disadvantages,
              rating: review.rating,
            } as IReviewPOST)
          ).then((result: any) => {
            if (result.meta.requestStatus === "fulfilled") {
              dispatch(getItemReviews(review.item));
            }
          });
    }
    
  }, [answers]);

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
            onClick={appendAnswers}
          >
            Відправити
          </Button>
        </Box>
      </Box>
      <ErrorDialog
        openError={openError}
        closeErrorDialog={closeErrorDialog}
        errorMessage={errorMessage}
      />
    </>
  );
}
