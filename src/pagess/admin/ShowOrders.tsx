import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  MenuItem,
  Select,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setProcess } from "../../redux/admin/adminSlice";
import {
  deleteUser,
  getAllUsers,
  getOrderById,
  getUserById,
  updateOrder,
} from "../../redux/admin/asyncActions";
import { useState } from "react";
import InfoDialog from "../../componentss/dialogs/InfoDialog";
import { CURRENT_ORDER_setOrder } from "../../redux/order/orderSlice";
import { TOrder, TOrderStatus } from "../../redux/types";
import { formatDate } from "../../utils/usefulFunc";

export default function ShowOrders() {
  const { _orders } = useAppSelector((state) => state.admin);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState("В обробці");
  const dispatch = useAppDispatch();
  const [openInfo, setOpenInfo] = useState(false);
  const [infoMessage, setInfoMessage] = useState<string>("Some info");
  function InfoDialog_open() {
    setOpenInfo(true);
  }
  function InfoDialog_close() {
    setOpenInfo(false);
  }

  function redirectToOrder(orderId: string) {
    dispatch(getOrderById({ orderId: orderId })).then((result: any) => {
      if (result.meta.requestStatus === "fulfilled") {
        dispatch(setProcess("show-one-order"));
      }
    });
  }

  function handleOrderStatusChange(e: any, order: any) {
    console.log(order._id);
    dispatch(
      updateOrder({
        orderId: order._id,
        order: {
          user_location: order.user_location,
          receiver: order.receiver,
          user_contact: order.user_contact,
          delivery: order.delivery,
          payment: order.payment,
          payWithParts: order.payWithParts,
          items: order.items,
          total: order.total,
          numberOfOrder: order.numberOfOrder,
          status: e.target.value,
        },
      })
    ).then((result: any) => {
      if (result.meta.requestStatus === "fulfilled") {
        InfoDialog_open();
        setInfoMessage("Успіх");
      }
      if (result.meta.requestStatus === "rejected") {
        InfoDialog_open();
        setInfoMessage("Не успіх");
      }
    });
  }

  return (
    <>
      <InfoDialog
        openInfo={openInfo}
        InfoDialog_close={InfoDialog_close}
        infoMessage={infoMessage}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Товари</TableCell>
              <TableCell>Усього</TableCell>
              <TableCell>Користувач</TableCell>
              <TableCell>Місцезнаходження користувача</TableCell>
              <TableCell>
                Статус :
                <Select
                  size="small"
                  value={selectedOrderStatus}
                  onChange={(e) => setSelectedOrderStatus(e.target.value)}
                  label="Категорія"
                >
                  {["В обробці", "Погоджено", "Скасовано"].map(
                    (_status: any) => (
                      <MenuItem key={_status} value={_status}>
                        {_status}
                      </MenuItem>
                    )
                  )}
                </Select>
              </TableCell>
              <TableCell>Код</TableCell>
              <TableCell>Дата</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {_orders
              .filter((_order) => _order.status === selectedOrderStatus)
              .map((_order: any) => {
                return (
                  <TableRow>
                    <TableCell
                      sx={{ cursor: "pointer" }}
                      onClick={() => redirectToOrder(_order._id)}
                    >
                      {_order.items.map((item: any) => {
                        return (
                          <img
                            src={`https://www.sidebyside-tech.com${item.image[0]}`}
                            style={{ width: 50, height: 50 }}
                            alt={item.name}
                          ></img>
                        );
                      })}
                    </TableCell>
                    <TableCell>{_order.total} ₴</TableCell>
                    <TableCell>{_order.user_contact.name}</TableCell>
                    <TableCell>{_order.user_location.city_location}</TableCell>
                    <TableCell>
                      <Select
                        size="small"
                        value={_order.status}
                        onChange={(e) => handleOrderStatusChange(e, _order)}
                        label="Категорія"
                      >
                        {["В обробці", "Погоджено", "Скасовано"].map(
                          (_status: any) => (
                            <MenuItem key={_status} value={_status}>
                              {_status}
                            </MenuItem>
                          )
                        )}
                      </Select>
                    </TableCell>

                    <TableCell>{_order.numberOfOrder}</TableCell>
                    <TableCell>{formatDate(_order.createdAt)}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
