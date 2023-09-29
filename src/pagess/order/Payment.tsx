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
    setSelectedOption("");
  }, [items]);

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

    if(cvv.trim().length !== 3){
      setCvvError(true);
      return false
    }

    if(cardNumber.trim().length !== 16){
      setCardNumberError(true);
      return false
    }

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
    <Box
      sx={{
        marginBottom: 5,
        borderBottom: "2px solid black",
        paddingBottom: 1,
      }}
    >
      <Typography sx={{ paddingBottom: 1 }}>Варіанти оплати </Typography>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <FormControl component="fieldset" sx={{ padding: 2, paddingLeft: 0 }}>
          <RadioGroup
            aria-label="payment-options"
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <FormControlLabel
              value="payOnDelivery"
              control={
                <Radio
                  sx={{
                    color: "black",
                    "&.Mui-checked": {
                      color: "black",
                    },
                  }}
                />
              }
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
                    control={
                      <Radio
                        sx={{
                          color: "black",
                          "&.Mui-checked": {
                            color: "black",
                          },
                        }}
                      />
                    }
                    label="Картою"
                    onClick={handleCardUponReceipt}
                  />

                  <FormControlLabel
                    value="cash"
                    control={
                      <Radio
                        sx={{
                          color: "black",
                          "&.Mui-checked": {
                            color: "black",
                          },
                        }}
                      />
                    }
                    label="Готівкою"
                    onClick={handleCashUponReceipt}
                  />
                </RadioGroup>
              </Box>
            )}
            <FormControlLabel
              value="online"
              control={
                <Radio
                  sx={{
                    color: "black",
                    "&.Mui-checked": {
                      color: "black",
                    },
                  }}
                />
              }
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
                    control={
                      <Radio
                        sx={{
                          color: "black",
                          "&.Mui-checked": {
                            color: "black",
                          },
                        }}
                      />
                    }
                    label="Додати картку"
                  />
                  {selectedSecondaryOption === "addCard" && (
                    <Box
                      sx={{
                        ml: 4,
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        flexDirection: "column",
                      }}
                    >
                      <Box
                        display={"flex"}
                        justifyContent={"space-between"}
                        flexDirection={"row"}
                        width={"100%"}
                        alignItems={"center"}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            width: "48%",
                          }}
                        >
                          {cvvError ? (
                            <Typography color={"error"}>
                              Введіть 3 цифри CVV
                            </Typography>
                          ) : (
                            <Typography>CVV</Typography>
                          )}

                          <TextField
                            sx={{ width: "100%" }}
                            value={cvv}
                            onChange={handleCvvChange}
                            error={cvvError}
                          />
                          
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            width: "48%",
                          }}
                        >
                          {expiryDateError ? (
                            <Typography color={"error"}>
                              Введіть дійсний термін дії
                            </Typography>
                          ) : (
                            <Typography>Термін дії (MMYY)</Typography>
                          )}

                          <TextField
                            sx={{ width: "100%" }}
                            value={expiryDate}
                            onChange={handleExpiryDateChange}
                            error={expiryDateError}
                          />
                        </Box>
                      </Box>

                      <Box
                        display={"flex"}
                        justifyContent={"space-between"}
                        flexDirection={"row"}
                        alignItems={"center"}
                        width={"100%"}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            width: "100%",
                          }}
                        >
                          {cardNumberError ? (
                            <Typography color={"error"}>
                              Введіть 16 цифр карти
                            </Typography>
                          ) : (
                            <Typography>Номер карти</Typography>
                          )}

                          <TextField
                            sx={{ width: "100%" }}
                            value={formatCardNumber(cardNumber)}
                            onChange={handleCardNumberChange}
                            error={cardNumberError}
                          />
                        </Box>
                      </Box>

                      <Box mt={2}>
                        <Button
                          variant="contained"
                          size="large"
                          color="success"
                          sx={{
                            justifySelf: "center",
                            background: "black",
                            color: "white",
                            "&:hover": {
                              backgroundColor: "black",
                              color: "white",
                            },
                          }}
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
              control={
                <Radio
                  sx={{
                    color: "black",
                    "&.Mui-checked": {
                      color: "black",
                    },
                  }}
                />
              }
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
    </Box>
  );
}
