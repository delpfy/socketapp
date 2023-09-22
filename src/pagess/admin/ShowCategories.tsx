import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Category } from "../../redux/types";
import {
  clearCurrentCategoryImages,
  setSecondProcess,
  setThirdProcess,
} from "../../redux/admin/adminSlice";
import { useEffect, useRef, useState } from "react";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  uploadCategoryImage,
  uploadSubcategoryImage,
} from "../../redux/admin/asyncActions";
import InfoDialog from "../../componentss/dialogs/InfoDialog";

export default function ShowCategories() {
  const {
    _categories,
    categoryImage,
    selectedCategory,
    subcategoryImage,
    second_process,
    third_process,
  } = useAppSelector((state) => state.admin);
  const [newCategory, setNewCategory] = useState({
    name: "",
    subcategories: [] as Category[],
  });

  const [newSubcategory, setNewSubcategory] = useState<any>({} as any);
  const [openInfo, setOpenInfo] = useState(false);
  const [infoMessage, setInfoMessage] = useState<string>("Some info");
  function InfoDialog_open() {
    setOpenInfo(true);
  }

  function InfoDialog_close() {
    setOpenInfo(false);
  }
  function handleEditCategory(categoryId: string) {
    dispatch(getCategoryById({ categoryId })).then((result: any) => {
      if (result.meta.requestStatus === "fulfilled") {
        dispatch(setSecondProcess("edit-category"));
        setNewCategory({
          ...newCategory,
          name: result.payload.name,
          subcategories: result.payload.subcategories,
        });
      }
    });
  }

  function handleEditSubcategory(subcategory: Category) {
    dispatch(setThirdProcess("edit-subcategory"));
    setNewSubcategory(subcategory);
  }

  function handleChangeNewCategory(e: any) {
    setNewCategory({
      ...newCategory,
      [e.target.name]: e.target.value,
    });
  }

  function handleChangeNewSubategory(e: any) {
    setNewSubcategory({
      ...newSubcategory,
      [e.target.name]: e.target.value,
    });
  }

  const categoryImageRef = useRef<HTMLInputElement | null>(null);
  const subcategoryImageRef = useRef<HTMLInputElement | null>(null);
  function handleImageChange(e: any) {
    console.log(e.target.files[0]);

    const formData = new FormData();
    for (let i = 0; i < e.target.files.length; i++) {
      formData.append("category_images", e.target.files[i]);
    }

    dispatch(uploadCategoryImage(formData));
  }

  function handleSubcategoryImageChange(e: any) {
    console.log(e.target.files[0]);

    const formData = new FormData();
    for (let i = 0; i < e.target.files.length; i++) {
      formData.append("category_images", e.target.files[i]);
    }

    dispatch(uploadSubcategoryImage(formData)).then((result: any) => {
      if (result.meta.requestStatus === "fulfilled") {
        setNewSubcategory({
          ...newSubcategory,
          image: result.payload.url,
        });
      }
    });
  }

  function handleLoadImageClick() {
    if (categoryImageRef.current) {
      categoryImageRef.current.click();
    }
  }

  function handleLoadSubcategoryImageClick() {
    if (subcategoryImageRef.current) {
      subcategoryImageRef.current.click();
    }
  }

  function handleAddCategory() {
    if (newCategory.name === "" || newCategory.name === undefined) {
      InfoDialog_open();
      setInfoMessage("Ви не вказали ім'я категорії");
      return;
    }
    if (categoryImage === "" || categoryImage === undefined) {
      InfoDialog_open();
      setInfoMessage("Ви не вказали зображення категорії");
      return;
    }
    switch (second_process) {
      case "add-category":
        dispatch(
          createCategory({
            categoryData: {
              name: newCategory.name,
              image: categoryImage,
              subcategories: newCategory.subcategories,
            },
          })
        ).then((result: any) => {
          if (result.meta.requestStatus === "fulfilled") {
            dispatch(setSecondProcess("none"));
            dispatch(getAllCategories());
          }
        });
        return;
      case "edit-category":
        dispatch(
          updateCategory({
            categoryId: selectedCategory._id,
            categoryData: {
              name: newCategory.name,
              image: categoryImage,
              subcategories: newCategory.subcategories,
            },
          })
        ).then((result: any) => {
          if (result.meta.requestStatus === "fulfilled") {
            dispatch(setSecondProcess("none"));
            dispatch(getAllCategories());
          }
        });
        return;
    }
  }

  function handleAddSubcategory() {
    console.log(newSubcategory.name);
    console.log(subcategoryImage);

    if (newSubcategory.name === "" || newSubcategory.name === undefined) {
      InfoDialog_open();
      setInfoMessage("Ви не вказали ім'я підкатегорії");
      return;
    }
    if (subcategoryImage === "" || subcategoryImage === undefined) {
      InfoDialog_open();
      setInfoMessage("Ви не вказали зображення підкатегорії");
      return;
    }
    switch (third_process) {
      case "add-subcategory":
        setNewCategory({
          ...newCategory,
          subcategories: [...newCategory.subcategories, newSubcategory],
        });
        return;
      case "edit-subcategory":
        const itemIndex = newCategory.subcategories.findIndex(
          (item: any) => item._id === newSubcategory._id
        );
        console.log(itemIndex);
        setNewCategory({
          ...newCategory,
          subcategories: [
            ...newCategory.subcategories.slice(0, itemIndex),

            newSubcategory,

            ...newCategory.subcategories.slice(itemIndex + 1),
          ],
        });
        return;
    }
  }
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <>
      <InfoDialog
        openInfo={openInfo}
        InfoDialog_close={InfoDialog_close}
        infoMessage={infoMessage}
      />
      <Button
        onClick={() =>
          dispatch(
            setSecondProcess(
              second_process === "add-category"
                ? "none"
                : second_process === "edit-category"
                ? "none"
                : "add-category"
            )
          )
        }
        variant="outlined"
        sx={{ margin: 5, marginLeft: 0, width: 200, justifySelf: "flex-start" }}
      >
        {" "}
        {second_process === "add-category" ? (
          <>Відмінити додавання</>
        ) : second_process === "edit-category" ? (
          <>Відмінити редагування</>
        ) : (
          <>Додати категорію</>
        )}{" "}
      </Button>

      {second_process === "add-category" ||
      second_process === "edit-category" ? (
        <>
          <Box padding={2} paddingLeft={0}>
            <Typography>Нова Категорія</Typography>
            <Box>
              <TextField
                label="Назва"
                id="outlined-size-small"
                size="small"
                value={newCategory.name}
                name="name"
                onChange={handleChangeNewCategory}
                sx={{ width: 300 }}
              />
            </Box>
            <Box>
              <Typography
                variant="h1"
                textAlign={"center"}
                fontSize={20}
                fontFamily={"Ubuntu"}
                width={300}
              >
                Зображення:
              </Typography>
              <Box maxWidth={500} padding={4}>
                {categoryImage !== undefined ? (
                  <img
                    src={`https://www.sidebyside-tech.com${categoryImage}`}
                    style={{ height: 60 }}
                    alt=""
                  />
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
                    ref={categoryImageRef}
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
                    onClick={() => dispatch(clearCurrentCategoryImages())}
                  >
                    Очистити
                  </Button>
                </Box>
              </Box>
              <Box>
                <Typography>Підкатегорії</Typography>
                <Button
                  onClick={() => dispatch(setThirdProcess("add-subcategory"))}
                  variant="outlined"
                  sx={{
                    margin: 5,
                    marginLeft: 0,
                    width: 200,
                    justifySelf: "flex-start",
                  }}
                >
                  Додати підкатегорію
                </Button>
              </Box>
              {third_process === "add-subcategory" ||
              third_process === "edit-subcategory" ? (
                <>
                  <Typography>Нова Підкатегорія</Typography>
                  <Box>
                    <TextField
                      label="Назва"
                      id="outlined-size-small"
                      size="small"
                      value={newSubcategory.name}
                      name="name"
                      onChange={handleChangeNewSubategory}
                      sx={{ width: 300 }}
                    />
                  </Box>
                  <Box>
                    <Typography
                      variant="h1"
                      textAlign={"center"}
                      fontSize={20}
                      fontFamily={"Ubuntu"}
                      width={300}
                    >
                      Зображення:
                    </Typography>
                    <Box maxWidth={500}>
                      {subcategoryImage !== undefined ? (
                        <img
                          src={`https://www.sidebyside-tech.com${newSubcategory.image}`}
                          style={{ height: 60 }}
                          alt=""
                        />
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
                          ref={subcategoryImageRef}
                          color="warning"
                          type="file"
                          multiple
                          onChange={handleSubcategoryImageChange}
                        />

                        <Button
                          color="warning"
                          variant="contained"
                          sx={{
                            fontFamily: "Comfortaa",
                            fontSize: 15,
                            marginTop: 6,
                          }}
                          onClick={handleLoadSubcategoryImageClick}
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
                          onClick={() => dispatch(clearCurrentCategoryImages())}
                        >
                          Очистити
                        </Button>
                      </Box>
                      <Button
                        onClick={handleAddSubcategory}
                        variant="outlined"
                        sx={{
                          margin: 5,
                          marginLeft: 0,
                          width: 200,
                          justifySelf: "flex-start",
                        }}
                      >
                        Підтвердити підкатегорію
                      </Button>
                    </Box>
                  </Box>
                </>
              ) : (
                <></>
              )}
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Назва підкатегорії</TableCell>
                      <TableCell>Зображення</TableCell>
                      <TableCell>Функції</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {newCategory.subcategories.map((category: Category) => (
                      <TableRow key={category._id}>
                        <TableCell>
                          <Typography>{category.name}</Typography>
                        </TableCell>
                        <TableCell>
                          <img
                            src={`https://www.sidebyside-tech.com${category.image}`}
                            alt={category.name}
                            style={{ width: 50, height: 50 }}
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={() =>
                              setNewCategory({
                                ...newCategory,
                                subcategories: newCategory.subcategories.filter(
                                  (item) => item.name !== category.name
                                ),
                              })
                            }
                          >
                            Видалити
                          </Button>
                          <Button
                            onClick={() => handleEditSubcategory(category)}
                          >
                            Редагувати
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            <Button
              onClick={handleAddCategory}
              variant="outlined"
              sx={{
                margin: 5,
                marginLeft: 0,
                width: 200,
                justifySelf: "flex-start",
              }}
            >
              Підтвердити категорію
            </Button>
          </Box>
        </>
      ) : (
        <></>
      )}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Назва категорії</TableCell>
              <TableCell>Зображення</TableCell>
              <TableCell>Функції</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {_categories.map((category) => (
              <TableRow key={category._id}>
                <TableCell>
                  <Typography>{category.name}</Typography>
                </TableCell>
                <TableCell>
                  <img
                    src={`https://www.sidebyside-tech.com${category.image}`}
                    alt={category.name}
                    style={{ height: 50 }}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() =>
                      dispatch(
                        deleteCategory({ categoryId: category._id })
                      ).then((result: any) => {
                        if (result.meta.requestStatus === "fulfilled") {
                          dispatch(getAllCategories());
                        }
                      })
                    }
                  >
                    Видалити
                  </Button>
                  <Button onClick={() => handleEditCategory(category._id)}>
                    Редагувати
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
