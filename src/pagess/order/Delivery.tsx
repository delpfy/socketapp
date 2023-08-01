import {
  Autocomplete,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  debounce,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  getNovaPoshtaLocations,
  getStreets,
  getUkrPoshtaLocations,
} from "../../redux/order/asyncActions";
import { setNovaPoshtaLocation, setStreetLocation } from "../../redux/order/orderSlice";
import { TLocationCity } from "../../redux/types";

interface TNovaLocation {
  Description: string;
}

export default function Delivery() {
  const [selectedOption, setSelectedOption] = useState("payOnDelivery");
  const { city,street } = useAppSelector((state) => state.orders);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const { novaPoshtaLocations } = useAppSelector((state) => state.orders);
  const [novaPoshtaOptions, setNovaPoshtaOptions] = useState<
    readonly TNovaLocation[]
  >([]);
  const [streetOptions, setStreetOptions] = useState<
    readonly TLocationCity[]
  >([]);
  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
  };
  useEffect(() => {
    setNovaPoshtaOptions(novaPoshtaLocations.data);
  }, [novaPoshtaLocations]);
  useEffect(() => {
    setStreetOptions(street);
  }, [street]);

  const top100Films = [{}];
 

  function handleSearchNovaChange(event: any, newInputValue: string) {
    setSelectedDepartment(newInputValue);

    if (newInputValue !== "") {
      searchNovaDelayed(newInputValue);
    }
  }

  function handleSearchStreetChange(event: any, newInputValue: string) {
    setSelectedDepartment(newInputValue);

    if (newInputValue !== "") {
      searchStreetDelayed(newInputValue);
    }
  }

  function loadNovaLocations(newInputValue: any) {
    dispatch(
      getNovaPoshtaLocations({ city: city? city : "київ", searchValue: newInputValue })
    );
  }
  function loadStreetLocations(newInputValue: any) {
    dispatch(
      getStreets({ city: city ? city : "київ", searchValue: newInputValue })
    );
  }

  const searchNovaDelayed = useMemo(() => debounce(loadNovaLocations, 300), []);
  const searchStreetDelayed = useMemo(() => debounce(loadStreetLocations, 300), []);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUkrPoshtaLocations({ city: "asd", searchValue: "sd" }));
    dispatch(getStreets({ city: "київ", searchValue: "sdf" }))
  }, []);

  return (
    <Paper elevation={5} sx={{ marginBottom: 5 }}>
      <FormControl component="fieldset" sx={{ padding: 2 }}>
        <FormLabel component="legend">Доставка</FormLabel>
        <RadioGroup
          aria-label="payment-options"
          value={selectedOption}
          onChange={handleOptionChange}
        >
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            width={800}
            flexDirection={"row"}
          >
            <FormControlLabel
              value="pickupFromOurStores"
              control={<Radio color="success" />}
              label="Самовивіз з наших магазинів"
            />
            <Typography color={"#2e7d32"}>Безкоштовно</Typography>
          </Box>
          {selectedOption === "pickupFromOurStores" && (
            <Box sx={{ padding: 5 }}>
              <Autocomplete
                size="small"
                disablePortal
                id="combo-box-demo"
                noOptionsText={"(·_·)"}
                options={
                  novaPoshtaOptions === undefined ? [] : novaPoshtaOptions
                }
                fullWidth
                getOptionLabel={(option) => option.Description || ""}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Введіть адресу або номер відділення"
                  />
                )}
              />
            </Box>
          )}
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            width={800}
            flexDirection={"row"}
          >
            <FormControlLabel
              value="courier"
              control={<Radio color="success" />}
              label="Кур'єр на вашу адресу"
            />
            <Typography>199 ₴</Typography>
          </Box>
          {selectedOption === "courier" && (
            <Box sx={{ padding: 5 }}>
              <Box
                display={"flex"}
                justifyContent={"space-around"}
                flexDirection={"row"}
                paddingBottom={3}
              >
                
                <Autocomplete
                size="small"
                disablePortal
                id="combo-box-demo"
                onInputChange={handleSearchStreetChange}
                onChange={(e, value) => {
                  if (value) {
                    setStreetLocation(value.display_name);
                  }
                }}
                noOptionsText={"(·_·)"}
                options={
                  streetOptions === undefined ? [] : streetOptions
                }
                sx = {{width: 300}}
                getOptionLabel={(option) => option.display_name || ""}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Введіть назву вулиці"
                  />
                )}
              />
           
                <TextField
                  label="Будинок"
                  id="outlined-size-small"
                  size="small"
                  sx={{ width: 200 }}
                />
                <TextField
                  label="Квартира "
                  id="outlined-size-small"
                  size="small"
                  sx={{ width: 200 }}
                />
              </Box>
              <Box
                display={"flex"}
                justifyContent={"space-around"}
                flexDirection={"row"}
              >
                <TextField
                  label="Поверх"
                  id="outlined-size-small"
                  size="small"
                  sx={{ width: 350 }}
                />
                <Autocomplete
                  sx={{ width: 350 }}
                  size="small"
                  disablePortal
                  id="combo-box-demo"
                  noOptionsText={"(·_·)"}
                  options={["Відсутній", "Присутній"]}
                  fullWidth
                  renderInput={(params) => (
                    <TextField {...params} label="Наявність вантажного ліфта" />
                  )}
                />
              </Box>

              <FormGroup sx={{ marginTop: 3 }}>
                <FormControlLabel
                  control={<Checkbox color="success" />}
                  label="Підняти на поверх ( + 11₴) "
                />
              </FormGroup>
            </Box>
          )}
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            width={800}
            flexDirection={"row"}
          >
            <FormControlLabel
              value="pickupFromUrk"
              control={<Radio color="success" />}
              label="Самовивіз з Укр Пошти"
            />
            <Typography>149 ₴</Typography>
          </Box>
          {selectedOption === "pickupFromUrk" && (
            <Box sx={{ padding: 5 }}>
              <Autocomplete
                size="small"
                disablePortal
                id="combo-box-demo"
                noOptionsText={"(·_·)"}
                options={top100Films}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Виберіть відповідне відділення"
                  />
                )}
              />
            </Box>
          )}

          <Box
            display={"flex"}
            justifyContent={"space-between"}
            width={800}
            flexDirection={"row"}
          >
            <FormControlLabel
              value="pickupFromNova"
              control={<Radio color="success" />}
              label="Самовивіз з Нової Пошти"
            />
            <Typography>149 ₴</Typography>
          </Box>
          {selectedOption === "pickupFromNova" && (
            <Box sx={{ padding: 5 }}>
              <Autocomplete
                size="small"
                disablePortal
                id="combo-box-demo"
                onInputChange={handleSearchNovaChange}
                onChange={(e, value) => {
                  if (value) {
                    setNovaPoshtaLocation(value.Description);
                  }
                }}
                noOptionsText={"(·_·)"}
                options={
                  novaPoshtaOptions === undefined ? [] : novaPoshtaOptions
                }
                fullWidth
                getOptionLabel={(option) => option.Description || ""}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Введіть адресу або номер відділення"
                  />
                )}
              />
            </Box>
          )}
        </RadioGroup>
      </FormControl>
    </Paper>
  );
}
