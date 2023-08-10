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
  import { Dispatch, SetStateAction, useEffect, useState } from "react";
  import { Authorize, UpdatePassword, checkAuthorization } from "../../redux/user/asyncActions";
  import { useAppDispatch, useAppSelector } from "../../redux/hooks";
  import { VisibilityOff, Visibility } from "@mui/icons-material";
import User from "../../pagess/user/User";
  
  type Props = {
    ErrorDialog_open: Dispatch<SetStateAction<any>>;
    ResetPasswordDialog_open: Dispatch<SetStateAction<any>>;

    InfoDialog_open: Dispatch<SetStateAction<any>>;
  setInfoMessage: (message: string) => void;

    LoginDialog_open: Dispatch<SetStateAction<any>>;
  LoginDialog_close: () => void;

    setErrorMessage: (message: string) => void;
    openResetPassword: boolean;
    ResetPasswordDialog_close: () => void;
  };
  
  export default function ResetPasswordDialog({
    ErrorDialog_open,
    setErrorMessage,
    LoginDialog_open,
    LoginDialog_close,
    InfoDialog_open,
    setInfoMessage,
    ResetPasswordDialog_open,
    openResetPassword,
    ResetPasswordDialog_close,
  }: Props) {
    const [passFirst, setPassFirst] = useState<string>("");
    const [passSecond, setPassSecond] = useState<string>("");
    const {user, passToken} = useAppSelector(state => state.user)
    const [passVisible, setPassVisible] = useState(true);
    const dispatch = useAppDispatch();
  

    function handleClickShowPassword() {
      setPassVisible((passVisible) => !passVisible);
    }

    function validatePassword() {
      const valid = passFirst === passSecond;
      if(valid){
        dispatch(UpdatePassword({email: user.email, password: passFirst})).then((result: any) => {
          if(result.meta.requestStatus === 'fulfilled'){
            InfoDialog_open(true);
            setInfoMessage("Пароль було оновлено");
            LoginDialog_open(true);
            ResetPasswordDialog_close();
          }
        })
       
      }
      else{
       ErrorDialog_open(true);
      setErrorMessage("Паролі не співпадають");
      }
    }
  
    useEffect(() => {
      setPassFirst("");
      setPassSecond("");
    }, [])
  
    return (
      <Dialog open={openResetPassword} onClose={ResetPasswordDialog_close}>
        <DialogTitle sx={{ fontFamily: "Comfortaa", fontSize: 15 }}>
          Відновлення пароля
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            display={"flex"}
            flexDirection={"row"}
            sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
          >
            Введіть новий пароль
            
          </DialogContentText>

          <OutlinedInput
          autoFocus
          margin="dense"
          id="password"
          sx={{ marginTop: 2, marginBottom: 2 }}
          placeholder="Пароль"
          value={passFirst}
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
          onChange={(e) => setPassFirst(e.target.value)}
        />

<OutlinedInput
          autoFocus
          margin="dense"
          id="password"
          sx={{ marginTop: 2, marginBottom: 2 }}
          placeholder="Пароль"
          value={passSecond}
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
          onChange={(e) => setPassSecond(e.target.value)}
        />
          
  
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
            onClick={() => {
              validatePassword();
            }}
          >
            Продовжити
          </Button>
          <Button
            sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
            onClick={ResetPasswordDialog_close}
          >
            Вийти
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  