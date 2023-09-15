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
import {
  deleteItem,
  getAllItems,
  getItemById,
} from "../../redux/home/asyncActions";
import InfoDialog from "../../componentss/dialogs/InfoDialog";

export default function ShowItems() {
  const { itemsDisplay } = useAppSelector((state) => state.home);
  const [itemsOnScreen, setItemsOnScreen] = useState(itemsDisplay);
  const [openInfo, setOpenInfo] = useState(false);
  const [infoMessage, setInfoMessage] = useState<string>("Some info");
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
      <Button onClick={handleAddItem}>Додати товар</Button>
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
            {itemsDisplay?.items?.map((item: any) => (
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
                        src={`https://www.sidebyside-tech.com${image}`}
                        alt={item.name}
                        style={{ height: 50 }}
                      />
                    );
                  })}
                </TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.sale}</TableCell>
                <TableCell>
                  <Button onClick={() => selectItemToDelete(item._id, item)}>
                    Видалити
                  </Button>
                  <Button onClick={() => selectItemToEdit(item._id)}>
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
