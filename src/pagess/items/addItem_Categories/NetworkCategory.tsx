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
  availableNetworkEquipmentBrands,
availableNetworkEquipmentTypes,
availableMaxSpeeds,
availablePowerSupplies,
availableColors,
availablePorts,
} from "../../../utils/accessories/networkAccessories";

export default function NetworkCategory(props: Category) {
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
    editItemMode ? itemCurrent.items.fields.brand : availableNetworkEquipmentBrands[0]
  );
  const [type, setType] = useState(
    editItemMode ? itemCurrent.items.fields.type : availableNetworkEquipmentTypes[0]
  );
  const [ports, setPorts] = useState(
    editItemMode ? itemCurrent.items.fields.ports : [availablePorts[0]]
  );
  const [maxSpeed, setMaxSpeed] = useState(
    editItemMode ? itemCurrent.items.fields.maxSpeed : availableMaxSpeeds[0]
  );
  const [powerSupply, setPowerSupply] = useState(
    editItemMode ? itemCurrent.items.fields.powerSupply : availablePowerSupplies[0]
  );
  const [rackMountable, setRackMountable] = useState(
    editItemMode ? itemCurrent.items.fields.rackMountable : false
  );
  const [poeSupport, setPoeSupport] = useState(
    editItemMode ? itemCurrent.items.fields.poeSupport : false
  );
  const [vpnSupport, setVpnSupport] = useState(
    editItemMode ? itemCurrent.items.fields.vpnSupport : false
  );
  const [firewall, setFirewall] = useState(
    editItemMode ? itemCurrent.items.fields.firewall : false
  );
  const [dimensions, setDimensions] = useState(
    editItemMode
      ? itemCurrent.items.fields.dimensions
      : { width: 0, height: 0, depth: 0 }
  );
  const [weight, setWeight] = useState(
    editItemMode ? itemCurrent.items.fields.weight : 0
  );
  const [color, setColor] = useState(
    editItemMode ? itemCurrent.items.fields.color : availableColors[0]
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

  const handleDimentionsChange = (
    index: "width" | "height" | "depth",
    event: any
  ) => {
    const newDimentions = { ...dimensions };
    console.log(event);
    newDimentions[index] = event;
    setDimensions(newDimentions);
  };

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
                  <InputAdornment position="start">Гр</InputAdornment>
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
                      ? parseFloat(event.target.value) <= 1000
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
              type,
              ports,
              maxSpeed,
              powerSupply,
              rackMountable,
              poeSupport,
              vpnSupport,
              firewall,
              dimensions,
              weight,
              color,
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
            type,
            ports,
            maxSpeed,
            powerSupply,
            rackMountable,
            poeSupport,
            vpnSupport,
            firewall,
            dimensions,
            weight,
            color,
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

  const handleAddPortsField = () => {
    setPorts([...ports, availablePorts[0]]);
  };

  const handleRemovePortsField = () => {
    if (ports.length > 1) {
      setPorts(ports.slice(0, ports.length - 1));
    }
  };

  const handlePortsChange = (index: any, event: any) => {
    const newPorts = [...ports];
    newPorts[index] = event.target.value;
    setPorts(newPorts);
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

        {DisplaySelectBox("Бренд:", availableNetworkEquipmentBrands, brand, setBrand)}

        {DisplaySelectBox("Тип:", availableNetworkEquipmentTypes, type, setType)}
        {DisplaySelectBox(
          "Постачання живлення:",
          availablePowerSupplies,
          powerSupply,
          setPowerSupply
        )}

        {DisplaySelectBox(
          "Максимальна швидкість:",
          availableMaxSpeeds,
          maxSpeed,
          setMaxSpeed
        )}

        {DisplayBox(
          "Монтаж у стійку:",
          rackMountable,
          setRackMountable,
          (value) => true,
          ""
        )}
        {DisplayBox(
          "Підтримка PoE:",
          poeSupport,
          setPoeSupport,
          (value) => true,
          ""
        )}
        {DisplayBox(
          "Підтримка VPN:",
          vpnSupport,
          setVpnSupport,
          (value) => true,
          ""
        )}
        {DisplayBox("Файервол:", firewall, setFirewall, (value) => true, "")}
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
                    <InputAdornment position="start">см</InputAdornment>
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
                    <InputAdornment position="start">см</InputAdornment>
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
                    <InputAdornment position="start">см</InputAdornment>
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

        {DisplayBox(
          "Вага:",
          weight,
          setWeight,
          (value) => parseFloat(value) > 0,
          "Введіть дійсне значення не менше 1"
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
            Порти:
          </Typography>
          <Box maxWidth={500} minWidth={500}>
            {ports.map((port: any, index: any) => (
              <FormControl fullWidth>
                <InputLabel id="processor-label">Поле</InputLabel>
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
                  {availablePorts.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ))}
            <IconButton onClick={handleAddPortsField}>
              <AddIcon />
            </IconButton>
            <IconButton onClick={handleRemovePortsField}>
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