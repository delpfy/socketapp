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
import { Items, ShippingItems } from "../../redux/types";
import React, { Dispatch, SetStateAction } from "react";
import ItemPage from "../../pagess/items/CatalogItemPage";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addBasketItem } from "../../redux/basket/asyncActions";
import { SetItemsAmount } from "../../redux/basket/basketSlice";

type Props = {
  openItem: boolean;
  closeItemDialog: () => void;
  item: Items;
  openInfoDialog: Dispatch<SetStateAction<any>>;
  setInfoMessage: (message: string) => void;
};

export default function ItemDialog({
  closeItemDialog,
  openInfoDialog,
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
          rating: item.rating,
          image: item.image,
          amount: 1,
        } as ShippingItems)
      );

      dispatch(SetItemsAmount(itemsAmount + 1));
    } else {
      setInfoMessage("Не так швидко...\nСпочатку увійдіть -_-");
      openInfoDialog(true);
      // Tip, dunno if i`ll use it.
      // setOpen(true)
    }
  }

  return (
    <Dialog
      open={openItem}
      onClose={closeItemDialog}
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
          <ItemPage {...item} />
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
          onClick={closeItemDialog}
        >
          Продовжити покупки
        </Button>
      </DialogActions>
    </Dialog>
  );
}
