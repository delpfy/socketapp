import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import AllItems from "../../componentss/AllItems";
import { Category } from "../../redux/types";
import SubcategoryCard from "../../componentss/categories/SubcategoryTile";
import {
  getCategoryBySlug,
  getItemsByCategory,
} from "../../redux/home/asyncActions";
import { useParams } from "react-router-dom";
import { SetCategory, SetCategorySlug } from "../../redux/home/homeSlice";

export default function ShowSubcategories() {
  const { categories, subcategory, category } = useAppSelector(
    (state) => state.home
  );

  const { category_slug } = useParams();

  const dispatch = useAppDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getCategoryBySlug(category_slug as string)).then((result: any) => {
      if (result.meta.requestStatus === "fulfilled") {
        console.log(result.payload);
        dispatch(SetCategory(result.payload.name));
        dispatch(SetCategorySlug(category_slug as string));
        dispatch(getItemsByCategory(result.payload.name));
      }
    });
  }, []);

  return (
    <>
      <Box width={"85%"} margin={"0 auto"} alignSelf={"center"}>
        <Box
          width={"100%"}
          flexDirection={"column"}
          alignItems={"center"}
          textAlign={"left"}
          sx={{
            borderBottom: "2px solid black",
            paddingTop: { xs: "20%", sm : '18%', md: "13%", lg: "10%" },
          }}
        >
          <Typography
            variant={"h3"}
            
            sx = {{mb:{
              xs:5 ,
              sm: 8,
              md:5 ,
            }}}
            fontSize={30}
            fontFamily={"Comfortaa"}
          >
            {category}
          </Typography>
          <Grid
            container
            padding={"2%"}
            justifyContent="center"
            spacing={{ xs: 1, sm: 3, md: 4 }}
            columns={{ xs: 2, sm: 6, md: 16, lg: 20, xl: 20 }}
          >
            {categories
              .find((item: Category) => item.name === category)
              ?.subcategories.map((item: any) => (
                <Grid
                  item
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  xs={2}
                  sm={2}
                  md={4}
                  lg={4}
                  xl={4}
                  key={item.id}
                >
                  <SubcategoryCard category={item} />
                </Grid>
              ))}
          </Grid>
        </Box>
      </Box>
      <AllItems />
    </>
  );
}
