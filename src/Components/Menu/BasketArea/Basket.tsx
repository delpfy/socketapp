import { Box, Icon, IconButton, Typography } from "@mui/material";
import ShoppingBasketTwoToneIcon from "@mui/icons-material/ShoppingBasketTwoTone";
import React from "react";
import { Link } from "react-router-dom";
import basket_icon from "../../../assets/img/basket_icon.png";
import { useAppSelector } from "../../../redux/hooks";
import "./basket.scss";
import { height } from "@mui/system";
export const Basket = () => {
  const EXPENCES = useAppSelector((state) => state.basket.expences);

  return (
    <Link
      to={EXPENCES !== 0 ? "/marketplace_soket/basket" : "/marketplace_soket"}
    >
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        width={100}
      >
        <Typography variant={"h2"} component={"h2"} fontSize={35}>
          {EXPENCES === 0 ? "" : EXPENCES + "₴"}
        </Typography>
        <IconButton>
          <ShoppingBasketTwoToneIcon sx={{ width: "40px", height: "40px" }} />
        </IconButton>
      </Box>
    </Link>
  );
};

export default Basket;
