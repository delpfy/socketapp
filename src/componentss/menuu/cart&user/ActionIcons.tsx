import React, { ChangeEvent, useEffect, useState } from "react";

import {
  Badge,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {  Register } from "../../../redux/user/asyncActions";
import { NullifyToken } from "../../../redux/user/userSlice";

import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LockPersonRoundedIcon from "@mui/icons-material/LockPersonRounded";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import BasketPage from "../../../pagess/cart/Cart";
import InfoDialog from "../../dialogs/InfoDialog";
import ErrorDialog from "../../dialogs/ErrorDialog";
import LoginDialog from "../../dialogs/LoginDialog";

export const ActionIcons = () => {
  const { user } = useAppSelector((state) => state.user);
  const { isOnItemPage, itemsAmount } = useAppSelector((state) => state.basket);

  const dispatch = useAppDispatch();

  const [cartSelected, setCartSelected] = useState(false);
  const [personSelected, setPersonSelected] = useState(false);

  const [openLogin, setOpenLogin] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [openBasket, setOpenBasket] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string>("Unhandled error");
  const [infoMessage, setInfoMessage] = useState<string>("Some info");

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [scroll] = useState<DialogProps["scroll"]>("paper");
  const [maxWidth] = useState<DialogProps["maxWidth"]>("md");
  const [fullWidth] = useState(true);

  const fullScreen = useMediaQuery(useTheme().breakpoints.down("md"));

  useEffect(() => {
    closeBasketDialog();
  }, [isOnItemPage]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRole(event.target.value);
  };

  function openBasketDialog() {
    if (user.authorized === true) {
      closeRegDialog();
      closeLoginDialog();
      setOpenBasket(true);
      setCartSelected(true);
      console.log("CART " + cartSelected);
    } else {
      openLoginDialog();
    }
  }
  function closeBasketDialog() {
    setOpenBasket(false);
    setCartSelected(false);
  }
  function openLoginDialog() {
    if (user.authorized === true) {
      openLogoutDialog();
    } else {
      setPersonSelected(true);
      closeRegDialog();
      setOpenLogin(true);
    }
  }

  function closeRegAfterSuccess() {
    setOpenRegister(false);
    setInfoMessage("Все добре, теперь увійдіть");
    openInfoDialog();
  }

  function openInfoDialog() {
    setOpenInfo(true);
  }

  function closeInfoDialog() {
    setOpenInfo(false);
  }

  function openLogoutDialog() {
    setPersonSelected(true);
    setOpenLogout(true);
  }

  function closeLogoutDialog() {
    setPersonSelected(false);
    setOpenLogout(false);
  }

  function openErrorDialog() {
    setOpenError(true);
  }

  function closeErrorDialog() {
    setOpenError(false);
  }

  function closeLoginDialog() {
    setPersonSelected(false);
    setOpenLogin(false);
  }


  function closeRegDialog() {
    setPersonSelected(false);
    setOpenRegister(false);
  }

  

  function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function RedirectRegister(
    email: string,
    fullName: string,
    role: string,
    password: string
  ) {
    if (!validateEmail(email)) {
      openErrorDialog();
      setErrorMessage("Некоректный формат пошти");
      return;
    }

    if (!fullName) {
      openErrorDialog();
      setErrorMessage("Ви не вказали ім'я");
      return;
    }

    if (password.length < 5) {
      openErrorDialog();
      setErrorMessage("Пароль має бути завдовжки мінімум 5 символів");
      return;
    }

    const validRoles = ["customer"];
    if (!validRoles.includes(role)) {
      openErrorDialog();
      setErrorMessage("Ви не обрали ролі");
      return;
    }

    try {
      dispatch(NullifyToken());
      dispatch(
        Register({
          email: email,
          fullName: fullName,
          role: role,
          password: password,
          expences: 0,
        })
      ).then((result: any) => {
        console.log("result.status " + result.meta.requestStatus);
        if (result.meta.requestStatus === "fulfilled") {
          closeRegAfterSuccess();
        } else if (result.meta.requestStatus === "rejected") {
          openErrorDialog();
          setErrorMessage("Схоже при реєстрації виникла помилка");
        }
      });
    } catch (error: any) {
      openErrorDialog();
      setErrorMessage(error);
    }
  }

  function Logout() {
    closeLogoutDialog();
    dispatch(NullifyToken());
  }

  const Locker = () => {
    if (user.authorized === true) {
      return (
        <AccountCircleRoundedIcon
          color={personSelected ? "info" : "warning"}
          sx={{
            width: 45,
            height: 45,
          }}
        />
      );
    } else {
      return (
        <LockPersonRoundedIcon
          color={personSelected ? "info" : "warning"}
          sx={{
            width: 45,
            height: 45,
          }}
        />
      );
    }
  };

  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        maxWidth={200}
      >
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          maxWidth={180}
        >
          <IconButton onClick={openBasketDialog}>
            <Badge badgeContent={itemsAmount} color="warning">
              <ShoppingCartIcon
                color={cartSelected ? "info" : "warning"}
                sx={{
                  width: 40,
                  height: 40,
                }}
              />
            </Badge>
          </IconButton>
        </Box>
        <Box>
          <IconButton onClick={openLoginDialog}>
            <Locker />
          </IconButton>
        </Box>
      </Box>

      
      <LoginDialog
        openLogin={openLogin}
        closeLoginDialog={closeLoginDialog}
        openErrorDialog={setOpenError}
        openRegisterDialog={setOpenRegister}
        openLoginDialog={setOpenLogin}
        setPersonSelected={setPersonSelected}
        setErrorMessage={setErrorMessage}
      />
      

      {/*<Logout Dialog>*/}
      <Dialog open={openLogout} onClose={closeLogoutDialog}>
        <DialogTitle sx={{ fontFamily: "Comfortaa", fontSize: 15 }}>
          Логаут
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            display={"flex"}
            flexDirection={"row"}
            sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
          >
            Ви дійсно бажаете вийти з вашого акаута?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
            onClick={() => {
              Logout();
            }}
          >
            Так, вийти
          </Button>
          <Button
            sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
            onClick={closeLogoutDialog}
          >
            Ні
          </Button>
        </DialogActions>
      </Dialog>
      {/*</Logout Dialog>*/}

      <ErrorDialog
        openError={openError}
        closeErrorDialog={closeErrorDialog}
        errorMessage={errorMessage}
      />
      <InfoDialog
        openInfo={openInfo}
        closeInfoDialog={closeInfoDialog}
        infoMessage={infoMessage}
      />

      {/*<Register Dialog>*/}
      <Dialog open={openRegister} onClose={closeRegDialog}>
        <DialogTitle sx={{ fontFamily: "Comfortaa", fontSize: 15 }}>
          Регистрація
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
            display={"flex"}
            flexDirection={"row"}
          >
            Маєш аккаунт?
            <Typography
              color={"#1976d2"}
              onClick={openLoginDialog}
              sx={{
                cursor: "pointer",
                paddingLeft: "0.6%",
                fontFamily: "Comfortaa",
                fontSize: 15,
              }}
            >
              Заходь!
            </Typography>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Пошта"
            type="email"
            value={email}
            fullWidth
            variant="standard"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="fullName"
            label="Ваше гарне ім'я"
            type="name"
            value={fullName}
            fullWidth
            variant="standard"
            onChange={(e) => setFullName(e.target.value)}
          />

          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Пароль"
            type="password"
            value={password}
            fullWidth
            variant="standard"
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Роль користувача
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="customer"
                control={<Radio onChange={handleChange} />}
                label="Користувач"
              />
              {/* <FormControlLabel
                value="manager"
                control={<Radio onChange={handleChange} />}
                label="Менеджер"
              /> */}
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
            onClick={() => RedirectRegister(email, fullName, role, password)}
          >
            Продовжити
          </Button>
          <Button
            sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
            onClick={closeRegDialog}
          >
            Вийти
          </Button>
        </DialogActions>
      </Dialog>
      {/*</Register Dialog>*/}

      {/*<Basket Dialog>*/}
      <Dialog
        open={openBasket}
        onClose={closeBasketDialog}
        scroll={scroll}
        maxWidth={maxWidth}
        fullWidth={fullWidth}
        fullScreen={fullScreen}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle
          id="scroll-dialog-title"
          width={"90%"}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography fontFamily={"Comfortaa"} fontSize={22}>
            Кошик
          </Typography>
          <Box
            sx={{
              width: {
                xs: 173,
                md: 220,
              },
            }}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: 15,
                  md: 19,
                },
              }}
              fontFamily={"Comfortaa"}
            >
              Сума товарів:{" "}
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  xs: 15,
                  md: 19,
                },
              }}
              fontFamily={"Comfortaa"}
              color={"error"}
            >
              {user.expences}₴
            </Typography>
          </Box>
        </DialogTitle>

        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            <BasketPage />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              width: {
                xs: 210,
                md: 225,
              },
              fontSize: {
                xs: 12,
                md: 14,
              },
            }}
            variant="contained"
          >
            Оформити замовлення
          </Button>
          <Button
            sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
            onClick={closeBasketDialog}
          >
            Вийти
          </Button>
        </DialogActions>
      </Dialog>
      {/*</Basket Dialog>*/}
    </>
  );
};

export default ActionIcons;
