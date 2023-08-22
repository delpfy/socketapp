import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { SetStateAction, Dispatch, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hooks";
import { createItem } from "../../../redux/home/asyncActions";
import { Category } from "../../../redux/types";
import InfoDialog from "../../../componentss/dialogs/InfoDialog";
import {
  availableBrands,
  availableConstructions,
  availableProcessors,
  availableOperatingSystems,
  availableMatrixTypes,
  availableResolutions,
  availableMatrixCoatings,
  availableRefreshRates,
  availableBrightnessLevels,
  availableRAM,
  availableMaxRAM,
  availableStorageCapacities,
  availableGPUAdapters,
  availableScreenSizes,
  availableStorageTypes,
  availableWiFi,
  availableBluetooth,
  availableBodyMaterials,
  availableLidColors,
  availableBodyColors,
  availableExternalPorts,
  availableOtherDisplayFeatures,
} from "../../../utils/availibleAccessories";

export default function LaptopCategory(props: Category) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [images, setImages] = useState(["", "", ""]);
  const [sale, setSale] = useState(0);
  const [reviewsAmount, setReviewsAmount] = useState(0);

  //fields

  const [processor, setProcessor] = useState(availableProcessors[0]);
  const [RAM, setRAM] = useState(availableRAM[0]);
  const [brand, setBrand] = useState(availableBrands[0]);
  const [series, setSeries] = useState("");
  const [construction, setConstruction] = useState(availableConstructions[0]);
  const [operatingSystem, setOperatingSystem] = useState(
    availableOperatingSystems[0]
  );
  const [screenDiagonal, setScreenDiagonal] = useState(availableScreenSizes[0]);
  const [matrixType, setMatrixType] = useState(availableMatrixTypes[0]);
  const [coatingType, setCoatingType] = useState(availableMatrixCoatings[0]);
  const [resolution, setResolution] = useState(availableResolutions[0]);
  const [touchScreen, setTouchScreen] = useState(false);
  const [refreshRate, setRefreshRate] = useState(availableRefreshRates[0]);
  const [brightness, setBrightness] = useState(availableBrightnessLevels[0]);
  const [otherDisplayFeatures, setOtherDisplayFeatures] = useState(
    availableOtherDisplayFeatures[0]
  );
  const [maxRAM, setMaxRAM] = useState(availableMaxRAM[0]);
  const [storageType, setStorageType] = useState(availableStorageTypes[0]);
  const [storageCapacity, setStorageCapacity] = useState(
    availableStorageCapacities[0]
  );
  const [opticalDrive, setOpticalDrive] = useState(false);
  const [gpuAdapter, setGpuAdapter] = useState(availableGPUAdapters[0]);
  const [externalPorts, setExternalPorts] = useState([
    availableExternalPorts[0],
  ]);
  const [cardReader, setCardReader] = useState(false);
  const [webcam, setWebcam] = useState(false);
  const [keyboardBacklight, setKeyboardBacklight] = useState(false);
  const [passiveCooling, setPassiveCooling] = useState(false);
  const [fingerprintScanner, setFingerprintScanner] = useState(false);
  const [numericKeypad, setNumericKeypad] = useState(false);
  const [intelEvoCertification, setIntelEvoCertification] = useState(false);
  const [ethernetAdapter, setEthernetAdapter] = useState(false);
  const [wifi, setWifi] = useState(availableWiFi[0]);
  const [bluetooth, setBluetooth] = useState(availableBluetooth[0]);
  const [weight, setWeight] = useState(0);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    depth: 0,
  });
  const [bodyMaterial, setBodyMaterial] = useState(availableBodyMaterials[0]);
  const [lidColor, setLidColor] = useState(availableLidColors[0]);
  const [bodyColor, setBodyColor] = useState(availableBodyColors[0]);
  const [ruggedLaptop, setRuggedLaptop] = useState(false);

  const handleAddImageField = () => {
    setImages([...images, ""]);
  };

  const handleRemoveImageField = () => {
    if (images.length > 3) {
      setImages(images.slice(0, images.length - 1));
    }
  };

  const handleImageChange = (index: any, event: any) => {
    const newImages = [...images];
    newImages[index] = event.target.value;
    setImages(newImages);
  };

  const handleAddPortField = () => {
    setExternalPorts([...externalPorts, ""]);
  };

  const handleRemovePortField = () => {
    if (externalPorts.length > 1) {
      setExternalPorts(externalPorts.slice(0, externalPorts.length - 1));
    }
  };

  const handlePortsChange = (index: any, event: any) => {
    const newPorts = [...externalPorts];
    newPorts[index] = event.target.value;
    setExternalPorts(newPorts);
  };
  const handleDimentionsChange = (
    index: "width" | "height" | "depth",
    event: any
  ) => {
    const newDimentions = { ...dimensions };
    console.log(event);
    newDimentions[index] = event;
    setDimensions(newDimentions);
  };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [openInfo, setOpenInfo] = useState(false);
  const [infoMessage, setInfoMessage] = useState<string>("Some info");
  function InfoDialog_open() {
    setOpenInfo(true);
  }

  function InfoDialog_close() {
    setOpenInfo(false);
  }

  function DisplayBox(
    name: string,
    value: any,
    setValue: Dispatch<SetStateAction<any>>,
    validation: (value: any) => boolean,
    errorText: string
  ) {
    const isError =
      !validation(value) || (typeof value === "string" && /^\d+$/.test(value));
    if (typeof value === "string" && validation(value)) {
      errorText = "Це поле не може містити тільки цифри";
    }
    return (
      <Box
        width={700}
        paddingBottom={5}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Typography
          variant="h1"
          textAlign={"center"}
          fontSize={30}
          fontFamily={"Ubuntu"}
          width={300}
        >
          {name}
        </Typography>
        {typeof value === "boolean" ? (
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={value === true ? "Так" : "Ні"}
              label="Age"
              onChange={(event: any) =>
                setValue(event.target.value === "Так" ? true : false)
              }
            >
              <MenuItem value={"Так"}>Так</MenuItem>
              <MenuItem value={"Ні"}>Ні</MenuItem>
            </Select>
          </FormControl>
        ) : typeof value === "number" ? (
          SpecificNumericalField(value, isError, errorText, setValue, name)
        ) : (
          SpecificLiteralField(value, isError, errorText, setValue, name)
        )}
      </Box>
    );
  }

  function DisplaySelectBox(
    name: string,
    values: string[],
    value: any,
    setValue: Dispatch<SetStateAction<any>>
  ) {
    return (
      <Box
        width={700}
        paddingBottom={5}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Typography
          variant="h1"
          textAlign={"center"}
          fontSize={30}
          fontFamily={"Ubuntu"}
          width={300}
        >
          {name}
        </Typography>

        <FormControl fullWidth>
          <InputLabel id="processor-label">Процесор</InputLabel>
          <Select
            labelId="processor-label"
            id="processor-select"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            MenuProps={{
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "left",
              },
              PaperProps: {
                style: {
                  maxHeight: 200,
                },
              },
            }}
          >
            {values.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    );
  }

  function SpecificLiteralField(
    value: any,
    isError: boolean,
    errorText: string,
    setValue: Dispatch<SetStateAction<any>>,
    name: string
  ) {
    switch (name) {
      case "Тип накопичувача:":
        return (
          <TextField
            fullWidth
            value={value}
            error={isError}
            helperText={isError ? errorText : ""}
            onChange={(event) => {
              setValue(
                event.target.value.length <= 3
                  ? event.target.value
                  : storageType
              );
            }}
          />
        );
      default:
        return (
          <TextField
            fullWidth
            value={value}
            error={isError}
            helperText={isError ? errorText : ""}
            onChange={(event) => {
              setValue(event.target.value);
            }}
          />
        );
    }
  }

  function SpecificNumericalField(
    value: any,
    isError: boolean,
    errorText: string,
    setValue: Dispatch<SetStateAction<any>>,
    name: string
  ) {
    switch (name) {
      case "Ціна:":
        return (
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Грн</InputAdornment>
              ),
            }}
            fullWidth
            value={value}
            error={isError}
            helperText={isError ? errorText : ""}
            onChange={(event) => {
              if (/^\d*\.?\d*$/.test(event.target.value)) {
                setValue(
                  event.target.value.length > 0
                    ? parseFloat(event.target.value) <= 1000000
                      ? parseFloat(event.target.value)
                      : price
                    : 0
                );
              }
            }}
          />
        );
      
      case "Знижка:":
        return (
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">%</InputAdornment>
              ),
            }}
            fullWidth
            value={value}
            error={isError}
            helperText={isError ? errorText : ""}
            onChange={(event) => {
              if (/^\d*\.?\d*$/.test(event.target.value)) {
                setValue(
                  event.target.value.length > 0
                    ? parseFloat(event.target.value) <= 100
                      ? parseFloat(event.target.value)
                      : sale
                    : 0
                );
              }
            }}
          />
        );
      
      case "Вага:":
        return (
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Кг</InputAdornment>
              ),
            }}
            fullWidth
            value={value}
            error={isError}
            helperText={isError ? errorText : ""}
            onChange={(event) => {
              if (/^\d*\.?\d*$/.test(event.target.value)) {
                setValue(
                  event.target.value.length > 0
                    ? parseFloat(event.target.value) <= 20
                      ? parseFloat(event.target.value)
                      : weight
                    : 0
                );
              }
            }}
          />
        );
      default:
        return (
          <TextField
            fullWidth
            value={value}
            error={isError}
            helperText={isError ? errorText : ""}
            onChange={(event) => {
              if (/^\d*\.?\d*$/.test(event.target.value)) {
                setValue(
                  event.target.value.length > 0
                    ? parseFloat(event.target.value)
                    : 0
                );
              }
            }}
          />
        );
    }
  }

  function handleAddItem() {
    if (
      name.trim() === "" ||
      description.trim() === "" ||
      series.trim() === "" ||
      price <= 0 ||
      quantity <= 0 ||
      sale < 0 ||
      weight <= 0 ||
      dimensions.height <= 0 ||
      dimensions.width <= 0 ||
      dimensions.depth <= 0 ||
      images[0].length === 0 ||
      images[1].length === 0 ||
      images[2].length === 0 
    ) {
      InfoDialog_open();
      setInfoMessage("Не всі поля було заповнено коректно");
      return;
    }
    dispatch(
      createItem({
        name,
        category: props.category,
        description,
        quantity,
        price,
        rating,
        image: images,
        sale,
        reviewsAmount,
        processor,
        RAM,
        brand,
        series,
        construction,
        operatingSystem,
        screenDiagonal,
        matrixType,
        coatingType,
        resolution,
        touchScreen,
        refreshRate,
        brightness,
        otherDisplayFeatures,
        maxRAM,
        storageType,
        storageCapacity,
        opticalDrive,
        gpuAdapter,
        externalPorts,
        cardReader,
        webcam,
        keyboardBacklight,
        passiveCooling,
        fingerprintScanner,
        numericKeypad,
        intelEvoCertification,
        ethernetAdapter,
        wifi,
        bluetooth,
        weight,
        dimensions,
        bodyMaterial,
        lidColor,
        bodyColor,
        ruggedLaptop,
      })
    ).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/catalog");
      }
    });
  }
  return (
    <>
      <InfoDialog
        openInfo={openInfo}
        InfoDialog_close={InfoDialog_close}
        infoMessage={infoMessage}
      />
      <Box
        paddingTop={15}
        paddingBottom={15}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
      >
        {DisplayBox(
          "Назва:",
          name,
          setName,
          (value) => value.trim() !== "",
          "Це поле не може бути порожнім"
        )}
        {DisplayBox(
          "Опис:",
          description,
          setDescription,
          (value) => value.trim() !== "",
          "Це поле не може бути порожнім"
        )}
        {DisplayBox(
          "Ціна:",
          price,
          setPrice,
          (value) => parseFloat(value) > 0,
          "Введіть дійсне значення не менше 1"
        )}
        {DisplayBox(
          "Кількість:",
          quantity,
          setQuantity,
          (value) => parseInt(value) > 0,
          "Введіть дійсне значення не менше 1"
        )}
        {DisplayBox(
          "Знижка:",
          sale,
          setSale,
          (value) => parseFloat(value) >= 0,
          "Знижка не може бути від'ємною."
        )}

        <Box
          width={700}
          paddingBottom={5}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Typography
            variant="h1"
            textAlign={"center"}
            fontSize={30}
            fontFamily={"Ubuntu"}
            width={300}
          >
            Зображення:
          </Typography>
          <Box maxWidth={500}>
            {images.map((imageUrl, index) => (
              <TextField
                key={index}
                fullWidth
                value={imageUrl}
                error={imageUrl.length === 0 ? true : false}
                helperText={
                  imageUrl.length === 0
                    ? "Вкажіть зображення"
                    : ""
                }
                onChange={(event) => handleImageChange(index, event)}
              />
            ))}
            <IconButton onClick={handleAddImageField}>
              <AddIcon />
            </IconButton>
            <IconButton onClick={handleRemoveImageField}>
              <RemoveIcon />
            </IconButton>
          </Box>
        </Box>

        <Box
          width={700}
          paddingBottom={5}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Typography
            variant="h1"
            textAlign={"center"}
            fontSize={30}
            fontFamily={"Ubuntu"}
            width={300}
          >
            Характеристики
          </Typography>
          <Divider />
        </Box>

        {DisplaySelectBox(
          "Процесор:",
          availableProcessors,
          processor,
          setProcessor
        )}

        {DisplaySelectBox("Бренд:", availableBrands, brand, setBrand)}
        {DisplayBox(
          "Лінійка:",
          series,
          setSeries,
          (value) => value.trim() !== "",
          "Це поле не може бути порожнім"
        )}
        {DisplaySelectBox(
          "Конструкція:",
          availableConstructions,
          construction,
          setConstruction
        )}
        {DisplaySelectBox(
          "Операційна система:",
          availableOperatingSystems,
          operatingSystem,
          setOperatingSystem
        )}
        {DisplaySelectBox(
          "Діагональ екрану:",
          availableScreenSizes,
          screenDiagonal,
          setScreenDiagonal
        )}
        {DisplaySelectBox(
          "Тип матриці:",
          availableMatrixTypes,
          matrixType,
          setMatrixType
        )}
        {DisplaySelectBox(
          "Тип покриття матриці:",
          availableMatrixCoatings,
          coatingType,
          setCoatingType
        )}
        {DisplaySelectBox(
          "Роздільна здатність:",
          availableResolutions,
          resolution,
          setResolution
        )}

        {DisplaySelectBox(
          "Частота оновлення:",
          availableRefreshRates,
          refreshRate,
          setRefreshRate
        )}
        {DisplaySelectBox(
          "Яскравість:",
          availableBrightnessLevels,
          brightness,
          setBrightness
        )}
        {DisplaySelectBox(
          "Інші функції дисплея:",
          availableOtherDisplayFeatures,
          otherDisplayFeatures,
          setOtherDisplayFeatures
        )}
        {DisplaySelectBox("ОЗУ:", availableRAM, RAM, setRAM)}
        {DisplaySelectBox(
          "Максимальний обсяг ОЗУ:",
          availableMaxRAM,
          maxRAM,
          setMaxRAM
        )}
        {DisplaySelectBox(
          "Тип накопичувача:",
          availableStorageTypes,
          storageType,
          setStorageType
        )}
        {DisplaySelectBox(
          "Обсяг накопичувача:",
          availableStorageCapacities,
          storageCapacity,
          setStorageCapacity
        )}
        {DisplayBox(
          "Оптичний привід:",
          opticalDrive,
          setOpticalDrive,
          (value) => true,
          ""
        )}
        {DisplaySelectBox(
          "GPU адаптер:",
          availableGPUAdapters,
          gpuAdapter,
          setGpuAdapter
        )}

        <Box
          width={700}
          paddingBottom={5}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Typography
            variant="h1"
            textAlign={"center"}
            fontSize={30}
            fontFamily={"Ubuntu"}
            width={300}
          >
            Зовнішні порти:
          </Typography>
          <Box maxWidth={500} minWidth={500}>
            {externalPorts.map((port, index) => (
              <FormControl fullWidth>
                <InputLabel id="processor-label">Порт</InputLabel>
                <Select
                  labelId="processor-label"
                  id="processor-select"
                  value={port}
                  onChange={(event) => handlePortsChange(index, event)}
                  MenuProps={{
                    anchorOrigin: {
                      vertical: "bottom",
                      horizontal: "left",
                    },
                    transformOrigin: {
                      vertical: "top",
                      horizontal: "left",
                    },
                    PaperProps: {
                      style: {
                        maxHeight: 200,
                      },
                    },
                  }}
                >
                  {availableExternalPorts.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ))}
            <IconButton onClick={handleAddPortField}>
              <AddIcon />
            </IconButton>
            <IconButton onClick={handleRemovePortField}>
              <RemoveIcon />
            </IconButton>
          </Box>
        </Box>
        {DisplayBox(
          "Рідер карт пам'яті:",
          cardReader,
          setCardReader,
          (value) => true,
          ""
        )}
        {DisplayBox("Веб-камера:", webcam, setWebcam, (value) => true, "")}
        {DisplayBox(
          "Підсвітка клавіатури:",
          keyboardBacklight,
          setKeyboardBacklight,
          (value) => true,
          ""
        )}
        {DisplayBox(
          "Пасивне охолодження:",
          passiveCooling,
          setPassiveCooling,
          (value) => true,
          ""
        )}
        {DisplayBox(
          "Сканер відбитків пальців:",
          fingerprintScanner,
          setFingerprintScanner,
          (value) => true,
          ""
        )}
        {DisplayBox(
          "Цифрова клавіатура:",
          numericKeypad,
          setNumericKeypad,
          (value) => true,
          ""
        )}
        {DisplayBox(
          "Сертифікація Intel Evo:",
          intelEvoCertification,
          setIntelEvoCertification,
          (value) => true,
          ""
        )}
        {DisplayBox(
          "Адаптер Ethernet:",
          ethernetAdapter,
          setEthernetAdapter,
          (value) => true,
          ""
        )}
        {DisplaySelectBox("Wi-Fi:", availableWiFi, wifi, setWifi)}
        {DisplaySelectBox(
          "Bluetooth:",
          availableBluetooth,
          bluetooth,
          setBluetooth
        )}
        {DisplayBox(
          "Вага:",
          weight,
          setWeight,
          (value) => parseFloat(value) > 0,
          "Введіть дійсне значення не менше 1"
        )}
        <Box
          width={700}
          paddingBottom={5}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Typography
            variant="h1"
            textAlign={"center"}
            fontSize={30}
            fontFamily={"Ubuntu"}
            width={300}
          >
            Розміри:
          </Typography>
          <Box maxWidth={500}>
            <Box>
              <Typography
                variant="h1"
                textAlign={"center"}
                fontSize={30}
                fontFamily={"Ubuntu"}
                width={100}
              >
                Висота:
              </Typography>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">мм</InputAdornment>
                  ),
                }}
                fullWidth
                value={dimensions.height}
                error={dimensions.height === 0 ? true : false}
                helperText={
                  dimensions.height === 0
                    ? "Введіть дійсне значення не менше 1"
                    : ""
                }
                onChange={(event) => {
                  if (/^\d*\.?\d*$/.test(event.target.value)) {
                    handleDimentionsChange(
                      "height",
                      event.target.value.length > 0
                        ? parseFloat(event.target.value) <= 1000
                          ? parseFloat(event.target.value)
                          : dimensions.height
                        : 0
                    );
                  }
                }}
              />
            </Box>
            <Box>
              <Typography
                variant="h1"
                textAlign={"center"}
                fontSize={30}
                fontFamily={"Ubuntu"}
                width={100}
              >
                Ширина:
              </Typography>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">мм</InputAdornment>
                  ),
                }}
                fullWidth
                value={dimensions.width}
                error={dimensions.width === 0 ? true : false}
                helperText={
                  dimensions.width === 0
                    ? "Введіть дійсне значення не менше 1"
                    : ""
                }
                onChange={(event) => {
                  if (/^\d*\.?\d*$/.test(event.target.value)) {
                    handleDimentionsChange(
                      "width",
                      event.target.value.length > 0
                        ? parseFloat(event.target.value) <= 1000
                          ? parseFloat(event.target.value)
                          : dimensions.width
                        : 0
                    );
                  }
                }}
              />
            </Box>
            <Box>
              <Typography
                variant="h1"
                textAlign={"center"}
                fontSize={30}
                fontFamily={"Ubuntu"}
                width={100}
              >
                Глубина:
              </Typography>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">мм</InputAdornment>
                  ),
                }}
                fullWidth
                value={dimensions.depth}
                error={dimensions.depth === 0 ? true : false}
                helperText={
                  dimensions.depth === 0
                    ? "Введіть дійсне значення не менше 1"
                    : ""
                }
                onChange={(event) => {
                  if (/^\d*\.?\d*$/.test(event.target.value)) {
                    handleDimentionsChange(
                      "depth",
                      event.target.value.length > 0
                        ? parseFloat(event.target.value) <= 1000
                          ? parseFloat(event.target.value)
                          : dimensions.depth
                        : 0
                    );
                  }
                }}
              />
            </Box>
          </Box>
        </Box>

        {DisplaySelectBox(
          "Матеріал корпусу:",
          availableBodyMaterials,
          bodyMaterial,
          setBodyMaterial
        )}
        {DisplaySelectBox(
          "Колір кришки:",
          availableLidColors,
          lidColor,
          setLidColor
        )}
        {DisplaySelectBox(
          "Колір корпусу:",
          availableBodyColors,
          bodyColor,
          setBodyColor
        )}
        {DisplayBox(
          "Спеціальний захист:",
          ruggedLaptop,
          setRuggedLaptop,
          (value) => true,
          ""
        )}
        <Button
          variant="contained"
          sx={{ width: 300 }}
          color="warning"
          onClick={handleAddItem}
        >
          Додати товар
        </Button>
      </Box>
    </>
  );
}
