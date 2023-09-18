import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setProcess } from "../../redux/admin/adminSlice";
import {
  deleteUser,
  getAllUsers,
  getOrderById,
  getUserById,
} from "../../redux/admin/asyncActions";
import { useState } from "react";
import InfoDialog from "../../componentss/dialogs/InfoDialog";
import { CURRENT_ORDER_setOrder } from "../../redux/order/orderSlice";

export default function ShowOrders() {
  const { _orders } = useAppSelector((state) => state.admin);
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
              <TableCell>Код</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {_orders.map((_order: any) => {
              return (
                <TableRow onClick={() => redirectToOrder(_order._id)}>
                  <TableCell>
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
                  <TableCell>{_order.numberOfOrder}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
