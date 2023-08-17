import React from "react";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import { Box, CircularProgress, Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const LoadingPage = () => {
  const navigate = useNavigate();
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
        

        <Typography variant="h3" fontFamily={"Comfortaa"}>
          Чекайте...
        </Typography>
        <CircularProgress size={70} sx= {{padding: 10}}/>;
      </Box>
    </Box>
  );
};

export default LoadingPage;
