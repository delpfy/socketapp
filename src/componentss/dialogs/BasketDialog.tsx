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
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import BasketPage from "../../pagess/cart/Cart";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import RegisterDialog from "./RegisterDialog";
import ErrorDialog from "./ErrorDialog";

import LoginDialog from "./LoginDialog";
import InfoDialog from "./InfoDialog";
import { TShippingItems } from "../../redux/types";



type Props = {
  openBasket: boolean;
  CartDialog_close: () => void;
  user: any;
};

export default function BasketDialog({
  openBasket,
  CartDialog_close,
  user,
}: Props) {
  const { itemCurrent } = useAppSelector((state) => state.home);
  const { items } = useAppSelector((state) => state.basket);
  const navigate = useNavigate();

  const [openLogin, setOpenLogin] = useState(false);

  const [openError, setOpenError] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string>("Unhandled error");
  const [infoMessage, setInfoMessage] = useState<string>("Some info");

  const [scroll] = useState<DialogProps["scroll"]>("paper");
  const [maxWidth] = useState<DialogProps["maxWidth"]>("md");
  const [fullWidth] = useState(true);

  const fullScreen = useMediaQuery(useTheme().breakpoints.down("md"));
  
  useEffect(() => {
    CartDialog_close();
  }, [itemCurrent]);

 

  function LoginDialog_open() {
    if (user.authorized === true) {
      navigate("/user");
    } else {
      RegisterDialog_close();
      setOpenLogin(true);
    }
  }

  function closeRegAfterSuccess() {
    setOpenRegister(false);
    setInfoMessage("Все добре, теперь увійдіть");
    InfoDialog_open();
  }

  function InfoDialog_open() {
    setOpenInfo(true);
  }

  function InfoDialog_close() {
    setOpenInfo(false);
  }

  function ErrorDialog_close() {
    setOpenError(false);
  }

  function LoginDialog_close() {
    setOpenLogin(false);
  }

  function RegisterDialog_close() {
    setOpenRegister(false);
  }

  function handleContinueShopping() {
    CartDialog_close();
    navigate("/");
  }
  function handleMakeAnOrder() {
    CartDialog_close();
    if (user && user.authorized) {
      navigate("/order");
    } else {
      setOpenLogin(true);
    }
  }

  return (
    <>
      <Dialog
        open={openBasket}
        onClose={CartDialog_close}
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
              {items &&
                items.reduce((sum: number, item: TShippingItems) => {
                  return (sum += item.price * item.amount);
                }, 0)}
              ₴
            </Typography>
          </Box>
        </DialogTitle>

        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            <BasketPage />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {items.length === 0 ? (
            <></>
          ) : (
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
              onClick={handleMakeAnOrder}
            >
              Оформити замовлення
            </Button>
          )}

          <Button
            sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
            onClick={handleContinueShopping}
          >
            Продовжити покупки
          </Button>
        </DialogActions>
      </Dialog>
      <LoginDialog
        openLogin={openLogin}
        LoginDialog_close={LoginDialog_close}
        ErrorDialog_open={setOpenError}
        RegisterDialog_open={setOpenRegister}
        LoginDialog_open={setOpenLogin}
        setErrorMessage={setErrorMessage}
        InfoDialog_open={setOpenInfo}
        setInfoMessage={setInfoMessage}
      />

      <ErrorDialog
        openError={openError}
        ErrorDialog_close={ErrorDialog_close}
        errorMessage={errorMessage}
      />
      <InfoDialog
        openInfo={openInfo}
        InfoDialog_close={InfoDialog_close}
        infoMessage={infoMessage}
      />

      <RegisterDialog
        openRegister={openRegister}
        closeRegisterDialog={RegisterDialog_close}
        ErrorDialog_open={setOpenError}
        LoginDialog_open={LoginDialog_open}
        closeRegAfterSuccess={closeRegAfterSuccess}
        setErrorMessage={setErrorMessage}
      />
    </>
  );
}
