import {
    DialogActions,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    Button,
    DialogProps,
    useMediaQuery,
    useTheme,
    Typography,
    Box
  } from "@mui/material";
import { useEffect, useState } from "react";
import BasketPage from "../../pagess/cart/Cart";
import {  useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
  
  type Props = {
    openBasket: boolean;
    closeBasketDialog: () => void;
    user: any
  };
  
  export default function InfoDialog({
    openBasket,
    closeBasketDialog,
    user
  }: Props) {

    const {itemCurrent} = useAppSelector(state => state.home)
    const navigate = useNavigate();
    const [scroll] = useState<DialogProps["scroll"]>("paper");
    const [maxWidth] = useState<DialogProps["maxWidth"]>("md");
    const [fullWidth] = useState(true);
  
    const fullScreen = useMediaQuery(useTheme().breakpoints.down("md"));

    useEffect(() => {
      closeBasketDialog()
    }, [itemCurrent])


    function handleContinue(){
      closeBasketDialog();
      navigate('/');
    }

    return (
        <Dialog
        open={openBasket}
        onClose={closeBasketDialog}
        scroll={scroll}
        maxWidth={maxWidth}
        fullWidth={fullWidth}
        fullScreen={fullScreen}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle
          id="scroll-dialog-title"
          width={"90%"}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography fontFamily={"Comfortaa"} fontSize={22}>
            Кошик
          </Typography>
          <Box
            sx={{
              width: {
                xs: 173,
                md: 220,
              },
            }}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: 15,
                  md: 19,
                },
              }}
              fontFamily={"Comfortaa"}
            >
              Сума товарів:{" "}
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  xs: 15,
                  md: 19,
                },
              }}
              fontFamily={"Comfortaa"}
              color={"error"}
            >
              {user.expences}₴
            </Typography>
          </Box>
        </DialogTitle>

        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            <BasketPage />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              width: {
                xs: 170,
                md: 225,
              },
              fontSize: {
                xs: 12,
                md: 14,
              },
            }}
            variant="contained"
          >
            Оформити замовлення
          </Button>
          <Button
            sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
            onClick={handleContinue}
          >
            Продовжити покупки
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  