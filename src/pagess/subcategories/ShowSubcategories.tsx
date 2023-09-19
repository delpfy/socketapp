import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";

import { useAppSelector } from "../../redux/hooks";
import AllItems from "../../componentss/AllItems";
import { Category } from "../../redux/types";
import SubcategoryCard from "../../componentss/categories/SubcategoryTile";

export default function ShowSubcategories() {
  const { categories, subcategory, category } = useAppSelector(
    (state) => state.home
  );

  useEffect(() => {
    window.scrollTo(0, 0);
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
            paddingTop: { xs: "20%", md: "13%", lg: "10%" },
          }}
        >
          <Typography
            variant={"h3"}
            marginBottom={5}
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
            columns={{ xs: 2, sm: 2, md: 16, lg: 20, xl: 20 }}
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
