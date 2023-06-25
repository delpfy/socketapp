import React from "react";
import { useAppSelector } from "../../redux/hooks";
import { IItems, Status } from "../../redux/types";
import NotFoundPage from "../NotFound/NotFoundPage";
import { Box, Rating, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";

export const BasketItemPage = (props: IItems) => {
  const { status } = useAppSelector((state) => state.home);

  /*  React.useEffect(() => {
      dispatch(getItemById(props.id))
    }, []) */

  const Item = () => {
    return (
      <Box
        width={"100%"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
      >
        <Box>
          <Carousel
            sx={{
              width: {
                xs: 350,
                md: 825,
                lx: 1200,
              },
              
              height:{
                
                  xs: 500,
                  md: 700,
                
              },
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Box
              
            >
              <img
                src={props.image[0]}
                alt="img1"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </Box>
            <Box
              
            >
              <img
                src={props.image[1]}
                alt="img2"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </Box>
            <Box
              
            >
              <img
                src={props.image[2]}
                alt="img2"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </Box>
            {/* <Box display = {'flex'} justifyContent={'center'} alignItems={'center'} width={400}>
          <img src={props.image[1]} style={{display : 'flex', objectFit: 'contain'}}/>
        </Box>
        <Box display = {'flex'} justifyContent={'center'} alignItems={'center'} width={400}>
          <img src={props.image[2]} style={{display : 'flex', objectFit: 'contain'}}/>
        </Box> */}
          </Carousel>
        </Box>

        <Box display={"flex"} flexDirection={"column"} alignItems={"left"}>
          <Typography
            fontFamily={"Comfortaa"}
            sx={{ paddingLeft: 0.3 }}
            fontSize={25}
          >
            {props.name}
          </Typography>
          <Typography
            fontFamily={"Comfortaa"}
            fontSize={25}
            color="error"
            sx={{ paddingLeft: 0.3 }}
          >
            {props.price}₴
          </Typography>
          <Rating name="read-only" value={props.rating} readOnly />

          <Typography
            fontFamily={"Comfortaa"}
            sx={{ paddingLeft: 0.3, paddingTop: 3 }}
          >
            {props.description}
          </Typography>
        </Box>
        <Box></Box>
      </Box>
    );
  };

  function StatusHandler(status: Status) {
    switch (status) {
      case "success":
        if (props !== undefined) {
          return <Item />;
        } else {
          return <NotFoundPage />;
        }
      case "pending":
        return <NotFoundPage />;
      case "error":
        return <NotFoundPage />;
      default:
        return <NotFoundPage />;
    }
  }

  return StatusHandler(status);
};

export default BasketItemPage;
