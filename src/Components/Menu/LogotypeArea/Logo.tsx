import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import { useNavigate } from "react-router-dom";
import socket_logo from "../../../assets/img/socket_logo.png";
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';

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
      
      {/* <Box width={45} height={45} paddingTop={0.3}>
        <ElectricalServicesIcon sx = {{width : "100%", height : "100%"}}/>
      </Box> */}
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
