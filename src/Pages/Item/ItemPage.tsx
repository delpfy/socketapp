import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { SetItemPage } from "../../redux/basket/basketSlice";
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

  

  const Item = () => {
    return (
      
      
      <Box width={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
        <Box >
       
        <Carousel sx={{ width: {
          xs : 450,
          md : 1125,
          lx : 1200
        }, height : {
          xs : 500,
          md : 700
        }  , display: 'flex', alignContent: 'center', justifyContent: 'center',  flexDirection: 'column'}}  >
        <Box sx={{width: {
          xs : 330,
          md : 800
        },  paddingLeft : "20%" }}>
          
          <img src={props.image[0]} style={{ width: '100%', height: '100%', objectFit: 'contain' }}/>
          
          
        </Box>
        <Box sx={{width: {
          xs : 330,
          md : 800
        }, paddingLeft : "20%"  }}>
          
          <img src={props.image[1]} style={{ width: '100%', height: '100%', objectFit: 'contain' }}/>
          
          
        </Box>
        <Box sx={{width: {
          xs : 330,
          md : 800
        }, paddingLeft : "20%"  }}>
          
          <img src={props.image[2]} style={{ width: '100%', height: '100%', objectFit: 'contain' }}/>
          
          
        </Box>
        {/* <Box display = {'flex'} justifyContent={'center'} alignItems={'center'} width={400}>
          <img src={props.image[1]} style={{display : 'flex', objectFit: 'contain'}}/>
        </Box>
        <Box display = {'flex'} justifyContent={'center'} alignItems={'center'} width={400}>
          <img src={props.image[2]} style={{display : 'flex', objectFit: 'contain'}}/>
        </Box> */}
        </Carousel>
        </Box>
        
        <Box display={'flex'} flexDirection={'column'} alignItems={'left'}>
          <Typography
          fontFamily={"Comfortaa"}
          sx = {{paddingLeft: 0.3}}
          fontSize={25}
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
