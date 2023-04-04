import { Box, IconButton, Typography } from "@mui/material";

import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { checkAuthorization } from "../../../redux/user/asyncActions";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LockPersonRoundedIcon from "@mui/icons-material/LockPersonRounded";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


export const Basket = () => {
  const { user } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  function Redirect() {
    dispatch(checkAuthorization());
    if (user.authorized == true) {
      navigate("/socketapp/basket");
    } else {
      alert("Unavailible action");
    }
  }

  const Locker = () => {
    if (user.authorized == true) {
      return (
        <AccountCircleRoundedIcon sx={{ width: 40, height: 40 }} />
      );
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
          width={200}
        >
          <Typography variant={"h2"} component={"h2"} fontSize={35}>
            {user.expences === 0 ? "" : user.expences + "₴"}
          </Typography>
          <IconButton onClick={() => Redirect()}>
            <ShoppingCartIcon sx={{ width: 40, height: 40 }} />
          </IconButton>
        </Box>
        <Box>
          <IconButton onClick={() => Redirect()}>
            <Locker />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

export default Basket;
