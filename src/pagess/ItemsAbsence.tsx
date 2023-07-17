import React from "react";
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { Box, Typography } from "@mui/material";

export const NoItemsPage = () => {
  return (
    <Box
      width={"100%"}
      height={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box
        display={"flex"}
        justifyContent={"space-around"}
        flexDirection={"column"}
        alignItems={"center"}
        textAlign={"center"}
        maxHeight={150}
      >
        <ProductionQuantityLimitsIcon sx={{ height: 60, width: 60 }} />

        <Typography variant="h3" fontFamily={"Comfortaa"}>
          Ви поки що не додали продуктів
        </Typography>
      </Box>
    </Box>
  );
};

export default NoItemsPage;
