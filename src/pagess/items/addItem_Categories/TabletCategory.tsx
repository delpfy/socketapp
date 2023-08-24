import {
  Box,
  Button,
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
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { createItem, updateItemFields } from "../../../redux/home/asyncActions";
import { Category } from "../../../redux/types";
import InfoDialog from "../../../componentss/dialogs/InfoDialog";
import {
  availableExternalTabletPorts,
  availableTabletBrands,
  availableOperatingSystems,
  availableScreenSizes,
  availableResolutions,
  availableMatrixTypes,
  availableRAMOptions,
  availableBuiltInMemoryOptions,
  availableMemoryExpansionOptions,
  availableTabletProcessors,
  availableProcessorFrequencies,
  availableProcessorCores,
  availableBatteryCapacities,
  availableFrontCameras,
  availableRearCameras,
  availableWifiOptions,
  available4GNetworkOptions,
  availableGPSTypes,
  availableBodyColors,
  availableFrontPanelColors,
} from "../../../utils/accessories/tabletAccessories";

export default function TabletCategory(props: Category) {
  const { editItemMode, itemCurrent } = useAppSelector((state) => state.home);

  const [name, setName] = useState(editItemMode ? itemCurrent.items.name : "");
  const [description, setDescription] = useState(
    editItemMode ? itemCurrent.items.description : ""
  );
  const [price, setPrice] = useState(
    editItemMode ? itemCurrent.items.price : 0
  );
  const [quantity, setQuantity] = useState(
    editItemMode ? itemCurrent.items.quantity : 1
  );
  const [rating] = useState(0);
  const [images, setImages] = useState(
    editItemMode
      ? (itemCurrent.items.image as string[])
      : [
          "https://via.placeholder.com/1712x1712",
          "https://via.placeholder.com/1712x1712",
          "https://via.placeholder.com/1712x1712",
        ]
  );
  const [sale, setSale] = useState(editItemMode ? itemCurrent.items.sale : 0);
  const [reviewsAmount] = useState(0);

  const [brand, setBrand] = useState(
    editItemMode ? itemCurrent.items.fields.brand : availableTabletBrands[0]
  );
  const [line, setLine] = useState(
    editItemMode ? itemCurrent.items.fields.line : ""
  );
  const [preinstalledOS, setPreinstalledOS] = useState(
    editItemMode
      ? itemCurrent.items.fields.preinstalledOS
      : availableOperatingSystems[0]
  );
  const [screenDiagonal, setScreenDiagonal] = useState(
    editItemMode
      ? itemCurrent.items.fields.screenDiagonal
      : availableScreenSizes[0]
  );
  const [resolution, setResolution] = useState(
    editItemMode ? itemCurrent.items.fields.resolution : availableResolutions[0]
  );
  const [matrixType, setMatrixType] = useState(
    editItemMode ? itemCurrent.items.fields.matrixType : availableMatrixTypes[0]
  );
  const [lightSensor, setLightSensor] = useState(
    editItemMode ? itemCurrent.items.fields.lightSensor : false
  );
  const [memoryRAM, setMemoryRAM] = useState(
    editItemMode ? itemCurrent.items.fields.memoryRAM : availableRAMOptions[0]
  );
  const [builtInMemory, setBuiltInMemory] = useState(
    editItemMode
      ? itemCurrent.items.fields.builtInMemory
      : availableBuiltInMemoryOptions[0]
  );
  const [memoryExpansionSlot, setMemoryExpansionSlot] = useState(
    editItemMode
      ? itemCurrent.items.fields.memoryExpansionSlot
      : availableMemoryExpansionOptions[0]
  );
  const [processor, setProcessor] = useState(
    editItemMode
      ? itemCurrent.items.fields.processor
      : availableTabletProcessors[0]
  );
  const [processorFrequency, setProcessorFrequency] = useState(
    editItemMode
      ? itemCurrent.items.fields.processorFrequency
      : availableProcessorFrequencies[0]
  );
  const [processorCores, setProcessorCores] = useState(
    editItemMode
      ? itemCurrent.items.fields.processorCores
      : availableProcessorCores[0]
  );
  const [builtInSpeakers, setBuiltInSpeakers] = useState(
    editItemMode ? itemCurrent.items.fields.builtInSpeakers : false
  );
  const [batteryCapacity, setBatteryCapacity] = useState(
    editItemMode
      ? itemCurrent.items.fields.batteryCapacity
      : availableBatteryCapacities[0]
  );
  const [frontCamera, setFrontCamera] = useState(
    editItemMode
      ? itemCurrent.items.fields.frontCamera
      : availableFrontCameras[0]
  );
  const [rearCamera, setRearCamera] = useState(
    editItemMode ? itemCurrent.items.fields.rearCamera : availableRearCameras[0]
  );
  const [wifi, setWifi] = useState(
    editItemMode ? itemCurrent.items.fields.wifi : availableWifiOptions[0]
  );
  const [cellularNetwork, setCellularNetwork] = useState(
    editItemMode
      ? itemCurrent.items.fields.cellularNetwork
      : available4GNetworkOptions[0]
  );
  const [voiceCommunication, setVoiceCommunication] = useState(
    editItemMode ? itemCurrent.items.fields.voiceCommunication : false
  );
  const [gps, setGPS] = useState(
    editItemMode ? itemCurrent.items.fields.gps : availableGPSTypes[0]
  );
  const [nfc, setNFC] = useState(
    editItemMode ? itemCurrent.items.fields.nfc : false
  );
  const [externalPorts, setExternalPorts] = useState(
    editItemMode
      ? (itemCurrent.items.fields.externalPorts as string[])
      : [availableExternalTabletPorts[0]]
  );
  const [weight, setWeight] = useState(
    editItemMode ? itemCurrent.items.fields.weight : 0
  );
  const [dimensions, setDimensions] = useState({
    width: editItemMode ? itemCurrent.items.fields.dimensions.width : 0,
    height: editItemMode ? itemCurrent.items.fields.dimensions.height : 0,
    depth: editItemMode ? itemCurrent.items.fields.dimensions.depth : 0,
  });
  const [bodyColor, setBodyColor] = useState(
    editItemMode ? itemCurrent.items.fields.bodyColor : availableBodyColors[0]
  );
  const [frontPanelColor, setFrontPanelColor] = useState(
    editItemMode
      ? itemCurrent.items.fields.frontPanelColor
      : availableFrontPanelColors[0]
  );

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
          <InputLabel id="processor-label">{name}</InputLabel>
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
      line.trim() === "" ||
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
    editItemMode
      ? dispatch(
          updateItemFields({
            itemId: itemCurrent.items._id,
            params: {
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
            },
          })
        ).then((result) => {
          if (result.meta.requestStatus === "fulfilled") {
            navigate("/catalog");
          }
        })
      : dispatch(
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
          if (result.meta.requestStatus === "rejected") {
            InfoDialog_open();
            setInfoMessage(
              "Схоже ви намагались додати товар, ім'я якого вже зайняте"
            );
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
    setImages([...images, "https://via.placeholder.com/1712x1712"]);
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
    setExternalPorts([...externalPorts, availableExternalTabletPorts[0]]);
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
                error={imageUrl.length === 0 ? true : false}
                helperText={imageUrl.length === 0 ? "Вкажіть зображення" : ""}
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

        {DisplaySelectBox("Бренд:", availableTabletBrands, brand, setBrand)}
        {DisplayBox(
          "Лінійка:",
          line,
          setLine,
          (value) => value.trim() !== "",
          "Це поле не може бути порожнім"
        )}
        {DisplaySelectBox(
          "Операційна система:",
          availableOperatingSystems,
          preinstalledOS,
          setPreinstalledOS
        )}
        {DisplaySelectBox(
          "Розмір матриці:",
          availableScreenSizes,
          screenDiagonal,
          setScreenDiagonal
        )}
        {DisplaySelectBox(
          "Роздільна здатність:",
          availableResolutions,
          resolution,
          setResolution
        )}
        {DisplaySelectBox(
          "Тип матриці:",
          availableMatrixTypes,
          matrixType,
          setMatrixType
        )}
        {DisplayBox(
          "Датчик освітленості:",
          lightSensor,
          setLightSensor,
          () => true,
          ""
        )}
        {DisplaySelectBox("ОЗУ:", availableRAMOptions, memoryRAM, setMemoryRAM)}
        {DisplaySelectBox(
          "Вбудована пам'ять:",
          availableBuiltInMemoryOptions,
          builtInMemory,
          setBuiltInMemory
        )}
        {DisplaySelectBox(
          "Слот розширення пам'яті:",
          availableMemoryExpansionOptions,
          memoryExpansionSlot,
          setMemoryExpansionSlot
        )}
        {/*  availableTabletProcessors
availableProcessorFrequencies,
availableProcessorCores,
availableBatteryCapacities,
availableFrontCameras,
availableRearCameras,
availableWifiOptions,
available4GNetworkOptions, */}
        {DisplaySelectBox(
          "Процесор:",
          availableTabletProcessors,
          processor,
          setProcessor
        )}
        {DisplaySelectBox(
          "Частота процесора:",
          availableProcessorFrequencies,
          processorFrequency,
          setProcessorFrequency
        )}
        {DisplaySelectBox(
          "Кількість ядер процесора:",
          availableProcessorCores,
          processorCores,
          setProcessorCores
        )}
        {DisplayBox(
          "Вбудовані динаміки:",
          builtInSpeakers,
          setBuiltInSpeakers,
          () => true,
          ""
        )}

        {DisplaySelectBox(
          "Загальна ємність батареї:",
          availableBatteryCapacities,
          batteryCapacity,
          setBatteryCapacity
        )}
        {DisplaySelectBox(
          "Фронтальна камера:",
          availableFrontCameras,
          frontCamera,
          setFrontCamera
        )}
        {DisplaySelectBox(
          "Задня камера:",
          availableRearCameras,
          rearCamera,
          setRearCamera
        )}
        {DisplaySelectBox("Wi-Fi:", availableWifiOptions, wifi, setWifi)}
        {DisplaySelectBox(
          "Мережа 4G:",
          available4GNetworkOptions,
          cellularNetwork,
          setCellularNetwork
        )}
        {DisplayBox(
          "Голосовий зв'язок:",
          voiceCommunication,
          setVoiceCommunication,
          () => true,
          ""
        )}
        {DisplaySelectBox("GPS:", availableGPSTypes, gps, setGPS)}
        {DisplayBox("NFC:", nfc, setNFC, () => true, "")}
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
                  {availableExternalTabletPorts.map((item) => (
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
          "Колір корпусу:",
          availableBodyColors,
          bodyColor,
          setBodyColor
        )}
        {DisplaySelectBox(
          "Колір панелі передньої частини:",
          availableFrontPanelColors,
          frontPanelColor,
          setFrontPanelColor
        )}
        <Button
          variant="contained"
          sx={{ width: 300 }}
          color="warning"
          onClick={handleAddItem}
        >
          {editItemMode ? "Зберігти зміни" : "Додати товар"}
        </Button>
      </Box>
    </>
  );
}
