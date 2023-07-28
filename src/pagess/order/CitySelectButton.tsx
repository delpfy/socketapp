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

const cities = ["Київ", "Харків", "Одеса", "Дніпро", "Запоріжжя", "Львів"];

interface TLocation {
  description: string;
  district: string;
  region: string;
}

export default function CitySelectionButton() {
  const { location } = useAppSelector((state) => state.orders);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = React.useState<readonly TLocation[]>([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedLocality, setSelectedLocality] = useState("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    setOptions(location.data);
  }, [location]);

  const handleCityClick = (city: any) => {
    setSelectedCity(city);
    setSelectedLocality(city);
    dispatch(getLocations({ city: city }));
  };

  const handleSave = () => {
    setOpen(false);
  };

  function handleSearchChange(event: any, newInputValue: string) {
    setSelectedLocality(newInputValue);

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
              options={options === undefined ? [] : options}
              inputValue={selectedLocality}
              onInputChange={handleSearchChange}
              renderInput={(params) => <TextField {...params} required />}
              style={{ marginBottom: 16 }}
              getOptionLabel={(option) =>
                option.description +
                  ", " +
                  option.district +
                  ", " +
                  option.region || ""
              }
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
