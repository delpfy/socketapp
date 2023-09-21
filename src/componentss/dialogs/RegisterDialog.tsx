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
  Box,
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

    try {
      dispatch(NullifyToken());

      dispatch(
        Register({
          email: registerForm.email,
          fullName: registerForm.fullName.replace(/\s+/g, " "),
          role: "customer",
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
        Реєстрація
        <IconButton onClick={closeRegisterDialog}>
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
          paddingBottom: 1,
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
            value={registerForm.email}
            onChange={handleRegisterFormChange}
            sx={{ width: "100%", marginBottom: 2 }}
            size="small"
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
          <Typography>Ваше ім`я</Typography>
          <OutlinedInput
            margin="dense"
            type="name"
          name="fullName"
          value={registerForm.fullName}
            onChange={handleRegisterFormChange}
            sx={{ width: "100%", marginBottom: 2 }}
            size="small"
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
          sx={{ marginBottom: 2, width: "100%" }}
          size="small"
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
        
          
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: { xs: "100%", md: 430 },
          }}
        >
          <Typography>Підтвердити пароль</Typography>
          
          <OutlinedInput
          autoFocus
          margin="dense"
          id="password"
          sx={{ marginBottom: 2, width: "100%" }}
          size="small"
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
          
        </Box>
        
        {confirmEmail_status === "pending" ? (
          <CircularProgress size={20} />
        ) : (
          <Button
            sx={{
              fontFamily: "Comfortaa",
              fontSize: 15,
              marginTop: 3,
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
            onClick={RedirectRegister}
          >
            Зареєструватися
          </Button>
        )}
        <Typography
          onClick={LoginDialog_open}
          sx={{
            cursor: "pointer",
            paddingLeft: "0.6%",
            fontFamily: "Comfortaa",
            fontSize: 15,
            marginTop: 3,
          }}
        >
          Я вже маю акаунт
        </Typography>
      </DialogContent>
      <DialogContent>
        

        
      </DialogContent>
      
    </Dialog>
  );
}
