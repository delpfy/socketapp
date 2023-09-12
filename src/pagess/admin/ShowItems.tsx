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
  updateCategory,
  uploadCategoryImage,
  uploadSubcategoryImage,
} from "../../redux/admin/asyncActions";

export default function ShowItems() {
  const {
    _categories,
    categoryImage,
    selectedCategory,
    subcategoryImage,
    second_process,
    third_process,
  } = useAppSelector((state) => state.admin);
  const {
    itemsDisplay
  } = useAppSelector((state) => state.home);
  const [newCategory, setNewCategory] = useState({
    name: "",
    subcategories: [] as Category[],
  });

  const [newSubcategory, setNewSubcategory] = useState<any>(
    {} as any
  );

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

  function handleEditSubcategory(subcategory: Category){
    dispatch(setThirdProcess("edit-subcategory"))
    setNewSubcategory(subcategory)
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
    console.log(third_process)
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
        console.log(itemIndex)
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
  

  return (
    <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Назва товару</TableCell>
          <TableCell>Зображення</TableCell>
          <TableCell>Категорія</TableCell>
          <TableCell>Ціна</TableCell>
          <TableCell>Знижка</TableCell>
          <TableCell>Функції</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {itemsDisplay.items.map((item) => (
          <TableRow >
            <TableCell>
              <Typography width={200} overflow={"hidden"} >{item.name}</Typography>
            </TableCell>
            <TableCell>
              {
                item.image.map((image: string) => {
                  return <img
                  src={`http://localhost:4000${image}`}
                  alt={item.name}
                  style={{ height: 50 }}
                />
                })
              }
                  
                </TableCell>
                <TableCell>
                  {item.category}
                </TableCell>
                <TableCell>
                  {item.price}
                </TableCell>
                <TableCell>
                  {item.sale}
                </TableCell>
            <TableCell>
              <Button
               >
                Видалити
              </Button>
              <Button >
                Редагувати
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  );
}
