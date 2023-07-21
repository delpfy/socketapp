import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import LogoutDialog from "../../componentss/dialogs/LogoutDialog";
import ErrorDialog from "../../componentss/dialogs/ErrorDialog";

export default function User() {
  const { user } = useAppSelector((state) => state.user);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");

  const [errorMessage, setErrorMessage] = useState<string>("Unhandled error");
  const [openLogout, setOpenLogout] = useState(false);
  const [openError, setOpenError] = useState(false);

  function openLogoutDialog() {
    setOpenLogout(true);
  }

  function closeLogoutDialog() {
    setOpenLogout(false);
  }

  function closeErrorDialog() {
    setOpenError(false);
  }
  function openErrorDialog() {
    setOpenError(true);
  }

  function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function handleUserChanges(
    email: string,
    fullName: string,
    password: string
  ) {
    

    if (fullName.length < 3) {
      openErrorDialog();
      setErrorMessage("Ім'я має бути завдовжки мінімум 3 символа");
      return;
    }

    if (!validateEmail(email)) {
      openErrorDialog();
      setErrorMessage("Некоректний формат пошти");
      return;
    }

    if (password.length < 5) {
      openErrorDialog();
      setErrorMessage("Пароль має бути завдовжки мінімум 5 символів");
      return;
    }
  }

  return (
    <>
      <Box
        sx={{ paddingTop: { xs: "25%", md: "15%", lg: "9%" } }}
        width={"100%"}
      >
        <Typography fontFamily={"Comfortaa"} textAlign={"center"} fontSize={32}>
          Особистий кабінет
        </Typography>

        <Box padding={3}>
          <Box padding={3}>
            <InputLabel>Iм'я</InputLabel>
            <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
            <FormHelperText sx={{ fontSize: 15 }}>
              Наразі ви - {user.name}
            </FormHelperText>
          </Box>
          <Box padding={3}>
            <InputLabel>Аватар</InputLabel>
            <Input />
          </Box>
          <Box padding={3}>
            <InputLabel>Пошта</InputLabel>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            <FormHelperText sx={{ fontSize: 15 }}>
              Ми ніколи не розголошуватимемо вашу електронну пошту.
            </FormHelperText>
          </Box>
          <Box padding={3}>
            <InputLabel>Пароль</InputLabel>
            <Input
              value={password}
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
              onClick={() => handleUserChanges(fullName, email, password)}
            >
              Зберігти зміни
            </Button>

            <Button
              variant="contained"
              color="error"
              sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
              onClick={openLogoutDialog}
            >
              Вийти з аккаута
            </Button>
          </Box>
        </Box>
        <LogoutDialog
          openLogout={openLogout}
          closeLogoutDialog={closeLogoutDialog}
        />
        <ErrorDialog
          openError={openError}
          closeErrorDialog={closeErrorDialog}
          errorMessage={errorMessage}
        />
      </Box>
    </>
  );
}
