import {
  Box,
  Button,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Card from "../../componentss/categories/CategoryTile";
import "./icon.css";
import RecentlyReviewed from "../../componentss/RecentlyReviewed";
import {
  setAfterOrder,
  synchronizeBasket,
} from "../../redux/basket/basketSlice";
import { setEditItemMode } from "../../redux/home/homeSlice";
import Carousel from "react-material-ui-carousel";
import PromotionalOffers from "../../componentss/PromotionalOffers";
import NewItems from "../../componentss/NewItems";
import SalesHit from "../../componentss/SalesHit";
import RatingHit from "../../componentss/RatingHit";

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
  const { categories, editItemMode } = useAppSelector((state) => state.home);
  const { afterOrder } = useAppSelector((state) => state.basket);
  const theme = useTheme();
  const isXsScreen = useMediaQuery(theme.breakpoints.down("xs"));

  const dispatch = useAppDispatch();
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

  useEffect(() => {
    window.scrollTo(0, 0);
    if (afterOrder) {
      dispatch(synchronizeBasket());
      dispatch(setAfterOrder(false));
    }
    if (editItemMode) {
      dispatch(setEditItemMode(false));
    }
  }, []);

  return (
    <>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        margin={"auto"}
        top={127}
        padding={"2%"}
        alignSelf={"center"}
        sx={{
          height: {
            xs: 160,
            md: 460,
          },
          width: {
            xs: 340,
            md: "75%",
          },
          background: " black",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Carousel
          navButtonsAlwaysVisible
          navButtonsProps={{
            style: {
              backgroundColor: isXsScreen ? "black" : "transparent",
              borderRadius: 0,
              display: isXsScreen ? "none" : "block",
            },
          }}
          NextIcon={
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <img
                style={{ width: 40, height: 40 }}
                src={require("../../img/swipeRightIcon.png")}
              />
            </Box>
          }
          PrevIcon={
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <img
                style={{ width: 40, height: 40 }}
                src={require("../../img/swipeLeftIcon.png")}
              />
            </Box>
          }
          sx={{
            color: "#fff",
            width: {
              xs: "100%",
              lg: "100%",
            },
            height: {
              xs: 160,
              md: 460,
            },
            display: "flex",
            alignItems: "center",
            textAlign: "left",
            justifyContent: "space-around",
            flexDirection: "column",
            margin: "auto",
            boxSizing: "border-box",
          }}
        >
          <Box
           
            sx={{
              color: "#fff",
              width: {
                xs: "90%",
                lg: "80%",
              },
              height: {
                xs: 160,
                md: 460,
              },
              display: "flex",
              alignItems: "center",
              textAlign: "left",
              justifyContent: "space-around",
              flexDirection: "column",
              margin: "auto",
              boxSizing: "border-box",
            }}
          >
            <Box
              display={"flex"}
              sx={{
                
                margin: "0 auto",
              }}
              width={"100%"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"flex-start"}
            >
              <Box
                sx={{
                  height: {
                    xs: "50%",
                    md: "30%",
                  },
                  paddingTop: {
                    xs: "0%",
                    md: "5%",
                  },
                }}
                display={"flex"}
                alignItems={"flex-start"}
                flexDirection={"column"}
                justifyContent={"space-between"}
              >
                <Typography
                  variant={"h3"}
                  sx={{
                    fontSize: {
                      xs: 14,
                      md: 36,
                    },
                    height: {
                      xs: 35,
                      md: 36,
                    },
                  }}
                  fontFamily={"Comfortaa"}
                >
                  Отримай кешбек <br /> 1% вартості товару
                </Typography>
                <Typography
                  variant={"h3"}
                  display={"flex"}
                  alignItems={"center"}
                  sx={{
                    fontSize: {
                      xs: 10,
                      md: 16,
                    },
                    height: {
                      xs: 35,
                      md: 35,
                    },
                  }}
                  fontFamily={"Comfortaa"}
                >
                  кешбек 1% при <br /> оплаті карткою Приват24
                </Typography>
              </Box>
              <Box
                sx={{
                  height: {
                    xs: 135,
                    md: 460,
                  },
                  width: {
                    xs: 135,
                    md: 460,
                  },
                }}
              >
                <img
                  src={require("../../img/socketHandImage.png")}
                  style={{
                    width: "inherit",
                    height: "inherit",
                    objectFit: "cover",
                  }}
                  alt="sdf"
                />
              </Box>
            </Box>
          </Box>
          <Box
           
            sx={{
              color: "#fff",
              width: {
                xs: "90%",
                lg: "80%",
              },
              height: {
                xs: 160,
                md: 460,
              },
              display: "flex",
              alignItems: "center",
              textAlign: "left",
              justifyContent: "space-around",
              flexDirection: "column",
              margin: "auto",
              boxSizing: "border-box",
            }}
          >
            <Box
              display={"flex"}
              sx={{
                
                margin: "0 auto",
              }}
              width={"100%"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"flex-start"}
            >
              <Box
                sx={{
                  height: {
                    xs: "50%",
                    md: "30%",
                  },
                  paddingTop: {
                    xs: "0%",
                    md: "5%",
                  },
                }}
                display={"flex"}
                alignItems={"flex-start"}
                flexDirection={"column"}
                justifyContent={"space-between"}
              >
                <Typography
                  variant={"h3"}
                  sx={{
                    fontSize: {
                      xs: 14,
                      md: 36,
                    },
                    height: {
                      xs: 35,
                      md: 36,
                    },
                  }}
                  fontFamily={"Comfortaa"}
                >
                  Отримай кешбек <br /> 1% вартості товару
                </Typography>
                <Typography
                  variant={"h3"}
                  display={"flex"}
                  alignItems={"center"}
                  sx={{
                    fontSize: {
                      xs: 10,
                      md: 16,
                    },
                    height: {
                      xs: 35,
                      md: 35,
                    },
                  }}
                  fontFamily={"Comfortaa"}
                >
                  кешбек 1% при <br /> оплаті карткою Приват24
                </Typography>
              </Box>
              <Box
                sx={{
                  height: {
                    xs: 135,
                    md: 460,
                  },
                  width: {
                    xs: 135,
                    md: 460,
                  },
                }}
              >
                <img
                  src={require("../../img/socketHandImage.png")}
                  style={{
                    width: "inherit",
                    height: "inherit",
                    objectFit: "cover",
                  }}
                  alt="sdf"
                />
              </Box>
            </Box>
          </Box>
        </Carousel>

        {/* <Box marginTop={10} onClick={() => executeScroll()}>
          <div className="bouncing-icon-container">
            <ExpandMoreIcon
              color="info"
              sx={{ height: 70, width: 70, animation: "bounce 2s infinite" }}
            />
          </div>
        </Box> */}
      </Box>
      <Box
        width={"90%"}
        margin={"0 auto"}
        paddingTop={20}
        sx={{ display: { xs: "flex", md: "none" } }}
      >
        <Button
          fullWidth
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            background: "black",
            color: "white",
          }}
          variant="outlined"
        >
          <img
            src={require("../../img/cleverIcon.png")}
            style={{ width: 18, height: 18 }}
            alt="sdf"
          />
          <Typography width={"100%"} fontSize={14}>
            Категорії товарів
          </Typography>{" "}
        </Button>
      </Box>
      <Box width={"85%"} margin={"0 auto"} alignSelf={"center"}>
        <Box
          width={"100%"}
          height={"100%"}
          flexDirection={"column"}
          alignItems={"center"}
          textAlign={"center"}
          sx={{
            display: {
              xs: "none",
              md: "flex",
            },
            marginTop: {
              xs: 3,
              md: "12%",
            },
          }}
        >
          <Grid
            container
            padding={"2%"}
            justifyContent="center"
            spacing={{ xs: 1, sm: 3, md: 4 }}
            columns={{ xs: 2, sm: 2, md: 16, lg: 20, xl: 20 }}
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
                      md: 0,
                    },
                  }}
                  xs={2}
                  sm={2}
                  md={4}
                  lg={4}
                  xl={4}
                  key={item.id}
                >
                  <Card category={item.name} image={item.image} />
                </Grid>
              )
            )}
          </Grid>
        </Box>
      </Box>
      <Box width={"100%"}>
        <Typography
          variant={"h3"}
          fontSize={37}
          fontFamily={"Comfortaa"}
          sx={{
            marginTop: {
              xs: 3,
              md: 20,
            },
          }}
          paddingBottom={2}
          textAlign={"center"}
        >
          Aкційні пропозиції
        </Typography>
        <PromotionalOffers />
      </Box>
      <Box width={"100%"}>
        <Typography
          variant={"h3"}
          fontSize={37}
          fontFamily={"Comfortaa"}
          paddingTop={7}
          paddingBottom={2}
          textAlign={"center"}
        >
          Новинки
        </Typography>
        <NewItems />
      </Box>
      <Box width={"100%"}>
        <Typography
          variant={"h3"}
          fontSize={37}
          fontFamily={"Comfortaa"}
          paddingTop={7}
          paddingBottom={2}
          textAlign={"center"}
        >
          Топ продаж
        </Typography>
        <SalesHit />
      </Box>
      <Box width={"100%"}>
        <Typography
          variant={"h3"}
          fontSize={37}
          fontFamily={"Comfortaa"}
          paddingTop={7}
          paddingBottom={2}
          textAlign={"center"}
        >
          Топ рейтинг
        </Typography>
        <RatingHit />
      </Box>
      <Box width={"100%"}>
        {recentlyReviewed === undefined || recentlyReviewed.length === 0 ? (
          <></>
        ) : (
          <>
            <Typography
              variant={"h3"}
              fontSize={37}
              fontFamily={"Comfortaa"}
              paddingTop={7}
              paddingBottom={4}
              textAlign={"center"}
            >
              Було переглянуто
            </Typography>
            <RecentlyReviewed />
          </>
        )}
      </Box>
    </>
  );
};
