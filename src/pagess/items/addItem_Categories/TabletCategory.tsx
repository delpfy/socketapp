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
        ) : /^\d*\.?\d*$/.test(value) ? (
          <TextField
            fullWidth
            value={value}
            onChange={(event) => {
              if (/^\d*\.?\d*$/.test(event.target.value)) {
                setValue(event.target.value);
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
    newDimentions[index] = event.target.value;
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
        {DisplayBox("Бренд:", brand, setBrand)}
        {DisplayBox("Лінійка:", line, setLine)}
        {DisplayBox("Операційна система:", preinstalledOS, setPreinstalledOS)}
        {DisplayBox("Розмір матриці:", screenDiagonal, setScreenDiagonal)}
        {DisplayBox("Роздільна здатність:", resolution, setResolution)}
        {DisplayBox("Тип матриці:", matrixType, setMatrixType)}
        {DisplayBox("Датчик освітленості:", lightSensor, setLightSensor)}
        {DisplayBox("ОЗУ:", memoryRAM, setMemoryRAM)}
        {DisplayBox("Вбудована пам'ять:", builtInMemory, setBuiltInMemory)}
        {DisplayBox(
          "Слот розширення пам'яті:",
          memoryExpansionSlot,
          setMemoryExpansionSlot
        )}
        {DisplayBox("Процесор:", processor, setProcessor)}
        {DisplayBox(
          "Частота процесора:",
          processorFrequency,
          setProcessorFrequency
        )}
        {DisplayBox(
          "Кількість ядер процесора:",
          processorCores,
          setProcessorCores
        )}
        {DisplayBox("Вбудовані динаміки:", builtInSpeakers, setBuiltInSpeakers)}

        {DisplayBox(
          "Загальна ємність батареї:",
          batteryCapacity,
          setBatteryCapacity
        )}
        {DisplayBox("Фронтальна камера:", frontCamera, setFrontCamera)}
        {DisplayBox("Задня камера:", rearCamera, setRearCamera)}
        {DisplayBox("Wi-Fi:", wifi, setWifi)}
        {DisplayBox("Мережа 4G:", cellularNetwork, setCellularNetwork)}
        {DisplayBox(
          "Голосовий зв'язок:",
          voiceCommunication,
          setVoiceCommunication
        )}
        {DisplayBox("GPS:", gps, setGPS)}
        {DisplayBox("NFC:", nfc, setNFC)}
        {DisplayBox("Зовнішні порти:", externalPorts, setExternalPorts)}
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
        {DisplayBox("Колір корпусу:", bodyColor, setBodyColor)}
        {DisplayBox(
          "Колір панелі передньої частини:",
          frontPanelColor,
          setFrontPanelColor
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
