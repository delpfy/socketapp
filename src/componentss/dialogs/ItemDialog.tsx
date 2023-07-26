import {
  DialogActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  Box,
  DialogProps,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Items, TShippingItems } from "../../redux/types";
import React, { Dispatch, SetStateAction } from "react";
import ItemPage from "../../pagess/items/CatalogItemPage";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addBasketItem } from "../../redux/basket/asyncActions";
import { SetItemsAmount } from "../../redux/basket/basketSlice";

type Props = {
  openItem: boolean;
  ItemDialog_close: () => void;
  item: Items;
  InfoDialog_open: Dispatch<SetStateAction<any>>;
  setInfoMessage: (message: string) => void;
};

export default function ItemDialog({
  ItemDialog_close,
  InfoDialog_open,
  setInfoMessage,
  openItem,
  item,
}: Props) {
  const { user } = useAppSelector((state) => state.user);
  const { itemsAmount } = useAppSelector((state) => state.basket);

  const dispatch = useAppDispatch();

  const [scroll] = React.useState<DialogProps["scroll"]>("paper");
  const [maxWidth] = React.useState<DialogProps["maxWidth"]>("lg");
  const fullScreen = useMediaQuery(useTheme().breakpoints.down("md"));

  // Chech auth, if authorized - add and changing active state.

  function basketItem_APPEND() {
    if (user.authorized === true) {
      dispatch(
        addBasketItem({
          _id: user.id,
          name: item.name,
          description: item.description,
          category: item.category,
          price: item.price,
          sale: item.sale,
          rating: item.rating,
          image: item.image,
          amount: 1,
        } as TShippingItems)
      );

      dispatch(SetItemsAmount(itemsAmount + 1));
    } else {
      setInfoMessage("Не так швидко...\nСпочатку увійдіть -_-");
      InfoDialog_open(true);
      // Tip, dunno if i`ll use it.
      // setOpen(true)
    }
  }

  return (
    <Dialog
      open={openItem}
      onClose={ItemDialog_close}
      scroll={scroll}
      fullScreen={fullScreen}
      maxWidth={maxWidth}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle
        sx={{ fontFamily: "Comfortaa", fontSize: "1.25rem " }}
        id="scroll-dialog-title"
      >
        {item.name}
      </DialogTitle>
      <DialogContent dividers={scroll === "paper"}>
        <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
          <ItemPage />
        </DialogContentText>
        <Box></Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => basketItem_APPEND()}
          sx={{
            width: {
              xs: 210,
              md: 225,
            },
            fontSize: {
              xs: 12,
              md: 14,
            },
          }}
          variant="contained"
        >
          Покласти у кошик
        </Button>

        <Button
          sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
          onClick={ItemDialog_close}
        >
          Продовжити покупки
        </Button>
      </DialogActions>
    </Dialog>
  );
}
