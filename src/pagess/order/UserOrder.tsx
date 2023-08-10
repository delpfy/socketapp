import { Box, Grid, Paper, Typography } from "@mui/material";
import { TOrder } from "../../redux/types";
import { useAppSelector } from "../../redux/hooks";

export default function UserOrder() {
  const { current_order } = useAppSelector((state) => state.orders);
  if (!current_order) {
    return null; // Handle the case where current_order is not available yet
  }

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
  } = current_order;

  return (
    <Box paddingTop={15}>
      <Grid container spacing={3} style={{ padding: "20px" }}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Деталі заказу {numberOfOrder}
          </Typography>
        </Grid>

        {/* User Location */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h6">Місцезнаходження користувача</Typography>
            <Typography>Місто: {user_location.city_location}</Typography>
          </Paper>
        </Grid>

        {/* Receiver */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: "20px" }}>
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

            {/* Add other payment fields */}
          </Paper>
        </Grid>

        {/* User Contact */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h6">Контакт користувача</Typography>
            <Typography>Ім'я: {user_contact.name}</Typography>
            <Typography>Прізвище: {user_contact.surname}</Typography>
            <Typography>Номер телефону: {user_contact.phone}</Typography>
            {/* Add other user_contact fields */}
          </Paper>
        </Grid>

         {/* Payment */}
         <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: "20px" }}>
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
                <Typography>Номер телефону: {receiver.contact.phone}</Typography>
              </>
            )}

            {/* Add other receiver fields */}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: "20px" }}>
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
            {/* Add other delivery fields */}
          </Paper>
        </Grid>

       

        {/* Pay With Parts */}
        {payWithParts.months !== 0 ? (
          <Grid item xs={12} md={6}>
            <Paper elevation={3} style={{ padding: "20px" }}>
              <Typography variant="h6">Оплата частинами</Typography>
              <Typography>Місяців: {payWithParts.months}</Typography>
              {/* Add other payWithParts fields */}
            </Paper>
          </Grid>
        ) : (
          <></>
        )}

        {/* Items */}
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h6">Товари</Typography>
            {items.map((item, index) => (
              <div key={index}>
                <Typography>Назва товару: {item.name}</Typography>
                <Typography>Ціна: {item.price} ₴</Typography>
                {/* Add other item fields */}
              </div>
            ))}
          </Paper>
        </Grid>

        {/* Total */}
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h6">Загальна сума: {total} ₴</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
