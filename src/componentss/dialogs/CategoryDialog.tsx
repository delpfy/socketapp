import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Grid,
  Box,
  DialogProps,
  useMediaQuery,
  useTheme,
  IconButton,
} from "@mui/material";
import Card from "../../componentss/categories/CategoryTile";
import { useAppSelector } from "../../redux/hooks";
import { useEffect, useState } from "react";
import { Category } from "../../redux/types";
import SubcategoryCard from "../categories/SubcategoryTile";
type Props = {
  dialogKey: number,
  openCategory: boolean;
  CategoryDialog_close: () => void;
};

export default function CategoryDialog({
  dialogKey,
  openCategory,
  CategoryDialog_close,
}: Props) {
  const {
    categories,
    subcategory,
    category,
  } = useAppSelector((state) => state.home);

  const [scroll] = useState<DialogProps["scroll"]>("paper");
  const [maxWidth] = useState<DialogProps["maxWidth"]>("md");
  const [fullWidth] = useState(true);

  const fullScreen = useMediaQuery(useTheme().breakpoints.down("md"));
 


  
  console.log(category )
  return (
    <Dialog
    key={dialogKey}
      scroll={scroll}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      fullScreen={fullScreen}
      open={openCategory}
      onClose={CategoryDialog_close}
    >
      <DialogTitle
        sx={{
          fontFamily: "Comfortaa",
          fontSize: 20,
          borderBottom: "2px solid black",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Каталог товарів
        <IconButton onClick={CategoryDialog_close}>
          <img
            src={require("../../img/crossIcon.png")}
            style={{ width: 15, height: 15 }}
            alt="sdf"
          />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          overflowY: "auto",
          overflowX: "hidden",
          marginBottom: 1,
          marginRight: 1,

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
        <DialogContentText
          display={"flex"}
          flexDirection={"row"}
          sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
        >
          <Box
            width={"100%"}
            margin={"0 auto"}
            alignSelf={"center"}
            marginRight={2}
          >
            <Box
              width={"100%"}
              height={"100%"}
              flexDirection={"column"}
              alignItems={"center"}
              textAlign={"center"}
            >
              <Grid
                container
                paddingTop={"15%"}
                justifyContent="center"
                spacing={{ xs: 1, sm: 3, md: 4 }}
                columns={{ xs: 6, sm: 7, md: 16, lg: 20, xl: 20 }}
              >
                {categories.map((item: Category) => (
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
                        xs={3}
                        sm={2}
                        md={4}
                        lg={4}
                        xl={4}
                        key={item._id}
                        onClick =  {CategoryDialog_close}
                      >
                        <Card  category={item} />
                      </Grid>
                    ))
                  }
              </Grid>
            </Box>
          </Box>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
