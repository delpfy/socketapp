import { Box, Grid } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { Items } from "../redux/types";
import Card from "../componentss/catalogg/block/CatalogCard";

export default function RecentlyReviewed() {
  const recentlyReviewed = JSON.parse(
    localStorage.getItem("recentlyReviewed") || "{}"
  );

  return (
    <>
      <Box  width={"100%"} sx = {{overflowY: 'scroll'}}>
        <Carousel
          sx={{
            width: "100%",
            boxSizing: "none !important",
            height: 500,
            paddingTop: 3,
          }}
        >
          {recentlyReviewed.map((items: Items[]) => {
            return (
              <Grid
                container
                padding={"2%"}
                spacing={{ xs: 1, sm: 2, md: 2 }}
                columns={{ xs: 1, sm: 5, md: 12 }}
              >
                {items.map((item: Items) => (
                  <>
                    <Grid
                      item
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      paddingBottom={2}
                      xs={2}
                      sm={4}
                      md={4}
                      key={item._id}
                    >
                      <Card key={item._id} {...item} />
                    </Grid>
                  </>
                ))}
              </Grid>
            );
          })}
        </Carousel>
      </Box>
    </>
  );
}
