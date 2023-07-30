import React from "react";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import { Box, Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
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
        <ReportGmailerrorredIcon sx={{ height: 60, width: 60 }} />

        <Typography variant="h3" fontFamily={"Comfortaa"}>
          Схоже сайт не знає що вам відповісти...
        </Typography>
        <Link sx ={{cursor: "pointer"}} onClick={() => navigate('/')} variant="h3" fontFamily={"Comfortaa"}>
          На головну
        </Link>
      </Box>
    </Box>
  );
};

export default NotFoundPage;
