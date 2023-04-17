import React from "react";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import { Box, Typography } from "@mui/material";

export const NotFoundPage = () => {
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
        <ReportGmailerrorredIcon sx={{ height: 60, width: 60 }} />

        <Typography variant="h3" fontFamily={"Comfortaa"}>
          Failed to load page
        </Typography>
      </Box>
    </Box>
  );
};

export default NotFoundPage;
