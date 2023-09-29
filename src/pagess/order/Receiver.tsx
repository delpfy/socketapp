import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect, useState } from "react";
import {
  ORDER_setReceiver,
  STAGES_receiverContact,
} from "../../redux/order/orderSlice";

export default function Receiver() {
  const [selectedOption, setSelectedOption] = useState("me");
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const [name, setName] = useState(user.name);
  const [surname, setSurame] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState(user.email);
  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    const cleanedValue = value.replace(/\D/g, "");

    if (cleanedValue.length <= 9) {
      setPhone(cleanedValue);

      if (/^\d{9}$/.test(cleanedValue)) {
        setPhoneError(false);
      } else {
        setPhoneError(true);
      }
    }
  };

  useEffect(() => {
    dispatch(
      ORDER_setReceiver({
        userIsReceiver: true,
        contact: {
          name: "",
          surname: "",
          email: "",
          phone: "",
        },
      })
    );
    dispatch(STAGES_receiverContact(true));
  }, []);

  useEffect(() => {
    const isNameValid = name.trim() !== "";
    const isSurnameValid = surname.trim() !== "";
    const isPhoneValid = /^\d{9}$/.test(phone);
    const isEmailValid = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

    setEmailError(!isEmailValid);
    setPhoneError(!isPhoneValid);
    if (isNameValid && isSurnameValid && isPhoneValid && isEmailValid) {
      dispatch(
        ORDER_setReceiver({
          userIsReceiver: false,
          contact: {
            name: name,
            surname: surname,
            email: email,
            phone: "+380" + phone,
          },
        })
      );
      dispatch(STAGES_receiverContact(true));
    }
  }, [phone, name, surname, email]);

  function handleUserIsReceiver() {
    dispatch(
      ORDER_setReceiver({
        userIsReceiver: true,
        contact: {
          name: "",
          surname: "",
          email: "",
          phone: "",
        },
      })
    );
    dispatch(STAGES_receiverContact(true));
  }

  function handleOptionChange(e: any) {
    setSelectedOption(e.target.value);
  }

  return (
    <Box
      sx={{
        marginBottom: 5,
        borderBottom: "2px solid black",
        paddingBottom: 1,
      }}
    >
      <Typography sx={{ paddingBottom: 1 }}>Отримувач</Typography>
      <FormControl component="fieldset" sx={{ padding: 2, width: "95%" }}>
        <RadioGroup
          aria-label="payment-options"
          value={selectedOption}
          onChange={handleOptionChange}
        >
          <FormControlLabel
            value="me"
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
            label="Я"
            onClick={handleUserIsReceiver}
          />

          <FormControlLabel
            value="Receiver"
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
            label="Інша людина"
          />

          {selectedOption === "Receiver" && (
            <Box
              display={"flex"}
              justifyContent={"space-around"}
              flexDirection={"column"}
              width={"100%"}
              height={200}
            >
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                flexDirection={"row"}
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
                  <Typography>Прізвище</Typography>
                  <TextField
                    id="outlined-size-small"
                    value={surname}
                    onChange={(e: any) => {
                      setSurame(e.target.value.trim());
                    }}
                    size="small"
                    sx={{ width: "100%" }}
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
                  <Typography>Ім'я</Typography>
                  <TextField
                    id="outlined-size-small"
                    value={name}
                    onChange={(e: any) => {
                      setName(e.target.value.trim());
                    }}
                    size="small"
                    sx={{ width: "100%" }}
                  />
                </Box>
              </Box>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                flexDirection={"row"}
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
                  {phoneError ? (
                    <Typography color={"error"}>
                      Некоректний номер телефону
                    </Typography>
                  ) : (
                    <Typography>Мобільний телефон</Typography>
                  )}

                  <TextField
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">+380</InputAdornment>
                      ),
                    }}
                    id="outlined-size-small"
                    value={phone}
                    onChange={handlePhoneChange}
                    size="small"
                    error={phoneError}
                    sx={{ width: "100%" }}
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
                  {emailError ? (
                    <Typography color={"error"}>Некоректна пошта</Typography>
                  ) : (
                    <Typography>Електронна пошта</Typography>
                  )}

                  <TextField
                    id="outlined-size-small"
                    value={email}
                    onChange={(e: any) => {
                      setEmail(e.target.value.trim());
                    }}
                    size="small"
                    error={emailError}
                    sx={{ width: "100%" }}
                  />
                </Box>
              </Box>
            </Box>
          )}
        </RadioGroup>
      </FormControl>
    </Box>
  );
}
