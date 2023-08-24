import React from "react";
import { useAppSelector } from "../../redux/hooks";

import { Box, Grid } from "@mui/material";
import { Items } from "../../redux/types";
import ItemsAbsence from "../ItemsAbsence";
import CatalogCard from "../../componentss/catalogg/block/CatalogCard";

export default function ComparisonPage() {
  const { itemsComparison } = useAppSelector((state) => state.home);

  return (
    <Box width={"100%"} paddingTop={"2%"}>
      <Box>
        <Grid
          container
          padding={"2%"}
          spacing={{ xs: 1, sm: 3, md: 4 }}
          columns={{ xs: 1, sm: 4, md: 8, lg: 8, xl: 10 }}
        >
          {itemsComparison.length === 0 ? (
            <ItemsAbsence />
          ) : (
            itemsComparison.map((item: Items) => (
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
                <CatalogCard key={item._id} {...item} />
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </Box>
  );
}
