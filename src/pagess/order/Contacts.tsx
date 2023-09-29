import {
  Box,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import CitySelectionButton from "./CitySelectButton";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect, useState } from "react";
import {
  ORDER_setUserContact,
  STAGES_userContact,
} from "../../redux/order/orderSlice";

export default function Contacts() {
  const { user } = useAppSelector((state) => state.user);
  const { _order } = useAppSelector((state) => state.orders);
  const dispatch = useAppDispatch();
  const [name, setName] = useState(
    _order.user_contact.name === "" ? user.name : _order.user_contact.name
  );
  const [surname, setSurame] = useState(_order.user_contact.surname);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState(
    _order.user_contact.email === "" ? user.email : _order.user_contact.email
  );
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
    const isNameValid = name.trim() !== "";
    const isSurnameValid = surname.trim() !== "";
    const isPhoneValid = /^\d{9}$/.test(phone);
    const isEmailValid = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    setEmailError(!isEmailValid);
    setPhoneError(!isPhoneValid);
    if (isNameValid && isSurnameValid && isPhoneValid && isEmailValid) {
      dispatch(
        ORDER_setUserContact({
          name: name,
          surname: surname,
          email: email,
          phone: "+380" + phone,
        })
      );
      dispatch(STAGES_userContact(true));
    } else {
      dispatch(STAGES_userContact(false));
    }
  }, [phone, name, surname, email]);

  return (
    <Box sx={{ marginBottom: 5, paddingBottom: 2, height: 360, borderBottom: "2px solid black" }}>
      <Typography sx={{ borderBottom: "2px solid black", paddingBottom: 1 }}>
        Ваші контактні дані{" "}
      </Typography>
      <Box
        display={"flex"}
        justifyContent={"space-around"}
        flexDirection={"column"}
        height={200}
        marginTop={2}
        marginBottom={2}
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
              width: '48%',
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
              sx={{ width: '100%' }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              width: '48%'
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
              sx={{ width: '100%' }}
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
              width: '48%',
            }}
          >
            {
              phoneError ? 
              <Typography color={'error'}>Некоректний номер телефону</Typography>  : 
              <Typography>Мобільний телефон</Typography>
            }
              
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
              
              sx={{ width: '100%' }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              width: '48%',
            }}
          >
            {
              emailError ? 
              <Typography color={'error'}>Некоректна пошта</Typography>  : 
              <Typography>Електронна пошта</Typography>
            }
            
            <TextField
              id="outlined-size-small"
              value={email}
              onChange={(e: any) => {
                setEmail(e.target.value.trim());
              }}
              size="small"
              error={emailError}
              
              sx={{ width: '100%' }}
            />
          </Box>
        </Box>
      </Box>
      <CitySelectionButton />
    </Box>
  );
}
