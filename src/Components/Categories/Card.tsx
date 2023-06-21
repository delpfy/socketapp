import { Box, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import { useAppDispatch } from '../../redux/hooks';
import { SetCategory } from '../../redux/home/homeSlice';
import { useNavigate } from 'react-router-dom';

export default function  CategoryCard (props: {category: string, image: string}) {
const dispatch = useAppDispatch();
const navigate = useNavigate();

function RedirectToCatalog ()  {
    dispatch(SetCategory(props.category));
    navigate("/catalog")
    console.log("NAVIGATE")
}

  return (
    <>
    <Card
        sx={{
          maxWidth: 560,
          minWidth: 560,
          minHeight: 469,
          maxHeight: 469,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "2%",
        }}
        onClick={RedirectToCatalog}
      >
        <CardMedia
          sx={{
            display: "flex",
            maxHeight: 369,
            minHeight: 369,
            objectFit: "contain",
            overflow: "hidden",
          }}
          image={props.image}
          title={props.category}
          
        />

        <CardContent sx={{ paddingBottom: 2, paddingTop: 5,  textAlign: 'center' }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            minHeight={60}
            maxHeight={60}
            overflow={"hidden"}
            fontFamily={"Comfortaa"}
            fontSize={29}
            
          >
            {props.category}
          </Typography>
          
        </CardContent>
        
      </Card>
    </>
  )
}
