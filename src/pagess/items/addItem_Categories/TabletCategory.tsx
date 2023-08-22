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
import { useAppDispatch } from "../../../redux/hooks";
import { createItem } from "../../../redux/home/asyncActions";
import { Category } from "../../../redux/types";
import InfoDialog from "../../../componentss/dialogs/InfoDialog";

export default function TabletCategory(props: Category) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [images, setImages] = useState(["", "", ""]);
  const [sale, setSale] = useState(0);
  const [reviewsAmount, setReviewsAmount] = useState(0);

  // fields
  const [brand, setBrand] = useState("");
  const [line, setLine] = useState("");
  const [preinstalledOS, setPreinstalledOS] = useState("");
  const [screenDiagonal, setScreenDiagonal] = useState(0);
  const [resolution, setResolution] = useState("");
  const [matrixType, setMatrixType] = useState("");
  const [lightSensor, setLightSensor] = useState(false);
  const [memoryRAM, setMemoryRAM] = useState("");
  const [builtInMemory, setBuiltInMemory] = useState("");
  const [memoryExpansionSlot, setMemoryExpansionSlot] = useState("");
  const [processor, setProcessor] = useState("");
  const [processorFrequency, setProcessorFrequency] = useState("");
  const [processorCores, setProcessorCores] = useState(0);
  const [builtInSpeakers, setBuiltInSpeakers] = useState(false);
  const [batteryCapacity, setBatteryCapacity] = useState("");
  const [frontCamera, setFrontCamera] = useState("");
  const [rearCamera, setRearCamera] = useState("");
  const [wifi, setWifi] = useState("");
  const [cellularNetwork, setCellularNetwork] = useState("");
  const [voiceCommunication, setVoiceCommunication] = useState(false);
  const [gps, setGPS] = useState("");
  const [nfc, setNFC] = useState(false);
  const [externalPorts, setExternalPorts] = useState("");
  const [weight, setWeight] = useState(0);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    depth: 0,
  });
  const [bodyColor, setBodyColor] = useState("");
  const [frontPanelColor, setFrontPanelColor] = useState("");

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
      brand.trim() === "" ||
      description.trim() === "" ||
      price <= 0 ||
      quantity <= 0 ||
      sale < 0 ||
      screenDiagonal <= 0 ||
      matrixType.trim() === "" ||
      resolution.trim() === "" ||
      processor.trim() === "" ||
      processorFrequency.trim() === "" ||
      processorCores <= 0 ||
      batteryCapacity.trim() === "" ||
      frontCamera.trim() === "" ||
      rearCamera.trim() === "" ||
      wifi.trim() === "" ||
      cellularNetwork.trim() === "" ||
      gps.trim() === "" ||
      externalPorts.trim() === "" ||
      weight <= 0 ||
      dimensions.width <= 0 ||
      dimensions.height <= 0 ||
      dimensions.depth <= 0 ||
      bodyColor.trim() === "" ||
      frontPanelColor.trim() === ""
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
        brand,
        line,
        preinstalledOS,
        screenDiagonal,
        resolution,
        matrixType,
        lightSensor,
        memoryRAM,
        builtInMemory,
        memoryExpansionSlot,
        processor,
        processorFrequency,
        processorCores,
        builtInSpeakers,
        batteryCapacity,
        frontCamera,
        rearCamera,
        wifi,
        cellularNetwork,
        voiceCommunication,
        gps,
        nfc,
        externalPorts,
        weight,
        dimensions,
        bodyColor,
        frontPanelColor,
      })
    ).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/catalog");
      }
    });
  }

  const handleDimentionsChange = (
    index: "width" | "height" | "depth",
    event: any
  ) => {
    const newDimentions = { ...dimensions };
    newDimentions[index] = event;
    setDimensions(newDimentions);
  };

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
          "Введіть дійсне значення не менше 0"
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
        {DisplayBox(
          "Бренд:",
          brand,
          setBrand,
          (value) => value.trim() !== "",
          "Це поле не може бути порожнім"
        )}
        {DisplayBox(
          "Лінійка:",
          line,
          setLine,
          (value) => value.trim() !== "",
          "Це поле не може бути порожнім"
        )}
        {DisplayBox(
          "Операційна система:",
          preinstalledOS,
          setPreinstalledOS,
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
          "Роздільна здатність:",
          resolution,
          setResolution,
          (value) => value.trim() !== "",
          "Це поле не може бути порожнім"
        )}
        {DisplayBox(
          "Тип матриці:",
          matrixType,
          setMatrixType,
          (value) => value.trim() !== "",
          "Це поле не може бути порожнім"
        )}
        {DisplayBox(
          "Датчик освітленості:",
          lightSensor,
          setLightSensor,
          () => true,
          ""
        )}
        {DisplayBox(
          "ОЗУ:",
          memoryRAM,
          setMemoryRAM,
          (value) => value.trim() !== "",
          "Це поле не може бути порожнім"
        )}
        {DisplayBox(
          "Вбудована пам'ять:",
          builtInMemory,
          setBuiltInMemory,
          (value) => value.trim() !== "",
          "Це поле не може бути порожнім"
        )}
        {DisplayBox(
          "Слот розширення пам'яті:",
          memoryExpansionSlot,
          setMemoryExpansionSlot,
          (value) => value.trim() !== "",
          "Це поле не може бути порожнім"
        )}
        {DisplayBox(
          "Процесор:",
          processor,
          setProcessor,
          (value) => value.trim() !== "",
          "Це поле не може бути порожнім"
        )}
        {DisplayBox(
          "Частота процесора:",
          processorFrequency,
          setProcessorFrequency,
          (value) => value.trim() !== "",
          "Це поле не може бути порожнім"
        )}
        {DisplayBox(
          "Кількість ядер процесора:",
          processorCores,
          setProcessorCores,
          (value) => parseFloat(value) > 0,
          "Введіть дійсне значення не менше 1"
        )}
        {DisplayBox(
          "Вбудовані динаміки:",
          builtInSpeakers,
          setBuiltInSpeakers,
          () => true,
          ""
        )}

        {DisplayBox(
          "Загальна ємність батареї:",
          batteryCapacity,
          setBatteryCapacity,
          (value) => value.trim() !== "",
          "Це поле не може бути порожнім"
        )}
        {DisplayBox(
          "Фронтальна камера:",
          frontCamera,
          setFrontCamera,
          (value) => value.trim() !== "",
          "Це поле не може бути порожнім"
        )}
        {DisplayBox(
          "Задня камера:",
          rearCamera,
          setRearCamera,
          (value) => value.trim() !== "",
          "Це поле не може бути порожнім"
        )}
        {DisplayBox(
          "Wi-Fi:",
          wifi,
          setWifi,
          (value) => value.trim() !== "",
          "Це поле не може бути порожнім"
        )}
        {DisplayBox(
          "Мережа 4G:",
          cellularNetwork,
          setCellularNetwork,
          (value) => value.trim() !== "",
          "Це поле не може бути порожнім"
        )}
        {DisplayBox(
          "Голосовий зв'язок:",
          voiceCommunication,
          setVoiceCommunication,
          () => true,
          ""
        )}
        {DisplayBox(
          "GPS:",
          gps,
          setGPS,
          (value) => value.trim() !== "",
          "Це поле не може бути порожнім"
        )}
        {DisplayBox("NFC:", nfc, setNFC, () => true, "")}
        {DisplayBox(
          "Зовнішні порти:",
          externalPorts,
          setExternalPorts,
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
          "Колір корпусу:",
          bodyColor,
          setBodyColor,
          (value) => value.trim() !== "",
          "Це поле не може бути порожнім"
        )}
        {DisplayBox(
          "Колір панелі передньої частини:",
          frontPanelColor,
          setFrontPanelColor,
          (value) => value.trim() !== "",
          "Це поле не може бути порожнім"
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
