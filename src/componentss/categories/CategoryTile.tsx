import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
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
      <Card
        sx={{
          maxWidth: {
            xs: 350,
            md: 560,
          },
          minWidth: {
            xs: 350,
            md: 560,
          },
          /* maxWidth: 'calc(100% - 30px)',
          minWidth: 'calc(100% - 30px)', */

          minHeight: 469,
          maxHeight: 469,

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
          justifyContent: "space-between",
          /* padding: "2%", */
          objectFit: "fill",
        }}
        onClick={RedirectToCatalog}
      >
        <CardMedia
          sx={{
            display: "flex",
            maxHeight: 369,
            minHeight: 369,

            objectFit: "fill",
            overflow: "hidden",
          }}
          image={props.image}
          title={props.category}
        />

        <CardContent
          sx={{ paddingBottom: 2, paddingTop: 5, textAlign: "center" }}
        >
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
  );
}
