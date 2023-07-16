import React from "react";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";


export const Logo = () => {
  const navigate = useNavigate();
  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      color={"black"}
      width={135}
      onClick={() => navigate("/")}
      
      sx={{ cursor: "pointer", color: "white" }}
    >
      
      <Typography
        variant={"h3"}
        fontSize={30}
        height={30}
        fontFamily={"Comfortaa"}
      >
        Socket
      </Typography>
    </Box>
  );
};

export default Logo;
