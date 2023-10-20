import { Box } from "@mui/material";
import { Items } from "../redux/types";
import Card from "../componentss/catalogg/block/CatalogCard";
import HomeCard from "./catalogg/block/HomeCard";

export default function RecentlyReviewed() {
  const recentlyReviewed = JSON.parse(
    localStorage.getItem("recentlyReviewed") || "{}"
  );

  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"start"}
        alignItems={"center"}
        marginLeft={"auto"}
        marginRight={"auto"}
        marginBottom={3}
        sx={{
          width: {
            xs: "93%",
            md: "68%",
          },
          overflowY: "auto",
          overflowX: "none",

          "&::-webkit-scrollbar": {
            width: "10px",
            height: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#000000",
            borderRadius: "5px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#D9D9D9",
            borderRadius: "5px",
          },
        }}
      >
        {recentlyReviewed.reverse().map((item: Items) => {
          return (
            <Box marginRight={4}>
              <HomeCard {...item} />
            </Box>
          );
        })}
      </Box>
    </>
  );
}
