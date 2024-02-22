import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Box, Typography } from "@mui/material";
import { Items, Status, TOrder } from "../../redux/types";
import { CURRENT_ORDER_setOrder } from "../../redux/order/orderSlice";
import { useNavigate } from "react-router-dom";

export default function UserOrders() {
  const { user_orders, status } = useAppSelector((state) => state.orders);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function RedirectToOrder(order: TOrder) {
    dispatch(CURRENT_ORDER_setOrder(order));
    navigate("/user-order");
  }

  function StatusHandler(status: Status) {
    switch (status) {
      case "success":
        if (user_orders !== undefined) {
          if (user_orders.orders !== undefined) {
            return (
              <>
                <Typography
                  fontSize={28}
                  textAlign={"center"}
                  fontWeight={"bold"}
                  marginLeft={"auto"}
                  marginRight={"auto"}
                  marginTop={6}
                  marginBottom={4}
                  width={"100%"}
                >
                  Ваші закази:
                </Typography>
                <Box
                  sx={{
                    border: "1px solid black",
                    width: { xs: "90%", sm: "100%", md: "100%" },
                    borderRadius: 1,
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: 5,
                    marginBottom: 5,
                    padding: { xs: 0, sm: 3, md: 3 },
                    maxHeight: 400,
                    overflowY: "scroll",
                    "&::-webkit-scrollbar": {
                      width: "10px",
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
                  {user_orders.orders.map((order: TOrder, index) => {
                    return (
                      <>
                        <Box
                          sx={{
                            marginTop: 3,
                            marginBottom: 3,

                            marginLeft: "auto",
                            marginRight: "auto",
                            cursor: "pointer",
                            border: "1px solid black",
                            borderRadius: 1,
                            padding: 1,
                            width: "90%",
                          }}
                          onClick={() => {
                            RedirectToOrder(order);
                          }}
                        >
                          <Typography key={order.numberOfOrder}>
                            Номер {index + 1}: код: {order.numberOfOrder}
                          </Typography>
                          <Box>
                            {order.items.map((item: Items) => {
                              return (
                                <img
                                  src={`https://socket-express-bssu.onrender.com${item.image[0]}`}
                                  alt=""
                                  style={{ width: 50, height: 50 }}
                                />
                              );
                            })}
                          </Box>
                        </Box>
                      </>
                    );
                  })}
                </Box>
              </>
            );
          } else {
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
