import { Box, CircularProgress, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import NotFoundPage from "./PageAbsence";
import { useEffect, useState } from "react";
import { confirmEmail } from "../redux/user/asyncActions";
import { useParams } from "react-router-dom";
import { getUserById, updateUserById } from "../redux/admin/asyncActions";

export default function NewsletterUnsubscribe() {
  const { params_id } = useParams();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log(params_id);
    if (params_id) {
      dispatch(getUserById({ userId: params_id })).then((result: any) => {
        if (result.meta.requestStatus === "fulfilled") {
          console.log(result.payload);
          dispatch(
            updateUserById({
              userId: params_id,
              userData: {
                fullName: result.payload.fullName,
                email: result.payload.email,
                role: result.payload.role,
                newsletterSub: false,
              },
            })
          ).then((upd_result: any) => {
            if (upd_result.meta.requestStatus === "fulfilled") {
              setMessage("Ви відписалися від розсилки");
              setLoading(false);
            }
            if (upd_result.meta.requestStatus === "rejected") {
              setMessage("Користувача знайдено, але виникла помилка");
              setLoading(false);
            }
          });
        }
        if (result.meta.requestStatus === "rejected") {
          setMessage("Користувача не знайдено");
          setLoading(false);
        }
      });
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
        {!params_id ? (
          <NotFoundPage />
        ) : !loading ? (
          <Typography>{message}</Typography>
        ) : (
          <CircularProgress size={100} />
        )}
      </Box>
    </Box>
  );
}
