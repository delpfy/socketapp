import { Box, Rating, Typography } from "@mui/material";
import { IReview, ReviewsDisplay } from "../redux/types";

export default function Review(props: IReview) {
  return (
    <Box
      padding={5}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"space-between"}
      height={250}
    >
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        width={100}
      >
        <Typography>Name</Typography>
        <Typography>Дата</Typography>
      </Box>
      <Rating name="read-only" value= {props.rating} readOnly />
      <Typography >
        {props.description}
      </Typography>
      <Box>
        <Box>
          <Typography>Переваги:</Typography>
          <Typography> {props.advantages}</Typography>
        </Box>
        <Box>
          <Typography>Недоліки:</Typography>
          <Typography> {props.disadvantages}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
