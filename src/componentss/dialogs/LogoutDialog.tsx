import {
    DialogActions,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    Button,
  } from "@mui/material";
  import React from "react";
import { useAppDispatch } from "../../redux/hooks";
import { NullifyToken } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
  
  type Props = {
    openLogout: boolean;
    closeLogoutDialog: () => void;
  };
  
  export default function LogoutDialog({
    openLogout,
    closeLogoutDialog,

  }: Props) {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    function Logout() {
        closeLogoutDialog();
        dispatch(NullifyToken());
        navigate('/')
    }

    return (
        <Dialog open={openLogout} onClose={closeLogoutDialog}>
        <DialogTitle sx={{ fontFamily: "Comfortaa", fontSize: 15 }}>
          Логаут
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            display={"flex"}
            flexDirection={"row"}
            sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
          >
            Ви дійсно бажаете вийти з вашого акаута?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
            onClick={() => {
              Logout();
            }}
          >
            Так, вийти
          </Button>
          <Button
            sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
            onClick={closeLogoutDialog}
          >
            Ні
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  