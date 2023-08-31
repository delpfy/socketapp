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
  const [registerForm, setRegisterForm] = useState({
    email: "",
    passFirst: "",
    passSecond: "",
    fullName: "",
    role: "",
  });

  const [passVisible, setPassVisible] = useState(true);
  const { confirmEmail_status } = useAppSelector((state) => state.user);
  const [passError, setPassError] = useState(false);

  const dispatch = useAppDispatch();

  function handleRegisterFormChange(e: any) {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  }

  function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function RedirectRegister() {
    if (!validateEmail(registerForm.email)) {
      ErrorDialog_open(true);
      setErrorMessage("Некоректний формат пошти");
      return;
    }

    if (registerForm.fullName.length < 3 || registerForm.fullName.length > 20) {
      ErrorDialog_open(true);
      setErrorMessage(
        "Ім'я має бути завдовжки мінімум 3 символа та максимум 20"
      );
      return;
    }
    const valid = registerForm.passFirst === registerForm.passSecond;
    if (valid) {
      setPassError(false);
      if (registerForm.passFirst.length < 5) {
        ErrorDialog_open(true);
        setErrorMessage("Пароль має бути завдовжки мінімум 5 символів");
        return;
      }
    } else {
      setPassError(true);
      ErrorDialog_open(true);
      setErrorMessage("Паролі не співпадають");
      return;
    }

    const validRoles = ["customer", "manager"];
    if (!validRoles.includes(registerForm.role)) {
      ErrorDialog_open(true);
      setErrorMessage("Ви не обрали ролі");
      return;
    }

    try {
      dispatch(NullifyToken());
      dispatch(
        Register({
          email: registerForm.email,
          fullName: registerForm.fullName.replace(/\s+/g, " "),
          role: registerForm.role,
          password: registerForm.passFirst,
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
          name="email"
          value={registerForm.email}
          fullWidth
          variant="standard"
          onChange={handleRegisterFormChange}
        />
        <TextField
          autoFocus
          margin="dense"
          id="fullName"
          label="Ваше гарне ім'я"
          type="name"
          name="fullName"
          value={registerForm.fullName}
          fullWidth
          variant="standard"
          onChange={handleRegisterFormChange}
        />

        <OutlinedInput
          autoFocus
          margin="dense"
          id="password"
          sx={{ marginTop: 2, marginBottom: 2 }}
          placeholder="Пароль"
          value={registerForm.passFirst}
          name="passFirst"
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
          onChange={handleRegisterFormChange}
          error={passError}
        />
        <OutlinedInput
          autoFocus
          margin="dense"
          id="password"
          sx={{ marginTop: 2, marginBottom: 2 }}
          placeholder="Пароль"
          value={registerForm.passSecond}
          name="passSecond"
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
          onChange={handleRegisterFormChange}
          error={passError}
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
              name="role"
              control={<Radio onChange={handleRegisterFormChange} />}
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
            onClick={RedirectRegister}
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
