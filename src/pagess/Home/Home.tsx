import { Box, Grid, Typography } from "@mui/material";
import React, { useRef } from "react";
import { useAppSelector } from "../../redux/hooks";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Card from "../../componentss/categories/CategoryTile";
import "./icon.css";
import RecentlyReviewed from "../../componentss/RecentlyReviewed";

/* const MenuContent = () => {
  return (
    <Box
      width={"100%"}
      height={"10vh"}
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
}; */

export const Home = () => {
  const { categories } = useAppSelector((state) => state.home);
  const recentlyReviewed = JSON.parse(
    localStorage.getItem("recentlyReviewed") || "{}"
  );
  const myRef = useRef<HTMLDivElement | null>(null);

  const executeScroll = () => {
    console.log("myRef.current " + myRef.current);
    if (myRef.current) {
      myRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      <Box
        width={"100%"}
        height={"100vh"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        sx={{
          background:
            "linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ), url(https://static.tildacdn.com/tild3736-3037-4334-b863-353562353039/d946dbce69a24e0288d5.jpg)",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Box
          height={"52%"}
          sx={{
            color: "#fff",
            width: {
              xs: "95%",
              lg: "70%",
            },
            display: "flex",
            alignItems: "center",
            textAlign: "center",
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

          <Box
            height={"50%"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-around"}
          >
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
              Технічний вишитий покров відкриє тобі дива, у нашому
              інтернет-магазині знайдеш усе для сучасного світу технологій.
            </Typography>
          </Box>
        </Box>
        <Box marginTop={10} onClick={() => executeScroll()}>
          <div className="bouncing-icon-container">
            <ExpandMoreIcon
              color="info"
              sx={{ height: 70, width: 70, animation: "bounce 2s infinite" }}
            />
          </div>
        </Box>
      </Box>
          <Box width={"100%"} >

         
      {recentlyReviewed.flat(1).length === 0 ? (
        <></>
      ) : (
        <>
          <Typography
            variant={"h3"}
            fontSize={37}
            fontFamily={"Comfortaa"}
            paddingTop={7}
            textAlign={"center"}
          >
            Недавно переглянуті
          </Typography>
          <RecentlyReviewed />
        </>
      )}
       </Box>
      <Box width={"80%"} margin={"auto"} padding={"100px 10px 30px "}>
        <Box
          width={"100%"}
          height={"100%"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          textAlign={"center"}
        >
          <Typography
            variant={"h3"}
            fontSize={37}
            fontFamily={"Comfortaa"}
            paddingBottom={7}
            ref={myRef}
          >
            Категорії товарів
          </Typography>

          <Grid
            container
            padding={"2%"}
            spacing={{ xs: 1, sm: 3, md: 4 }}
            columns={{ xs: 2, sm: 2, md: 4, lg: 4, xl: 10 }}
          >
            {categories.map(
              (item: { id: number; name: string; image: string }) => (
                <Grid
                  item
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  sx={{
                    paddingBottom: {
                      xs: 5,
                      md: 1,
                    },
                  }}
                  xs={2}
                  sm={2}
                  md={4}
                  lg={4}
                  xl={5}
                  key={item.id}
                >
                  <Card category={item.name} image={item.image} />
                </Grid>
              )
            )}
          </Grid>
        </Box>
      </Box>
    </>
  );
};
