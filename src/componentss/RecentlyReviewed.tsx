import { Box } from "@mui/material";
import { Items } from "../redux/types";
import Card from "../componentss/catalogg/block/CatalogCard";

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
        sx={{ overflowX: "scroll" }}
      >
        {recentlyReviewed.reverse().map((item: Items) => {
          return <Card key={item._id} {...item} />;
        })}
      </Box>
    </>
  );
}
