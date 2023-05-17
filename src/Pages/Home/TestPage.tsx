import { Box, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import Basket from "../../Components/Menu/BasketArea/Basket";
import Logo from "../../Components/Menu/LogotypeArea/Logo";

const MenuContent = () => {
  return (
    <Box
      width={"100%"}
      height={"12%"}
      position={"fixed"}
      zIndex={1}
      sx={{ backgroundColor: "black", backgroundAttachment: "fixed" }}
    >
      <Box
        width={"95%"}
        height={"90%"}
        margin={"auto"}
        justifySelf={"center"}
        display={"flex"}
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Box>
          <Logo />
        </Box>

        <Box>
          <Basket />
        </Box>
      </Box>
    </Box>
  );
};

export const TestPage = () => {
  return (
    <>
      <MenuContent />
      <Box
        width={"100%"}
        height={"100vh"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        zIndex={-1}
        sx={{
          background:
            "linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ), url(https://static.tildacdn.com/tild3736-3037-4334-b863-353562353039/d946dbce69a24e0288d5.jpg)",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Box
          width={"60%"}
          height={"52%"}
          
          zIndex={1}
          sx={{
            color: "#fff",

            display: "flex",
            alignItems: "center",
            textAlign : "center",
            justifyContent: "space-around",
            flexDirection: "column",
            padding: "20px",
            boxSizing: "border-box",
          }}
        >
          <Typography
            variant={"h3"}
            fontSize={23}
            height={23}
            fontFamily={"Comfortaa"}
          >
            Інтернет магазин сучасної техніки
          </Typography>

          <Box height={"50%"} display={"flex"} flexDirection={"column"} justifyContent={"space-around"} >
          <Typography
            variant={"h3"}
            fontSize={57}
            height={57}
            fontFamily={"Comfortaa"}
          >
            Сокет
          </Typography>
          <Typography
            variant={"h3"}
            fontSize={23}
            height={23}
            fontFamily={"Comfortaa"}
          >
            Технічний вишитий покров відкриє тобі дива, у нашому інтернет-магазині знайдеш усе для сучасного світу технологій.
          </Typography>
          </Box>
        </Box>
      </Box>
      <Box width={"80%"} height={"1300px"} margin={"auto"} padding={"150px 50px 80px 50px"} sx = {{background: "darkred"}}>
        <Box width={"100%"} height={"100%"} display={"flex"} flexDirection={"column"} alignItems={"center"}  sx = {{background: "darkblue"}} >
        <Typography
            variant={"h3"}
            fontSize={37}
            height={37}
            fontFamily={"Comfortaa"}
          >
            Категорії товарів
          </Typography>
        </Box>
      </Box>
    </>
  );
};
