import React from "react";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useAppDispatch } from "../../redux/hooks";
import { SetCategory } from "../../redux/home/homeSlice";
import { useNavigate } from "react-router-dom";

export default function CategoryCard(props: {
  category: string;
  image: string;
}) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function RedirectToCatalog() {
    dispatch(SetCategory(props.category));
    navigate("/catalog");
    console.log("NAVIGATE");
  }

  return (
    <>
      <Box
        sx={{
          cursor: 'pointer',
          maxWidth: {
            xs: 330,
            md: 330,
          },
          minWidth: {
            xs: 330,
            md: 330,
          },
          /* maxWidth: 'calc(100% - 30px)',
          minWidth: 'calc(100% - 30px)', */

          minHeight: 370,
          maxHeight: 370,

          /* maxHeight: {
            xs : 430,
            md : 469
          },
          minHeight: {
            xs : 430,
            md : 469
          }, */
          /* minHeight: 469,
          maxHeight: 469, */
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          /* padding: "2%", */
          objectFit: "fill",
        }}
        onClick={RedirectToCatalog}
      >
        <CardMedia
        component="img"
          sx={{
            display: "flex",
            maxHeight: 170,
            minHeight: 170,
            

            objectFit: "contain",
            overflow: "hidden",
          }}
          image={props.image}
          title={props.category}
        />
        
        <CardContent
          sx={{ paddingBottom: 2, paddingTop: 0, textAlign: "center" }}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            minHeight={60}
            maxHeight={73}
            overflow={"hidden"}
            fontFamily={"Comfortaa"}
            fontSize={24}
          >
            {props.category}
          </Typography>
        </CardContent>
      </Box>
    </>
  );
}
