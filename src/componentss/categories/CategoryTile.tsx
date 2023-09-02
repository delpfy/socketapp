import React from "react";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useAppDispatch } from "../../redux/hooks";
import { SetCategory, SetSubcategory } from "../../redux/home/homeSlice";
import { useNavigate } from "react-router-dom";

export default function CategoryCard(props: {
  category: string;
  image: string;
}) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function RedirectToCatalog() {
    dispatch(SetCategory(props.category));
    if(props.category === "Комп'ютерні комплектуючі"){
      dispatch(SetSubcategory(props.category));
      navigate("/computer-compl");
    }
    else if(props.category === "Геймінг"){
      dispatch(SetSubcategory(props.category));
      navigate("/gaming-compl");
    }
    else{

      navigate("/catalog");
    }
    console.log(props.category);
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

          minHeight: 210,
          maxHeight: 210,

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
          alignItems: "center",
          /* padding: "2%", */
          objectFit: "fill",
        }}
        onClick={RedirectToCatalog}
      >
        <CardMedia
        component="img"
          sx={{
            display: "flex",
            maxHeight: 120,
            minHeight: 120,
            maxWidth: 160,
            minWidth: 160,
            paddingBottom: 4,
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
            minWidth={250}
            maxWidth={250}
            overflow={"hidden"}
            fontFamily={"Comfortaa"}
            fontSize={20}
          >
            {props.category}
          </Typography>
        </CardContent>
      </Box>
    </>
  );
}
