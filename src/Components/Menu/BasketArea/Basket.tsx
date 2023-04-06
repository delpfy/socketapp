import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";

import React from "react";

import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { checkAuthorization } from "../../../redux/user/asyncActions";

import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LockPersonRoundedIcon from "@mui/icons-material/LockPersonRounded";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export const Basket = () => {
  const { user } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [openLogin, setOpenLogin] = React.useState(false);

  const openLoginDialog = () => {
    setOpenLogin(true);
  };

  const closeLoginDialog = () => {
    setOpenLogin(false);
  };

  function Redirect() {
    dispatch(checkAuthorization());
    if (user.authorized == true) {
      navigate("/socketapp/basket");
    } else {
      alert("Unavailible action");
    }
  }

  function LoginDialog() {
    return (
      <>
        <Dialog
          open={openLogin}
          onClose={() => {
            setOpenLogin(false);
          }}
        >
          <DialogTitle>Login required</DialogTitle>
          <DialogContent>
            <DialogContentText display={"flex"} flexDirection={"row"}>
              To get access to this option, please login or
              <Typography
                color={"#1976d2"}
                sx={{
                  cursor: "pointer",
                  paddingLeft: 0.6,
                }}
              >
                register
              </Typography>
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="fullName"
              label="Name"
              type="name"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeLoginDialog}>Cancel</Button>
            <Button onClick={Redirect}>Login</Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }

  const Locker = () => {
    if (user.authorized == true) {
      return <AccountCircleRoundedIcon sx={{ width: 40, height: 40 }} />;
    } else {
      return <LockPersonRoundedIcon sx={{ width: 40, height: 40 }} />;
    }
  };

  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        width={200}
      >
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          width={180}
        >
          <Typography variant={"h2"} component={"h2"} fontSize={35}>
            {user.expences === 0 ? "" : user.expences + "₴"}
          </Typography>
          <IconButton onClick={() => Redirect()}>
            <ShoppingCartIcon sx={{ width: 40, height: 40 }} />
          </IconButton>
        </Box>
        <Box>
          <IconButton onClick={() => openLoginDialog()}>
            <Locker />
            <LoginDialog />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

export default Basket;
