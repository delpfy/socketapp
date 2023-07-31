import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import Contacts from "./Contacts";
import OrderProducts from "./OrderProducts";
import Delivery from "./Delivery";
import Payment from "./Payment";
import { useNavigate } from "react-router-dom";
import { TShippingItems } from "../../redux/types";
import { useEffect, useState } from "react";
import { setTotalExpences } from "../../redux/order/orderSlice";

export default function OrderPage() {
  const { items } = useAppSelector((state) => state.basket);
  const { user } = useAppSelector((state) => state.user);
  const { totalExpences } = useAppSelector((state) => state.orders);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  
  useEffect(() => {
    dispatch(setTotalExpences(items.reduce((sum: number, item: TShippingItems) => {return  sum += item.price * item.amount},0)));
  }, [])

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
                  <Typography width={100}>{items.reduce((sum: number, item: TShippingItems) => {return  sum += item.price * item.amount},0)} ₴</Typography>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  flexDirection={"row"}
                  width={"100%"}
                >
                  <Typography>Вартість доставки</Typography>
                  <Typography width={100}>за тарифами перевізника</Typography>
                </Box>
                <Divider light />
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  flexDirection={"row"}
                  width={"100%"}
                >
                  <Typography>До сплати</Typography>
                  <Typography width={100} fontSize={25}>
                    {totalExpences} ₴
                  </Typography>
                </Box>
                <Divider light />
              </Box>
              <Button
                variant="contained"
                size="large"
                color="success"
                sx={{ justifySelf: "center" }}
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
              <Contacts />
              <OrderProducts />
              <Delivery />
              <Payment />
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}
