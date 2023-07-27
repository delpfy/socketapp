import {
  Box,
  Button,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

export default function Contacts() {
  return (
    <Paper elevation={5} sx={{ marginBottom: 5, height: 510 }}>
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
      <Typography fontSize={20}>Додайте номер телефону</Typography>
      <Typography fontSize={15}>
        Ми дбаємо про своїх покупців, авторизація по номеру телефону робить ваші
        покупки безпечніше{" "}
      </Typography>
      <Box
        display={"flex"}
        justifyContent={"space-around"}
        flexDirection={"column"}
        height={100}
      >
        <Box
          display={"flex"}
          justifyContent={"flex-start"}
          flexDirection={"row"}
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
        </Box>
      </Box>
      <Button
        variant="contained"
        size="large"
        color="success"
        sx={{ justifySelf: "center" }}
      >
        Додати номер
      </Button>
    </Paper>
  );
}
