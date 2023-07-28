import {
  Box,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import CitySelectionButton from "./CitySelectButton";

export default function Contacts() {
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
            size="small"
            sx={{ width: 350 }}
          />
          <TextField
            label="Ім'я"
            id="outlined-size-small"
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
            size="small"
            sx={{ width: 350 }}
          />
          <TextField
            label="Електронна пошта "
            id="outlined-size-small"
            size="small"
            sx={{ width: 350 }}
          />
        </Box>
      </Box>
      <CitySelectionButton/>
    </Paper>
  );
}
