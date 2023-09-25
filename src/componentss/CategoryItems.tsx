import { Box, Grid, Typography } from "@mui/material";
import { Items } from "../redux/types";
import HomeCard from "./catalogg/block/HomeCard";
import { useAppSelector } from "../redux/hooks";
import HomeSkeleton from "./catalogg/block/HomeSkeleton";

export default function CategoryItems() {
  const { itemsDisplay, category, subcategory, status } = useAppSelector((state) => state.home);

  return (
    <>
      <Box
        sx={{ width: { xs: "100%", md: "90%" } }}
        margin={"0 auto"}
        alignSelf={"center"}
      >
        
        <Typography
          variant={"h3"}
          fontSize={30}
          fontFamily={"Comfortaa"}
          sx={{
            marginTop: {
              xs: 3,
              md: 3,
            },
          }}
          paddingBottom={2}
          textAlign={"center"}
        >
          Товари з цієї категорії
        </Typography>
        <Box
          width={"100%"}
          height={"100%"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          textAlign={"center"}
        >
          <Grid
            container
            padding={"2%"}
            justifyContent="center"
            spacing={{ xs: 1, sm: 3, md: 4 }}
            columns={{ xs: 4, sm: 2, md: 16, lg: 20, xl: 25 }}
          >
            {itemsDisplay.items !== undefined && status === "success"
              ? itemsDisplay.items?.filter((item: Items) => item.category === (subcategory === "" ?  category : subcategory)).slice(0, 20).map((item: Items) => (
                  <Grid
                    item
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    sx={{
                      paddingBottom: {
                        xs: 5,
                        md: 0,
                      },
                    }}
                    xs={2}
                    sm={2}
                    md={4}
                    lg={4}
                    xl={5}
                    key={item._id}
                  >
                    <HomeCard {...item} />
                  </Grid>
                ))
              : Array.from({ length: 6 }, (param, index) => {
                  return (
                    <Grid
                      item
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      sx={{
                        paddingBottom: {
                          xs: 5,
                          md: 0,
                        },
                      }}
                      xs={2}
                      sm={2}
                      md={4}
                      lg={4}
                      xl={5}
                    >
                      <HomeSkeleton />
                    </Grid>
                  );
                })}
          </Grid>
        </Box>
      </Box>
    </>
  );
}
