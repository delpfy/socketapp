import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Box, Paper, Typography } from "@mui/material";
import { getOrdersByUser } from "../../redux/order/asyncActions";
import { Items, Status } from "../../redux/types";

export default function UserOrders() {
  const { user_orders, status } = useAppSelector((state) => state.orders);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getOrdersByUser(user.id)).then((result: any) => {
      if (result.meta.requestStatus === "fulfilled") {
        console.log(user_orders);
      }
    });
  }, []);

  function StatusHandler(status: Status) {
    switch (status) {
      case "success":
        if (user_orders !== undefined && user_orders.orders.length !== 0) {
          return (
            <Paper elevation={5} sx={{ marginBottom: 5 }}>
              <Typography fontSize={20}>Ваші закази:</Typography>
              {user_orders.orders.map((order: any, index) => (
                <>
                  <Paper elevation={5} sx={{ margin: 5 }}>
                    <Typography key={order.numberOfOrder}>
                      Номер {index + 1}: код: {order.numberOfOrder}
                    </Typography>
                    <Box>
                      {order.items.map((item: Items) => {
                        return (
                          <>
                            <img
                              src={item.image[0]}
                              alt=""
                              style={{ width: 50, height: 50 }}
                            />
                          </>
                        );
                      })}
                    </Box>
                  </Paper>
                </>
              ))}
            </Paper>
          );
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
