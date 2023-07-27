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
} from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { Authorize } from "../../redux/user/asyncActions";
import { useAppDispatch } from "../../redux/hooks";
import { VisibilityOff, Visibility } from "@mui/icons-material";

type Props = {
  ErrorDialog_open: Dispatch<SetStateAction<any>>;
  RegisterDialog_open: Dispatch<SetStateAction<any>>;
  LoginDialog_open: Dispatch<SetStateAction<any>>;
  setErrorMessage: (message: string) => void;
  openLogin: boolean;
  LoginDialog_close: () => void;
};

export default function LoginDialog({
  ErrorDialog_open,
  RegisterDialog_open,
  setErrorMessage,
  LoginDialog_open,
  openLogin,
  LoginDialog_close,
}: Props) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passVisible, setPassVisible] = useState(true);

  const dispatch = useAppDispatch();

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
      console.log("result.status " + result.meta.requestStatus);
      if (result.meta.requestStatus === "fulfilled") {
        LoginDialog_open(false);
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
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
          onClick={() => {
            RedirectLogin(email, password);
          }}
        >
          Продовжити
        </Button>
        <Button
          sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
          onClick={LoginDialog_close}
        >
          Вийти
        </Button>
      </DialogActions>
    </Dialog>
  );
}
