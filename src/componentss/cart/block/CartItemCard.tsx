import React from "react";

import {
  Box,
  Typography,
  Button,
  CardMedia,
  CardContent,
  CardActions,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import { ShippingItems } from "../../../redux/types";
import BasketItemPage from "../../../pagess/items/CartItemPage";

export const BasketItemBlock = (props: ShippingItems) => {
  const [scroll] = React.useState<DialogProps["scroll"]>("paper");
  const [maxWidth] = React.useState<DialogProps["maxWidth"]>("lg");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [openItem, setOpenItem] = React.useState(false);

  function openItemDialog() {
    setOpenItem(true);
  }
  function closeItemDialog() {
    setOpenItem(false);
  }

  return (
    <>
      <Card
        sx={{
          maxWidth: 345,
          minHeight: 490,
          maxHeight: 490,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "2%",
        }}
      >
        <CardMedia
          sx={{
            display: "flex",
            maxHeight: 200,
            minHeight: 200,
            objectFit: "contain",
            overflow: "hidden",
          }}
          image={props.image[0]}
          title={props.name}
          onClick={openItemDialog}
        />

        <CardContent sx={{ paddingBottom: 1 }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            minHeight={60}
            maxHeight={60}
            overflow={"hidden"}
            fontFamily={"Comfortaa"}
            textAlign={"justify"}
            paddingBottom={1}
          >
            {props.name}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 0,
            paddingBottom: "16px",
            paddingLeft: "16px",
            paddingRight: "16px",
          }}
        >
          <Box display={"flex"} flexDirection={"column"} width={138}>
            <Typography
              paddingLeft={0.3}
              fontSize={22}
              fontFamily={"Comfortaa"}
              color={"error"}
            >
              {props.price}₴
            </Typography>

            <Rating name="read-only" value={props.rating} readOnly />
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography
                paddingLeft={0.3}
                fontSize={22}
                fontFamily={"Comfortaa"}
              >
                У кошику:
              </Typography>
              <Typography
                paddingLeft={0.3}
                fontSize={22}
                fontFamily={"Comfortaa"}
                color={"error"}
              >
                {props.amount}
              </Typography>
            </Box>
          </Box>
        </CardActions>
      </Card>
      <Dialog
        open={openItem}
        onClose={closeItemDialog}
        scroll={scroll}
        maxWidth={maxWidth}
        fullScreen={fullScreen}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle
          id="scroll-dialog-title"
          sx={{ fontFamily: "Comfortaa", fontSize: "1.25rem " }}
        >
          {props.name}
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            <BasketItemPage {...props} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        
          <Button
            onClick={closeItemDialog}
            sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
          >
            Вийти
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BasketItemBlock;
