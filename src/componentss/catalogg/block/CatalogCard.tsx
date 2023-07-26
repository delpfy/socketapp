import * as React from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  ClickAwayListener,
  IconButton,
  Rating,
  Tooltip,
  Typography,
} from "@mui/material";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { addBasketItem } from "../../../redux/basket/asyncActions";
import { TShippingItems, Items } from "../../../redux/types";
import { SetItemsAmount } from "../../../redux/basket/basketSlice";
import InfoDialog from "../../dialogs/InfoDialog";
import { useNavigate } from "react-router-dom";
import { setCurrentItem } from "../../../redux/home/homeSlice";
import { getItemReviews } from "../../../redux/review/asyncActions";

export default function CatalogCard(props: Items) {
  const { user } = useAppSelector((state) => state.user);
  const { itemsAmount } = useAppSelector((state) => state.basket);
  const [open, setOpen] = React.useState<boolean>(false);

  const [openInfo, setOpenInfo] = React.useState(false);
  const [infoMessage, setInfoMessage] = React.useState<string>("Some info");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function InfoDialog_open() {
    setOpenInfo(true);
  }

  function InfoDialog_close() {
    setOpenInfo(false);
  }

  function compareObjects(obj1: any, obj2: any) {
  
    for (const key in obj1) {
      if (obj1.hasOwnProperty(key)) {
        if (obj1[key] !== obj2[key]) {
          obj2[key] = obj1[key];
        }
      }
    }

    for (const key in obj2) {
      if (obj2.hasOwnProperty(key) && !obj1.hasOwnProperty(key)) {
        delete obj2[key];
      }
    }
  }

  function setAsRecentlyReviewed() {
    const recentlyReviewed = JSON.parse(
      localStorage.getItem("recentlyReviewed") || "{}"
    );

    if (recentlyReviewed !== undefined) {
      const itemIndex = recentlyReviewed.findIndex(
        (item: Items) => item.name === props.name
      );

      if (itemIndex === -1) {
        recentlyReviewed.push(props);
      } else {
        compareObjects(props, recentlyReviewed[itemIndex]);
      }
      localStorage.setItem(
        "recentlyReviewed",
        JSON.stringify(recentlyReviewed)
      );
    }
  }

  function getCurrentItem() {
    dispatch(setCurrentItem(props));
    dispatch(getItemReviews(props._id));
    navigate("/catalog/item");
    setAsRecentlyReviewed();
  }

  function adjustPrice() {
    if (props.sale === 0) {
      return props.price;
    } else {
      return props.price - Math.round((props.price * props.sale) / 100);
    }
  }

  // Chech auth, if authorized - add and changing active state.
  function basketItem_APPEND() {
    if (user.authorized === true) {
      dispatch(
        addBasketItem({
          _id: user.id,
          name: props.name,
          description: props.description,
          category: props.category,
          price: adjustPrice(),
          sale: props.sale,
          rating: props.rating,
          image: props.image,
          amount: 1,
        } as TShippingItems)
      );

      dispatch(SetItemsAmount(itemsAmount + 1));
    } else {
      setInfoMessage("Не так швидко...\nСпочатку увійдіть -_-");
      InfoDialog_open();
      // Tip, dunno if i`ll use it.
      // setOpen(true)
    }
  }

  return (
    <>
      <Card
        sx={{
          maxWidth: 345,
          minWidth: 345,
          minHeight: 490,
          maxHeight: 490,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "2%",
        }}
      >
        {props.sale ? (
          <img
            style={{ position: "absolute", zIndex: 1, height: 70, width: 70 }}
            src="https://www.svgrepo.com/show/250306/percentage-percent.svg"
            alt=""
          />
        ) : (
          <></>
        )}
        <CardMedia
          sx={{
            maxHeight: 200,
            minHeight: 200,
            objectFit: "fill",
            overflow: "hidden",
          }}
          image={props.image[0]}
          title={props.name}
          onClick={getCurrentItem}
        />

        <CardContent sx={{ paddingBottom: 2 }}>
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
          <Typography
            variant="body2"
            maxHeight={100}
            minHeight={100}
            color="text.secondary"
            overflow={"hidden"}
            fontFamily={"Comfortaa"}
            textAlign={"justify"}
          >
            {props.description}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 0,
            paddingLeft: "16px",
            paddingRight: "16px",
          }}
        >
          <Box display={"flex"} flexDirection={"column"}>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              flexDirection={"row"}
            >
              <Typography
                paddingLeft={0.3}
                fontFamily={"Comfortaa"}
                color={props.sale ? "info" : "error"}
                sx={
                  props.sale
                    ? {
                        fontSize: 17,
                        textDecoration: "line-through !important",
                      }
                    : { fontSize: 22 }
                }
              >
                {props.price}₴
              </Typography>
              {props.sale ? (
                <Typography
                  paddingLeft={0.3}
                  fontSize={22}
                  fontFamily={"Comfortaa"}
                  color={"error"}
                >
                  {props.price - Math.round((props.price * props.sale) / 100)}₴
                </Typography>
              ) : (
                <></>
              )}
            </Box>

            <Rating name="read-only" value={props.rating} readOnly />
          </Box>

          <Box>
            <ClickAwayListener onClickAway={() => setOpen(false)}>
              <Box>
                <Tooltip
                  PopperProps={{
                    disablePortal: true,
                  }}
                  onClose={() => setOpen(false)}
                  open={open}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                  title="You sould be authorized"
                >
                  <IconButton
                    sx={{ paddind: 0 }}
                    onClick={() => basketItem_APPEND()}
                  >
                    <AddShoppingCartIcon
                      sx={{ height: 35, width: 35 }}
                      color={"disabled"}
                    />
                  </IconButton>
                </Tooltip>
              </Box>
            </ClickAwayListener>
          </Box>
        </CardActions>
      </Card>

      {/* information */}
      <InfoDialog
        openInfo={openInfo}
        InfoDialog_close={InfoDialog_close}
        infoMessage={infoMessage}
      />
    </>
  );
}
