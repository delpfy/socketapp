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
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { SetCategory, SetSubcategory } from "../../redux/home/homeSlice";
import { useNavigate } from "react-router-dom";
import { Category } from "../../redux/types";
import { getItemsByCategory } from "../../redux/home/asyncActions";

export default function CategoryCard(_category: any) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function RedirectToCatalog() {
    dispatch(SetCategory(_category.category.name));
    if (_category.category.subcategories !== undefined) {
      if (_category.category.subcategories.length !== 0) {
        if (window.innerWidth > 600) {
          navigate("/subcategories");
        } else {
          dispatch(SetSubcategory(_category.category.name));
        }
      } else {
        dispatch(getItemsByCategory(_category.category.name)).then(
          (result: any) => {
            if (result.meta.requestStatus === "fulfilled") {
              if (result.payload.items.length !== 0) {
                navigate("/catalog");
              }
            }
          }
        );
      }
    } else {
      console.log("fff");
      dispatch(SetSubcategory(""));
      dispatch(getItemsByCategory(_category.category.name)).then(
        (result: any) => {
          if (result.meta.requestStatus === "fulfilled") {
            if (result.payload.items.length !== 0) {
              navigate("/catalog");
            }
          }
        }
      );
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
          image={`https://www.sidebyside-tech.com${_category.category.image}`}
          title={_category.category.name}
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
            {_category.category.name}
          </Typography>
        </CardContent>
      </Box>
    </>
  );
}
