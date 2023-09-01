import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";

import Card from "../../componentss/categories/CategoryTile";

import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import AllItems from "../../componentss/AllItems";

export default function ComputerPartsSubcategory() {
  const { computerPartsSubcategory } = useAppSelector((state) => state.home);

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
          textAlign={"center"}
          sx={{
            borderBottom: "2px solid black",
            paddingTop: { xs: "20%", md: "13%", lg: "10%" },
          }}
        >
          <Grid
            container
            padding={"2%"}
            justifyContent="center"
            spacing={{ xs: 1, sm: 3, md: 4 }}
            columns={{ xs: 2, sm: 2, md: 16, lg: 20, xl: 20 }}
          >
            {computerPartsSubcategory.map(
              (item: { id: number; name: string; image: string }) => (
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
                  <Card category={item.name} image={item.image} />
                </Grid>
              )
            )}
          </Grid>
        </Box>
      </Box>
      <AllItems />
    </>
  );
}
