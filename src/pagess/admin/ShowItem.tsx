import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { getAttributesByCategory } from "../../redux/admin/asyncActions";
import { UploadItemImage, createItem } from "../../redux/home/asyncActions";
import InfoDialog from "../../componentss/dialogs/InfoDialog";
import { clearCurrentImages, setCurrentImages } from "../../redux/home/homeSlice";

export default function ShowItem() {
  const { itemCurrent, currentImages } = useAppSelector((state) => state.home);

  const { _attributes, _categories, process } = useAppSelector(
    (state) => state.admin
  );
  const [openInfo, setOpenInfo] = useState(false);
  const [infoMessage, setInfoMessage] = useState<string>("Some info");
  const [itemImages, setItemImages] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [attributeValues, setAttributeValues] = useState<any[]>(
    _attributes?.attributes ? _attributes?.attributes : []
  );
  const [newItem, setNewItem] = useState({
    Назва: process === "add-one-item" ? "" : itemCurrent.items.name,
    Опис: process === "add-one-item" ? "" : itemCurrent.items.description,
    Ціна: process === "add-one-item" ? "" : itemCurrent.items.price,
    Кількість: process === "add-one-item" ? "" : itemCurrent.items.quantity,
    Знижка: process === "add-one-item" ? "" : itemCurrent.items.sale,
    Атрибути: [],
  });

  const avatarFileRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();




  function handleImageChange(e: any) {
    try {
      const formData = new FormData();
      for (let i = 0; i < e.target.files.length; i++) {
        formData.append("item_images", e.target.files[i]);
      }

      dispatch(UploadItemImage(formData)).then((result: any) => {
        if (result.meta.requestStatus === "fulfilled") {
          result.payload.map((image: { url: string }) => {
            setItemImages((prev) => [...prev, image.url]);
          });
        }
      });
    } catch (error: any) {
      InfoDialog_open();
      setInfoMessage(error.message);
    }
  }
  function handleLoadImageClick() {
    if (avatarFileRef.current) {
      setItemImages([]);
      avatarFileRef.current.click();
    }
  }

  useEffect(() => {
    if(process === 'edit-one-item'){
        dispatch(setCurrentImages(itemCurrent.items.image))
    }
  }, [])
  
  useEffect(() => {
    if (selectedCategory || process === 'edit-one-item') {
      dispatch(
        getAttributesByCategory({
          category:
            selectedSubcategory === "" ? selectedCategory === "" ? itemCurrent.items.category : selectedCategory : selectedSubcategory,
        })
      );
    }
  }, [selectedCategory, selectedSubcategory, dispatch]);

  const handleCategoryChange = (event: any) => {
    const category = event.target.value;
    setSelectedCategory(category);
    setSelectedSubcategory("");
  };

  const handleSubcategoryChange = (event: any) => {
    const subcategory = event.target.value;
    setSelectedSubcategory(subcategory);
  };
  const handleAttributeChange = (event: any, index: number) => {
    const { name, value } = event.target;
    const attributeName = _attributes.attributes[index].name;

    const updatedAttributeValues = [...attributeValues];
    updatedAttributeValues[index] = {
      ...updatedAttributeValues[index],
      [attributeName]: value,
    };

    setAttributeValues(updatedAttributeValues);
  };

  function handleDefaultAttribChange(event: any) {
    setNewItem({
      ...newItem,
      [event.target.name]: event.target.value,
    });
  }

  function InfoDialog_open() {
    setOpenInfo(true);
  }

  function InfoDialog_close() {
    setOpenInfo(false);
  }

  function PushItemToDatabase(): void {
    dispatch(
      createItem({
        name: newItem.Назва,
        description: newItem.Опис,
        category:
          selectedSubcategory === "" ? selectedCategory : selectedSubcategory,
        sale: newItem.Знижка,
        price: newItem.Ціна,
        quantity: newItem.Кількість,
        image: itemImages,
        rating: 0,
        reviewsAmount: 0,
        fields: attributeValues,
      })
    ).then((result: any) => {
      if (result.meta.requestStatus === "fulfilled") {
        InfoDialog_open();
        setInfoMessage("Успішно додано");
      }
      if (result.meta.requestStatus === "rejected") {
        InfoDialog_open();
        setInfoMessage("Помилка >:[");
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
      {process === "add-one-item" ? (
        <>
          <Select
            value={selectedCategory}
            onChange={handleCategoryChange}
            label="Категорія"
          >
            {_categories.map((category) => (
              <MenuItem key={category._id} value={category.name}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
          {selectedCategory &&
          _categories.find((cat) => cat.name === selectedCategory)
            ?.subcategories.length !== 0 ? (
            <Select
              value={selectedSubcategory}
              onChange={handleSubcategoryChange}
              label="Підкатегория"
            >
              {_categories
                .find((cat) => cat.name === selectedCategory)
                ?.subcategories.map((subcategory: any) => (
                  <MenuItem key={subcategory._id} value={subcategory.name}>
                    {subcategory.name}
                  </MenuItem>
                ))}
            </Select>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}

      {_attributes.attributes !== undefined ? (
        _attributes?.attributes.length === 0 ? (
          <Typography marginTop={5} width={"100%"}>
            Ця категорія не має атрибутів
          </Typography>
        ) : (
          <Box marginTop={5} display={"flex"} flexDirection={"column"}>
            {(selectedCategory &&
              _categories.find((cat) => cat.name === selectedCategory)
                ?.subcategories.length === 0) ||
            (selectedCategory !== "" && selectedSubcategory !== "") ? (
              process === "add-one-item" ? (
                <>
                  <Box
                    width={500}
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
                          size="small"
                          sx={{
                            fontFamily: "Comfortaa",
                            fontSize: 15,
                            marginTop: 6,
                          }}
                          onClick={handleLoadImageClick}
                        >
                          Додати зображення
                        </Button>
                        <Button
                          color="error"
                          variant="contained"
                          size="small"
                          sx={{
                            fontFamily: "Comfortaa",
                            fontSize: 15,
                            marginTop: 6,
                          }}
                          onClick={() => {
                            setItemImages([]);
                            dispatch(clearCurrentImages());
                          }}
                        >
                          Очистити
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                  {Object.keys(newItem).map((key: any) =>
                    key === "Атрибути" ? (
                      <>
                        <Typography margin={3}>
                          Атрибути категорії{" "}
                          {selectedSubcategory === ""
                            ? selectedCategory
                            : selectedSubcategory}{" "}
                        </Typography>
                        <Box display={"flex"} flexDirection={"column"}>
                          {_attributes?.attributes.map(
                            (attr: { name: string; value: any }, index) => (
                              <Box
                                display={"flex"}
                                width={500}
                                justifyContent={"space-between"}
                                alignItems={"flex-end"}
                                flexDirection={"row"}
                              >
                                <Typography fontSize={20}>
                                  {" "}
                                  {attr.name} :{" "}
                                </Typography>
                                <TextField
                                  name="name"
                                  value={attributeValues[index]?.value}
                                  size="small"
                                  onChange={(e: any) =>
                                    handleAttributeChange(e, index)
                                  }
                                />
                              </Box>
                            )
                          )}
                        </Box>
                      </>
                    ) : (
                      <TextField
                        onChange={handleDefaultAttribChange}
                        name={key}
                        label={key}
                        sx={{ width: 300 }}
                        key={key}
                      >
                        {key}
                      </TextField>
                    )
                  )}
                  <Button
                    variant="outlined"
                    onClick={PushItemToDatabase}
                    sx={{ width: 300, marginTop: 5 }}
                  >
                    ДОДАТИ ТОВАР
                  </Button>
                </>
              ) : (
                <></>
              )
            ) : process === "edit-one-item" ? (
              <>
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
                        sx={{
                          fontFamily: "Comfortaa",
                          fontSize: 15,
                          marginTop: 6,
                        }}
                        onClick={handleLoadImageClick}
                      >
                        Додати зображення
                      </Button>
                      <Button
                        color="error"
                        variant="contained"
                        sx={{
                          fontFamily: "Comfortaa",
                          fontSize: 15,
                          marginTop: 6,
                        }}
                        onClick={() => dispatch(clearCurrentImages())}
                      >
                        Очистити
                      </Button>
                    </Box>
                  </Box>
                </Box>
                {Object.values(newItem).map((key: any, index: number) => (
                    key === "Атрибути" ? (
                        <>
                          <Typography margin={3}>
                            Атрибути категорії{" "}
                            {selectedSubcategory === ""
                              ? selectedCategory
                              : selectedSubcategory}{" "}
                          </Typography>
                          <Box display={"flex"} flexDirection={"column"}>
                            {_attributes?.attributes.map(
                              (attr: { name: string; value: any }, index) => (
                                <Box
                                  display={"flex"}
                                  width={500}
                                  justifyContent={"space-between"}
                                  alignItems={"flex-end"}
                                  flexDirection={"row"}
                                >
                                  <Typography fontSize={20}>
                                    {" "}
                                    {attr.name} :{" "}
                                  </Typography>
                                  <TextField
                                    name="name"
                                    value={attributeValues[index]?.value}
                                    size="small"
                                    onChange={(e: any) =>
                                      handleAttributeChange(e, index)
                                    }
                                  />
                                </Box>
                              )
                            )}
                          </Box>
                        </>
                      ) :
                  <TextField
                    label={Object.keys(newItem)[index]}
                    sx={{ width: 300 }}
                    key={Object.keys(newItem)[index]}
                    value={key}
                  />
                ))}
              </>
            ) : (
              <></>
            )}
          </Box>
        )
      ) : (
        <></>
      )}
    </>
  );
}
