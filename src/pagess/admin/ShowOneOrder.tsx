import { Box, Grid, Paper, Typography } from "@mui/material";
import { useAppSelector } from "../../redux/hooks";

export default function ShowOneOrder() {
  const { _currentOrder } = useAppSelector((state) => state.admin);

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
    status
  } = _currentOrder;

  return (
    <Box>
      <Grid container spacing={3} style={{ padding: "20px" }}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Деталі заказу {numberOfOrder}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h6">Місцезнаходження користувача</Typography>
            <Typography>Місто: {user_location.city_location}</Typography>
          </Paper>
        </Grid>

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
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h6">Контакт користувача</Typography>
            <Typography>Ім'я: {user_contact.name}</Typography>
            <Typography>Прізвище: {user_contact.surname}</Typography>
            <Typography>Номер телефону: {user_contact.phone}</Typography>
          </Paper>
        </Grid>

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
                <Typography>
                  Номер телефону: {receiver.contact.phone}
                </Typography>
              </>
            )}
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
            {items.map((item: any, index: number) => (
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
            <Typography variant="h6">Статус: {status}</Typography>

          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
