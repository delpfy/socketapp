import { Box, Typography } from "@mui/material";
import { useAppDispatch } from "../../redux/hooks";
import { SetCategory, SetSubcategory } from "../../redux/home/homeSlice";
import CategoryDialog from "../dialogs/CategoryDialog";
import { useState } from "react";

export default function CatalogButton() {
  const dispatch = useAppDispatch();
  const [openCategory, setOpenCategory] = useState(false);

  function CategoryDialog_open() {
    setOpenCategory(true);
  }

  function CategoryDialog_close() {
    dispatch(SetCategory(""));
    dispatch(SetSubcategory(""));
    setOpenCategory(false);
  }
  return (
    <>
    <CategoryDialog
        openCategory={openCategory}
        CategoryDialog_close={CategoryDialog_close}
      />
      <Box
        width={200}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: {
            xs: "white",
            sm: "white",
            md: "black",
          },
          color: {
            xs: "black",
            sm: "black",
            md: "white",
          },
        }}
        paddingRight={2}
        onClick={() => {
          dispatch(SetSubcategory(""));
          CategoryDialog_open();
        }}
      >
        <img
          src={require(window.innerWidth > 1024
            ? "../../img/catalogWhiteIcon.png"
            : "../../img/catalogBlackIcon.png")}
          style={{ width: 20, height: 20 }}
          alt="sdf"
        />
        <Typography width={"83%"} fontSize={15}>
          Каталог товарів
        </Typography>{" "}
      </Box>
    </>
  );
}
