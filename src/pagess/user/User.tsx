import {
  Avatar,
  Box,
  Button,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import LogoutDialog from "../../componentss/dialogs/LogoutDialog";
import ErrorDialog from "../../componentss/dialogs/ErrorDialog";
import { Update, checkAuthorization } from "../../redux/user/asyncActions";
import InfoDialog from "../../componentss/dialogs/InfoDialog";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { updateAllUserReviews } from "../../redux/review/asyncActions";
import { useNavigate } from "react-router-dom";
import UserOrders from "../order/UserOrders";
import { getOrdersByUser } from "../../redux/order/asyncActions";
import {
  setAfterOrder,
  synchronizeBasket,
} from "../../redux/basket/basketSlice";
import { setEditItemMode } from "../../redux/home/homeSlice";
import UserOrdersSkeletons from "../order/UserOrdersSkeletons";

export default function User() {
  const { user } = useAppSelector((state) => state.user);
  const { user_orders } = useAppSelector((state) => state.orders);
  const { afterOrder } = useAppSelector((state) => state.basket);
  const { editItemMode } = useAppSelector((state) => state.home);

  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<string>(user.email);
  const [password, setPassword] = useState<string>("");

  const [fullName, setFullName] = useState<string>(user.name);
  const [passVisible, setPassVisible] = useState(true);

  const [errorMessage, setErrorMessage] = useState<string>("Unhandled error");
  const [infoMessage, setInfoMessage] = useState<string>("Some info");

  const [openLogout, setOpenLogout] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);

  function LogoutDialog_open() {
    setOpenLogout(true);
  }

  function LogoutDialog_close() {
    setOpenLogout(false);
  }

  function ErrorDialog_close() {
    setOpenError(false);
  }
  function ErrorDialog_open() {
    setOpenError(true);
  }

  function InfoDialog_close() {
    setOpenInfo(false);
  }
  function InfoDialog_open() {
    setOpenInfo(true);
  }

  function handleClickShowPassword() {
    setPassVisible((passVisible) => !passVisible);
  }

  function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function handleUserChanges() {
    if (fullName.length < 3 || fullName.length > 20) {
      ErrorDialog_open();
      setErrorMessage(
        "Ім'я має бути завдовжки мінімум 3 символа та максимум 20"
      );
      return;
    }

    if (!validateEmail(email)) {
      ErrorDialog_open();
      setErrorMessage("Некоректний формат пошти");
      return;
    }

    if (password.length < 5) {
      ErrorDialog_open();
      setErrorMessage("Пароль має бути завдовжки мінімум 5 символів");
      return;
    }

    try {
      dispatch(
        Update({
          email: email,
          fullName: fullName,
          role: user.role,
          password: password,
        })
      ).then((result: any) => {
        console.log("result.status " + result.meta.requestStatus);
        if (result.meta.requestStatus === "fulfilled") {
          dispatch(
            updateAllUserReviews({ userName: fullName.replace(/\s+/g, " ") })
          );
          InfoDialog_open();
          setInfoMessage("Дані було оновлено");
          dispatch(checkAuthorization());
        } else if (result.meta.requestStatus === "rejected") {
          ErrorDialog_open();
          setErrorMessage("Схоже при оновленні данних виникла помилка");
        }
      });
    } catch (error: any) {
      ErrorDialog_open();
      setErrorMessage(error);
    }
  }

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getOrdersByUser(user.id)).then((result: any) => {
      if (result.meta.requestStatus === "fulfilled") {
        console.log(user_orders);
      }
    });
    console.log(afterOrder);
    if (afterOrder) {
      dispatch(synchronizeBasket());
      dispatch(setAfterOrder(false));
    }
    if (editItemMode) {
      dispatch(setEditItemMode(false));
    }
  }, []);

  return (
    <>
      {!user.authorized ? (
        navigate("/")
      ) : (
        <Box
          sx={{
            paddingTop: 15,

            margin: "0 auto",
            width: {
              xs: "95%",
              sm: "40%",
              md: "70%",
            },
          }}
        >
          <Typography fontWeight={"bold"} textAlign={"center"} fontSize={32}>
            Особистий кабінет
          </Typography>
          <Box
            display={"flex"}
            alignItems={"center"}
            flexDirection={"column"}
            height={200}
            justifyContent={"space-around"}
          >
            {user.avatar === undefined ? (
              <img
                src={require("../../img/userBlackIcon.png")}
                style={{ width: 100, height: 100 }}
                alt="sdf"
              />
            ) : (
              <Avatar
                alt="user_avatar"
                src={user.avatar}
                sx={{ width: 100, height: 100 }}
              />
            )}
          </Box>
          <Box
            width={"100%"}
            sx={{
              border: "1px solid black",
              width: { xs: "90%", sm: "100%", md: "60%" },
              borderRadius: 1,
              margin: "0 auto",
              padding: { xs: 0, sm: 3, md: 3 },
            }}
          >
            <Typography marginBottom={3}>Редагування профілю</Typography>
            <Box
              margin={"0 auto"}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                width: { xs: "90%", sm: "90%", md: "100%" },
              }}
            >
              <Typography>Ім'я</Typography>
              <OutlinedInput
                margin="dense"
                type="text"
                name="fullName"
                value={fullName}
                sx={{ width: "100%", marginBottom: 2, marginTop: 1 }}
                size="small"
                onChange={(e) =>
                  setFullName(e.target.value.replace(/\s+/g, " "))
                }
              />
            </Box>

            <Box
              margin={"0 auto"}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                width: { xs: "90%", sm: "90%", md: "100%" },
              }}
            >
              <Typography>Пошта</Typography>
              <OutlinedInput
                margin="dense"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value.replace(/\s+/g, ""))}
                sx={{ width: "100%", marginBottom: 2, marginTop: 1 }}
                size="small"
              />
            </Box>
            <Box
              margin={"0 auto"}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                width: { xs: "90%", sm: "90%", md: "100%" },
              }}
            >
              <Typography>Пароль</Typography>
              <OutlinedInput
                autoFocus
                margin="dense"
                id="password"
                size="small"
                sx={{ marginBottom: 2, width: "100%" }}
                value={password}
                name="password"
                type={passVisible ? "password" : "text"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {passVisible ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                height: { xs: 170, md: 100 },
                width: "100%",
                flexDirection: { xs: "column", md: "row" },
                alignItems: { xs: "flex-end", md: "center" },
                justifyContent: "flex-end",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  paddingTop: 1,
                  paddingBottom: 1,
                  paddingLeft: 4,
                  paddingRight: 4,
                  marginRight: {
                    xs: 0,
                    md: 2,
                  },
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "flex-start",
                  background: "white",
                  color: "black",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "black",
                  },
                }}
                onClick={LogoutDialog_open}
              >
                Вийти з аккаута
              </Button>
              <Button
                variant="contained"
                sx={{
                  paddingTop: 1,
                  paddingBottom: 1,
                  paddingLeft: 4,
                  paddingRight: 4,
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "flex-start",
                  background: "black",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "black",
                    color: "white",
                  },
                }}
                onClick={handleUserChanges}
              >
                Зберігти зміни
              </Button>
            </Box>
          </Box>
          {user_orders.orders === undefined ? (
            <UserOrdersSkeletons />
          ) : user_orders.orders.length === 0 ? (
            <UserOrdersSkeletons />
          ) : (
            <UserOrders />
          )}
          <LogoutDialog
            openLogout={openLogout}
            LogoutDialog_close={LogoutDialog_close}
          />
          <ErrorDialog
            openError={openError}
            ErrorDialog_close={ErrorDialog_close}
            errorMessage={errorMessage}
          />
          <InfoDialog
            openInfo={openInfo}
            InfoDialog_close={InfoDialog_close}
            infoMessage={infoMessage}
          />
        </Box>
      )}
    </>
  );
}
