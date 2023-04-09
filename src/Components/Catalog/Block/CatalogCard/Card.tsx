import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IBasketItems, IItems } from "../../../../redux/types";
import {
  Box,
  ClickAwayListener,
  IconButton,
  Rating,
  Tooltip,
  createTheme,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { getItemById } from "../../../../redux/home/asyncActions";
import { useNavigate } from "react-router-dom";
import { pink, purple } from "@mui/material/colors";
import { addBasketItem } from "../../../../redux/basket/asyncActions";
import { checkAuthorization } from "../../../../redux/user/asyncActions";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


export default function CatalogCard(props: IItems) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);
  const [active, setActive] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);
  const { status } = useAppSelector((state) => state.basket);

  // Redirecting to ItemPage
  function Redirect() {
    dispatch(getItemById(props._id));
    navigate("/socketapp/item");
  }

  // Chech auth, if authorized - add and changing active state.
  function PutInBasket() {
    if (user.authorized == true) {
      dispatch(
        addBasketItem({
          name: props.name,
          description: props.name,
          category: props.category,
          price: props.price,
          rating: props.rating,
          image: props.image,
          amount: 1,
        } as IBasketItems)
      );
    } else {
      // Tip, dunno if i`ll use it.
      // setOpen(true)
    }

    if (status == "success") {
      setActive(!active);
    }
  }

  return (
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
        onClick={() => Redirect()}
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
                    sx={{ height: 35, width:35 }}
                    color={active ? "secondary" : "disabled"}
                  />
                </IconButton>
              </Tooltip>
            </Box>
          </ClickAwayListener>
        </Box>
      </CardActions>
    </Card>
  );
}
