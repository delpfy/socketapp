import React from "react";
import { useAppSelector } from "../../redux/hooks";

import { Box, Grid } from "@mui/material";
import { Items } from "../../redux/types";
import ItemsAbsence from "../ItemsAbsence";
import CatalogCard from "../../componentss/catalogg/block/CatalogCard";
import HomeCard from "../../componentss/catalogg/block/HomeCard";

export default function FavoritesPage() {
  const { itemsFavorites } = useAppSelector((state) => state.home);

  return (
    <Box width={"100%"} paddingTop={"2%"}>
      <Box>
        <Grid
          container
          padding={"1%"}
          spacing={{ xs: 1, sm: 3, md: 4 }}
          columns={{ xs: 1, sm: 4, md: 8, lg: 16, xl: 10 }}
        >
          {itemsFavorites.length === 0 ? (
            <ItemsAbsence />
          ) : (
            itemsFavorites.map((item: Items) => (
              <Grid
                item
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                paddingBottom={2}
                xs={2}
                sm={4}
                md={4}
                lg={4}
                xl={5}
                key={item._id}
              >
                <HomeCard key={item._id} {...item} />
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </Box>
  );
}
