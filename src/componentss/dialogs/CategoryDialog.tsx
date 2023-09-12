import {
  DialogActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  Grid,
  Box,
  DialogProps,
  useMediaQuery,
  useTheme,
  IconButton,
} from "@mui/material";
import Card from "../../componentss/categories/CategoryTile";
import { useAppSelector } from "../../redux/hooks";
import { useState } from "react";
import { Category } from "../../redux/types";
type Props = {
  openCategory: boolean;
  CategoryDialog_close: () => void;
};

export default function CategoryDialog({
  openCategory,
  CategoryDialog_close,
}: Props) {
  const {
    categories,
    computerPartsSubcategory,
    gamingSubcategory,
    subcategory,
  } = useAppSelector((state) => state.home);

  const [scroll] = useState<DialogProps["scroll"]>("paper");
  const [maxWidth] = useState<DialogProps["maxWidth"]>("md");
  const [fullWidth] = useState(true);

  const fullScreen = useMediaQuery(useTheme().breakpoints.down("md"));

  return (
    <Dialog
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
      <DialogContent>
        <DialogContentText
          display={"flex"}
          flexDirection={"row"}
          sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
        >
          <Box width={"100%"} margin={"0 auto"} alignSelf={"center"}>
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
                columns={{ xs: 6, sm: 2, md: 16, lg: 20, xl: 20 }}
              >
                {categories.find((item: Category) => item.name === subcategory)
                  ?.subcategories === undefined
                  ? categories.map((item: Category) => (
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
                      >
                        <Card category={item} />
                      </Grid>
                    ))
                  : categories
                      .find((item: Category) => item.name === subcategory)
                      ?.subcategories.map((item: Category) => (
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
                        >
                          <Card category={item} />
                        </Grid>
                      ))}
              </Grid>
            </Box>
          </Box>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
