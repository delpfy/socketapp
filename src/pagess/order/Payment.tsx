import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  ORDER_setPayment,
  ORDER_setPaymentWithParts,
  STAGES_payment,
} from "../../redux/order/orderSlice";

export default function Payment() {
  const { _order } = useAppSelector((state) => state.orders);
  const { items } = useAppSelector((state) => state.basket);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardNumberError, setCardNumberError] = useState(false);
  const [expiryDateError, setExpiryDateError] = useState(false);
  const [cvvError, setCvvError] = useState(false);
  const [cardButtonMessage, setCardButtonMessage] = useState("Додати");
  const [selectedOption, setSelectedOption] = useState("payOnDelivery");
  const [selectedSecondaryOption, setSelectedSecondaryOption] =
    useState("payOnDelivery");

  const dispatch = useAppDispatch();

  useEffect(() => {
    setSelectedOption("")
  } , [items])
  
  const marks = [
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" },
    { value: 6, label: "6" },
    { value: 7, label: "7" },
    { value: 8, label: "8" },
    { value: 9, label: "9" },
    { value: 10, label: "10" },
    { value: 11, label: "11" },
    { value: 12, label: "12" },
  ];

  function valuetext(value: number) {
    return `${_order.total / value} ₴`;
  }

  const handleMonthChange = (event: Event, newValue: number | number[]) => {
    dispatch(
      ORDER_setPaymentWithParts({
        months: newValue as number,
        perMonth: Math.round(_order.total / (newValue as number)),
        firstPay:
          Math.round(_order.total / (newValue as number)) +
          _order.delivery.delivery_cost,
      })
    );
    dispatch(STAGES_payment(true));
  };

  const handleCardNumberChange = (event: any) => {
    const value = event.target.value;
    const cleanedValue = value.replace(/\D/g, "");

    if (cleanedValue.length <= 16) {
      setCardNumber(cleanedValue);

      if (
        cleanedValue.length > 0 &&
        cleanedValue.length % 4 === 0 &&
        cleanedValue.length === 16
      ) {
        setCardNumberError(false);
      } else {
        setCardNumberError(true);
      }
    }
  };

  const handleExpiryDateChange = (event: any) => {
    const value = event.target.value;

    const cleanedValue = value.replace(/\D/g, "");
    if (cleanedValue.length <= 4) {
      setExpiryDate(cleanedValue);

      let formattedValue = cleanedValue;
      if (cleanedValue.length > 2) {
        formattedValue = cleanedValue.slice(0, 2) + "/" + cleanedValue.slice(2);
      }

      if (/^\d{0,4}$/.test(cleanedValue)) {
        setExpiryDate(formattedValue);
        setExpiryDateError(false);
      } else {
        setExpiryDateError(true);
      }
    }
  };

  const handleCvvChange = (event: any) => {
    const value = event.target.value;

    const cleanedValue = value.replace(/\D/g, "");

    if (cleanedValue.length <= 3) {
      setCvv(cleanedValue);
      if (cleanedValue.length > 0 && /^\d{0,3}$/.test(cleanedValue)) {
        setCvvError(false);
      } else {
        setCvvError(true);
      }
    }
  };

  const formatCardNumber = (value: any) => {
    const cleanedValue = value.replace(/\D/g, "");
    const chunks = [];
    for (let i = 0; i < cleanedValue.length; i += 4) {
      chunks.push(cleanedValue.slice(i, i + 4));
    }
    return chunks.join(" ");
  };

  const isCardValid = () => {
    const expiryMonth = expiryDate.substring(0, 2);
    const expiryYear = expiryDate.substring(3, 5);
    const currentYear = new Date().getFullYear().toString().substring(2, 4);
    const currentMonth = (new Date().getMonth() + 1)
      .toString()
      .padStart(2, "0");

    if (
      expiryMonth < "01" ||
      expiryMonth > "12" ||
      expiryYear < currentYear ||
      (expiryYear === currentYear && expiryMonth < currentMonth)
    ) {
      setExpiryDateError(true);
      return false;
    }

    return true;
  };

  function handleAddCard() {
    if (isCardValid()) {
      dispatch(
        ORDER_setPayment({
          payment_type: "карткою",
          uponReceipt: false,
          card: {
            number: cardNumber,
            date: expiryDate,
            cvv: cvv,
          },
        })
      );
      dispatch(STAGES_payment(true));
      setCardButtonMessage("Додано ✓");
    }
  }

  function handleCardUponReceipt() {
    dispatch(
      ORDER_setPayment({
        payment_type: "карткою",
        uponReceipt: true,
        card: {
          number: "",
          date: "",
          cvv: "",
        },
      })
    );
    dispatch(STAGES_payment(true));
  }
  function handleCashUponReceipt() {
    dispatch(
      ORDER_setPayment({
        payment_type: "готівка",
        uponReceipt: true,
        card: {
          number: "",
          date: "",
          cvv: "",
        },
      })
    );
    dispatch(STAGES_payment(true));
  }

  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
  };
  const handlesSecondaryOptionChange = (event: any) => {
    setSelectedSecondaryOption(event.target.value);
  };

  return (
    <Paper elevation={5} sx={{ marginBottom: 5 }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <FormControl component="fieldset" sx={{ padding: 2 }}>
          <FormLabel component="legend">Варіанти оплати</FormLabel>
          <RadioGroup
            aria-label="payment-options"
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <FormControlLabel
              value="payOnDelivery"
              control={<Radio color="success" />}
              label="Оплата під час отримання товару"
            />
            {selectedOption === "payOnDelivery" && (
              <Box sx={{ paddingLeft: 5 }}>
                <RadioGroup
                  aria-label="payment-options"
                  value={selectedSecondaryOption}
                  onChange={handlesSecondaryOptionChange}
                >
                  <FormControlLabel
                    value="card"
                    control={<Radio color="success" />}
                    label="Картою"
                    onClick={handleCardUponReceipt}
                  />

                  <FormControlLabel
                    value="cash"
                    control={<Radio color="success" />}
                    label="Готівкою"
                    onClick={handleCashUponReceipt}
                  />
                </RadioGroup>
              </Box>
            )}
            <FormControlLabel
              value="online"
              control={<Radio color="success" />}
              label="Оплатити онлайн"
            />
            {selectedOption === "online" && (
              <Box sx={{ paddingLeft: 5 }}>
                <RadioGroup
                  aria-label="payment-options"
                  value={selectedSecondaryOption}
                  onChange={handlesSecondaryOptionChange}
                >
                  <FormControlLabel
                    value="addCard"
                    control={<Radio color="success" />}
                    label="Додати картку"
                  />
                  {selectedSecondaryOption === "addCard" && (
                    <Box
                      sx={{
                        ml: 4,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        flexDirection: "column",
                      }}
                    >
                      <TextField
                        label="Номер карти"
                        sx={{ width: 300 }}
                        value={formatCardNumber(cardNumber)}
                        onChange={handleCardNumberChange}
                        error={cardNumberError}
                        helperText={cardNumberError && "Введіть 16 цифр карти"}
                      />
                      <TextField
                        label="Термін дії (MMYY)"
                        sx={{ width: 300 }}
                        value={expiryDate}
                        onChange={handleExpiryDateChange}
                        error={expiryDateError}
                        helperText={
                          expiryDateError && "Введіть дійсний термін дії"
                        }
                      />
                      <TextField
                        label="CVV"
                        sx={{ width: 300 }}
                        value={cvv}
                        onChange={handleCvvChange}
                        error={cvvError}
                        helperText={cvvError && "Введіть 3 цифри CVV"}
                      />
                      <Box mt={2}>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={handleAddCard}
                        >
                          {cardButtonMessage}
                        </Button>
                      </Box>
                    </Box>
                  )}
                </RadioGroup>
              </Box>
            )}
            <FormControlLabel
              value="partPay"
              control={<Radio color="success" />}
              label="Оплата частинами"
            />
            {selectedOption === "partPay" && (
              <Box sx={{ paddingLeft: 5, width: 500 }}>
                <Slider
                  aria-label="Small steps"
                  defaultValue={2}
                  getAriaValueText={valuetext}
                  onChange={handleMonthChange}
                  step={1}
                  min={2}
                  max={12}
                  marks={marks}
                  valueLabelDisplay="auto"
                />
                {_order.payWithParts.months === 0 ? (
                  <></>
                ) : (
                  <>
                    <Typography>
                      {_order.payWithParts.perMonth} ₴ на{" "}
                      {_order.payWithParts.months} міс.
                    </Typography>
                  </>
                )}
              </Box>
            )}
          </RadioGroup>
        </FormControl>
        <Box mt={2}>
          <Typography variant="body2" color="textSecondary">
            * Уточніть деталі оплати у менеджера при підтвердженні замовлення.
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}
