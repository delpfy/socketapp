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
import {
  ORDER_setDeliveryOnAdress,
  STAGES_delivery,
  setNovaPoshtaLocation,
  ORDER_setTotal,
  ORDER_setPaymentWithParts,
} from "../../redux/order/orderSlice";
import { TShippingItems } from "../../redux/types";

interface TNovaLocation {
  Description: string;
}

export default function Delivery() {
  const [selectedOption, setSelectedOption] = useState("");
  const { items } = useAppSelector((state) => state.basket);
  const { city, street, _order, novaPoshtaLocations } = useAppSelector(
    (state) => state.orders
  );
  const [novaPoshtaOptions, setNovaPoshtaOptions] = useState<
    readonly TNovaLocation[]
  >([]);
  const [streetOptions, setStreetOptions] = useState<string[]>([]);

  const [houseNumber, setHouseNumber] = useState("");
  const [apartmentNumber, setApartmentNumber] = useState("");
  const [floor, setFloor] = useState("");
  const [elevator, setElevator] = useState("Відсутній");
  const [streetLocation, setStreetLocation] = useState(
    _order.delivery.delivery_location.street
  );
  const [isLiftRequired, setIsLiftRequired] = useState(false);

  const [houseNumberError, setHouseNumberError] = useState(false);

  const [apartmentNumberError, setApartmentNumberError] = useState(false);
  const [floorError, setFloorError] = useState(false);

  const handleHouseNumberChange = (event: any) => {
    const value = event.target.value;

    if (/^\d*$/.test(value)) {
      setHouseNumber(value);
      setHouseNumberError(false);
    } else {
      setHouseNumberError(true);
    }
  };

  const handleApartmentNumberChange = (event: any) => {
    const value = event.target.value;

    if (/^\d*$/.test(value)) {
      setApartmentNumber(value);
      setApartmentNumberError(false);
    } else {
      setApartmentNumberError(true);
    }
  };

  const handleFloorChange = (event: any) => {
    const value = event.target.value;

    if (/^\d*$/.test(value)) {
      setFloor(value);
      setFloorError(false);
    } else {
      setFloorError(true);
    }
  };

  const handleLiftRequiredChange = (event: any) => {
    setIsLiftRequired(event.target.checked);

    event.target.checked
      ? dispatch(ORDER_setTotal(_order.total + 11))
      : dispatch(ORDER_setTotal(_order.total - 11));
  };

  useEffect(() => {
    dispatch(
      ORDER_setPaymentWithParts({
        months: _order.payWithParts.months,
        perMonth: _order.payWithParts.perMonth,
        firstPay: _order.payWithParts.perMonth + _order.delivery.delivery_cost,
      })
    );
  }, [_order.delivery.delivery_cost]);

  useEffect(() => {
    const streetIsValid = streetLocation !== "";
    const houseNumberIsValid = houseNumber !== "";
    const apartmentNumberIsValid = apartmentNumber !== "";
    const floorIsValid = floor !== "";
    setHouseNumberError(!houseNumberIsValid);
    if (apartmentNumberIsValid) {
      setFloorError(!floorIsValid);
    }

    if (
      streetIsValid &&
      houseNumberIsValid &&
      apartmentNumberIsValid &&
      floorIsValid
    ) {
      dispatch(
        ORDER_setDeliveryOnAdress({
          delivery_type: "На адресу",
          delivery_cost: 199,
          delivery_location: {
            street: streetLocation,
            houseNumber: houseNumber,
            apartmentNumber: apartmentNumber,
            floorNumber: floor,
          },
          novaDepartment: "",
          liftRequired: isLiftRequired,
          elevator: elevator === "Присутній" ? true : false,
        })
      );
      dispatch(STAGES_delivery(true));
    } else if (
      streetIsValid &&
      houseNumberIsValid &&
      !apartmentNumberIsValid &&
      !floorIsValid
    ) {
      dispatch(
        ORDER_setDeliveryOnAdress({
          delivery_type: "На адресу",
          delivery_cost: 199,
          delivery_location: {
            street: streetLocation,
            houseNumber: houseNumber,
            apartmentNumber: "",
            floorNumber: "",
          },
          novaDepartment: "",
          liftRequired: false,
          elevator: false,
        })
      );
      dispatch(STAGES_delivery(true));
    }
  }, [
    houseNumber,
    apartmentNumber,
    floor,
    elevator,
    streetLocation,
    isLiftRequired,
    streetLocation,
  ]);

  useEffect(() => {
    setSelectedOption("");
  }, [items]);

  const handleCourierOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
    switch (event.target.value) {
      case "pickupFromOurStores":
        dispatch(
          ORDER_setTotal(
            items.reduce((sum: number, item: TShippingItems) => {
              return (sum += item.price * item.amount);
            }, 0)
          )
        );
        break;
      case "courier":
        setIsLiftRequired(false);
        dispatch(
          ORDER_setTotal(
            items.reduce((sum: number, item: TShippingItems) => {
              return (sum += item.price * item.amount);
            }, 0) + 199
          )
        );
        break;
      case "pickupFromUrk":
        dispatch(
          ORDER_setTotal(
            items.reduce((sum: number, item: TShippingItems) => {
              return (sum += item.price * item.amount);
            }, 0) + 149
          )
        );

        break;
      case "pickupFromNova":
        dispatch(
          ORDER_setTotal(
            items.reduce((sum: number, item: TShippingItems) => {
              return (sum += item.price * item.amount);
            }, 0) + 149
          )
        );

        break;
    }
  };

  useEffect(() => {
    setNovaPoshtaOptions(novaPoshtaLocations.data);
  }, [novaPoshtaLocations]);
  useEffect(() => {
    setStreetOptions(street);
  }, [street]);

  const top100Films = [{}];

  function handleSearchNovaChange(event: any, newInputValue: string) {
    if (newInputValue !== "") {
      searchNovaDelayed(newInputValue, city);
    }
  }

  function handleSearchStreetChange(event: any, newInputValue: string) {
    if (newInputValue !== "") {
      searchStreetDelayed(newInputValue, city);
    }
  }

  function loadNovaLocations(newInputValue: any, cityToSearch: string) {
    dispatch(
      getNovaPoshtaLocations({
        city: cityToSearch ? cityToSearch : "київ",
        searchValue: newInputValue,
      })
    );
  }
  function loadStreetLocations(newInputValue: any, cityToSearch: string) {
    dispatch(
      getStreets({
        city: cityToSearch ? cityToSearch : "київ",
        searchValue: newInputValue,
      })
    );
  }

  const searchNovaDelayed = useMemo(() => debounce(loadNovaLocations, 300), []);
  const searchStreetDelayed = useMemo(
    () => debounce(loadStreetLocations, 300),
    []
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUkrPoshtaLocations({ city: "asd", searchValue: "sd" }));
    dispatch(getStreets({ city: "київ", searchValue: "sdf" }));
  }, []);

  return (
    <Box sx={{ marginBottom: 5, borderBottom: "2px solid black" }}>
      <Typography sx={{ paddingBottom: 1 }}>Доставка </Typography>
      <FormControl component="fieldset" sx={{ padding: 2, paddingLeft: 0 }}>
        <RadioGroup
          aria-label="payment-options"
          value={selectedOption}
          onChange={handleCourierOptionChange}
        >
          <Box
            display={"flex"}
            justifyContent={"space-between"}
             width={ window.innerWidth > 1450 ? 800 : "100%"}
            flexDirection={"row"}
          >
            <FormControlLabel
              value="pickupFromOurStores"
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
              label="Самовивіз з наших магазинів"
            />
            <Typography color={"#2e7d32"}>Безкоштовно</Typography>
          </Box>
          {selectedOption === "pickupFromOurStores" && (
            <Box sx={{ padding: 5, paddingLeft: 0, paddingRight: 0 }}>
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
             width={ window.innerWidth > 1450 ? 800 : "100%"}
            flexDirection={"row"}
          >
            <FormControlLabel
              value="courier"
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
              label="Кур'єр на вашу адресу"
            />
            <Typography>199 ₴</Typography>
          </Box>
          {selectedOption === "courier" && (
            <Box sx={{ padding: 5, paddingLeft: 0, paddingRight: 0 }}>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
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
                      setStreetLocation(value);
                    }
                  }}
                  noOptionsText={"(·_·)"}
                  options={streetOptions === undefined ? [] : streetOptions}
                  sx={{ width: "40%" }}
                  getOptionLabel={(option) => option || ""}
                  renderInput={(params) => (
                    <TextField {...params} label="Введіть назву вулиці" />
                  )}
                />

                <TextField
                  label="Будинок"
                  id="outlined-size-small"
                  size="small"
                  sx={{ width: "25%" }}
                  value={houseNumber}
                  onChange={handleHouseNumberChange}
                  error={houseNumberError}
                  helperText={
                    houseNumberError && "Введіть правильний номер будинку"
                  }
                />
                <TextField
                  label="Квартира"
                  id="outlined-size-small"
                  size="small"
                  sx={{ width: "25%" }}
                  value={apartmentNumber}
                  onChange={handleApartmentNumberChange}
                  error={apartmentNumberError}
                  helperText={
                    apartmentNumberError && "Введіть правильний номер квартири"
                  }
                />
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                flexDirection="row"
              >
                <TextField
                  label="Поверх"
                  id="outlined-size-small"
                  size="small"
                  sx={{ width: "48%" }}
                  value={floor}
                  onChange={handleFloorChange}
                  error={floorError}
                  helperText={floorError && "Введіть правильний номер поверху"}
                />
                <Autocomplete
                  sx={{ width: "48%" }}
                  size="small"
                  disablePortal
                  id="combo-box-demo"
                  noOptionsText="(·_·)"
                  options={["Відсутній", "Присутній"]}
                  value={elevator}
                  onChange={(e, value) => {
                    setElevator(value || "");
                  }}
                  fullWidth
                  renderInput={(params) => (
                    <TextField {...params} label="Наявність вантажного ліфта" />
                  )}
                />
              </Box>

              <FormGroup sx={{ marginTop: 3 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{
                        color: "black",
                        "&.Mui-checked": {
                          color: "black",
                        },
                      }}
                    />
                  }
                  disabled={floor === "" || apartmentNumber === ""}
                  label="Підняти на поверх (+ 11₴)"
                  checked={isLiftRequired}
                  onChange={handleLiftRequiredChange}
                />
              </FormGroup>
            </Box>
          )}
          {/* <Box
            display={"flex"}
            justifyContent={"space-between"}
            width={800}
            flexDirection={"row"}
          >
            <FormControlLabel
              value="pickupFromUrk"
              control={<Radio  sx={{color: 'black', '&.Mui-checked': {
                color: 'black'
              }}} />}
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
          )} */}

          <Box
            display={"flex"}
            justifyContent={"space-between"}
             width={ window.innerWidth > 1450 ? 800 : "100%"}
            flexDirection={"row"}
          >
            <FormControlLabel
              value="pickupFromNova"
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
              label="Самовивіз з Нової Пошти"
            />
            <Typography>149 ₴</Typography>
          </Box>
          {selectedOption === "pickupFromNova" && (
            <Box sx={{ padding: 5, paddingLeft: 0, paddingRight: 0 }}>
              <Autocomplete
                size="small"
                disablePortal
                id="combo-box-demo"
                onInputChange={handleSearchNovaChange}
                onChange={(e, value) => {
                  if (value) {
                    dispatch(setNovaPoshtaLocation(value.Description));
                    dispatch(
                      ORDER_setDeliveryOnAdress({
                        delivery_type: "Нова Пошта",
                        delivery_cost: 149,
                        delivery_location: {
                          street: "",
                          houseNumber: "",
                          apartmentNumber: "",
                          floorNumber: "",
                        },
                        novaDepartment: value.Description,
                        liftRequired: false,
                        elevator: false,
                      })
                    );
                    dispatch(STAGES_delivery(true));
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
    </Box>
  );
}
