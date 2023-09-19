import { Box, CircularProgress, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import NotFoundPage from "./PageAbsence";
import { useEffect } from "react";
import { confirmEmail } from "../redux/user/asyncActions";
import { useParams } from "react-router-dom";

export default function ConfirmEmail() {
  const { token } = useParams();

  const { emailConfirmed } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (token) {
      dispatch(confirmEmail({ token: token }));
    }
  }, []);
  return (
    <Box
      width={"100%"}
      height={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box
        display={"flex"}
        justifyContent={"space-around"}
        flexDirection={"column"}
        alignItems={"center"}
        textAlign={"center"}
        maxHeight={150}
      >
        {!token ? (
          <NotFoundPage />
        ) : emailConfirmed ? (
          <Typography>Все добре, пошта існуюча</Typography>
        ) : (
          <CircularProgress size={100} />
        )}
      </Box>
    </Box>
  );
}
