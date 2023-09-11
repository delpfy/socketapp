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
  clearCurrentImages,
  setProcess,
  setSecondProcess,
  setThirdProcess,
} from "../../redux/admin/adminSlice";
import { useEffect, useRef, useState } from "react";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  uploadCategoryImage,
  uploadSubcategoryImage,
} from "../../redux/admin/asyncActions";

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
    name: second_process === "edit-category" ? selectedCategory.name : "",
    subcategories: second_process === "edit-category" ? selectedCategory.name : [] as Category[],
  });

  const [newSubcategory, setNewSubcategory] = useState<Category>(
    {} as Category
  );

  function handleEditCategory(categoryId: string){
    dispatch(setSecondProcess("edit-category"));
    dispatch(getCategoryById({categoryId}))
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
      }
    });
  }

  function handleAddSubcategory() {
    setNewCategory({
      ...newCategory,
      subcategories: [...newCategory.subcategories, newSubcategory],
    });
  }
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllCategories());
  }, [_categories, dispatch]);

  return (
    <>
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
          <Box padding={2}>
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
                    src={`http://localhost:4000${categoryImage}`}
                    style={{ width: 60, height: 60 }}
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
                    onClick={() => dispatch(clearCurrentImages())}
                  >
                    Очистити
                  </Button>
                </Box>
              </Box>
              <Box>
                <Typography>Підкатегорії</Typography>
                <Button
                  onClick={() => dispatch(setThirdProcess("add-subcategory"))}
                >
                  Додати підкатегорію
                </Button>
              </Box>
              {third_process === "add-subcategory" ? (
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
                    <Box maxWidth={500} padding={4}>
                      {subcategoryImage !== undefined ? (
                        <img
                          src={`http://localhost:4000${subcategoryImage}`}
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
                          onClick={() => dispatch(clearCurrentImages())}
                        >
                          Очистити
                        </Button>
                      </Box>
                      <Button onClick={handleAddSubcategory}>Готово</Button>
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
                      <TableRow>
                        <TableCell>
                          <Typography>{category.name}</Typography>
                        </TableCell>
                        <TableCell>
                          <img
                            src={`http://localhost:4000${category.image}`}
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
                            onClick={() =>
                              dispatch(
                                setSecondProcess(
                                  second_process === "add-category"
                                    ? "none"
                                    : "add-category"
                                )
                              )
                            }
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
            <Button onClick={handleAddCategory}>Готово</Button>
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
                    src={`http://localhost:4000${category.image}`}
                    alt={category.name}
                    style={{ width: 50, height: 50 }}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() =>
                      dispatch(deleteCategory({ categoryId: category._id }))
                    }
                  >
                    Видалити
                  </Button>
                  <Button
                    onClick={() => handleEditCategory(category._id)}
                  >
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
