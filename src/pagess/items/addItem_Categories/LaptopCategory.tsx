import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
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
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { createItem } from "../../../redux/home/asyncActions";
import { Category } from "../../../redux/types";
import InfoDialog from "../../../componentss/dialogs/InfoDialog";

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

  const [processor, setProcessor] = useState("");
  const [memory, setMemory] = useState("");
  const [brand, setBrand] = useState("");
  const [series, setSeries] = useState("");
  const [construction, setConstruction] = useState("");
  const [operatingSystem, setOperatingSystem] = useState("");
  const [screenDiagonal, setScreenDiagonal] = useState(0);
  const [matrixType, setMatrixType] = useState("");
  const [coatingType, setCoatingType] = useState("");
  const [resolution, setResolution] = useState("");
  const [touchScreen, setTouchScreen] = useState(false);
  const [refreshRate, setRefreshRate] = useState(0);
  const [brightness, setBrightness] = useState(0);
  const [otherDisplayFeatures, setOtherDisplayFeatures] = useState("");
  const [maxRAM, setMaxRAM] = useState("");
  const [storageType, setStorageType] = useState("");
  const [storageCapacity, setStorageCapacity] = useState("");
  const [opticalDrive, setOpticalDrive] = useState(false);
  const [gpuAdapter, setGpuAdapter] = useState("");
  const [externalPorts, setExternalPorts] = useState([""]);
  const [cardReader, setCardReader] = useState(false);
  const [webcam, setWebcam] = useState(false);
  const [keyboardBacklight, setKeyboardBacklight] = useState(false);
  const [passiveCooling, setPassiveCooling] = useState(false);
  const [fingerprintScanner, setFingerprintScanner] = useState(false);
  const [numericKeypad, setNumericKeypad] = useState(false);
  const [intelEvoCertification, setIntelEvoCertification] = useState(false);
  const [ethernetAdapter, setEthernetAdapter] = useState(false);
  const [wifi, setWifi] = useState("");
  const [bluetooth, setBluetooth] = useState("");
  const [weight, setWeight] = useState(0);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    depth: 0,
  });
  const [bodyMaterial, setBodyMaterial] = useState("");
  const [lidColor, setLidColor] = useState("");
  const [bodyColor, setBodyColor] = useState("");
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
    console.log(event.target.value);
    const newDimentions = { ...dimensions };
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
        ) : (
          <TextField
            fullWidth
            value={value}
            error={isError}
            helperText={isError ? errorText : ""}
            onChange={(event) => {
              setValue(event.target.value);
            }}
          />
        )}
      </Box>
    );
  }

  function handleAddItem() {
    if (
      name.trim() === "" ||
      description.trim() === "" ||
      price <= 0 ||
      quantity <= 0 ||
      sale < 0 ||
      screenDiagonal <= 0 ||
      refreshRate < 0 ||
      brightness < 0 ||
      maxRAM.trim() === "" ||
      storageType.trim() === "" ||
      storageCapacity.trim() === "" ||
      wifi.trim() === "" ||
      bluetooth.trim() === "" ||
      weight <= 0 ||
      dimensions.height <= 0 ||
      dimensions.width <= 0 ||
      dimensions.depth <= 0 ||
      bodyMaterial.trim() === "" ||
      lidColor.trim() === "" ||
      bodyColor.trim() === ""
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
        memory,
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
        {DisplayBox(
          "Процесор:",
          processor,
          setProcessor,
          (value) => value.trim() !== "",
          "Це поле не може бути порожнім"
        )}

        {DisplayBox(
          "Бренд:",
          brand,
          setBrand,
          (value) => value.trim() !== "",
          "Це поле не може бути порожнім"
        )}
        {DisplayBox(
          "Лінійка:",
          series,
          setSeries,
          (value) => value.trim() !== "",
          "Це поле не може бути порожнім"
        )}
        {DisplayBox(
          "Конструкція:",
          construction,
          setConstruction,
          (value) => value.trim() !== "",
          "Це поле не може бути порожнім"
        )}
        {DisplayBox(
          "Операційна система:",
          operatingSystem,
          setOperatingSystem,
          (value) => value.trim() !== "",
          "Це поле не може бути порожнім"
        )}
        {DisplayBox(
          "Розмір матриці:",
          screenDiagonal,
          setScreenDiagonal,
          (value) => parseFloat(value) > 0,
          "Введіть дійсне значення не менше 1"
        )}
        {DisplayBox(
          "Тип матриці:",
          matrixType,
          setMatrixType,
          (value) => value.trim() !== "",
          "Це поле не може бути порожнім"
        )}
        {DisplayBox(
          "Тип покриття матриці:",
          coatingType,
          setCoatingType,
          (value) => value.trim() !== "",
          "Це поле не може бути порожнім"
        )}
        {DisplayBox(
          "Роздільна здатність:",
          resolution,
          setResolution,
          (value) => value.trim() !== "",
          "Це поле не може бути порожнім"
        )}
        {DisplayBox(
          "Частота оновлення:",
          refreshRate,
          setRefreshRate,
          (value) => parseFloat(value) > 0,
          "Введіть дійсне значення не менше 1"
        )}
        {DisplayBox(
          "Яскравість:",
          brightness,
          setBrightness,
          (value) => parseFloat(value) > 0,
          "Введіть дійсне значення не менше 1"
        )}
        {DisplayBox(
          "Інші функції дисплея:",
          otherDisplayFeatures,
          setOtherDisplayFeatures,
          (value) => true,
          ""
        )}
        {DisplayBox(
          "ОЗУ:",
          memory,
          setMemory,
          (value) => value.trim() !== "",
          "Це поле не може бути порожнім"
        )}
        {DisplayBox(
          "Максимальний обсяг ОЗУ:",
          maxRAM,
          setMaxRAM,
          (value) => value.trim() !== "",
          "Це поле не може бути порожнім"
        )}
        {DisplayBox(
          "Тип накопичувача:",
          storageType,
          setStorageType,
          (value) => value.trim() !== "",
          "Це поле не може бути порожнім"
        )}
        {DisplayBox(
          "Обсяг накопичувача:",
          storageCapacity,
          setStorageCapacity,
          (value) => value.trim() !== "",
          "Це поле не може бути порожнім"
        )}
        {DisplayBox(
          "Оптичний привід:",
          opticalDrive,
          setOpticalDrive,
          (value) => true,
          ""
        )}
        {DisplayBox(
          "GPU адаптер:",
          gpuAdapter,
          setGpuAdapter,
          (value) => value.trim() !== "",
          "Це поле не може бути порожнім"
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
              <TextField
                key={index}
                fullWidth
                value={port}
                error={externalPorts[index].length === 0 ? true : false}
                helperText={
                  externalPorts[index].length === 0
                    ? "Це поле не може бути порожнім"
                    : ""
                }
                onChange={(event) => handlePortsChange(index, event)}
              />
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
        {DisplayBox(
          "Wi-Fi:",
          wifi,
          setWifi,
          (value) => value.trim() !== "",
          "Це поле не може бути порожнім"
        )}
        {DisplayBox(
          "Bluetooth:",
          bluetooth,
          setBluetooth,
          (value) => value.trim() !== "",
          "Це поле не може бути порожнім"
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
                        ? parseFloat(event.target.value)
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
                        ? parseFloat(event.target.value)
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
                        ? parseFloat(event.target.value)
                        : 0
                    );
                  }
                }}
              />
            </Box>
          </Box>
        </Box>

        {DisplayBox(
          "Матеріал корпусу:",
          bodyMaterial,
          setBodyMaterial,
          (value) => value.trim() !== "",
          "Це поле не може бути порожнім"
        )}
        {DisplayBox(
          "Колір кришки:",
          lidColor,
          setLidColor,
          (value) => value.trim() !== "",
          "Це поле не може бути порожнім"
        )}
        {DisplayBox(
          "Колір корпусу:",
          bodyColor,
          setBodyColor,
          (value) => value.trim() !== "",
          "Це поле не може бути порожнім"
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
