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
import { Authorize, checkAuthorization } from "../../redux/user/asyncActions";
import { useAppDispatch } from "../../redux/hooks";
import { VisibilityOff, Visibility } from "@mui/icons-material";

type Props = {
  openErrorDialog: Dispatch<SetStateAction<any>>;
  openRegisterDialog: Dispatch<SetStateAction<any>>;
  openLoginDialog: Dispatch<SetStateAction<any>>;
  setErrorMessage: (message: string) => void;
  openLogin: boolean;
  closeLoginDialog: () => void;
};

export default function LoginDialog({
  openErrorDialog,
  openRegisterDialog,
  setErrorMessage,
  openLoginDialog,
  openLogin,
  closeLoginDialog,
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
      openErrorDialog(true);
      setErrorMessage("Некоректний формат пошти");
      return;
    }

    if (password.length < 5) {
      openErrorDialog(true);
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
        openLoginDialog(false);
        dispatch(checkAuthorization());
      } else if (result.meta.requestStatus === "rejected") {
        openErrorDialog(true);
        setErrorMessage("Схоже при авторизації виникла помилка");
      }
    });
  }

  function handleClickShowPassword() {
    setPassVisible((passVisible) => !passVisible);
  }

  return (
    <Dialog open={openLogin} onClose={closeLoginDialog}>
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
            onClick={openRegisterDialog}
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
          onClick={closeLoginDialog}
        >
          Вийти
        </Button>
      </DialogActions>
    </Dialog>
  );
}
