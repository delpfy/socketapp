import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Breadcrumbs,
  Button,
  Grid,
  Link,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { Items, Status } from "../../../redux/types";
import {
  getCategoryBySlug,
  getItemsByCategory,
} from "../../../redux/home/asyncActions";
import ReactGA from "react-ga4";
import Card from "../block/CatalogCard";
import Skeleton from "../block/CatalogSkeleton";
import NotFoundPage from "../../../pagess/PageAbsence";
import { useNavigate, useParams } from "react-router-dom";
import {
  setAfterOrder,
  synchronizeBasket,
} from "../../../redux/basket/basketSlice";
import {
  SetCategory,
  SetCategorySlug,
  setEditItemMode,
} from "../../../redux/home/homeSlice";
import HomeCard from "../block/HomeCard";
import SortBy from "../../sort/SortBy";
import HomeSkeleton from "../block/HomeSkeleton";

type Anchor = "top" | "left" | "bottom" | "right";

export const CatalogField = () => {
  const { category, status, editItemMode } = useAppSelector(
    (state) => state.home
  );
  const { afterOrder } = useAppSelector((state) => state.basket);
  const { category_slug } = useParams();
  const [active, setActive] = React.useState(false);
  // ItemsDisplay has {items: [{...}]} field in it, so we trying to get
  // exactly that field.
  const { itemsCategory, itemsSorted, sorted } = useAppSelector(
    (state) => state.home
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setActive(open);
    };

  const list = (anchor: Anchor) => (
    <Box paddingLeft={2} paddingTop={4} width={310}>
      <SortBy />
    </Box>
  );

  // Trying to make request to get items from same category.
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getCategoryBySlug(category_slug as string)).then((result: any) => {
      if (result.meta.requestStatus === "fulfilled") {
        console.log(result.payload);
        dispatch(SetCategory(result.payload.name));
        dispatch(SetCategorySlug(category_slug as string));
        dispatch(getItemsByCategory(result.payload.name));
      }
    });
  }, [category, dispatch]);

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
    
    window.scrollTo(0, 0);
    if (afterOrder) {
      dispatch(synchronizeBasket());
      dispatch(setAfterOrder(false));
    }
    if (editItemMode) {
      dispatch(setEditItemMode(false));
    }
    
  }, []);

  function redirectToAddItemPage() {
    navigate("/add-item");
  }

  const CatalogSkeletons = () => {
    return (
      <>
        <React.Fragment>
          <SwipeableDrawer
            anchor={"left"}
            open={active}
            onClose={toggleDrawer("left", false)}
            onOpen={toggleDrawer("left", true)}
          >
            {list("left")}
          </SwipeableDrawer>
        </React.Fragment>
        <Box width={"100%"}>
          <Box
            display={"flex"}
            justifyContent={"flex-end"}
            alignItems={"center"}
            flexDirection={"column"}
            paddingTop={12}
          >
            <Box
              width={"100%"}
              alignSelf={"flex-end"}
              paddingBottom={3}
              sx={{
                display: "flex",
                justifyContent: {
                  xs: "space-around",
                  md: "space-between",
                },
                margin: {
                  xs: "0 auto",
                  sm: "0 auto",
                  md: "0",
                },
                marginBottom: 3,
                alignItems: "center",
                borderBottom:
                  window.innerWidth > 1024 ? "2px solid black" : "none",
              }}
            >
              <Breadcrumbs aria-label="breadcrumb">
                <Link fontSize={20} underline="hover" color="inherit" href="/">
                  Головна
                </Link>
                <Link fontSize={20} underline="hover" color="inherit">
                  {category}
                </Link>
              </Breadcrumbs>
            </Box>
            <Box
              width={"100%"}
              alignSelf={"flex-end"}
              marginBottom={3}
              paddingBottom={2}
              sx={{
                display: {
                  xs: "flex",
                  md: "none",
                },
                justifyContent: "center",

                alignItems: "center",
                borderBottom:
                  window.innerWidth > 1024 ? "2px solid black" : "none",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  width: 300,
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "flex-start",
                  background: "black",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "black",
                    color: "white",
                  },
                }}
                size="small"
                onClick={toggleDrawer("left", true)}
              >
                <img
                  src={require("../../../img/fitersIcon.png")}
                  style={{ width: 7, height: 9, marginLeft: 14 }}
                  alt="sdf"
                />
                <Typography
                  width={"100%"}
                  fontSize={10}
                  sx={{ marginRight: 3 }}
                >
                  Фільри
                </Typography>
              </Button>
            </Box>
          </Box>
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"flex-start"}
          >
            <Box sx={{ display: { xs: "none", md: "inherit" } }}>
              <SortBy />
            </Box>
            <Grid
              container
              paddingTop={0}
              spacing={{ xs: 1, sm: 3, md: 4 }}
              columns={{ xs: 4, sm: 12, md: 16, lg: 16, xl: 20 }}
            >
              {Array.from({ length: 6 }, (param, index) => (
                <Grid
                  item
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  paddingBottom={2}
                  xs={2}
                  sm={4}
                  md={4}
                  lg={4}
                  xl={5}
                  key={index}
                >
                  <HomeSkeleton key={index} />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box
            sx={{
              marginTop: 5,

              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Accordion
              sx={{
                color: "white",
                background: "black",
                marginBottom: 2,

                width: "85%",
                display: {
                  xs: "!none",
                  md: "none",
                },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <img
                    src={require("../../../img/footerPagesOpenIcon.png")}
                    style={{ width: 20, height: 20 }}
                    alt="sdf"
                  />
                }
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Компанія</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  sx={{
                    color: "rgba(255,255,255,.5)",
                    cursor: "pointer",
                    "&:hover": { color: "#fff" },
                    transition: "color .2s ease",
                    paddingBottom: 1,
                  }}
                  fontFamily={"Comfortaa"}
                  color="white"
                  onClick={() => navigate("/about")}
                >
                  О компанії
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(255,255,255,.5)",
                    cursor: "pointer",
                    "&:hover": { color: "#fff" },
                    transition: "color .2s ease",
                    paddingBottom: 1,
                  }}
                  fontFamily={"Comfortaa"}
                  color="white"
                  onClick={() => navigate("/posts")}
                >
                  Статті
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(255,255,255,.5)",
                    cursor: "pointer",
                    "&:hover": { color: "#fff" },
                    transition: "color .2s ease",
                    paddingBottom: 1,
                  }}
                  fontFamily={"Comfortaa"}
                  color="white"
                  onClick={() => navigate("/contact")}
                >
                  Контакти
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              sx={{
                color: "white",
                background: "black",
                marginBottom: 2,

                width: "85%",
                display: {
                  xs: "!none",
                  md: "none",
                },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <img
                    src={require("../../../img/footerPagesOpenIcon.png")}
                    style={{ width: 20, height: 20 }}
                    alt="sdf"
                  />
                }
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Покупцям</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  sx={{
                    color: "rgba(255,255,255,.5)",
                    cursor: "pointer",
                    "&:hover": { color: "#fff" },
                    transition: "color .2s ease",
                    paddingBottom: 1,
                  }}
                  fontFamily={"Comfortaa"}
                  color="white"
                  onClick={() => navigate("/return")}
                >
                  Повернення товару
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(255,255,255,.5)",
                    cursor: "pointer",
                    "&:hover": { color: "#fff" },
                    transition: "color .2s ease",
                    paddingBottom: 1,
                  }}
                  fontFamily={"Comfortaa"}
                  color="white"
                  onClick={() => navigate("/delivery")}
                >
                  Доставка
                </Typography>

                <Typography
                  sx={{
                    color: "rgba(255,255,255,.5)",
                    cursor: "pointer",
                    "&:hover": { color: "#fff" },
                    transition: "color .2s ease",
                    paddingBottom: 1,
                  }}
                  fontFamily={"Comfortaa"}
                  color="white"
                  onClick={() => navigate("/quarantees")}
                >
                  Гарантії
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>
      </>
    );
  };

  function StatusHandler(status: Status) {
    switch (status) {
      case "success":
        if (
          itemsCategory.items !== undefined ||
          itemsSorted.items !== undefined
        ) {
          return (
            <>
              <React.Fragment>
                <SwipeableDrawer
                  anchor={"left"}
                  open={active}
                  onClose={toggleDrawer("left", false)}
                  onOpen={toggleDrawer("left", true)}
                >
                  {list("left")}
                </SwipeableDrawer>
              </React.Fragment>
              <Box width={"100%"}>
                <Box
                  display={"flex"}
                  justifyContent={"flex-end"}
                  alignItems={"center"}
                  flexDirection={"column"}
                  paddingTop={12}
                >
                  <Box
                    width={"100%"}
                    alignSelf={"flex-end"}
                    paddingBottom={3}
                    sx={{
                      display: "flex",
                      justifyContent: {
                        xs: "space-around",
                        md: "space-between",
                      },
                      margin: {
                        xs: "0 auto",
                        sm: "0 auto",
                        md: "0",
                      },
                      marginBottom: 3,
                      alignItems: "center",
                      borderBottom:
                        window.innerWidth > 1024 ? "2px solid black" : "none",
                    }}
                  >
                    <Breadcrumbs aria-label="breadcrumb">
                      <Link
                        fontSize={20}
                        underline="hover"
                        color="inherit"
                        href="/"
                      >
                        Головна
                      </Link>
                      <Link fontSize={20} underline="hover" color="inherit">
                        {category}
                      </Link>
                    </Breadcrumbs>
                  </Box>
                  <Box
                    width={"100%"}
                    alignSelf={"flex-end"}
                    marginBottom={3}
                    paddingBottom={2}
                    sx={{
                      display: {
                        xs: "flex",
                        md: "none",
                      },
                      justifyContent: "center",

                      alignItems: "center",
                      borderBottom:
                        window.innerWidth > 1024 ? "2px solid black" : "none",
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        width: 300,
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "flex-start",
                        background: "black",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "black",
                          color: "white",
                        },
                      }}
                      size="small"
                      onClick={toggleDrawer("left", true)}
                    >
                      <img
                        src={require("../../../img/fitersIcon.png")}
                        style={{ width: 7, height: 9, marginLeft: 14 }}
                        alt="sdf"
                      />
                      <Typography
                        width={"100%"}
                        fontSize={10}
                        sx={{ marginRight: 3 }}
                      >
                        Фільри
                      </Typography>
                    </Button>
                  </Box>
                </Box>
                <Box
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                  alignItems={"flex-start"}
                >
                  <Box sx={{ display: { xs: "none", md: "inherit" } }}>
                    <SortBy />
                  </Box>
                  <Grid
                    container
                    paddingTop={0}
                    spacing={{ xs: 1, sm: 3, md: 4 }}
                    columns={{ xs: 4, sm: 12, md: 16, lg: 16, xl: 20 }}
                  >
                    {sorted
                      ? itemsSorted.items.map((item: Items) => (
                          <Grid
                            item
                            display={"flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            paddingBottom={2}
                            xs={2}
                            sm={4}
                            md={4}
                            lg={4}
                            xl={5}
                            key={item._id}
                          >
                            <HomeCard key={item._id} {...item} />
                          </Grid>
                        ))
                      : itemsCategory.items.map((item: Items) => (
                          <Grid
                            item
                            display={"flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            paddingBottom={2}
                            xs={2}
                            sm={4}
                            md={4}
                            lg={4}
                            xl={5}
                            key={item._id}
                          >
                            <HomeCard key={item._id} {...item} />
                          </Grid>
                        ))}
                  </Grid>
                </Box>
                <Box
                  sx={{
                    marginTop: 5,

                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Accordion
                    sx={{
                      color: "white",
                      background: "black",
                      marginBottom: 2,

                      width: "85%",
                      display: {
                        xs: "!none",
                        md: "none",
                      },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <img
                          src={require("../../../img/footerPagesOpenIcon.png")}
                          style={{ width: 20, height: 20 }}
                          alt="sdf"
                        />
                      }
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>Компанія</Typography>
                    </AccordionSummary>
                    <AccordionDetails
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "rgba(255,255,255,.5)",
                          cursor: "pointer",
                          "&:hover": { color: "#fff" },
                          transition: "color .2s ease",
                          paddingBottom: 1,
                        }}
                        fontFamily={"Comfortaa"}
                        color="white"
                        onClick={() => navigate("/about")}
                      >
                        О компанії
                      </Typography>
                      <Typography
                        sx={{
                          color: "rgba(255,255,255,.5)",
                          cursor: "pointer",
                          "&:hover": { color: "#fff" },
                          transition: "color .2s ease",
                          paddingBottom: 1,
                        }}
                        fontFamily={"Comfortaa"}
                        color="white"
                        onClick={() => navigate("/posts")}
                      >
                        Статті
                      </Typography>
                      <Typography
                        sx={{
                          color: "rgba(255,255,255,.5)",
                          cursor: "pointer",
                          "&:hover": { color: "#fff" },
                          transition: "color .2s ease",
                          paddingBottom: 1,
                        }}
                        fontFamily={"Comfortaa"}
                        color="white"
                        onClick={() => navigate("/contact")}
                      >
                        Контакти
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    sx={{
                      color: "white",
                      background: "black",
                      marginBottom: 2,

                      width: "85%",
                      display: {
                        xs: "!none",
                        md: "none",
                      },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <img
                          src={require("../../../img/footerPagesOpenIcon.png")}
                          style={{ width: 20, height: 20 }}
                          alt="sdf"
                        />
                      }
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>Покупцям</Typography>
                    </AccordionSummary>
                    <AccordionDetails
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "rgba(255,255,255,.5)",
                          cursor: "pointer",
                          "&:hover": { color: "#fff" },
                          transition: "color .2s ease",
                          paddingBottom: 1,
                        }}
                        fontFamily={"Comfortaa"}
                        color="white"
                        onClick={() => navigate("/return")}
                      >
                        Повернення товару
                      </Typography>
                      <Typography
                        sx={{
                          color: "rgba(255,255,255,.5)",
                          cursor: "pointer",
                          "&:hover": { color: "#fff" },
                          transition: "color .2s ease",
                          paddingBottom: 1,
                        }}
                        fontFamily={"Comfortaa"}
                        color="white"
                        onClick={() => navigate("/delivery")}
                      >
                        Доставка
                      </Typography>

                      <Typography
                        sx={{
                          color: "rgba(255,255,255,.5)",
                          cursor: "pointer",
                          "&:hover": { color: "#fff" },
                          transition: "color .2s ease",
                          paddingBottom: 1,
                        }}
                        fontFamily={"Comfortaa"}
                        color="white"
                        onClick={() => navigate("/quarantees")}
                      >
                        Гарантії
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </Box>
              </Box>
            </>
          );
          //return <CatalogSkeletons />
        } else {
          return <CatalogSkeletons />;
        }
      case "pending":
        return <CatalogSkeletons />;
      case "error":
        return <NotFoundPage />;
      default:
        return <NotFoundPage />;
    }
  }

  return (
    // 'success' | 'pending'| 'error'
    StatusHandler(status)
  );
};

export default CatalogField;
