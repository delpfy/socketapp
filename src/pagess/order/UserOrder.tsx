import { Box, Grid, Typography } from "@mui/material";

import { useAppSelector } from "../../redux/hooks";
import UserOrders from "./UserOrders";
import { useEffect } from "react";

export default function UserOrder() {
  const { current_order, user_orders } = useAppSelector(
    (state) => state.orders
  );
  if (!current_order) {
    return null;
  }

  window.scrollTo(0, 0);

  const {
    user_location,
    receiver,
    user_contact,
    delivery,
    payment,
    payWithParts,
    items,
    total,
    numberOfOrder,
    status,
  } = current_order;

  return (
    <Box
      paddingTop={15}
      sx={{
        margin: "0 auto",
        width: {
          xs: "95%",
          sm: "40%",
          md: "70%",
        },
      }}
    >
      <Typography
        fontWeight={"bold"}
        textAlign={"center"}
        fontSize={32}
        marginBottom={5}
      >
        Деталі заказу {numberOfOrder}
      </Typography>
      <Grid
        sx={{
          border: "1px solid black",
          width: { xs: "90%", sm: "100%", md: "85%" },
          borderRadius: 1,
          margin: "0 auto",
        }}
        container
        spacing={3}
        style={{ padding: "20px" }}
      >
        <Grid item xs={12}></Grid>

        <Grid item xs={12} md={6}>
          <Box
            sx={{ border: "1px solid black", borderRadius: 1 }}
            style={{ padding: "20px" }}
          >
            <Typography variant="h6">Місцезнаходження користувача</Typography>
            <Typography>Місто: {user_location.city_location}</Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            sx={{ border: "1px solid black", borderRadius: 1 }}
            style={{ padding: "20px" }}
          >
            <Typography variant="h6">Оплата</Typography>
            <Typography>
              Тип оплати: {payment.payment_type}{" "}
              {payWithParts.months !== 0
                ? `оплата частинами`
                : payment.uponReceipt
                ? "в місці доставки"
                : "по передплаті"}{" "}
            </Typography>
            {payWithParts.months !== 0 ? (
              <>
                <Typography>Перший внесок {payWithParts.firstPay} ₴</Typography>
              </>
            ) : (
              <></>
            )}
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            sx={{ border: "1px solid black", borderRadius: 1 }}
            style={{ padding: "20px" }}
          >
            <Typography variant="h6">Контакт користувача</Typography>
            <Typography>Ім'я: {user_contact.name}</Typography>
            <Typography>Прізвище: {user_contact.surname}</Typography>
            <Typography>Номер телефону: {user_contact.phone}</Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            sx={{ border: "1px solid black", borderRadius: 1 }}
            style={{ padding: "20px" }}
          >
            <Typography variant="h6">Отримувач</Typography>
            {receiver.userIsReceiver ? (
              <>
                <Typography>Ім'я: {user_contact.name}</Typography>
                <Typography>Прізвище: {user_contact.surname}</Typography>
                <Typography>Номер телефону: {user_contact.phone}</Typography>
              </>
            ) : (
              <>
                <Typography>Ім'я: {receiver.contact.name}</Typography>
                <Typography>Прізвище: {receiver.contact.surname}</Typography>
                <Typography>
                  Номер телефону: {receiver.contact.phone}
                </Typography>
              </>
            )}
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            sx={{ border: "1px solid black", borderRadius: 1 }}
            style={{ padding: "20px" }}
          >
            <Typography variant="h6">Доставка</Typography>
            <Typography>Тип доставки: {delivery.delivery_type}</Typography>
            <Typography>
              Вартість доставки: {delivery.delivery_cost} ₴
            </Typography>
            {delivery.delivery_type === "Нова Пошта" ? (
              <Typography>
                Відділення або поштомат: {delivery.novaDepartment}
              </Typography>
            ) : delivery.delivery_type === "На адресу" ? (
              <>
                {delivery.delivery_location.street && (
                  <Typography>
                    Адреса: {delivery.delivery_location.street}{" "}
                  </Typography>
                )}
                {delivery.delivery_location.houseNumber && (
                  <Typography>
                    Будинок: {delivery.delivery_location.houseNumber}
                  </Typography>
                )}
                {delivery.delivery_location.apartmentNumber && (
                  <>
                    <Typography>
                      Квартира: {delivery.delivery_location.apartmentNumber}
                    </Typography>
                    <Typography>
                      Поверх: {delivery.delivery_location.floorNumber}
                    </Typography>
                    <Typography>
                      Підняти на поверх: {delivery.liftRequired ? "Так" : "Ні"}
                    </Typography>
                  </>
                )}
              </>
            ) : null}
          </Box>
        </Grid>

        {/* Pay With Parts */}
        {payWithParts.months !== 0 ? (
          <Grid item xs={12} md={6}>
            <Box
              sx={{ border: "1px solid black", borderRadius: 1 }}
              style={{ padding: "20px" }}
            >
              <Typography variant="h6">Оплата частинами</Typography>
              <Typography>Місяців: {payWithParts.months}</Typography>
              {/* Add other payWithParts fields */}
            </Box>
          </Grid>
        ) : (
          <></>
        )}

        {/* Items */}
        <Grid item xs={12}>
          <Box
            sx={{ border: "1px solid black", borderRadius: 1 }}
            style={{ padding: "20px" }}
          >
            <Typography variant="h6">Товари</Typography>
            {items.map((item, index) => (
              <div key={index}>
                <Typography>Назва товару: {item.name}</Typography>
                <Typography>Ціна: {item.price} ₴</Typography>
                {/* Add other item fields */}
              </div>
            ))}
          </Box>
        </Grid>

        {/* Total */}
        <Grid item xs={12}>
          <Box
            sx={{ border: "1px solid black", borderRadius: 1 }}
            style={{ padding: "20px" }}
          >
            <Typography variant="h6">Загальна сума: {total} ₴</Typography>
            <Typography variant="h6">Статус: {status}</Typography>
          </Box>
        </Grid>
      </Grid>
      {user_orders.orders === undefined ? (
        <></>
      ) : user_orders.orders.length === 0 ? (
        <></>
      ) : (
        <UserOrders />
      )}
    </Box>
  );
}
