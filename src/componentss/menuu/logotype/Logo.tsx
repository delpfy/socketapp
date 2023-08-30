import React from "react";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export const Logo = () => {
  const navigate = useNavigate();
  return (
    <Box
      
      flexDirection={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      color={"black"}
      width={137}
    
      /* paddingBottom={1} */
      onClick={() => navigate("/")}
      sx={{ cursor: "pointer", color: "white", transition: "transform 0.3s ease",
      "&:hover": {
        transform: "translateY(-3px)",
      },
      "&:active": {
        transform: "translateY(0)",
      },
      
      display: {
        xs: 'none',
        md: 'flex'
      }
    }}
      
    >
      <Typography
        variant={"h3"}
        fontSize={30}
        height={30}
      
        /* paddingTop={1} */
        fontFamily={"'Roboto light', sans-serif"}
      >
        Socket
      </Typography>
      <Typography
        variant={"h3"}
        fontSize={20}
        height={20}
        paddingBottom={3}
        fontFamily={"'Roboto light', sans-serif"}
      >
        .store
      </Typography>
    </Box>
  );
};

export default Logo;
