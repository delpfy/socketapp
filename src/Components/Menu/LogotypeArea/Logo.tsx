import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import socket_logo from "../../../assets/img/socket_logo.png";
import PowerTwoToneIcon from '@mui/icons-material/PowerTwoTone';
import "./logo.scss";

export const Logo = () => {
  const navigate = useNavigate();
  return (
    
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent = {'space-between'}
        alignItems = {'center'}
        color={'black'}
        width={135}
        
        onClick = {() => navigate('/socketapp')}
        sx={{ cursor: 'pointer'}}
      >
        <Typography 
        variant={"h3"} 
        fontSize={35}
        height = {35}
        fontFamily={"Comfortaa"}
        >
          S
        </Typography>
        <Box
        width = {35}
        height = {35}
        paddingTop={0.3}
        >
          <img src={socket_logo} alt="logo" style={{display: 'flex', width: '100%', height: '100%'}} />
        </Box>
        <Typography 
        variant={"h3"} 
        fontSize={35}
        height = {35}
        fontFamily={"Comfortaa"}
        >
          cket
        </Typography>
      </Box>
   
  );
};

export default Logo;
