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
import { Category } from "../../redux/types";

export default function CategoryCard(category: any) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  function RedirectToCatalog() {
    
    dispatch(SetCategory(category.category.name));
    if (category.category.subcategories !== undefined) {
      if(category.category.subcategories.length !== 0){
        dispatch(SetSubcategory(category.category.name));

        if (window.innerWidth > 600) {
          navigate("/subcategories");
        }
      }
      else {
        navigate("/catalog");
      }
    } 
    else {
      navigate("/catalog");
    }
    
    
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
          image={`https://www.sidebyside-tech.com${category.category.image}`}
          title={category.category.name}
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
            {category.category.name}
          </Typography>
        </CardContent>
      </Box>
    </>
  );
}
