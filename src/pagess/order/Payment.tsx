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

export default function Payment() {
  const [selectedOption, setSelectedOption] = useState("payOnDelivery");
  const [selectedSecondaryOption, setSelectedSecondaryOption] =
    useState("payOnDelivery");

  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
  };
  const handlesSecondaryOptionChange = (event: any) => {
    setSelectedSecondaryOption(event.target.value);
  };

  return (
    <Paper elevation={5} sx={{ marginBottom: 5 }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Варіанти оплати</FormLabel>
          <RadioGroup
            aria-label="payment-options"
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <FormControlLabel
              value="payOnDelivery"
              control={<Radio />}
              label="Оплата під час отримання товару"
            />
            <FormControlLabel
              value="rozetkaPay"
              control={<Radio />}
              label="Оплатити зараз через RozetkaPay"
            />
            {selectedOption === "rozetkaPay" && (
              <Box sx = {{paddingLeft: 5}}>
                <RadioGroup
                  aria-label="payment-options"
                  value={selectedSecondaryOption}
                  onChange={handlesSecondaryOptionChange}
                >
                <FormControlLabel
                  value="addCard"
                  control={<Radio />}
                  label="Додати картку"
                />
                {selectedSecondaryOption === "addCard" && (
                  <Box sx={{ ml: 4 }}>
                    <TextField label="Номер карти" fullWidth />
                    <TextField label="Термін дії" fullWidth />
                    <TextField label="CVV" fullWidth />
                    <Box mt={2}>
                      <Button variant="contained" color="primary">
                        Додати
                      </Button>
                    </Box>
                  </Box>
                )}
                <FormControlLabel
                  value="googlePay"
                  control={<Radio />}
                  label="GooglePay"
                />
                <FormControlLabel
                  value="onlineBabyPackage"
                  control={<Radio />}
                  label="Оплатити онлайн соціальною картою 'Пакунок малюка'"
                />
                <FormControlLabel
                  value="onlineSupportCard"
                  control={<Radio />}
                  label="Оплатити онлайн картою 'єПідтримка'"
                />
                </RadioGroup>
              </Box>
            )}

            {/* Additional options for "Оплатити зараз через RozetkaPay" */}

            {/* Additional options for "Безготівковими для юридичних осіб" */}
            <FormControlLabel
              value="nonCashForLegalEntities"
              control={<Radio />}
              label="Безготівковими для юридичних осіб"
            />
            {selectedOption === "nonCashForLegalEntities" && (
              <Box sx={{ ml: 4 }}>
                <Typography variant="body2" color="textSecondary">
                  Увага! Для оплати обраним способом потрібно ввести код ЄДРПОУ
                  юридичної особи, з розрахункового рахунку якої буде здійснена
                  оплата.
                </Typography>
                <TextField label="Код ЄДРПОУ" fullWidth />
                <TextField label="Повна назва юридичної особи" fullWidth />
              </Box>
            )}

            <FormControlLabel
              value="credit"
              control={<Radio />}
              label="Кредит та оплата частинами Оформлення кредитів у банках партнерів"
            />
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
