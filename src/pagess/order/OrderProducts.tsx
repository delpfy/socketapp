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
import { ORDER_setItems, ORDER_setTotal } from "../../redux/order/orderSlice";

export default function OrderProducts() {
  const { items } = useAppSelector((state) => state.basket);
  const { user } = useAppSelector((state) => state.user);
  const [openBasket, setOpenBasket] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function CartDialog_close() {
    setOpenBasket(false);
  }

  function CartDialog_open() {
    setOpenBasket(true);
  }

  function getCurrentItem(item: TShippingItems) {
    dispatch(setCurrentItem(item));
    dispatch(getItemReviews(item._id));
    navigate("/catalog/item");
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
          <Typography fontSize={20}>Замовлення №1</Typography>

          <Typography fontSize={20}>на суму: {user.expences} ₴</Typography>
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
    </>
  );
}
