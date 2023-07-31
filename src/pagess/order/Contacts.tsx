import {
  Box,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import CitySelectionButton from "./CitySelectButton";
import { useAppSelector } from "../../redux/hooks";
import { useState } from "react";

export default function Contacts() {
  const {user} = useAppSelector(state=>state.user);
  const [name, setName] = useState(user.name);
  const [surname, setSurame] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState(user.email);
  const [phoneError, setPhoneError] = useState(false);


  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setPhone(value);

    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(value)) {
      setPhoneError(true);
    } else {
      setPhoneError(false);
    }
  };

  return (
    <Paper elevation={5} sx={{ marginBottom: 5, height: 360 }}>
      <Typography>Ваші контактні дані </Typography>
      <Box
        display={"flex"}
        justifyContent={"space-around"}
        flexDirection={"column"}
        height={200}
      >
        <Box
          display={"flex"}
          justifyContent={"space-around"}
          flexDirection={"row"}
          alignItems={"center"}
        >
          <TextField
            label="Прізвище"
            id="outlined-size-small"
            value={surname}
            onChange={(e: any) => setSurame(e.target.value.trim())}
            size="small"
            sx={{ width: 350 }}
          />
          <TextField
            label="Ім'я"
            id="outlined-size-small"
            value={name}
            onChange={(e: any) => setName(e.target.value.trim())}
            size="small"
            sx={{ width: 350 }}
          />
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-around"}
          flexDirection={"row"}
          alignItems={"center"}
        >
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">+38</InputAdornment>
              ),
            }}
            label="Мобільний телефон"
            id="outlined-size-small"
            value={phone}
            onChange={handlePhoneChange}
            size="small"
            error={phoneError} 
          helperText={phoneError ? "Некоректний номер телефону" : ""}
            sx={{ width: 350 }}
          />
          <TextField
            label="Електронна пошта "
            id="outlined-size-small"
            value={email}
            onChange={(e: any) => setEmail(e.target.value.trim())}
            size="small"
            sx={{ width: 350 }}
          />
        </Box>
      </Box>
      <CitySelectionButton/>
    </Paper>
  );
}
