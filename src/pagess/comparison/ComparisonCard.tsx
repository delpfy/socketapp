import * as React from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  IconButton,
  Paper,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ScaleIcon from "@mui/icons-material/Scale";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { TShippingItems, Items } from "../../redux/types";
import { synchronizeBasket } from "../../redux/basket/basketSlice";
import { useNavigate } from "react-router-dom";
import { getItemReviews } from "../../redux/review/asyncActions";
import {
  checkItemById,
  deleteItem,
  getItemById,
  getItemsByCategory,
} from "../../redux/home/asyncActions";

import { useState } from "react";
import {
  setEditItemMode,
  setSearchedId,
  synchronizeComparison,
  synchronizeFavorites,
} from "../../redux/home/homeSlice";
import InfoDialog from "../../componentss/dialogs/InfoDialog";

export default function ComparisonCard(props: Items) {
  const { user } = useAppSelector((state) => state.user);
  const { differencesMode, itemsComparison, itemAppendingId } = useAppSelector(
    (state) => state.home
  );

  const [openInfo, setOpenInfo] = useState(false);
  const [infoMessage, setInfoMessage] = useState<string>("Some info");
  function InfoDialog_open() {
    setOpenInfo(true);
  }

  function InfoDialog_close() {
    dispatch(synchronizeBasket());
    dispatch(synchronizeFavorites());
    dispatch(synchronizeComparison());
    setOpenInfo(false);
  }
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function compareObjects(obj1: any, obj2: any) {
    for (const key in obj1) {
      if (obj1.hasOwnProperty(key)) {
        if (obj1[key] !== obj2[key]) {
          obj2[key] = obj1[key];
        }
      }
    }

    for (const key in obj2) {
      if (obj2.hasOwnProperty(key) && !obj1.hasOwnProperty(key)) {
        delete obj2[key];
      }
    }
  }

  function setAsRecentlyReviewed() {
    const recentlyReviewed = JSON.parse(
      localStorage.getItem("recentlyReviewed") || "{}"
    );

    if (recentlyReviewed !== undefined) {
      const itemIndex = recentlyReviewed.findIndex(
        (item: Items) => item.name === props.name
      );

      if (itemIndex === -1) {
        recentlyReviewed.push(props);
      } else {
        compareObjects(props, recentlyReviewed[itemIndex]);
      }
      localStorage.setItem(
        "recentlyReviewed",
        JSON.stringify(recentlyReviewed)
      );
    }
  }

  function getCurrentItem() {
    dispatch(getItemById(props._id)).then((result: any) => {
      if (result.meta.requestStatus === "fulfilled") {
        dispatch(getItemReviews(props._id)).then((result: any) => {
          if (result.meta.requestStatus === "fulfilled") {
            navigate("/catalog/item");
            setAsRecentlyReviewed();
          }
        });
      }

      if (result.meta.requestStatus === "rejected") {
        setInfoMessage("Такого товару вже нема");
        InfoDialog_open();
        const recentlyReviewed = JSON.parse(
          localStorage.getItem("recentlyReviewed") || "{}"
        );
        const basketItems = JSON.parse(
          localStorage.getItem("basketItems") || "{}"
        );
        localStorage.setItem(
          "recentlyReviewed",
          JSON.stringify(
            recentlyReviewed.filter((item: any) => item._id !== props._id)
          )
        );
        localStorage.setItem(
          "basketItems",
          JSON.stringify(
            basketItems.filter((item: any) => item._id !== props._id)
          )
        );
      }
    });
  }

  function adjustPrice(item: any) {
    if (item.sale === 0) {
      return item.price;
    } else {
      return item.price - Math.round((item.price * item.sale) / 100);
    }
  }
  const font = {
    fontFamily: "Ubuntu",
  };

  const LaptopTable = ({ item }: { item: any }) => {
    const uniqueItemsInCategory = itemsComparison.filter(
      (otherItem: any) =>
        otherItem !== item && item.category === otherItem.category
    );

    const fieldsAreUnique = (item: any, fieldItem: string) => {
      const diffResults = uniqueItemsInCategory.map((uniqueItem: any) => {
        if (fieldItem === "dimensions") {
          return Object.keys(item.fields).some(
            (field) =>
              item.fields[fieldItem].width === uniqueItem.fields[field].width ||
              item.fields[fieldItem].height ===
                uniqueItem.fields[field].height ||
              item.fields[fieldItem].depth === uniqueItem.fields[field].depth
          );
        }
        if (fieldItem === "externalPorts") {
          return Object.keys(item.fields).some((field) => {
            if (
              item.fields[fieldItem].findIndex(
                (port: any, index: number) =>
                  port === uniqueItem.fields[fieldItem][index]
              ) === -1
            ) {
              return false;
            } else {
              return true;
            }
          });
        } else {
          return Object.keys(item.fields).some(
            (field) => item.fields[fieldItem] === uniqueItem.fields[fieldItem]
          );
        }
      });

      for (const unique of diffResults) {
        if (!unique) {
          return false;
        }
      }
      return true;
    };

    return (
      <TableContainer
        component={Paper}
        sx={{ width: "100%", alignSelf: "center", paddingBottom: 4 }}
      >
        <Table>
          <TableBody>
            <TableRow>
              <TableCell style={font}>Процесор:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "processor")
                  ? item.fields.processor
                  : differencesMode
                  ? "-"
                  : item.fields.processor}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell style={font}>Бренд:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "brand")
                  ? item.fields.brand
                  : differencesMode
                  ? "-"
                  : item.fields.brand}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Серія:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "series")
                  ? item.fields.series
                  : differencesMode
                  ? "-"
                  : item.fields.series}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Конструкція:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "construction")
                  ? item.fields.construction
                  : differencesMode
                  ? "-"
                  : item.fields.construction}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Операційна система:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "operatingSystem")
                  ? item.fields.operatingSystem
                  : differencesMode
                  ? "-"
                  : item.fields.operatingSystem}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Діагональ екрану:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "screenDiagonal")
                  ? item.fields.screenDiagonal
                  : differencesMode
                  ? "-"
                  : item.fields.screenDiagonal}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Тип матриці:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "matrixType")
                  ? item.fields.matrixType
                  : differencesMode
                  ? "-"
                  : item.fields.matrixType}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Тип покриття:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "coatingType")
                  ? item.fields.coatingType
                  : differencesMode
                  ? "-"
                  : item.fields.coatingType}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Роздільна здатність:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "resolution")
                  ? item.fields.resolution
                  : differencesMode
                  ? "-"
                  : item.fields.resolution}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Сенсорний екран:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "touchScreen")
                  ? item.fields.touchScreen
                    ? "Так"
                    : "Ні"
                  : differencesMode
                  ? "-"
                  : item.fields.touchScreen
                  ? "Так"
                  : "Ні"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Частота оновлення:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "refreshRate")
                  ? item.fields.refreshRate
                  : differencesMode
                  ? "-"
                  : item.fields.refreshRate}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Яскравість:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "brightness")
                  ? item.fields.brightness
                  : differencesMode
                  ? "-"
                  : item.fields.brightness}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Інші характеристики дисплея:</TableCell>
              <TableCell>
                {differencesMode &&
                !fieldsAreUnique(item, "otherDisplayFeatures")
                  ? item.fields.otherDisplayFeatures
                  : differencesMode
                  ? "-"
                  : item.fields.otherDisplayFeatures}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>ОЗУ:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "RAM")
                  ? item.fields.RAM
                  : differencesMode
                  ? "-"
                  : item.fields.RAM}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Максимальний об'єм ОЗУ:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "maxRAM")
                  ? item.fields.maxRAM
                  : differencesMode
                  ? "-"
                  : item.fields.maxRAM}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Тип накопичувача:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "storageType")
                  ? item.fields.storageType
                  : differencesMode
                  ? "-"
                  : item.fields.storageType}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Об'єм накопичувача:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "storageCapacity")
                  ? item.fields.storageCapacity
                  : differencesMode
                  ? "-"
                  : item.fields.storageCapacity}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Оптичний привід:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "opticalDrive")
                  ? item.fields.opticalDrive
                    ? "Так"
                    : "Ні"
                  : differencesMode
                  ? "-"
                  : item.fields.opticalDrive
                  ? "Так"
                  : "Ні"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Графічний адаптер:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "gpuAdapter")
                  ? item.fields.gpuAdapter
                    ? "Так"
                    : "Ні"
                  : differencesMode
                  ? "-"
                  : item.fields.gpuAdapter
                  ? "Так"
                  : "Ні"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Зовнішні порти:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "externalPorts")
                  ? item.fields.externalPorts
                  : differencesMode
                  ? "-"
                  : item.fields.externalPorts}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Ридер карток:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "cardReader")
                  ? item.fields.cardReader
                    ? "Так"
                    : "Ні"
                  : differencesMode
                  ? "-"
                  : item.fields.cardReader
                  ? "Так"
                  : "Ні"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Веб-камера:</TableCell>

              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "webcam")
                  ? item.fields.webcam
                    ? "Так"
                    : "Ні"
                  : differencesMode
                  ? "-"
                  : item.fields.webcam
                  ? "Так"
                  : "Ні"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Підсвітка клавіатури:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "keyboardBacklight")
                  ? item.fields.keyboardBacklight
                    ? "Так"
                    : "Ні"
                  : differencesMode
                  ? "-"
                  : item.fields.keyboardBacklight
                  ? "Так"
                  : "Ні"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Пасивне охолодження:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "passiveCooling")
                  ? item.fields.passiveCooling
                    ? "Так"
                    : "Ні"
                  : differencesMode
                  ? "-"
                  : item.fields.passiveCooling
                  ? "Так"
                  : "Ні"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Сканер відбитків пальців:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "fingerprintScanner")
                  ? item.fields.fingerprintScanner
                    ? "Так"
                    : "Ні"
                  : differencesMode
                  ? "-"
                  : item.fields.fingerprintScanner
                  ? "Так"
                  : "Ні"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Цифрова клавіатура:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "numericKeypad")
                  ? item.fields.numericKeypad
                    ? "Так"
                    : "Ні"
                  : differencesMode
                  ? "-"
                  : item.fields.numericKeypad
                  ? "Так"
                  : "Ні"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Сертифікація Intel Evo:</TableCell>
              <TableCell>
                {differencesMode &&
                !fieldsAreUnique(item, "intelEvoCertification")
                  ? item.fields.intelEvoCertification
                    ? "Так"
                    : "Ні"
                  : differencesMode
                  ? "-"
                  : item.fields.intelEvoCertification
                  ? "Так"
                  : "Ні"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Адаптер Ethernet:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "ethernetAdapter")
                  ? item.fields.ethernetAdapter
                    ? "Так"
                    : "Ні"
                  : differencesMode
                  ? "-"
                  : item.fields.ethernetAdapter
                  ? "Так"
                  : "Ні"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Wi-Fi:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "wifi")
                  ? item.fields.wifi
                  : differencesMode
                  ? "-"
                  : item.fields.wifi}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Bluetooth:</TableCell>

              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "bluetooth")
                  ? item.fields.bluetooth
                  : differencesMode
                  ? "-"
                  : item.fields.bluetooth}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Вага:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "weight")
                  ? item.fields.weight
                  : differencesMode
                  ? "-"
                  : item.fields.weight}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Розміри:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "dimensions")
                  ? item.fields.dimensions.width +
                    " x " +
                    item.fields.dimensions.height +
                    " x " +
                    item.fields.dimensions.depth
                  : differencesMode
                  ? "-"
                  : item.fields.dimensions.width +
                    " x " +
                    item.fields.dimensions.height +
                    " x " +
                    item.fields.dimensions.depth}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Матеріал корпусу:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "bodyMaterial")
                  ? item.fields.bodyMaterial
                  : differencesMode
                  ? "-"
                  : item.fields.bodyMaterial}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Колір кришки:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "lidColor")
                  ? item.fields.lidColor
                  : differencesMode
                  ? "-"
                  : item.fields.lidColor}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Колір корпусу:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "bodyColor")
                  ? item.fields.bodyColor
                  : differencesMode
                  ? "-"
                  : item.fields.bodyColor}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Робустний ноутбук:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "ruggedLaptop")
                  ? item.fields.ruggedLaptop
                    ? "Так"
                    : "Ні"
                  : differencesMode
                  ? "-"
                  : item.fields.ruggedLaptop
                  ? "Так"
                  : "Ні"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const CabelsTable = ({ item }: { item: any }) => {
    const uniqueItemsInCategory = itemsComparison.filter(
      (otherItem: any) =>
        otherItem !== item && item.category === otherItem.category
    );

    const fieldsAreUnique = (item: any, fieldItem: string) => {
      const diffResults = uniqueItemsInCategory.map((uniqueItem: any) => {
        if (
          fieldItem === "supportedDevices" ||
          fieldItem === "packagingContents" ||
          fieldItem === "additionalFeatures"
        ) {
          return Object.keys(item.fields).some((field) => {
            if (
              item.fields[fieldItem].findIndex(
                (port: any, index: number) =>
                  port === uniqueItem.fields[fieldItem][index]
              ) === -1
            ) {
              return false;
            } else {
              return true;
            }
          });
        } else {
          return Object.keys(item.fields).some(
            (field) => item.fields[fieldItem] === uniqueItem.fields[fieldItem]
          );
        }
      });

      for (const unique of diffResults) {
        if (!unique) {
          return false;
        }
      }
      return true;
    };
    return (
      <TableContainer
        component={Paper}
        sx={{ width: "100%", alignSelf: "center", paddingBottom: 4 }}
      >
        <Table>
          <TableBody>
            <TableRow>
              <TableCell style={font}>Бренд:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "brand")
                  ? item.fields.brand
                  : differencesMode
                  ? "-"
                  : item.fields.brand}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Тип роз'єму:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "connectorType")
                  ? item.fields.connectorType
                  : differencesMode
                  ? "-"
                  : item.fields.connectorType}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Довжина кабелю:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "cableLength")
                  ? item.fields.cableLength
                  : differencesMode
                  ? "-"
                  : item.fields.cableLength}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Підтримувані пристрої::</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "supportedDevices")
                  ? item.fields.supportedDevices
                  : differencesMode
                  ? "-"
                  : item.fields.supportedDevices}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Сумісність:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "compatibility")
                  ? item.fields.compatibility
                  : differencesMode
                  ? "-"
                  : item.fields.compatibility}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Матеріал:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "material")
                  ? item.fields.material
                  : differencesMode
                  ? "-"
                  : item.fields.material}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Колір:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "color")
                  ? item.fields.color
                  : differencesMode
                  ? "-"
                  : item.fields.color}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Додаткові функції:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "additionalFeatures")
                  ? item.fields.additionalFeatures
                  : differencesMode
                  ? "-"
                  : item.fields.additionalFeatures}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Вміст упаковки:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "packagingContents")
                  ? item.fields.packagingContents
                  : differencesMode
                  ? "-"
                  : item.fields.packagingContents}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const ElectronicsTable = ({ item }: { item: any }) => {
    const uniqueItemsInCategory = itemsComparison.filter(
      (otherItem: any) =>
        otherItem !== item && item.category === otherItem.category
    );

    const fieldsAreUnique = (item: any, fieldItem: string) => {
      const diffResults = uniqueItemsInCategory.map((uniqueItem: any) => {
        if (fieldItem === "dimensions") {
          return Object.keys(item.fields).some(
            (field) =>
              item.fields[fieldItem].width === uniqueItem.fields[field].width ||
              item.fields[fieldItem].height ===
                uniqueItem.fields[field].height ||
              item.fields[fieldItem].depth === uniqueItem.fields[field].depth
          );
        }
        if (fieldItem === "features") {
          return Object.keys(item.fields).some((field) => {
            if (
              item.fields[fieldItem].findIndex(
                (port: any, index: number) =>
                  port === uniqueItem.fields[fieldItem][index]
              ) === -1
            ) {
              return false;
            } else {
              return true;
            }
          });
        } else {
          return Object.keys(item.fields).some(
            (field) => item.fields[fieldItem] === uniqueItem.fields[fieldItem]
          );
        }
      });

      for (const unique of diffResults) {
        if (!unique) {
          return false;
        }
      }
      return true;
    };
    return (
      <TableContainer
        component={Paper}
        sx={{ width: "100%", alignSelf: "center", paddingBottom: 4 }}
      >
        <Table>
          <TableBody>
            <TableRow>
              <TableCell style={font}>Бренд:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "brand")
                  ? item.fields.brand
                  : differencesMode
                  ? "-"
                  : item.fields.brand}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Тип:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "type")
                  ? item.fields.type
                  : differencesMode
                  ? "-"
                  : item.fields.type}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Сумісність:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "compatibility")
                  ? item.fields.compatibility
                  : differencesMode
                  ? "-"
                  : item.fields.compatibility}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Бездротовий:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "wireless")
                  ? item.fields.wireless
                    ? "Так"
                    : "Ні"
                  : differencesMode
                  ? "-"
                  : item.fields.wireless
                  ? "Так"
                  : "Ні"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Колір:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "color")
                  ? item.fields.color
                  : differencesMode
                  ? "-"
                  : item.fields.color}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell style={font}>Матеріал:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "material")
                  ? item.fields.material
                  : differencesMode
                  ? "-"
                  : item.fields.material}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Особливості:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "features")
                  ? item.fields.features
                  : differencesMode
                  ? "-"
                  : item.fields.features}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Розміри:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "dimensions")
                  ? item.fields.dimensions.width +
                    " x " +
                    item.fields.dimensions.height +
                    " x " +
                    item.fields.dimensions.depth
                  : differencesMode
                  ? "-"
                  : item.fields.dimensions.width +
                    " x " +
                    item.fields.dimensions.height +
                    " x " +
                    item.fields.dimensions.depth}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Вага:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "weight")
                  ? item.fields.weight
                  : differencesMode
                  ? "-"
                  : item.fields.weight}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const NetworkTable = ({ item }: { item: any }) => {
    const uniqueItemsInCategory = itemsComparison.filter(
      (otherItem: any) =>
        otherItem !== item && item.category === otherItem.category
    );

    const fieldsAreUnique = (item: any, fieldItem: string) => {
      const diffResults = uniqueItemsInCategory.map((uniqueItem: any) => {
        if (fieldItem === "dimensions") {
          return Object.keys(item.fields).some(
            (field) =>
              item.fields[fieldItem].width === uniqueItem.fields[field].width ||
              item.fields[fieldItem].height ===
                uniqueItem.fields[field].height ||
              item.fields[fieldItem].depth === uniqueItem.fields[field].depth
          );
        }
        if (fieldItem === "ports") {
          return Object.keys(item.fields).some((field) => {
            if (
              item.fields[fieldItem].findIndex(
                (port: any, index: number) =>
                  port === uniqueItem.fields[fieldItem][index]
              ) === -1
            ) {
              return false;
            } else {
              return true;
            }
          });
        } else {
          return Object.keys(item.fields).some(
            (field) => item.fields[fieldItem] === uniqueItem.fields[fieldItem]
          );
        }
      });

      for (const unique of diffResults) {
        if (!unique) {
          return false;
        }
      }
      return true;
    };
    return (
      <TableContainer
        component={Paper}
        sx={{ width: "100%", alignSelf: "center", paddingBottom: 4 }}
      >
        <Table>
          <TableBody>
            <TableRow>
              <TableCell style={font}>Бренд:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "brand")
                  ? item.fields.brand
                  : differencesMode
                  ? "-"
                  : item.fields.brand}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Тип:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "type")
                  ? item.fields.type
                  : differencesMode
                  ? "-"
                  : item.fields.type}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Порты:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "ports")
                  ? item.fields.ports
                  : differencesMode
                  ? "-"
                  : item.fields.ports}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Постачання живлення:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "powerSupply")
                  ? item.fields.powerSupply
                  : differencesMode
                  ? "-"
                  : item.fields.powerSupply}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Максимальна швидкість:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "maxSpeed")
                  ? item.fields.maxSpeed
                  : differencesMode
                  ? "-"
                  : item.fields.maxSpeed}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Монтаж у стійку:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "compatibility")
                  ? item.fields.compatibility
                    ? "Так"
                    : "Ні"
                  : differencesMode
                  ? "-"
                  : item.fields.compatibility
                  ? "Так"
                  : "Ні"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Підтримка PoE:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "poeSupport")
                  ? item.fields.poeSupport
                    ? "Так"
                    : "Ні"
                  : differencesMode
                  ? "-"
                  : item.fields.poeSupport
                  ? "Так"
                  : "Ні"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Підтримка VPN:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "vpnSupport")
                  ? item.fields.vpnSupport
                    ? "Так"
                    : "Ні"
                  : differencesMode
                  ? "-"
                  : item.fields.vpnSupport
                  ? "Так"
                  : "Ні"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Файервол:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "firewall")
                  ? item.fields.firewall
                    ? "Так"
                    : "Ні"
                  : differencesMode
                  ? "-"
                  : item.fields.firewall
                  ? "Так"
                  : "Ні"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Розміри:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "dimensions")
                  ? item.fields.dimensions.width +
                    " x " +
                    item.fields.dimensions.height +
                    " x " +
                    item.fields.dimensions.depth
                  : differencesMode
                  ? "-"
                  : item.fields.dimensions.width +
                    " x " +
                    item.fields.dimensions.height +
                    " x " +
                    item.fields.dimensions.depth}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Вага:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "weight")
                  ? item.fields.weight
                  : differencesMode
                  ? "-"
                  : item.fields.weight}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell style={font}>Колір:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "color")
                  ? item.fields.color
                  : differencesMode
                  ? "-"
                  : item.fields.color}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const MonitorTable = ({ item }: { item: any }) => {
    const uniqueItemsInCategory = itemsComparison.filter(
      (otherItem: any) =>
        otherItem !== item && item.category === otherItem.category
    );

    const fieldsAreUnique = (item: any, fieldItem: string) => {
      const diffResults = uniqueItemsInCategory.map((uniqueItem: any) => {
        if (fieldItem === "dimensions") {
          return Object.keys(item.fields).some(
            (field) =>
              item.fields[fieldItem].width === uniqueItem.fields[field].width ||
              item.fields[fieldItem].height ===
                uniqueItem.fields[field].height ||
              item.fields[fieldItem].depth === uniqueItem.fields[field].depth
          );
        }
        if (fieldItem === "externalPorts") {
          return Object.keys(item.fields).some((field) => {
            if (
              item.fields[fieldItem].findIndex(
                (port: any, index: number) =>
                  port === uniqueItem.fields[fieldItem][index]
              ) === -1
            ) {
              return false;
            } else {
              return true;
            }
          });
        } else {
          return Object.keys(item.fields).some(
            (field) => item.fields[fieldItem] === uniqueItem.fields[fieldItem]
          );
        }
      });

      for (const unique of diffResults) {
        if (!unique) {
          return false;
        }
      }
      return true;
    };
    return (
      <TableContainer
        component={Paper}
        sx={{ width: "100%", alignSelf: "center", paddingBottom: 4 }}
      >
        <Table>
          <TableBody>
            <TableRow>
              <TableCell style={font}>Бренд:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "brand")
                  ? item.fields.brand
                  : differencesMode
                  ? "-"
                  : item.fields.brand}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Діагональ екрану:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "screenDiagonal")
                  ? item.fields.screenDiagonal
                  : differencesMode
                  ? "-"
                  : item.fields.screenDiagonal}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Тип матриці:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "matrixType")
                  ? item.fields.matrixType
                  : differencesMode
                  ? "-"
                  : item.fields.matrixType}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Співвідношення сторін:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "aspectRatio")
                  ? item.fields.aspectRatio
                  : differencesMode
                  ? "-"
                  : item.fields.aspectRatio}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Роздільна здатність:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "resolution")
                  ? item.fields.resolution
                  : differencesMode
                  ? "-"
                  : item.fields.resolution}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Час відгуку:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "responseTime")
                  ? item.fields.responseTime
                  : differencesMode
                  ? "-"
                  : item.fields.responseTime}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Кут огляду:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "viewingAngles")
                  ? item.fields.viewingAngles
                  : differencesMode
                  ? "-"
                  : item.fields.viewingAngles}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Тип підсвічування:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "backlightType")
                  ? item.fields.backlightType
                  : differencesMode
                  ? "-"
                  : item.fields.backlightType}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Яскравість:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "brightness")
                  ? item.fields.brightness
                  : differencesMode
                  ? "-"
                  : item.fields.brightness}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Контрастність:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "contrastRatio")
                  ? item.fields.contrastRatio
                  : differencesMode
                  ? "-"
                  : item.fields.contrastRatio}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Покриття екрану:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "screenCoating")
                  ? item.fields.screenCoating
                  : differencesMode
                  ? "-"
                  : item.fields.screenCoating}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Зігнутий екран:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "curvedScreen")
                  ? item.fields.curvedScreen
                    ? "Так"
                    : "Ні"
                  : differencesMode
                  ? "-"
                  : item.fields.curvedScreen
                  ? "Так"
                  : "Ні"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={font}>Частота оновлення:</TableCell>
              <TableCell>
                {differencesMode && !fieldsAreUnique(item, "refreshRate")
                  ? item.fields.refreshRate
                  : differencesMode
                  ? "-"
                  : item.fields.refreshRate}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const renderTable = () => {
    switch (props.category) {
      case "Ноутбуки":
        return <LaptopTable item={props} />;
      case "Кабелі та перехідники":
        return <CabelsTable item={props} />;
      case "Мережеве обладнання":
        return <NetworkTable item={props} />;
      case "Аксесуари для електроніки":
        return <ElectronicsTable item={props} />;
      case "Монітори":
        return <MonitorTable item={props} />;
      default:
        return null;
    }
  };

  async function basketItem_APPEND() {
    dispatch(setSearchedId(props._id));
    dispatch(checkItemById(props._id)).then((result: any) => {
      if (result.meta.requestStatus === "fulfilled") {
        if (result.payload.items.quantity === 0) {
          setInfoMessage("Цей товар закінчився");
          InfoDialog_open();
          return;
        }
        const basketItems = JSON.parse(
          localStorage.getItem("basketItems") || "{}"
        );
        if (basketItems !== undefined) {
          const itemIndex = basketItems.findIndex(
            (item: TShippingItems) => item.name === result.payload.items.name
          );

          if (itemIndex !== -1) {
            if (
              basketItems[itemIndex].amount + 1 >
              result.payload.items.quantity
            ) {
              setInfoMessage(
                "Кількість товару у кошику перевищує його загальну кількість"
              );
              InfoDialog_open();
              return;
            }
            basketItems[itemIndex] = {
              _id: result.payload.items._id,
              name: result.payload.items.name,
              description: result.payload.items.description,
              category: result.payload.items.category,
              price: adjustPrice(result.payload.items),
              sale: result.payload.items.sale,
              quantity: result.payload.items.quantity,
              rating: result.payload.items.rating,
              image: result.payload.items.image,
              amount: basketItems[itemIndex].amount + 1,
              fields: result.payload.items.fields,
            };
          } else {
            basketItems.push({
              _id: result.payload.items._id,
              name: result.payload.items.name,
              description: result.payload.items.description,
              category: result.payload.items.category,
              price: adjustPrice(result.payload.items),
              sale: result.payload.items.sale,
              rating: result.payload.items.rating,
              image: result.payload.items.image,
              quantity: result.payload.items.quantity,
              amount: 1,
              fields: result.payload.items.fields,
            });
          }
        }
        localStorage.setItem("basketItems", JSON.stringify(basketItems));
        dispatch(synchronizeBasket());
      }
      if (result.meta.requestStatus === "rejected") {
        setInfoMessage("Такого товару вже нема");
        InfoDialog_open();
        const recentlyReviewed = JSON.parse(
          localStorage.getItem("recentlyReviewed") || "{}"
        );
        const basketItems = JSON.parse(
          localStorage.getItem("basketItems") || "{}"
        );
        const favoriteItems = JSON.parse(
          localStorage.getItem("favoriteItems") || "{}"
        );
        const comparisonItems = JSON.parse(
          localStorage.getItem("comparisonItems") || "{}"
        );
        localStorage.setItem(
          "recentlyReviewed",
          JSON.stringify(
            recentlyReviewed.filter((item: any) => item._id !== props._id)
          )
        );
        localStorage.setItem(
          "basketItems",
          JSON.stringify(
            basketItems.filter((item: any) => item._id !== props._id)
          )
        );
        localStorage.setItem(
          "favoriteItems",
          JSON.stringify(
            favoriteItems.filter((item: any) => item._id !== props._id)
          )
        );
        localStorage.setItem(
          "comparisonItems",
          JSON.stringify(
            comparisonItems.filter((item: any) => item._id !== props._id)
          )
        );
      }
    });
  }

  async function favoriteItem_APPEND() {
    dispatch(setSearchedId(props._id));
    dispatch(checkItemById(props._id)).then((result: any) => {
      if (result.meta.requestStatus === "fulfilled") {
        if (result.payload.items.quantity === 0) {
          setInfoMessage("Цей товар закінчився");
          InfoDialog_open();
          return;
        }
        const favoriteItems = JSON.parse(
          localStorage.getItem("favoriteItems") || "{}"
        );
        if (favoriteItems !== undefined) {
          const itemIndex = favoriteItems.findIndex(
            (item: TShippingItems) => item.name === result.payload.items.name
          );

          if (itemIndex !== -1) {
            localStorage.setItem(
              "favoriteItems",
              JSON.stringify(
                favoriteItems.filter((item: any) => item._id !== props._id)
              )
            );
            dispatch(synchronizeFavorites());
            return;
          } else {
            favoriteItems.push({
              _id: result.payload.items._id,
              name: result.payload.items.name,
              description: result.payload.items.description,
              category: result.payload.items.category,
              price: result.payload.items.price,
              sale: result.payload.items.sale,
              rating: result.payload.items.rating,
              image: result.payload.items.image,
              quantity: result.payload.items.quantity,
              fields: result.payload.items.fields,
            });
          }
        }
        localStorage.setItem("favoriteItems", JSON.stringify(favoriteItems));
        dispatch(synchronizeFavorites());
      }
      if (result.meta.requestStatus === "rejected") {
        setInfoMessage("Такого товару вже нема");
        InfoDialog_open();
        const recentlyReviewed = JSON.parse(
          localStorage.getItem("recentlyReviewed") || "{}"
        );
        const basketItems = JSON.parse(
          localStorage.getItem("basketItems") || "{}"
        );
        const favoriteItems = JSON.parse(
          localStorage.getItem("favoriteItems") || "{}"
        );
        const comparisonItems = JSON.parse(
          localStorage.getItem("comparisonItems") || "{}"
        );
        localStorage.setItem(
          "recentlyReviewed",
          JSON.stringify(
            recentlyReviewed.filter((item: any) => item._id !== props._id)
          )
        );
        localStorage.setItem(
          "basketItems",
          JSON.stringify(
            basketItems.filter((item: any) => item._id !== props._id)
          )
        );
        localStorage.setItem(
          "favoriteItems",
          JSON.stringify(
            favoriteItems.filter((item: any) => item._id !== props._id)
          )
        );
        localStorage.setItem(
          "comparisonItems",
          JSON.stringify(
            comparisonItems.filter((item: any) => item._id !== props._id)
          )
        );
      }
    });
  }

  async function comparisonItem_APPEND() {
    dispatch(setSearchedId(props._id));
    dispatch(checkItemById(props._id)).then((result: any) => {
      if (result.meta.requestStatus === "fulfilled") {
        if (result.payload.items.quantity === 0) {
          setInfoMessage("Цей товар закінчився");
          InfoDialog_open();
          return;
        }
        const comparisonItems = JSON.parse(
          localStorage.getItem("comparisonItems") || "{}"
        );
        if (comparisonItems !== undefined) {
          const itemIndex = comparisonItems.findIndex(
            (item: TShippingItems) => item.name === result.payload.items.name
          );

          if (itemIndex !== -1) {
            localStorage.setItem(
              "comparisonItems",
              JSON.stringify(
                comparisonItems.filter((item: any) => item._id !== props._id)
              )
            );
            dispatch(synchronizeComparison());
            return;
          } else {
            comparisonItems.push({
              _id: result.payload.items._id,
              name: result.payload.items.name,
              description: result.payload.items.description,
              category: result.payload.items.category,
              price: result.payload.items.price,
              sale: result.payload.items.sale,
              rating: result.payload.items.rating,
              image: result.payload.items.image,
              quantity: result.payload.items.quantity,
              fields: result.payload.items.fields,
            });
          }
        }
        localStorage.setItem(
          "comparisonItems",
          JSON.stringify(comparisonItems)
        );
        dispatch(synchronizeComparison());
      }
      if (result.meta.requestStatus === "rejected") {
        setInfoMessage("Такого товару вже нема");
        InfoDialog_open();
        const recentlyReviewed = JSON.parse(
          localStorage.getItem("recentlyReviewed") || "{}"
        );
        const basketItems = JSON.parse(
          localStorage.getItem("basketItems") || "{}"
        );
        const favoriteItems = JSON.parse(
          localStorage.getItem("favoriteItems") || "{}"
        );
        const comparisonItems = JSON.parse(
          localStorage.getItem("comparisonItems") || "{}"
        );
        localStorage.setItem(
          "recentlyReviewed",
          JSON.stringify(
            recentlyReviewed.filter((item: any) => item._id !== props._id)
          )
        );
        localStorage.setItem(
          "basketItems",
          JSON.stringify(
            basketItems.filter((item: any) => item._id !== props._id)
          )
        );
        localStorage.setItem(
          "favoriteItems",
          JSON.stringify(
            favoriteItems.filter((item: any) => item._id !== props._id)
          )
        );
        localStorage.setItem(
          "comparisonItems",
          JSON.stringify(
            comparisonItems.filter((item: any) => item._id !== props._id)
          )
        );
      }
    });
  }

  return (
    <>
      <>
        <InfoDialog
          openInfo={openInfo}
          InfoDialog_close={InfoDialog_close}
          infoMessage={infoMessage}
        />
        <Card
          sx={{
            maxWidth: 345,
            minWidth: 345,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "2%",
          }}
        >
          {props.sale ? (
            <img
              style={{ position: "absolute", zIndex: 1, height: 70, width: 70 }}
              src="https://www.svgrepo.com/show/250306/percentage-percent.svg"
              alt=""
            />
          ) : (
            <></>
          )}
          <IconButton
            sx={{
              position: "absolute",
              zIndex: 1,
              height: 50,
              width: 50,
              right: 0,
            }}
            onClick={() => comparisonItem_APPEND()}
          >
            <ScaleIcon
              color={"warning"}
              sx={{
                width: 30,
                height: 30,
              }}
            />
          </IconButton>
          <IconButton
            sx={{
              position: "absolute",
              zIndex: 1,
              height: 50,
              width: 50,
              right: 0,
              top: 80,
            }}
            onClick={() => favoriteItem_APPEND()}
          >
            <FavoriteBorderIcon
              color={"warning"}
              sx={{
                width: 30,
                height: 30,
              }}
            />
          </IconButton>
          <CardMedia
            sx={{
              maxHeight: 200,
              minHeight: 200,
              objectFit: "fill",
              overflow: "hidden",
            }}
            image={props.image[0]}
            title={props.name}
            onClick={getCurrentItem}
          />

          <CardContent sx={{ paddingBottom: 2 }}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              minHeight={60}
              maxHeight={60}
              overflow={"hidden"}
              fontFamily={"Comfortaa"}
              textAlign={"justify"}
              paddingBottom={1}
            >
              {props.name}
            </Typography>
            <Typography
              variant="body2"
              maxHeight={100}
              minHeight={100}
              color="text.secondary"
              overflow={"hidden"}
              fontFamily={"Comfortaa"}
              textAlign={"justify"}
            >
              {props.description}
            </Typography>
          </CardContent>
          <CardActions
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: 0,
              paddingLeft: "16px",
              paddingRight: "16px",
            }}
          >
            <Box display={"flex"} flexDirection={"column"}>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                flexDirection={"row"}
              >
                <Typography
                  paddingLeft={0.3}
                  fontFamily={"Comfortaa"}
                  color={props.sale ? "info" : "error"}
                  sx={
                    props.sale
                      ? {
                          fontSize: 17,
                          textDecoration: "line-through !important",
                        }
                      : { fontSize: 22 }
                  }
                >
                  {props.price} ₴
                </Typography>
                {props.sale ? (
                  <Typography
                    paddingLeft={0.3}
                    fontSize={22}
                    fontFamily={"Comfortaa"}
                    color={"error"}
                  >
                    {props.price - Math.round((props.price * props.sale) / 100)}{" "}
                    ₴
                  </Typography>
                ) : (
                  <></>
                )}
              </Box>

              <Rating name="read-only" value={props.rating} readOnly />
            </Box>

            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"flex-end"}
              flexDirection={"row"}
            >
              <Box>
                <IconButton
                  sx={{ paddind: 0 }}
                  onClick={() => basketItem_APPEND()}
                >
                  {itemAppendingId === props._id ? (
                    <CircularProgress size={20} />
                  ) : (
                    <AddShoppingCartIcon
                      sx={{ height: 35, width: 35 }}
                      color={"disabled"}
                    />
                  )}
                </IconButton>
              </Box>
            </Box>
          </CardActions>
          {renderTable()}
        </Card>
      </>
    </>
  );
}
