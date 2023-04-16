import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { IncExpences, SetItemPage } from "../../redux/basket/basketSlice";
import Carousel from 'react-material-ui-carousel'
import {
  IBasketItemDisplay,
  IItemDisplay,
  IItems,
  Status,
} from "../../redux/types";
import NotFoundPage from "../NotFound/NotFoundPage";
import { useNavigate } from "react-router-dom";
import { getItemById } from "../../redux/home/asyncActions";
import { Box, Rating, Typography } from "@mui/material";

export const ItemPage = (props: IItems) => {
  const { status } = useAppSelector((state) => state.home);
  const [imageIndex, setImageIndex] = useState(0);
  const dispatch = useAppDispatch();

  /*  React.useEffect(() => {
    dispatch(getItemById(props.id))
  }, []) */

  const INC_EXPENCES = (price: number) => {
    dispatch(IncExpences(price));
  };

  const PUSH_BASKET_ITEM = (item: IItems) => {};

  const Item = () => {
    return (
      
      
      <Box width={'100%'}>
        <Box >
        <Carousel sx={{ width: "100%" }} height={700} display = {'flex'} justifyContent={'center'} alignItems={'center'} >
        <Box display = {'flex'} justifyContent={'center'} alignItems={'center'}  >
          <img src={props.image[0]} style={{display : 'flex' }}/>
        </Box>
        <Box display = {'flex'} justifyContent={'center'} alignItems={'center'}>
          <img src={props.image[1]} style={{display : 'flex'}}/>
        </Box>
        <Box display = {'flex'} justifyContent={'center'} alignItems={'center'}>
          <img src={props.image[2]} style={{display : 'flex'}}/>
        </Box>
        </Carousel>
        </Box>
        
        <Box display={'flex'} flexDirection={'column'} alignItems={'left'}>
          <Typography
          fontFamily={"Comfortaa"}
          sx = {{paddingLeft: 0.3}}
          >
            {props.name}
          </Typography>
          <Typography
          fontFamily={"Comfortaa"}
          fontSize={25}
          color = 'error'
          sx = {{paddingLeft: 0.3}}
          >
            {props.price}₴
          </Typography>
          <Rating  name="read-only" value={props.rating} readOnly />
          
          <Typography
          fontFamily={"Comfortaa"}
          sx = {{paddingLeft: 0.3, paddingTop: 3}}
         
          >
            {props.description}
          </Typography>
        </Box>
        <Box>

        </Box>
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

export default ItemPage;
