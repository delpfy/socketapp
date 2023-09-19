import {
  Avatar,
  Box,
  Button,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
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
          sx={{ paddingTop: { xs: "25%", md: "15%", lg: "9%" } }}
          width={"100%"}
        >
          <Typography
            fontFamily={"Comfortaa"}
            textAlign={"center"}
            fontSize={32}
          >
            Особистий кабінет
          </Typography>

          <Box padding={3}>
            <Box
              padding={3}
              display={"flex"}
              alignItems={"center"}
              flexDirection={"column"}
              height={200}
              justifyContent={"space-around"}
            >
              {user.avatar === undefined ? (
                <Avatar alt="user_avatar" sx={{ width: 100, height: 100 }} />
              ) : (
                <Avatar
                  alt="user_avatar"
                  src={user.avatar}
                  sx={{ width: 100, height: 100 }}
                />
              )}
            </Box>
            <Box padding={3}>
              <InputLabel>Iм'я</InputLabel>
              <Input
                value={fullName}
                onChange={(e) =>
                  setFullName(e.target.value.replace(/\s+/g, " "))
                }
              />
              <FormHelperText sx={{ fontSize: 15 }}>
                Наразі ви - {user.name}
              </FormHelperText>
            </Box>

            <Box padding={3}>
              <InputLabel>Пошта</InputLabel>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value.replace(/\s+/g, ""))}
              />
              <FormHelperText sx={{ fontSize: 15 }}>
                Ми ніколи не розголошуватимемо вашу електронну пошту.
              </FormHelperText>
            </Box>
            <Box padding={3}>
              <InputLabel>Пароль</InputLabel>
              <Input
                value={password}
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
              <FormHelperText sx={{ fontSize: 15 }}>
                Ми ніколи не розголошуватимемо ваш пароль.
              </FormHelperText>
            </Box>

            <Box
              sx={{
                display: "flex",
                height: { xs: 170, md: 100 },
                width: { xs: 300, md: 600 },
                flexDirection: { xs: "column", md: "row" },
                alignItems: { xs: "flex-end", md: "center" },
                justifyContent: "space-around",
              }}
            >
              <Button
                variant="contained"
                color="warning"
                sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
                onClick={handleUserChanges}
              >
                Зберігти зміни
              </Button>

              <Button
                variant="contained"
                color="error"
                sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
                onClick={LogoutDialog_open}
              >
                Вийти з аккаута
              </Button>
            </Box>
            {user_orders.orders === undefined ? (
              <></>
            ) : user_orders.orders.length === 0 ? (
              <></>
            ) : (
              <UserOrders />
            )}
          </Box>
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
