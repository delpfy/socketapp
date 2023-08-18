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

export default function MonitorCategory(props: Category) {
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
  const [screenDiagonal, setScreenDiagonal] = useState(0);
  const [matrixType, setMatrixType] = useState("");
  const [aspectRatio, setAspectRatio] = useState("");
  const [resolution, setResolution] = useState("");
  const [responseTime, setResponseTime] = useState(0);
  const [viewingAngles, setViewingAngles] = useState("");
  const [backlightType, setBacklightType] = useState("");
  const [brightness, setBrightness] = useState(0);
  const [contrastRatio, setContrastRatio] = useState("");
  const [screenCoating, setScreenCoating] = useState("");
  const [curvedScreen, setCurvedScreen] = useState(false);
  const [refreshRate, setRefreshRate] = useState(0);

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
                console.log(value)
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
                console.log(value)
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
        {DisplayBox("Діагональ екрану:", screenDiagonal, setScreenDiagonal)}
        {DisplayBox("Тип матриці:", matrixType, setMatrixType)}
        {DisplayBox("Співвідношення сторін:", aspectRatio, setAspectRatio)}
        {DisplayBox("Роздільна здатність:", resolution, setResolution)}
        {DisplayBox("Час відгуку:", responseTime, setResponseTime)}
        {DisplayBox("Кути огляду:", viewingAngles, setViewingAngles)}
        {DisplayBox("Тип підсвічування:", backlightType, setBacklightType)}
        {DisplayBox("Яскравість:", brightness, setBrightness)}
        {DisplayBox("Контрастність:", contrastRatio, setContrastRatio)}
        {DisplayBox("Покриття екрану:", screenCoating, setScreenCoating)}
        {DisplayBox("Зігнутий екран:", curvedScreen, setCurvedScreen)}
        {DisplayBox("Частота оновлення:", refreshRate, setRefreshRate)}

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
