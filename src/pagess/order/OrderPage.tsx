import {
  Box,
  Button,
  Divider,
  Paper,
  PaperProps,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import Contacts from "./Contacts";
import OrderProducts from "./OrderProducts";
import Delivery from "./Delivery";
import Payment from "./Payment";
import { useNavigate } from "react-router-dom";
import { TShippingItems } from "../../redux/types";
import { useEffect, useRef, useState } from "react";
import {
  ORDER_setPaymentWithParts,
  ORDER_setTotal,
} from "../../redux/order/orderSlice";
import Receiver from "./Receiver";
import InfoDialog from "../../componentss/dialogs/InfoDialog";

export default function OrderPage() {
  const { items } = useAppSelector((state) => state.basket);
  const { user } = useAppSelector((state) => state.user);
  const { _order, stages_of_order } = useAppSelector((state) => state.orders);

  const [openInfo, setOpenInfo] = useState(false);
  const [infoMessage, setInfoMessage] = useState<string>("Some info");

  const [scrollPosition, setScrollPosition] = useState(0);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function InfoDialog_open() {
    setOpenInfo(true);
  }

  function InfoDialog_close() {
    setOpenInfo(false);
    console.log("!stages_of_order.stage_userContact: ")
    console.log(!stages_of_order.stage_userContact)
    if (!stages_of_order.stage_userContact) {
      pointOn_Contacts();

      return;
    }
    console.log("!stages_of_order.stage_city: ")
    console.log(!stages_of_order.stage_city)
    if (!stages_of_order.stage_city) {
      pointOn_Contacts();

      return;
    }
    console.log("!stages_of_order.stage_delivery: ")
    console.log(!stages_of_order.stage_delivery)
    if (!stages_of_order.stage_delivery) {
      pointOn_Delivery();

      return;
    }
    console.log("!stages_of_order.stage_payment ")
    console.log(!stages_of_order.stage_payment)
    if (!stages_of_order.stage_payment) {
      pointOn_Payment();

      return;
    }
    console.log("!stages_of_order.stage_recevierContact: ")
    console.log(!stages_of_order.stage_recevierContact)
    if (!stages_of_order.stage_recevierContact) {
      pointOn_Receiver();
      return;
    }
  }

  function handleOrderReady() {
    if (!stages_of_order.stage_userContact) {
      InfoDialog_open();
      setInfoMessage("Ви не вказали усі контактні дані");
      return;
    }
    if (!stages_of_order.stage_city) {
      InfoDialog_open();
      setInfoMessage("Ви не вказали міста");

      return;
    }
    if (!stages_of_order.stage_delivery) {
      InfoDialog_open();
      setInfoMessage("Ви не вказали спосіб доставки");

      return;
    }
    if (!stages_of_order.stage_payment) {
      InfoDialog_open();
      setInfoMessage("Ви не вказали спосіб оплати");

      return;
    }

    if (!stages_of_order.stage_recevierContact) {
      InfoDialog_open();
      setInfoMessage("Ви не вказали отримувача");

      return;
    }

    alert("WOW");
    console.log("WOW 1");
    console.log(_order);
    console.log("WOW 2");
  }

  const contact_ref = useRef<HTMLDivElement>(null);
  const payment_ref = useRef<HTMLDivElement | null>(null);
  const delivery_ref = useRef<HTMLDivElement | null>(null);
  const receiver_ref = useRef<HTMLDivElement | null>(null);
  const scrollToElement = (element: HTMLElement) => {
    return new Promise<void>((resolve) => {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });

      setTimeout(() => {
        resolve();
      }, 500);
    });
  };

  const pointOn_Contacts = async () => {
    if (contact_ref.current) {
      setScrollPosition(contact_ref.current.scrollTop);
      await scrollToElement(contact_ref.current);
    }
  };

  const pointOn_Payment = async () => {
    if (payment_ref.current) {
      await scrollToElement(payment_ref.current);
    }
  };
  const pointOn_Delivery = async () => {
    if (delivery_ref.current) {
      await scrollToElement(delivery_ref.current);
    }
  };
  const pointOn_Receiver = async () => {
    if (receiver_ref.current) {
      await scrollToElement(receiver_ref.current);
    }
  };

  useEffect(() => {
    dispatch(
      ORDER_setTotal(
        items.reduce((sum: number, item: TShippingItems) => {
          return (sum += item.price * item.amount);
        }, 0)
      )
    );
  }, []);

  return (
    <>
      {items === undefined ? (
        navigate("/")
      ) : items.length === 0 ? (
        navigate("/")
      ) : (
        <Box paddingTop={15}>
          <Typography variant="h1" fontSize={30} fontFamily={"Comfortaa"}>
            Замовлення
          </Typography>
          <Box
            padding={5}
            display={"flex"}
            justifyContent={"space-evenly"}
            flexDirection={"row-reverse"}
          >
            <Paper
              elevation={5}
              sx={{
                marginBottom: 5,
                height: 510,
                width: 310,
                padding: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                flexDirection={"column"}
                height={230}
              >
                <Typography fontSize={25}>Разом</Typography>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  flexDirection={"row"}
                  width={"100%"}
                >
                  <Typography>{items.length} товари на сумму</Typography>
                  <Typography width={100}>
                    {items.reduce((sum: number, item: TShippingItems) => {
                      return (sum += item.price * item.amount);
                    }, 0)}{" "}
                    ₴
                  </Typography>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  flexDirection={"row"}
                  width={"100%"}
                >
                  <Typography>Вартість доставки</Typography>
                  <Typography width={100}>
                    {!stages_of_order.stage_delivery
                      ? "за тарифами перевізника"
                      : `${_order.delivery.delivery_cost}₴`}{" "}
                  </Typography>
                </Box>
                {_order.payWithParts.months === 0 ? (
                  <></>
                ) : (
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    flexDirection={"row"}
                    width={"100%"}
                  >
                    <Typography>Оплата частинами</Typography>
                    <Typography width={100}>
                      {_order.payWithParts.perMonth} ₴ на{" "}
                      {_order.payWithParts.months} міс.{" "}
                    </Typography>
                  </Box>
                )}
                <Divider light />
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  flexDirection={"row"}
                  width={"100%"}
                >
                  {_order.payWithParts.months === 0 ? (
                    <>
                      <Typography>До сплати</Typography>
                      <Typography width={100} fontSize={25}>
                        {_order.total === 0 ? (
                          <>{navigate("/")}</>
                        ) : (
                          _order.total
                        )}
                        ₴
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Typography>Перший внесок</Typography>
                      <Typography width={100} fontSize={25}>
                        {_order.payWithParts.firstPay} ₴
                      </Typography>
                    </>
                  )}
                </Box>
                <Divider light />
              </Box>
              <Button
                variant="contained"
                size="large"
                color="success"
                sx={{ justifySelf: "center" }}
                onClick={handleOrderReady}
              >
                Замовлення підтверджую
              </Button>
              <Typography fontSize={13}>
                Отримання замовлення від 5 000 ₴ - 30 000 ₴ за наявності
                документів. При оплаті готівкою від 30 000 ₴ необхідно надати
                документи для верифікації згідно вимог Закону України від
                06.12.2019 №361-IX{" "}
              </Typography>
              <Typography fontSize={13}>
                Підтверджуючи замовлення, я приймаю умови:{" "}
              </Typography>
              <Box>
                <Typography fontSize={13}>
                  положення про обробку і захист персональних даних{" "}
                </Typography>
                <Typography fontSize={13}>угоди користувачa </Typography>
              </Box>
            </Paper>

            <Box
              padding={5}
              display={"flex"}
              justifyContent={"space-between"}
              flexDirection={"column"}
            >
              <div ref={contact_ref}>
                <Contacts />
              </div>

              <OrderProducts />
              <div ref={delivery_ref}>
                <Delivery />
              </div>
              <div ref={payment_ref}>
                <Payment />
              </div>
              <div ref={receiver_ref}>
                <Receiver />
              </div>
            </Box>
          </Box>
        </Box>
      )}
      <InfoDialog
        openInfo={openInfo}
        InfoDialog_close={InfoDialog_close}
        infoMessage={infoMessage}
      />
    </>
  );
}
