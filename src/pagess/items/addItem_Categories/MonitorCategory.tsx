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
  availableMonitorBrands,
  availableScreenDiagonals,
  availableMonitorMatrixTypes,
  availableAspectRatio,
  availableMonitorResolutions,
  availableResponseTimes,
  availableViewingAngles,
  availableBacklightTypes,
  availableBrightnessLevels,
  availableContrastRatios,
  availableScreenCoatings,
  availableRefreshRates,
} from "../../../utils/accessories/monitorAccessories";

export default function MonitorCategory(props: Category) {
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

  // fields
  const [brand, setBrand] = useState(
    editItemMode ? itemCurrent.items.fields.brand : availableMonitorBrands[0]
  );
  const [screenDiagonal, setScreenDiagonal] = useState(
    editItemMode
      ? itemCurrent.items.fields.screenDiagonal
      : availableScreenDiagonals[0]
  );
  const [matrixType, setMatrixType] = useState(
    editItemMode
      ? itemCurrent.items.fields.matrixType
      : availableMonitorMatrixTypes[0]
  );
  const [aspectRatio, setAspectRatio] = useState(
    editItemMode
      ? itemCurrent.items.fields.aspectRatio
      : availableAspectRatio[0]
  );
  const [resolution, setResolution] = useState(
    editItemMode
      ? itemCurrent.items.fields.resolution
      : availableMonitorResolutions[0]
  );
  const [responseTime, setResponseTime] = useState(
    editItemMode
      ? itemCurrent.items.fields.responseTime
      : availableResponseTimes[0]
  );
  const [viewingAngles, setViewingAngles] = useState(
    editItemMode
      ? itemCurrent.items.fields.viewingAngles
      : availableViewingAngles[0]
  );
  const [backlightType, setBacklightType] = useState(
    editItemMode
      ? itemCurrent.items.fields.backlightType
      : availableBacklightTypes[0]
  );
  const [brightness, setBrightness] = useState(
    editItemMode
      ? itemCurrent.items.fields.brightness
      : availableBrightnessLevels[0]
  );
  const [contrastRatio, setContrastRatio] = useState(
    editItemMode
      ? itemCurrent.items.fields.contrastRatio
      : availableContrastRatios[0]
  );
  const [screenCoating, setScreenCoating] = useState(
    editItemMode
      ? itemCurrent.items.fields.screenCoating
      : availableScreenCoatings[0]
  );
  const [curvedScreen, setCurvedScreen] = useState(
    editItemMode ? itemCurrent.items.fields.curvedScreen : false
  );
  const [refreshRate, setRefreshRate] = useState(
    editItemMode
      ? itemCurrent.items.fields.refreshRate
      : availableRefreshRates[0]
  );

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
      price <= 0 ||
      quantity <= 0 ||
      sale < 0 ||
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
              screenDiagonal,
              matrixType,
              aspectRatio,
              resolution,
              responseTime,
              viewingAngles,
              backlightType,
              brightness,
              contrastRatio,
              screenCoating,
              curvedScreen,
              refreshRate,
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
            screenDiagonal,
            matrixType,
            aspectRatio,
            resolution,
            responseTime,
            viewingAngles,
            backlightType,
            brightness,
            contrastRatio,
            screenCoating,
            curvedScreen,
            refreshRate,
          })
        ).then((result) => {
          if (result.meta.requestStatus === "fulfilled") {
            navigate("/catalog");
          }
        });
  }

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

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
                error={imageUrl.length === 0 ? true : false}
                helperText={imageUrl.length === 0 ? "Вкажіть зображення" : ""}
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

        {DisplaySelectBox("Бренд:", availableMonitorBrands, brand, setBrand)}
        {DisplaySelectBox(
          "Діагональ екрану:",
          availableScreenDiagonals,
          screenDiagonal,
          setScreenDiagonal
        )}
        {DisplaySelectBox(
          "Тип матриці:",
          availableMonitorMatrixTypes,
          matrixType,
          setMatrixType
        )}
        {DisplaySelectBox(
          "Співвідношення сторін:",
          availableAspectRatio,
          aspectRatio,
          setAspectRatio
        )}
        {DisplaySelectBox(
          "Роздільна здатність:",
          availableMonitorResolutions,
          resolution,
          setResolution
        )}
        {DisplaySelectBox(
          "Час відгуку:",
          availableResponseTimes,
          responseTime,
          setResponseTime
        )}
        {DisplaySelectBox(
          "Кути огляду:",
          availableViewingAngles,
          viewingAngles,
          setViewingAngles
        )}
        {DisplaySelectBox(
          "Тип підсвічування:",
          availableBacklightTypes,
          backlightType,
          setBacklightType
        )}
        {DisplaySelectBox(
          "Яскравість:",
          availableBrightnessLevels,
          brightness,
          setBrightness
        )}
        {DisplaySelectBox(
          "Контрастність:",
          availableContrastRatios,
          contrastRatio,
          setContrastRatio
        )}
        {DisplaySelectBox(
          "Покриття екрану:",
          availableScreenCoatings,
          screenCoating,
          setScreenCoating
        )}
        {DisplayBox(
          "Зігнутий екран:",
          curvedScreen,
          setCurvedScreen,
          () => true,
          ""
        )}
        {DisplaySelectBox(
          "Частота оновлення:",
          availableRefreshRates,
          refreshRate,
          setRefreshRate
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
