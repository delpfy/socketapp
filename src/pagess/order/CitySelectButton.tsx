import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Autocomplete,
  TextField,
  Divider,
  Box,
  Grid,
  Typography,
  debounce,
} from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getLocations } from "../../redux/order/asyncActions";
import {
  ORDER_setUserLocation,
  STAGES_city,
  setCity,
} from "../../redux/order/orderSlice";

const cities = ["Київ", "Харків", "Одеса", "Дніпро", "Запоріжжя", "Львів"];

interface TLocation {
  display_name: string;
}

export default function CitySelectionButton() {
  const { locations, _order } = useAppSelector((state) => state.orders);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = React.useState<readonly TLocation[]>([]);
  const [selectedCity, setSelectedCity] = useState(
    _order.user_location.city_location
  );
  const [selectedLocality, setSelectedLocality] = useState(
    _order.user_location.city_location
  );
  const [afterCitySelect, setAfterCitySelect] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setOptions(locations);
  }, [locations]);

  useEffect(() => {
    setSelectedCity(_order.user_location.city_location);
    setSelectedLocality(_order.user_location.city_location);
  }, []);

  const handleCityClick = (city: any) => {
    setSelectedCity(city );
    dispatch(setCity(city));
    setSelectedLocality(city );
    setAfterCitySelect(true);
    dispatch(getLocations({ city: city }));
    dispatch(
      ORDER_setUserLocation({
        city_location: city + ", Україна",
      })
    );
    dispatch(STAGES_city(true));
  };

  const handleSave = () => {
    setOpen(false);
  };

  function handleSearchChange(event: any, newInputValue: string) {
    if (newInputValue === "" && afterCitySelect) {
    } else {
      setSelectedLocality(newInputValue);
      setAfterCitySelect(false);
    }

    if (newInputValue !== "" && newInputValue.length > 2) {
      
      searchDelayed(newInputValue);
    }
  }

  function loadLocations(newInputValue: any) {
    dispatch(getLocations({ city: newInputValue }));
  }

  const searchDelayed = useMemo(() => debounce(loadLocations, 300), []);

  return (
    <>
      <Button
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "row",
        }}
        variant="outlined"
        color="primary"
        fullWidth
        size="medium"
        onClick={() => setOpen(true)}
      >
        <PlaceIcon sx={{ height: 30, width: 30 }} />
        <Box
          sx={{
            display: "flex",
            padding: 3,
            paddingLeft: 1,
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <Typography fontSize={15}>Ваше місто</Typography>
          <Typography fontSize={12}>
            {selectedCity && selectedLocality
              ? `${selectedLocality}`
              : "Оберіть місто"}
          </Typography>
        </Box>
      </Button>
      <Dialog fullWidth open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Оберіть місто</DialogTitle>
        <Divider light />
        <DialogContent>
          <Box paddingBottom={4}>
            <Grid container spacing={2} justifyContent="center">
              {cities.map((city) => (
                <Grid key={city} xs={4} item>
                  <Button onClick={() => handleCityClick(city)}>{city}</Button>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box>
            <Autocomplete
            placeholder="Пошук..."
              options={options === undefined ? [] : options}
              inputValue={selectedLocality}
              onInputChange={handleSearchChange}
              onChange={(e, value) => {
                if (value) {
                  dispatch(
                    ORDER_setUserLocation({
                      city_location: value.display_name,
                    })
                  );
                  dispatch(STAGES_city(true));
                }
              }}
              renderInput={(params) => <TextField {...params} label="Оберіть місто"/>}
              style={{ marginBottom: 16 }}
              getOptionLabel={(option) => option.display_name || ""}
              fullWidth
              noOptionsText={"(·_·)"}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Закрити</Button>
          <Button onClick={handleSave} disabled={!selectedLocality} autoFocus>
            Зберігти
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
