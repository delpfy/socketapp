import * as React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  ClickAwayListener,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  IconButton,
  Rating,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { addBasketItem } from "../../../../redux/basket/asyncActions";
import { SetItemsAmount } from "../../../../redux/basket/basketSlice";
import { IBasketItems, IItems } from "../../../../redux/types";

import ItemPage from "../../../../Pages/Item/ItemPage";

export default function CatalogCard(props: IItems) {
  const { user } = useAppSelector((state) => state.user);
  const { itemsAmount } = useAppSelector((state) => state.basket);

  const [open, setOpen] = React.useState<boolean>(false);
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");
  const [maxWidth, setMaxWidth] = React.useState<DialogProps["maxWidth"]>("lg");
  
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  
  const [openItem, setOpenItem] = React.useState(false);
  const [openInfo, setOpenInfo] = React.useState(false);
  const [local_info, setLocalInfo] = React.useState<string>("Some info")
  

  const dispatch = useAppDispatch();

  function openInfoDialog(){
    setOpenInfo(true);
  }

  function closeInfoDialog(){
    setOpenInfo(false);
  }

  function openItemDialog() {
    setOpenItem(true);
  }
  function closeItemDialog() {
    setOpenItem(false);
  }

  // Chech auth, if authorized - add and changing active state.
  function PutInBasket() {
    if (user.authorized === true) {
      dispatch(
        addBasketItem({
          _id: user.id ,
          name: props.name,
          description: props.description,
          category: props.category,
          price: props.price,
          rating: props.rating,
          image: props.image,
          amount: 1,
        } as IBasketItems)
      );

      dispatch(SetItemsAmount(itemsAmount + 1));
    } else {
      setLocalInfo("Не так швидко...\nСпочатку увійдіть -_-")
      openInfoDialog();
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
        <CardMedia
          sx={{
            
            maxHeight: 200,
            minHeight: 200,
            objectFit: "fill",
            overflow: "hidden",
          }}
          image={props.image[0]}
          title={props.name}
          onClick={openItemDialog}
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
            <Typography
              paddingLeft={0.3}
              fontSize={22}
              fontFamily={"Comfortaa"}
              color={"error"}
            >
              {props.price}₴
            </Typography>
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
                  <IconButton sx={{ paddind: 0 }} onClick={() => PutInBasket()}>
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
     

      {/*<Info Dialog>*/}
      <Dialog open={openInfo} onClose={closeInfoDialog}>
        <DialogTitle sx={{ fontFamily: "Comfortaa", fontSize: 15 }}>
          Інформація
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            display={"flex"}
            flexDirection={"row"}
            sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
          >
            {local_info}
            
          </DialogContentText>
          
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
            onClick={closeInfoDialog}
          >
            Зрозуміло
          </Button>
          
        </DialogActions>
      </Dialog>
      {/*</Info Dialog>*/}

      {/*<Item Dialog>*/}
      <Dialog open={openItem} onClose={closeItemDialog}
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
          {props.name}
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            <ItemPage {...props} />
          </DialogContentText>
          <Box>
          
                  
          </Box>
        </DialogContent>
        <DialogActions>
        <Button
            sx={{ fontFamily: "Comfortaa", fontSize: 15, backgroundColor: "#acc0f3" }}
            onClick={() => PutInBasket()}
          >
            Покласти у кошик
          </Button>
          <Button
            sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
            onClick={closeItemDialog}
          >
            Вийти
          </Button>
        </DialogActions>
      </Dialog>
      {/*</Item Dialog>*/}
    </>
  );
}
