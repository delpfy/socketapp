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
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [openToken, setOpenToken] = useState(false);
  const [passVisible, setPassVisible] = useState(true);
  const { status, user_status } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  function TokenDialog_open() {
    if (!validateEmail(email)) {
      ErrorDialog_open(true);
      setErrorMessage("Введіть пошту, на неї буде відправлено код відновлення");
      return;
    }
    dispatch(setUserEmail(email));
    dispatch(ResetPassword({ email })).then((result: any) => {
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

  function TokenDialog_close() {
    setOpenToken(false);
  }

  function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async function RedirectLogin(email: string, password: string) {
    if (!validateEmail(email)) {
      ErrorDialog_open(true);
      setErrorMessage("Некоректний формат пошти");
      return;
    }

    if (password.length < 5) {
      ErrorDialog_open(true);
      setErrorMessage("Пароль має бути завдовжки мінімум 5 символів");

      return;
    }

    await dispatch(
      Authorize({
        email: email,
        password: password,
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
        <DialogTitle sx={{ fontFamily: "Comfortaa", fontSize: 15 }}>
          Авторизація
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            display={"flex"}
            flexDirection={"row"}
            sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
          >
            Ще не маєш аккаунт?
            <Typography
              color={"#1976d2"}
              onClick={RegisterDialog_open}
              sx={{
                cursor: "pointer",
                paddingLeft: "0.6%",
                fontFamily: "Comfortaa",
                fontSize: 15,
              }}
            >
              Реєструйся!
            </Typography>
          </DialogContentText>
          <TextField
            margin="dense"
            label="Пошта"
            type="email"
            value={email}
            fullWidth
            variant="standard"
            onChange={(e) => setEmail(e.target.value)}
          />

          <OutlinedInput
            autoFocus
            margin="dense"
            id="password"
            sx={{ marginTop: 2, marginBottom: 2 }}
            placeholder="Пароль"
            value={password}
            fullWidth
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
          {status === "pending" ? (
            <CircularProgress size={20} />
          ) : (
            <Typography
              color={"error"}
              onClick={TokenDialog_open}
              sx={{
                cursor: "pointer",
                paddingLeft: "0.6%",
                fontFamily: "Comfortaa",
                fontSize: 15,
              }}
            >
              Забув пароль?
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          {user_status === "pending" ? (
            <CircularProgress size={20} />
          ) : (
            <Button
              sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
              onClick={() => {
                RedirectLogin(email, password);
              }}
            >
              Продовжити
            </Button>
          )}

          <Button
            sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
            onClick={LoginDialog_close}
          >
            Вийти
          </Button>
        </DialogActions>
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
