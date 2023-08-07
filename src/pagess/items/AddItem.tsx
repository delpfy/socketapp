import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { createItem } from "../../redux/home/asyncActions";
import { useAppDispatch } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function AddItem() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("0");
  const [rating, setRating] = useState(0);
  const [images, setImages] = useState(["", "", ""]);
  const [sale, setSale] = useState("0");
  const [reviewsAmount, setReviewsAmount] = useState(0);

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
  function handleAddItem() {
    dispatch(
      createItem({
        name,
        category,
        description,
        price: parseInt(price),
        rating,
        image: images,
        sale: parseInt(sale),
        reviewsAmount,
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
            Назва :
          </Typography>
          <TextField
            fullWidth
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
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
            Категорія:
          </Typography>
          <TextField
            fullWidth
            value={category}
            onChange={(event) => {
              setCategory(event.target.value);
            }}
          />
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
            Опис:
          </Typography>
          <TextField
            multiline
            rows={6}
            fullWidth
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
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
            Ціна:
          </Typography>
          <TextField
            fullWidth
            value={price}
            onChange={(event) => {
              setPrice(event.target.value);
            }}
          />
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
            Знижка:
          </Typography>
          <TextField
            fullWidth
            value={sale}
            onChange={(event) => {
              setSale(event.target.value);
            }}
          />
        </Box>
        {/* ... Остальные текстовые поля ... */}
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
          <Box>
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
