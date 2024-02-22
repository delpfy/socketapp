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
import { getItemReviews } from "../../redux/review/asyncActions";
import BasketDialog from "../../componentss/dialogs/BasketDialog";
import { ORDER_setItems } from "../../redux/order/orderSlice";
import { getItemById } from "../../redux/home/asyncActions";
import InfoDialog from "../../componentss/dialogs/InfoDialog";
import slugify from "slugify";

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
      if (result.meta.requestStatus === "fulfilled") {
        dispatch(getItemReviews(item._id)).then((result: any) => {
          if (result.meta.requestStatus === "fulfilled") {
            navigate(`/${slugify(item.category)}/${item.slugString}`);
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
          JSON.stringify(
            recentlyReviewed.filter((recent: any) => recent._id !== item._id)
          )
        );
      }
    });
  }

  useEffect(() => {
    dispatch(ORDER_setItems(items));
  }, [items]);

  return (
    <>
      <Box
        sx={{
          marginBottom: 5,
          borderBottom: "2px solid black",
          paddingBottom: 1,
        }}
      >
        <Box
          sx={{
            paddingTop: 2,
            paddingBottom: 1,
            borderBottom: "2px solid black",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>
            Замовлення №{" "}
            {user_orders.orders !== undefined
              ? user_orders.orders.length + 1
              : 1}
          </Typography>

          <Typography>
            на суму:{" "}
            {items &&
              items.reduce((sum: number, item: TShippingItems) => {
                return (sum += item.price * item.amount);
              }, 0)}{" "}
            ₴
          </Typography>
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

        <Box>
          <Box sx={{ width: "100%" }} aria-label="simple table">
            <Box>
              {items === undefined ? (
                <CircularProgress size={50} />
              ) : (
                items.map((item) => (
                  <Box
                    key={item.name}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box width={"30%"}>
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
                          src={`https://socket-express-bssu.onrender.com${item.image[0]}`}
                          alt={item.name}
                          style={{ height: 125, width: 125 }}
                        />
                      </Link>
                    </Box>
                    <Box width={"70%"} textAlign={"center"}>
                      {item.name}
                    </Box>
                    <Box width={"30%"} textAlign={"center"}>
                      <Typography>Ціна</Typography>
                      <Typography color={"error"} fontSize={18}>
                        {item.price} ₴
                      </Typography>
                    </Box>
                    <Box width={"30%"} textAlign={"center"}>
                      <Typography>Кількість</Typography>
                      <Typography>{item.amount}</Typography>
                    </Box>
                  </Box>
                ))
              )}
            </Box>
          </Box>
        </Box>
      </Box>
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
