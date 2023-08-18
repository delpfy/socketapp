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
  const [externalPorts, setExternalPorts] = useState([" "]);
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
    newDimentions[index] = event.target.value;
    setDimensions(newDimentions);
  };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function DisplayBox(
    name: string,
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
            onChange={(event) => {
               
              if (/^\d*\.?\d*$/.test(event.target.value)) {
                
                setValue(event.target.value.length > 0 ? parseFloat(event.target.value) : 0);
              }
            }}
          />
        ) : (
          <TextField
            fullWidth
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
            }}
          />
        )}
      </Box>
    );
  }

  function handleAddItem() {
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
      <Box
        paddingTop={15}
        paddingBottom={15}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
      >
        {DisplayBox("Назва:", name, setName)}
        {DisplayBox("Опис:", description, setDescription)}
        {DisplayBox("Ціна:", price, setPrice)}
        {DisplayBox("Кількість:", quantity, setQuantity)}
        {DisplayBox("Знижка:", sale, setSale)}

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
        {DisplayBox("Процесор:", processor, setProcessor)}
        
        {DisplayBox("Бренд:", brand, setBrand)}
        {DisplayBox("Лінійка:", series, setSeries)}
        {DisplayBox("Конструкція:", construction, setConstruction)}
        {DisplayBox("Операційна система:", operatingSystem, setOperatingSystem)}
        {DisplayBox("Розмір матриці:", screenDiagonal, setScreenDiagonal)}
        {DisplayBox("Тип матриці:", matrixType, setMatrixType)}
        {DisplayBox("Тип покриття матриці:", coatingType, setCoatingType)}
        {DisplayBox("Роздільна здатність:", resolution, setResolution)}
        {DisplayBox("Сенсорний екран:", touchScreen, setTouchScreen)}
        {DisplayBox("Частота оновлення:", refreshRate, setRefreshRate)}
        {DisplayBox("Яскравість:", brightness, setBrightness)}
        {DisplayBox(
          "Інші функції дисплея:",
          otherDisplayFeatures,
          setOtherDisplayFeatures
        )}
        {DisplayBox("ОЗУ:", memory, setMemory)}
        {DisplayBox("Максимальний обсяг ОЗУ:", maxRAM, setMaxRAM)}
        {DisplayBox("Тип накопичувача:", storageType, setStorageType)}
        {DisplayBox("Обсяг накопичувача:", storageCapacity, setStorageCapacity)}
        {DisplayBox("Оптичний привід:", opticalDrive, setOpticalDrive)}
        {DisplayBox("GPU адаптер:", gpuAdapter, setGpuAdapter)}

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
        {DisplayBox("Рідер карт пам'яті:", cardReader, setCardReader)}
        {DisplayBox("Веб-камера:", webcam, setWebcam)}
        {DisplayBox(
          "Підсвітка клавіатури:",
          keyboardBacklight,
          setKeyboardBacklight
        )}
        {DisplayBox("Пасивне охолодження:", passiveCooling, setPassiveCooling)}
        {DisplayBox(
          "Сканер відбитків пальців:",
          fingerprintScanner,
          setFingerprintScanner
        )}
        {DisplayBox("Цифрова клавіатура:", numericKeypad, setNumericKeypad)}
        {DisplayBox(
          "Сертифікація Intel Evo:",
          intelEvoCertification,
          setIntelEvoCertification
        )}
        {DisplayBox("Адаптер Ethernet:", ethernetAdapter, setEthernetAdapter)}
        {DisplayBox("Wi-Fi:", wifi, setWifi)}
        {DisplayBox("Bluetooth:", bluetooth, setBluetooth)}
        {DisplayBox("Вага:", weight, setWeight)}
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
                onChange={(event) => handleDimentionsChange("height", event)}
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
                onChange={(event) => handleDimentionsChange("width", event)}
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
                onChange={(event) => handleDimentionsChange("depth", event)}
              />
            </Box>
          </Box>
        </Box>

        {DisplayBox("Матеріал корпусу:", bodyMaterial, setBodyMaterial)}
        {DisplayBox("Колір кришки:", lidColor, setLidColor)}
        {DisplayBox("Колір корпусу:", bodyColor, setBodyColor)}
        {DisplayBox("Спеціальний захист:", ruggedLaptop, setRuggedLaptop)}
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
