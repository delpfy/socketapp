import {
  DialogActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  Typography,
  TextField,
  OutlinedInput,
  InputAdornment,
  IconButton,
  CircularProgress,
  InputLabel,
  Box,
} from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import {
  Authorize,
  ResetPassword,
  checkAuthorization,
} from "../../redux/user/asyncActions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import TokenDialog from "./TokenDialog";
import { setUserEmail } from "../../redux/user/userSlice";

type Props = {
  ErrorDialog_open: Dispatch<SetStateAction<any>>;
  InfoDialog_open: Dispatch<SetStateAction<any>>;
  RegisterDialog_open: Dispatch<SetStateAction<any>>;
  LoginDialog_open: Dispatch<SetStateAction<any>>;
  setErrorMessage: (message: string) => void;
  setInfoMessage: (message: string) => void;
  openLogin: boolean;
  LoginDialog_close: () => void;
};

export default function LoginDialog({
  ErrorDialog_open,
  RegisterDialog_open,
  setErrorMessage,
  LoginDialog_open,
  InfoDialog_open,
  setInfoMessage,
  openLogin,
  LoginDialog_close,
}: Props) {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [openToken, setOpenToken] = useState(false);
  const [passVisible, setPassVisible] = useState(true);
  const { status, user_status } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  function TokenDialog_open() {
    if (!validateEmail(loginForm.email)) {
      ErrorDialog_open(true);
      setErrorMessage("Введіть пошту, на неї буде відправлено код відновлення");
      return;
    }
    dispatch(setUserEmail(loginForm.email));
    dispatch(ResetPassword({ email: loginForm.email })).then((result: any) => {
      if (result.meta.requestStatus === "rejected") {
        ErrorDialog_open(true);
        setErrorMessage("Схоже, такої пошти не існує...");
      }
      if (result.meta.requestStatus === "fulfilled") {
        LoginDialog_open(false);
        setOpenToken(true);
      }
    });
  }

  function handleLoginFormChange(e: any) {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  }

  function TokenDialog_close() {
    setOpenToken(false);
  }

  function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async function RedirectLogin() {
    if (!validateEmail(loginForm.email)) {
      ErrorDialog_open(true);
      setErrorMessage("Некоректний формат пошти");
      return;
    }

    if (loginForm.password.length < 5) {
      ErrorDialog_open(true);
      setErrorMessage("Пароль має бути завдовжки мінімум 5 символів");

      return;
    }

    await dispatch(
      Authorize({
        email: loginForm.email,
        password: loginForm.password,
      })
    ).then((result: any) => {
      if (result.meta.requestStatus === "fulfilled") {
        dispatch(checkAuthorization()).then((result_: any) => {
          if (result_.meta.requestStatus === "fulfilled") {
            LoginDialog_open(false);
          } else if (result_.meta.requestStatus === "rejected") {
            ErrorDialog_open(true);
            setErrorMessage("Ви не підтвердили пошту");
          }
        });
      } else if (result.meta.requestStatus === "rejected") {
        ErrorDialog_open(true);
        setErrorMessage("Схоже при авторизації виникла помилка");
      }
    });
  }

  function handleClickShowPassword() {
    setPassVisible((passVisible) => !passVisible);
  }

  return (
    <>
      <Dialog open={openLogin} onClose={LoginDialog_close}>
        <DialogTitle
          sx={{
            fontFamily: "Comfortaa",
            fontSize: 20,
            borderBottom: "2px solid black",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Авторизація
          <IconButton onClick={LoginDialog_close}>
            <img
              src={require("../../img/crossIcon.png")}
              style={{ width: 15, height: 15 }}
              alt="sdf"
            />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 5,
            marginTop: 5,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              width: { xs: "100%", md: 430 },
            }}
          >
            <Typography>Пошта</Typography>
            <OutlinedInput
              margin="dense"
              type="email"
              name="email"
              value={loginForm.email}
              sx={{ width: "100%", marginBottom: 2 }}
              size="small"
              onChange={handleLoginFormChange}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              width: { xs: "100%", md: 430 },
            }}
          >
            <Typography>Пароль</Typography>

            <OutlinedInput
              autoFocus
              margin="dense"
              id="password"
              size="small"
              sx={{ marginBottom: 2, width: "100%" }}
              value={loginForm.password}
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
              onChange={handleLoginFormChange}
            />
          </Box>
          {status === "pending" ? (
            <CircularProgress size={20} />
          ) : (
            <Typography
              onClick={TokenDialog_open}
              sx={{
                cursor: "pointer",
                marginLeft: "75%",
                fontFamily: "Comfortaa",
                marginTop: 1.7,
                marginBottom: 1.7,
                fontSize: 15,
                textAlign: "right",
              }}
            >
              Забув пароль?
            </Typography>
          )}
          {user_status === "pending" ? (
            <CircularProgress size={20} />
          ) : (
            <Button
              sx={{
                fontFamily: "Comfortaa",
                fontSize: 15,
                paddingLeft: 8,
                paddingRight: 8,
                background: "black",
                color: "white",
                "&:hover": {
                  backgroundColor: "black",
                  color: "white",
                },
              }}
              variant="contained"
              size="small"
              onClick={RedirectLogin}
            >
              Вхід
            </Button>
          )}
          <Typography
            onClick={() => {
              
              RegisterDialog_open(true)
              LoginDialog_close();
            }}
            sx={{
              cursor: "pointer",
              paddingLeft: "0.6%",
              fontFamily: "Comfortaa",
              fontSize: 15,
              marginTop: 3,
            }}
          >
            Зареєструватися
          </Typography>
        </DialogContent>
      </Dialog>

      <TokenDialog
        openToken={openToken}
        TokenDialog_close={TokenDialog_close}
        LoginDialog_open={LoginDialog_open}
        ErrorDialog_open={ErrorDialog_open}
        setErrorMessage={setErrorMessage}
        InfoDialog_open={InfoDialog_open}
        setInfoMessage={setInfoMessage}
      />
    </>
  );
}
