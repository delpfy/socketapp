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
import React, {
  SetStateAction,
  Dispatch,
  useState,
  useRef,
  useEffect,
} from "react";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  UploadItemImage,
  createItem,
  updateItemFields,
} from "../../../redux/home/asyncActions";

import InfoDialog from "../../../componentss/dialogs/InfoDialog";
import {
  availableConnectorTypes,
  availableSupportedDevices,
  availableCompatibilities,
  availableMaterials,
  availableColors,
  availablePackagingContents,
  availableAdditionalFeatures,
  availableBrands,
  availableCableLengths,
} from "../../../utils/accessories/cabelAccessories";
import {
  clearCurrentImages,
  setCurrentImages,
} from "../../../redux/home/homeSlice";

export default function CabelsCategory(props: any) {
  const { editItemMode, itemCurrent, currentImages } = useAppSelector(
    (state) => state.home
  );

  const avatarFileRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (editItemMode) {
      dispatch(setCurrentImages(itemCurrent.items.image));
    } else {
      dispatch(clearCurrentImages());
    }
  }, []);
  function handleImageChange(e: any) {
    console.log(e.target.files[0]);
    try {
      const formData = new FormData();
      for (let i = 0; i < e.target.files.length; i++) {
        formData.append("item_images", e.target.files[i]);
      }
      console.log("e.target.files[0] " + e.target.files[0]);
      dispatch(UploadItemImage(formData));
    } catch (error: any) {
      InfoDialog_open();
      setInfoMessage(error.message);
    }
  }
  function handleLoadImageClick() {
    if (avatarFileRef.current) {
      avatarFileRef.current.click();
    }
  }

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

  const [sale, setSale] = useState(editItemMode ? itemCurrent.items.sale : 0);
  const [reviewsAmount] = useState(0);

  const [brand, setBrand] = useState(
    editItemMode ? itemCurrent.items.fields.brand : availableBrands[0]
  );

  const [connectorType, setConnectorType] = useState(
    editItemMode
      ? itemCurrent.items.fields.connectorType
      : availableConnectorTypes[0]
  );
  const [cableLength, setCableLength] = useState(
    editItemMode
      ? itemCurrent.items.fields.cableLength
      : availableCableLengths[0]
  );
  const [supportedDevices, setSupportedDevices] = useState(
    editItemMode
      ? itemCurrent.items.fields.supportedDevices
      : [availableSupportedDevices[0]]
  );
  const [compatibility, setCompatibility] = useState(
    editItemMode
      ? itemCurrent.items.fields.compatibility
      : availableCompatibilities[0]
  );
  const [material, setMaterial] = useState(
    editItemMode ? itemCurrent.items.fields.material : availableMaterials[0]
  );
  const [color, setColor] = useState(
    editItemMode ? itemCurrent.items.fields.color : availableColors[0]
  );
  const [packagingContents, setPackagingContents] = useState(
    editItemMode
      ? itemCurrent.items.fields.packagingContents
      : [availablePackagingContents[0]]
  );
  const [additionalFeatures, setAdditionalFeatures] = useState(
    editItemMode
      ? itemCurrent.items.fields.additionalFeatures
      : [availableAdditionalFeatures[0]]
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
      currentImages[0] === undefined ||
      currentImages[1] === undefined ||
      currentImages[2] === undefined
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
              image: currentImages,
              sale,
              reviewsAmount,
              brand,
              connectorType,
              cableLength,
              supportedDevices,
              compatibility,
              material,
              color,
              packagingContents,
              additionalFeatures,
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
            image: currentImages,
            sale,
            reviewsAmount,
            brand,
            connectorType,
            cableLength,
            supportedDevices,
            compatibility,
            material,
            color,
            packagingContents,
            additionalFeatures,
          })
        ).then((result) => {
          if (result.meta.requestStatus === "fulfilled") {
            dispatch(clearCurrentImages());
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

  const handleAddSupDeviceField = () => {
    setSupportedDevices([...supportedDevices, availableSupportedDevices[0]]);
  };
  const handleAddFeatureField = () => {
    setAdditionalFeatures([
      ...additionalFeatures,
      availableAdditionalFeatures[0],
    ]);
  };
  const handleAddContentField = () => {
    setPackagingContents([...packagingContents, availablePackagingContents[0]]);
  };

  const handleRemoveSupDeviceField = () => {
    if (supportedDevices.length > 1) {
      setSupportedDevices(
        supportedDevices.slice(0, supportedDevices.length - 1)
      );
    }
  };
  const handleRemoveFeatureField = () => {
    if (additionalFeatures.length > 1) {
      setAdditionalFeatures(
        additionalFeatures.slice(0, additionalFeatures.length - 1)
      );
    }
  };
  const handleRemoveContentField = () => {
    if (packagingContents.length > 1) {
      setPackagingContents(
        packagingContents.slice(0, packagingContents.length - 1)
      );
    }
  };

  const handleSupDeviceChange = (index: any, event: any) => {
    const newPorts = [...supportedDevices];
    newPorts[index] = event.target.value;
    setSupportedDevices(newPorts);
  };
  const handleFeatureChange = (index: any, event: any) => {
    const newPorts = [...additionalFeatures];
    newPorts[index] = event.target.value;
    setAdditionalFeatures(newPorts);
  };
  const handleContentChange = (index: any, event: any) => {
    const newPorts = [...packagingContents];
    newPorts[index] = event.target.value;
    setPackagingContents(newPorts);
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
          <Box maxWidth={500} padding={4}>
            {currentImages.length !== 0 ? (
              currentImages.map((image: any) => (
                <img
                  src={`http://localhost:4000${image}`}
                  style={{ width: 60, height: 60 }}
                  alt=""
                />
              ))
            ) : (
              <></>
            )}
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"space-evenly"}
              alignItems={"flex-end"}
            >
              <input
                hidden
                ref={avatarFileRef}
                color="warning"
                type="file"
                multiple
                onChange={handleImageChange}
              />

              <Button
                color="warning"
                variant="contained"
                sx={{ fontFamily: "Comfortaa", fontSize: 15, marginTop: 6 }}
                onClick={handleLoadImageClick}
              >
                Додати зображення
              </Button>
              <Button
                color="error"
                variant="contained"
                sx={{ fontFamily: "Comfortaa", fontSize: 15, marginTop: 6 }}
                onClick={() => dispatch(clearCurrentImages())}
              >
                Очистити
              </Button>
            </Box>
          </Box>
        </Box>

        {DisplaySelectBox("Бренд:", availableBrands, brand, setBrand)}

        {DisplaySelectBox(
          "Тип роз'єму:",
          availableConnectorTypes,
          connectorType,
          setConnectorType
        )}
        {DisplaySelectBox(
          "Довжина кабелю:",
          availableCableLengths,
          cableLength,
          setCableLength
        )}

        {DisplaySelectBox(
          "Сумісність:",
          availableCompatibilities,
          compatibility,
          setCompatibility
        )}

        {DisplaySelectBox(
          "Матеріал:",
          availableMaterials,
          material,
          setMaterial
        )}
        {DisplaySelectBox("Колір:", availableColors, color, setColor)}

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
            Вміст упаковки:
          </Typography>
          <Box maxWidth={500} minWidth={500}>
            {packagingContents.map((port: any, index: any) => (
              <FormControl fullWidth>
                <InputLabel id="processor-label">Поле</InputLabel>
                <Select
                  labelId="processor-label"
                  id="processor-select"
                  value={port}
                  onChange={(event) => handleContentChange(index, event)}
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
                  {availablePackagingContents.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ))}
            <IconButton onClick={handleAddContentField}>
              <AddIcon />
            </IconButton>
            <IconButton onClick={handleRemoveContentField}>
              <RemoveIcon />
            </IconButton>
          </Box>
        </Box>

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
            Додаткові функції:
          </Typography>
          <Box maxWidth={500} minWidth={500}>
            {additionalFeatures.map((port: any, index: any) => (
              <FormControl fullWidth>
                <InputLabel id="processor-label">Функція</InputLabel>
                <Select
                  labelId="processor-label"
                  id="processor-select"
                  value={port}
                  onChange={(event) => handleFeatureChange(index, event)}
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
                  {availableAdditionalFeatures.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ))}
            <IconButton onClick={handleAddFeatureField}>
              <AddIcon />
            </IconButton>
            <IconButton onClick={handleRemoveFeatureField}>
              <RemoveIcon />
            </IconButton>
          </Box>
        </Box>

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
            Підтримувані пристрої:
          </Typography>
          <Box maxWidth={500} minWidth={500}>
            {supportedDevices.map((port: any, index: any) => (
              <FormControl fullWidth>
                <InputLabel id="processor-label">Пристрій</InputLabel>
                <Select
                  labelId="processor-label"
                  id="processor-select"
                  value={port}
                  onChange={(event) => handleSupDeviceChange(index, event)}
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
                  {availableSupportedDevices.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ))}
            <IconButton onClick={handleAddSupDeviceField}>
              <AddIcon />
            </IconButton>
            <IconButton onClick={handleRemoveSupDeviceField}>
              <RemoveIcon />
            </IconButton>
          </Box>
        </Box>

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
