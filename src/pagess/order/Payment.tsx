import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { ORDER_setPayment, STAGES_payment } from "../../redux/order/orderSlice";

export default function Payment() {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardNumberError, setCardNumberError] = useState(false);
  const [expiryDateError, setExpiryDateError] = useState(false);
  const [cvvError, setCvvError] = useState(false);

  const [selectedOption, setSelectedOption] = useState("payOnDelivery");
  const [selectedSecondaryOption, setSelectedSecondaryOption] =
    useState("payOnDelivery");

  const dispatch = useAppDispatch();

  const handleCardNumberChange = (event: any) => {
    const value = event.target.value;
    const cleanedValue = value.replace(/\D/g, "");
    // Удалить все нецифровые символы из номера карты
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
    // Удалить все нецифровые символы из срока действия
    const cleanedValue = value.replace(/\D/g, "");
    if (cleanedValue.length <= 4) {
      setExpiryDate(cleanedValue);

      let formattedValue = cleanedValue;
      if (cleanedValue.length > 2) {
        formattedValue = cleanedValue.slice(0, 2) + "/" + cleanedValue.slice(2);
      }

      // Проверить длину и формат срока действия (должен быть в формате MM/YY)
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
    // Удалить все нецифровые символы из CVV

    const cleanedValue = value.replace(/\D/g, "");

    // Проверить длину CVV (должен быть 3 цифры)
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
          payment_type: "card",
          uponReceipt: false,
          card: {
            number: cardNumber,
            date: expiryDate,
            cvv: cvv,
          },
        })
      );
    } 
    dispatch(STAGES_payment(true));
  }

  function handleCardUponReceipt() {
    dispatch(
      ORDER_setPayment({
        payment_type: "card",
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
        payment_type: "cash",
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
                          Додати
                        </Button>
                      </Box>
                    </Box>
                  )}
                </RadioGroup>
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
