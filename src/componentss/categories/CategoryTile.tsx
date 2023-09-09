import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
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
    if (props.category === "Комп'ютерні комплектуючі") {
      dispatch(SetSubcategory(props.category));

      if (window.innerWidth > 600) {
        navigate("/computer-compl");
      }
    } else if (props.category === "Геймінг") {
      dispatch(SetSubcategory(props.category));

      if (window.innerWidth > 600) {
        navigate("/gaming-compl");
      }
    } else {
      dispatch(SetSubcategory(""));
      navigate("/catalog");
    }
    console.log(props.category);
  }

  return (
    <>
      <Box
        sx={{
          cursor: "pointer",
          maxWidth: {
            xs: 330,
            md: 330,
          },
          minWidth: {
            xs: 150,
            md: 230,
          },
          /* maxWidth: 'calc(100% - 30px)',
          minWidth: 'calc(100% - 30px)', */

          minHeight: {
            xs: 180,
            md: 210,
          },
          maxHeight: {
            xs: 180,
            md: 210,
          },

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
            maxHeight: {
              xs: 110,
              md: 215,
            },
            minHeight: {
              xs: 110,
              md: 120,
            },
            maxWidth: {
              xs: 140,
              md: 160,
            },
            minWidth: {
              xs: 140,
              md: 160,
            },
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
            sx={{
              minWidth: {
                xs: 150,
                md: 200,
              },
              maxWidth: {
                xs: 200,
                md: 200,
              },
            }}
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
