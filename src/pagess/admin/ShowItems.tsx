import {
  Box,
  Button,
  MenuItem,
  Paper,
  Select,
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
import { setProcess } from "../../redux/admin/adminSlice";
import { useEffect, useRef, useState } from "react";
import {
  deleteItem,
  getAllItems,
  getItemById,
  getItemsByCategory,
} from "../../redux/home/asyncActions";
import InfoDialog from "../../componentss/dialogs/InfoDialog";
import SearchReviewsByItems from "../../componentss/menuu/search/SearchReviewsByItems";

export default function ShowItems() {
  const { itemsDisplay, itemsCategory } = useAppSelector((state) => state.home);
  const { _categories } = useAppSelector((state) => state.admin);
  const [openInfo, setOpenInfo] = useState(false);
  const [infoMessage, setInfoMessage] = useState<string>("Some info");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const handleSubcategoryChange = (event: any) => {
    const subcategory = event.target.value;
    setSelectedSubcategory(subcategory);
  };
  const handleCategoryChange = (event: any) => {
    const category = event.target.value;
    setSelectedCategory(category);
    dispatch(getItemsByCategory(category));
  };
  function InfoDialog_open() {
    setOpenInfo(true);
  }

  function InfoDialog_close() {
    setOpenInfo(false);
  }

  const dispatch = useAppDispatch();

  function selectItemToEdit(itemId: any) {
    dispatch(getItemById(itemId)).then((result: any) => {
      if (result.meta.requestStatus === "fulfilled") {
        dispatch(setProcess("edit-one-item"));
      }
    });
  }
  function selectItemToDelete(itemId: any, item: any) {
    console.log(item);
    console.log(itemId);
    dispatch(deleteItem({ itemId: itemId })).then((result: any) => {
      if (result.meta.requestStatus === "fulfilled") {
        InfoDialog_open();
        setInfoMessage("Успішно видалено");
        dispatch(getAllItems());
      }
      if (result.meta.requestStatus === "rejected") {
        InfoDialog_open();
        setInfoMessage("Не успішно видалено");
        dispatch(getAllItems());
      }
    });
  }

  function handleAddItem() {
    dispatch(setProcess("add-one-item"));
  }

  return (
    <>
      <InfoDialog
        openInfo={openInfo}
        InfoDialog_close={InfoDialog_close}
        infoMessage={infoMessage}
      />
      <SearchReviewsByItems />
      <Select
        value={selectedCategory}
        onChange={handleCategoryChange}
        label="Категорія"
        sx={{ width: 500 }}
      >
        {_categories.map((category) => (
          <MenuItem key={category._id} value={category.name}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
      {selectedCategory &&
      _categories.find((cat) => cat.name === selectedCategory)?.subcategories
        .length !== 0 ? (
        <Select
          value={selectedSubcategory}
          onChange={handleSubcategoryChange}
          label="Підкатегория"
          sx={{ width: 500 }}
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

      <Button
        onClick={handleAddItem}
        variant="outlined"
        sx={{ margin: 5, marginLeft: 0, width: 200, justifySelf: "flex-start" }}
      >
        Додати товар
      </Button>
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
            {itemsCategory?.items?.length === 0 ? (
              <Typography>Товарів з цієї категорії ще немає</Typography>
            ) : (
              itemsCategory?.items?.map((item: any) => (
                <TableRow>
                  <TableCell>
                    <Typography width={200} overflow={"hidden"}>
                      {item.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {item.image.map((image: string) => {
                      return (
                        <img
                          src={`https://socket-express-bssu.onrender.com${image}`}
                          alt={item.name}
                          style={{ height: 50 }}
                        />
                      );
                    })}
                  </TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.sale} %</TableCell>
                  <TableCell>
                    <Button onClick={() => selectItemToDelete(item._id, item)}>
                      Видалити
                    </Button>
                    <Button onClick={() => selectItemToEdit(item._id)}>
                      Редагувати
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
