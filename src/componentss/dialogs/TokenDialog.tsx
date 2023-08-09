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
import { Authorize, checkAuthorization } from "../../redux/user/asyncActions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import User from "../../pagess/user/User";
import ResetPasswordDialog from "./ResetPasswordDialog";

type Props = {
  ErrorDialog_open: Dispatch<SetStateAction<any>>;
  TokenDialog_open: Dispatch<SetStateAction<any>>;
  setErrorMessage: (message: string) => void;
  openToken: boolean;
  TokenDialog_close: () => void;
};

export default function TokenDialog({
  ErrorDialog_open,
  setErrorMessage,
  TokenDialog_open,
  openToken,
  TokenDialog_close,
}: Props) {
  const [userToken, setUserToken] = useState<string>("");
  const { user, passToken } = useAppSelector((state) => state.user);
  const [openError, setOpenError] = useState(false);

  const [openResetPassword, setOpenResetPassword] = useState(false);
  const dispatch = useAppDispatch();

  function ResetPasswordDialog_open() {
    setOpenResetPassword(true);
  }
  function ResetPasswordDialog_close() {
    setOpenResetPassword(false);
  }

  function validateToken() {
    const valid = passToken === userToken;
    if (valid) {
      ResetPasswordDialog_open();
      TokenDialog_close();
    } else {
      ErrorDialog_open(true);
      setErrorMessage("Неправильний код");
    }
  }

  useEffect(() => {
    setUserToken("");
  }, []);

  return (
    <>
      <Dialog open={openToken} onClose={TokenDialog_close}>
        <DialogTitle sx={{ fontFamily: "Comfortaa", fontSize: 15 }}>
          Підтвердження
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            display={"flex"}
            flexDirection={"row"}
            sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
          >
            На вашу пошту {user.email}, було надіслано код підтвердження.
          </DialogContentText>
          <TextField
            margin="dense"
            label="Код"
            type="email"
            value={userToken}
            fullWidth
            variant="standard"
            onChange={(e) => setUserToken(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
            onClick={() => {
              validateToken();
            }}
          >
            Продовжити
          </Button>
          <Button
            sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
            onClick={TokenDialog_close}
          >
            Вийти
          </Button>
        </DialogActions>
      </Dialog>

      <ResetPasswordDialog
        openResetPassword={openResetPassword}
        ResetPasswordDialog_close={ResetPasswordDialog_close}
        ErrorDialog_open={ErrorDialog_open}
        ResetPasswordDialog_open={setOpenResetPassword}
        setErrorMessage={setErrorMessage}
      />
    </>
  );
}
