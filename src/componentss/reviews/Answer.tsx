import {
    Box,
    Button,
    IconButton,
    Rating,
    TextField,
    Typography,
  } from "@mui/material";
  import {  IAnswerGET, IAnswerPOST, IReviewGET, IReviewPOST, ReviewsDisplay } from "../../redux/types";
  import EditIcon from "@mui/icons-material/Edit";
  import DeleteIcon from "@mui/icons-material/Delete";
  import CloseIcon from "@mui/icons-material/Close";
  import { hover } from "@testing-library/user-event/dist/hover";
  import { useAppDispatch, useAppSelector } from "../../redux/hooks";
  import { useEffect, useState } from "react";
  import {
    deleteReview,
    getItemReviews,
    updateReview,
  } from "../../redux/review/asyncActions";
  import { setTotalRating } from "../../redux/review/reviewSlice";
  import { updateItem } from "../../redux/home/asyncActions";
import ErrorDialog from "../dialogs/ErrorDialog";

  type AnswerProps = {
    answer: IAnswerGET,
    review: IReviewGET,
  }
  
  export default function Answer({answer, review}: AnswerProps) {
    const { user } = useAppSelector((state) => state.user);
    const [editMode, setEditMode] = useState(false);
  
    const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("Unhandled error");

    const [description, setDescription] = useState<string>(answer.description);
    const [userName, setUserName] = useState<string>(answer.userName);
    const [answers, setAnswers] = useState<IAnswerGET[]>(review.answers);
    const [execute_POST, setExecute_POST] = useState<boolean>(false);
    
    const dispatch = useAppDispatch();
  
    function closeErrorDialog() {
        setOpenError(false);
      }
      function openErrorDialog() {
        setOpenError(true);
      }
  
    function discardChanges() {
      setDescription(answer.description);
    }
  
    function handleEditCall() {
      setEditMode(!editMode);
      if (editMode === false) {
        discardChanges();
      }
    }

    function changeAnswer() {
        
        const itemIndex = answers.findIndex((item) => item._id === answer._id);
        setAnswers([...answers.slice(0, itemIndex), {
            _id: answer._id,
            user: user.id,
            userName: userName,
            description: description,
          }, ...answers.slice(itemIndex + 1)]);
          setExecute_POST(true);
    }

    function removeAnswer() {
        console.log("answer.id " + answer._id)
        setAnswers(answers.filter(item => item._id !== answer._id));
        setExecute_POST(true);
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
      <Box
        sx = {{background: "#DDE6ED"}}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={'space-between'}
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
          <Typography>{answer.userName}</Typography>
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
          <Typography paddingBottom={user.id === answer.user ?  0: 5}>{answer.description}</Typography>
        )}
  
        
        {user.id === answer.user ? (
          <Box display={"flex"} flexDirection={"row"} alignItems={'center'} justifyContent={"flex-end"}>
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
                  onClick={changeAnswer}
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
              onClick={removeAnswer}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ) : (
          ""
        )}
        <ErrorDialog
      openError={openError}
      closeErrorDialog={closeErrorDialog}
      errorMessage={errorMessage}/>
      </Box>
      
    );
  }
  