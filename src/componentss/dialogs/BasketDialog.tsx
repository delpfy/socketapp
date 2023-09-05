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
  IconButton,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import BasketPage from "../../pagess/cart/Cart";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import RegisterDialog from "./RegisterDialog";
import ErrorDialog from "./ErrorDialog";

import LoginDialog from "./LoginDialog";
import InfoDialog from "./InfoDialog";
import { Items, TShippingItems } from "../../redux/types";
import PromotionalOffers from "../PromotionalOffers";
import HomeCard from "../catalogg/block/HomeCard";

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
  const { itemCurrent, itemsPromotionOffer, status } = useAppSelector(
    (state) => state.home
  );
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
          sx={{
            fontFamily: "Comfortaa",
            fontSize: 20,
            borderBottom: "2px solid black",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Кошик
          <IconButton onClick={CartDialog_close}>
            <img
              src={require("../../img/crossIcon.png")}
              style={{ width: 15, height: 15 }}
              alt="sdf"
            />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            <BasketPage />
          </DialogContentText>
          <Box width={"100%"}>
            <Typography
              variant={"h3"}
              fontSize={26}
              fontFamily={"Comfortaa"}
              paddingBottom={4}
              textAlign={"left"}
            >
              Акційні пропозиції
            </Typography>
            <Box
              display={"flex"}
              justifyContent={"start"}
              alignItems={"center"}
              sx={{
                overflowX: "scroll",

                "&::-webkit-scrollbar": {
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
              {itemsPromotionOffer.items !== undefined &&
              status === "success" ? (
                itemsPromotionOffer.items
                  ?.filter((item: Items) => item.sale !== 0)
                  .sort((itemA: Items, itemB: Items) => itemB.sale - itemA.sale)
                  .slice(0, 20)
                  .map((item: any) => <HomeCard key={item._id} {...item} />)
              ) : (
                <></>
              )}
            </Box>
          </Box>
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
