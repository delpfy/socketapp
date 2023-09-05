import React from "react";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export const LogoFooter = () => {
  const navigate = useNavigate();
  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      color={"black"}
      width={137}
      /* paddingBottom={1} */
      onClick={() => navigate("/")}
      sx={{ cursor: "pointer", color: "white" }}
    >
      <Typography
        variant={"h3"}
        
        height={42}
        sx = {{
          fontSize: {
            xs: 26,
            md: 42,
          }
        }}
      
        /* paddingTop={1} */
        fontFamily={"'Roboto light', sans-serif"}
      >
        Socket
      </Typography>
      <Typography
        variant={"h3"}
        
        sx = {{
          fontSize: {
            xs: 22,
            md: 32,
          }
        }}
        height={32}
        paddingBottom={3}
        fontFamily={"'Roboto light', sans-serif"}
      >
        .store
      </Typography>
    </Box>
  );
};

export default LogoFooter;
