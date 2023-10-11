import React from "react";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import { Box, Typography } from "@mui/material";

export const NoItemsPage = () => {
  return (
    <Box
      width={"100%"}
      height={200}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      paddingTop={10}
    >
      <Box
        display={"flex"}
        justifyContent={"flex-end"}
        flexDirection={"column"}
        alignItems={"center"}
        margin={"0 auto"}
        width={"100%"}
      >
        <img
          src={require("../img/cartIconBlack.png")}
          style={{ width: 215, marginBottom: 25, paddingRight: 36 }}
          alt="sdf"
        />

        <Typography
          variant="h3"
          fontSize={25}
          marginBottom={10}
          fontFamily={"Comfortaa"}
        >
          Ви ще не додали товарів
        </Typography>
      </Box>
    </Box>
  );
};

export default NoItemsPage;
