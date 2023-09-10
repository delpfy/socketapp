import { useState } from "react";
import TokenDialog from "../../componentss/dialogs/TokenDialog";
import { authorizeAdmin, setUserEmail } from "../../redux/user/userSlice";
import {
  Authorize,
  ResetPassword,
  checkAuthorization,
} from "../../redux/user/asyncActions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import ErrorDialog from "../../componentss/dialogs/ErrorDialog";
import InfoDialog from "../../componentss/dialogs/InfoDialog";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function AdminAuthorize() {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [openToken, setOpenToken] = useState(false);
  const [passVisible, setPassVisible] = useState(true);
  const { status, user_status } = useAppSelector((state) => state.user);

  const [openError, setOpenError] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("Unhandled error");
  const [infoMessage, setInfoMessage] = useState<string>("Some info");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function InfoDialog_open() {
    setOpenInfo(true);
  }

  function InfoDialog_close() {
    setOpenInfo(false);
  }
  function ErrorDialog_close() {
    setOpenError(false);
  }

  function ErrorDialog_open() {
    setOpenError(true);
  }

  function handleLoginFormChange(e: any) {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  }

  function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async function RedirectLogin() {
    if (!validateEmail(loginForm.email)) {
      ErrorDialog_open();
      setErrorMessage("Некоректний формат пошти");
      return;
    }

    if (loginForm.password.length < 5) {
      ErrorDialog_open();
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
            dispatch(authorizeAdmin(true))
            navigate("/admin");
          } else if (result_.meta.requestStatus === "rejected") {
            ErrorDialog_open();
            setErrorMessage("Ви не підтвердили пошту");
          }
        });
      } else if (result.meta.requestStatus === "rejected") {
        ErrorDialog_open();
        setErrorMessage("Схоже при авторизації виникла помилка");
      }
    });
  }

  function handleClickShowPassword() {
    setPassVisible((passVisible) => !passVisible);
  }

  return (
    <>
      <Box  paddingTop={25} paddingBottom={15} margin={'0 auto'} width={'30%'}>
        <Box sx={{ fontFamily: "Comfortaa", fontSize: 15 }}>Авторизація</Box>
        <Box>
          <TextField
            margin="dense"
            label="Пошта"
            type="email"
            name="email"
            value={loginForm.email}
            fullWidth
            variant="standard"
            onChange={handleLoginFormChange}
          />

          <OutlinedInput
            autoFocus
            margin="dense"
            id="password"
            sx={{ marginTop: 2, marginBottom: 2 }}
            placeholder="Пароль"
            value={loginForm.password}
            name="password"
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
            onChange={handleLoginFormChange}
          />
        </Box>
        <Box>
          {user_status === "pending" ? (
            <CircularProgress size={20} />
          ) : (
            <Button
              sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
              onClick={RedirectLogin}
            >
              Продовжити
            </Button>
          )}

          <Button
            sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
            onClick={() => navigate("/catalog")}
          >
            На головну
          </Button>
        </Box>
      </Box>

      <ErrorDialog
        openError={openError}
        ErrorDialog_close={ErrorDialog_close}
        errorMessage={errorMessage}
      />
      <InfoDialog
        openInfo={openInfo}
        InfoDialog_close={InfoDialog_close}
        infoMessage={infoMessage}
      />
    </>
  );
}
