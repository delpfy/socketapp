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
} from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { Register } from "../../redux/user/asyncActions";
import { useAppDispatch } from "../../redux/hooks";
import { NullifyToken } from "../../redux/user/userSlice";

type Props = {
  openErrorDialog: Dispatch<SetStateAction<any>>;
  setErrorMessage: (message: string) => void;
  openRegister: boolean;
  closeRegisterDialog: () => void;
  closeRegAfterSuccess: () => void
  openLoginDialog: () => void;
};

export default function LoginDialog({
  openErrorDialog,
  setErrorMessage,
  openLoginDialog,
  openRegister,
  closeRegisterDialog,
  closeRegAfterSuccess,
}: Props) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");

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
      openErrorDialog(true);
      setErrorMessage("Некоректний формат пошти");
      return;
    }

    if (fullName.length < 3) {
      openErrorDialog(true);
      setErrorMessage("Ім'я має бути завдовжки мінімум 3 символа");
      return;
    }

    if (password.length < 5) {
      openErrorDialog(true);
      setErrorMessage("Пароль має бути завдовжки мінімум 5 символів");
      return;
    }

    const validRoles = ["customer"];
    if (!validRoles.includes(role)) {
      openErrorDialog(true);
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
          avatarUrl: '',
          expences: 0,
        })
      ).then((result: any) => {
        console.log("result.status " + result.meta.requestStatus);
        if (result.meta.requestStatus === "fulfilled") {
          closeRegAfterSuccess();
        } else if (result.meta.requestStatus === "rejected") {
          openErrorDialog(true);
          setErrorMessage("Схоже при реєстрації виникла помилка");
        }
      });
    } catch (error: any) {
      openErrorDialog(true);
      setErrorMessage(error);
    }
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
          onClick={closeRegisterDialog}
        >
          Вийти
        </Button>
      </DialogActions>
    </Dialog>
  );
}
