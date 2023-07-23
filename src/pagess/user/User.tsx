import {
  Avatar,
  Box,
  Button,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Typography,
} from "@mui/material";
import React, {  useRef, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import LogoutDialog from "../../componentss/dialogs/LogoutDialog";
import ErrorDialog from "../../componentss/dialogs/ErrorDialog";
import { Update, UploadAvatar, checkAuthorization } from "../../redux/user/asyncActions";
import InfoDialog from "../../componentss/dialogs/InfoDialog";
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function User() {
  const { user } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<string>(user.email);
  const [password, setPassword] = useState<string>("");
  const [image, setImage] = useState<string>(user.avatar);
  const [fullName, setFullName] = useState<string>(user.name);
  const [passVisible, setPassVisible] = useState(true);

  const [errorMessage, setErrorMessage] = useState<string>("Unhandled error");
  const [infoMessage, setInfoMessage] = useState<string>("Some info");

  const [openLogout, setOpenLogout] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  

  const avatarFileRef = useRef<HTMLInputElement | null>(null);

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

  function closeInfoDialog() {
    setOpenInfo(false);
  }
  function openInfoDialog() {
    setOpenInfo(true);
  }

  async function handleImageChange(e: any){
    setImage(e.target.files[0]);
    try {

      const formData = new FormData();
      formData.append('image', e.target.files[0])
      dispatch(UploadAvatar(formData))

      
    } catch (error: any) {
      openErrorDialog();
      setErrorMessage(error.message);
    }

  }

  function handleClickShowPassword (){
    setPassVisible((passVisible) => !passVisible);
  } 


  function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function handleUserChanges() {
    

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

    try {
      dispatch(Update(
        {
          email: email,
          fullName: fullName,
          role: user.role,
          password: password,
          avatarUrl: image,
        }
      )).then((result: any) => {
        console.log("result.status " + result.meta.requestStatus);
        if (result.meta.requestStatus === "fulfilled") {
          openInfoDialog();
          setInfoMessage("Дані було оновлено");
          dispatch(checkAuthorization())
        } else if (result.meta.requestStatus === "rejected") {
          openErrorDialog();
          setErrorMessage("Схоже при оновленні данних виникла помилка");
        }
      });
    } catch (error: any) {
      openErrorDialog();
      setErrorMessage(error);
    }
    
  }

  function handleLoadImageClick(){
    if(avatarFileRef.current){
      avatarFileRef.current.click();
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
          <Box padding={3} display={'flex'} alignItems={'center'} flexDirection={'column'} height={200} justifyContent={'space-around'}>
            {
              user.avatar === undefined 
              ? <Avatar sx = {{width: 100, height: 100}}/>
              : <img src={user.avatar} alt="user_avatar" style = {{width: 100, height: 100}} />
              
            }
            
            <input hidden  ref = {avatarFileRef} color='warning' type="file" onChange={handleImageChange} />
            <Button
              color="warning"
              variant="contained"
              sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
              onClick={handleLoadImageClick}
            >
              Змінити аватар
            </Button>
          </Box>
          <Box padding={3}>
            <InputLabel>Iм'я</InputLabel>
            <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
            <FormHelperText sx={{ fontSize: 15 }}>
              Наразі ви - {user.name}
            </FormHelperText>
          </Box>
          
          <Box padding={3}>
            <InputLabel>Пошта</InputLabel>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            <FormHelperText sx={{ fontSize: 15 }}>
              Ми ніколи не розголошуватимемо вашу електронну пошту.
            </FormHelperText>
          </Box>
          <Box padding={3}>
            <InputLabel >Пароль</InputLabel>
            <Input
            
              value={password}
              type = {passVisible ? 'password' : 'text'}
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
              onClick={handleUserChanges}
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
        <InfoDialog
        openInfo={openInfo}
        closeInfoDialog={closeInfoDialog}
        infoMessage={infoMessage}
      />
      </Box>
    </>
  );
}
