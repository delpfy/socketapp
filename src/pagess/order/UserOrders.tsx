
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Box, Paper, Typography } from "@mui/material";
import { Items, Status, TOrder } from "../../redux/types";
import { CURRENT_ORDER_setOrder } from "../../redux/order/orderSlice";
import { useNavigate } from "react-router-dom";

export default function UserOrders() {
  const { user_orders, status } = useAppSelector((state) => state.orders);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  


  function RedirectToOrder (order: TOrder){
    dispatch(CURRENT_ORDER_setOrder(order))
    navigate("/user-order")
  }

  function StatusHandler(status: Status) {
    switch (status) {
      case "success":
        if (user_orders !== undefined  ) {
            if(user_orders.orders !== undefined){
                return (
                    <Paper elevation={5} sx={{ marginBottom: 5 }}>
                      <Typography fontSize={20}>Ваші закази:</Typography>
                      {user_orders.orders.map((order: TOrder, index) => {
                          return (
                              <>
                                  <Paper elevation={5} sx={{ margin: 5, cursor: 'pointer' }} onClick = {() => {RedirectToOrder(order)}} >
                                      <Typography key={order.numberOfOrder}>
                                          Номер {index + 1}: код: {order.numberOfOrder}
                                      </Typography>
                                      <Box>
                                        {
                                            order.items.map((item: Items) => {
                                                return(
                                                    <img src={item.image[0]} alt="" style={{width: 50, height: 50}}/>
                                                )
                                            })
                                        }
                                      </Box>
                                  </Paper>
                              </>
                          );
                      })}
                    </Paper>
                  );
            }else {
                return <></>;
              }
          
          //return <CatalogSkeletons />
        } else {
          return <></>;
        }
      case "pending":
        return <></>;
      case "error":
        return <></>;
      default:
        return <></>;
    }
  }

  return StatusHandler(status);
}
