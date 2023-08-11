import {
  DialogActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  Typography,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputAdornment,
  IconButton,
  OutlinedInput,
  CircularProgress,
} from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { Register } from "../../redux/user/asyncActions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { NullifyToken } from "../../redux/user/userSlice";
import { Visibility, VisibilityOff } from "@mui/icons-material";

type Props = {
  ErrorDialog_open: Dispatch<SetStateAction<any>>;
  setErrorMessage: (message: string) => void;
  openRegister: boolean;
  closeRegisterDialog: () => void;
  closeRegAfterSuccess: () => void;
  LoginDialog_open: () => void;
};

export default function RegisterDialog({
  ErrorDialog_open,
  setErrorMessage,
  LoginDialog_open,
  openRegister,
  closeRegisterDialog,
  closeRegAfterSuccess,
}: Props) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [passVisible, setPassVisible] = useState(true);
  const { confirmEmail_status } = useAppSelector((state) => state.user);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRole(event.target.value);
  };

  const dispatch = useAppDispatch();

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
      ErrorDialog_open(true);
      setErrorMessage("Некоректний формат пошти");
      return;
    }

    if (fullName.length < 3 || fullName.length > 20) {
      ErrorDialog_open(true);
      setErrorMessage(
        "Ім'я має бути завдовжки мінімум 3 символа та максимум 20"
      );
      return;
    }

    if (password.length < 5) {
      ErrorDialog_open(true);
      setErrorMessage("Пароль має бути завдовжки мінімум 5 символів");
      return;
    }

    const validRoles = ["customer"];
    if (!validRoles.includes(role)) {
      ErrorDialog_open(true);
      setErrorMessage("Ви не обрали ролі");
      return;
    }

    try {
      dispatch(NullifyToken());
      dispatch(
        Register({
          email: email,
          fullName: fullName.replace(/\s+/g, " "),
          role: role,
          password: password,
          avatarUrl: "",
          expences: 0,
        })
      ).then((result: any) => {
        console.log("result.status " + result.meta.requestStatus);
        if (result.meta.requestStatus === "fulfilled") {
          closeRegAfterSuccess();
        } else if (result.meta.requestStatus === "rejected") {
          ErrorDialog_open(true);
          setErrorMessage(
            "Схоже при реєстрації виникла помилка. Це може бути пов'язано с тим, що ви ввели або неіснуючу пошту, або вже зареєстровану"
          );
        }
      });
    } catch (error: any) {
      ErrorDialog_open(true);
      setErrorMessage(error);
    }
  }

  function handleClickShowPassword() {
    setPassVisible((passVisible) => !passVisible);
  }

  return (
    <Dialog open={openRegister} onClose={closeRegisterDialog}>
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
            onClick={LoginDialog_open}
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
        {confirmEmail_status === "pending" ? (
          <CircularProgress size={20} />
        ) : (
          <Button
            sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
            onClick={() => RedirectRegister(email, fullName, role, password)}
          >
            Продовжити
          </Button>
        )}

        <Button
          sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
          onClick={closeRegisterDialog}
        >
          Вийти
        </Button>
      </DialogActions>
    </Dialog>
  );
}
