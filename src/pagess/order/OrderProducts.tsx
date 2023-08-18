import {
  Box,
  Button,
  CircularProgress,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TShippingItems } from "../../redux/types";
import { setCurrentItem } from "../../redux/home/homeSlice";
import { getItemReviews } from "../../redux/review/asyncActions";
import BasketDialog from "../../componentss/dialogs/BasketDialog";
import { ORDER_setItems } from "../../redux/order/orderSlice";
import { getItemById } from "../../redux/home/asyncActions";
import InfoDialog from "../../componentss/dialogs/InfoDialog";

export default function OrderProducts() {
  
  const { user_orders } = useAppSelector((state) => state.orders);
  const { items } = useAppSelector((state) => state.basket);
  const { user } = useAppSelector((state) => state.user);
  const [openBasket, setOpenBasket] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [infoMessage, setInfoMessage] = useState<string>("Some info");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  function InfoDialog_open() {
    setOpenInfo(true);
  }

  function InfoDialog_close() {
    setOpenInfo(false);
  }
  function CartDialog_close() {
    setOpenBasket(false);
  }

  function CartDialog_open() {
    setOpenBasket(true);
  }

  function getCurrentItem(item: TShippingItems) {
    dispatch(getItemById(item._id)).then((result: any) => {
      if(result.meta.requestStatus === "fulfilled"){
        dispatch(getItemReviews(item._id)).then((result: any) => {
          if(result.meta.requestStatus === "fulfilled"){
            navigate("/catalog/item");
          }
        });
      }
      if (result.meta.requestStatus === "rejected") {
        setInfoMessage("Такого товару вже нема. Видаліть його");
        InfoDialog_open();
        const recentlyReviewed = JSON.parse(
          localStorage.getItem("recentlyReviewed") || "{}"
        );
        localStorage.setItem(
          "recentlyReviewed",
          JSON.stringify(recentlyReviewed.filter((recent: any) => recent._id !== item._id))
        );
      }
    });
    
  }

  useEffect(() => {
    dispatch(ORDER_setItems(items))
  }, [items])

  return (
    <>
      <Paper elevation={5} sx={{ marginBottom: 5 }}>
        <Box
          sx={{
            paddingTop: 2,

            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography fontSize={20}>Замовлення № {user_orders.orders !== undefined ? user_orders.orders.length + 1 : ""}</Typography>

          <Typography fontSize={20}>на суму: {items &&
                items.reduce((sum: number, item: TShippingItems) => {
                  return (sum += item.price * item.amount);
                }, 0)} ₴</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            paddingBottom: 2,
          }}
        >
          <Button onClick={CartDialog_open}>Редагувати</Button>
        </Box>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Товар</TableCell>
                <TableCell align="right">Ціна</TableCell>
                <TableCell align="right">Кількість</TableCell>
                <TableCell align="right">Сума</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items === undefined ? (
                <CircularProgress size={50} />
              ) : (
                items.map((item) => (
                  <TableRow
                    key={item.name}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      <Link
                        onClick={() => getCurrentItem(item)}
                        sx={{
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={item.image[0]}
                          alt={item.name}
                          style={{ height: 50, width: 50 }}
                        />

                        <Box marginLeft={3}>{item.name}</Box>
                      </Link>
                    </TableCell>
                    <TableCell align="right">{item.price} ₴</TableCell>
                    <TableCell align="right">{item.amount}</TableCell>
                    <TableCell align="right">
                      {item.price * item.amount} ₴
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <BasketDialog
        openBasket={openBasket}
        CartDialog_close={CartDialog_close}
        user={user}
      />
      <InfoDialog
        openInfo={openInfo}
        InfoDialog_close={InfoDialog_close}
        infoMessage={infoMessage}
      />
    </>
  );
}
