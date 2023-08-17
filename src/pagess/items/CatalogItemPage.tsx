import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Carousel from "react-material-ui-carousel";
import { TShippingItems, Status } from "../../redux/types";

import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  createTheme,
} from "@mui/material";
import { NotFoundPage } from "../PageAbsence";
import {
  setAfterOrder,
  synchronizeBasket,
} from "../../redux/basket/basketSlice";
import InfoDialog from "../../componentss/dialogs/InfoDialog";
import { useNavigate } from "react-router-dom";
import Review from "../../componentss/reviews/Review";
import ReviewForm from "../../componentss/reviews/ReviewForm";
import {
  setReviewsAmount,
  setRatingAmount,
} from "../../redux/review/reviewSlice";
import { updateItem } from "../../redux/home/asyncActions";
import LoadingPage from "../LoadingPage";

const font = {
  fontFamily: 'Ubuntu',
};

const LaptopTable = ({ item }: { item: any }) => {
  return (
    <TableContainer component={Paper}  sx = {{width: "50%", alignSelf: 'center', paddingBottom: 4}}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell style={font}>Процесор:</TableCell>
            <TableCell>{item.fields.processor}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Пам'ять:</TableCell>
            <TableCell>{item.fields.memory}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Бренд:</TableCell>
            <TableCell>{item.fields.brand}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Серія:</TableCell>
            <TableCell>{item.fields.series}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Конструкція:</TableCell>
            <TableCell>{item.fields.construction}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Операційна система:</TableCell>
            <TableCell>{item.fields.operatingSystem}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Діагональ екрану:</TableCell>
            <TableCell>{item.fields.screenDiagonal}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Тип матриці:</TableCell>
            <TableCell>{item.fields.matrixType}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Тип покриття:</TableCell>
            <TableCell>{item.fields.coatingType}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Роздільна здатність:</TableCell>
            <TableCell>{item.fields.resolution}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Сенсорний екран:</TableCell>
            <TableCell>{item.fields.touchScreen ? "Так" : "Ні"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Частота оновлення:</TableCell>
            <TableCell>{item.fields.refreshRate}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Яскравість:</TableCell>
            <TableCell>{item.fields.brightness}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Інші характеристики дисплея:</TableCell>
            <TableCell>{item.fields.otherDisplayFeatures}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Максимальний об'єм ОЗУ:</TableCell>
            <TableCell>{item.fields.maxRAM}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Тип накопичувача:</TableCell>
            <TableCell>{item.fields.storageType}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Об'єм накопичувача:</TableCell>
            <TableCell>{item.fields.storageCapacity}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Оптичний привід:</TableCell>
            <TableCell>{item.fields.opticalDrive ? "Так" : "Ні"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Графічний адаптер:</TableCell>
            <TableCell>{item.fields.gpuAdapter}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Зовнішні порти:</TableCell>
            <TableCell>{item.fields.externalPorts}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Ридер карток:</TableCell>
            <TableCell>{item.fields.cardReader ? "Так" : "Ні"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Веб-камера:</TableCell>
            <TableCell>{item.fields.webcam ? "Так" : "Ні"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Підсвітка клавіатури:</TableCell>
            <TableCell>{item.fields.keyboardBacklight ? "Так" : "Ні"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Пасивне охолодження:</TableCell>
            <TableCell>{item.fields.passiveCooling ? "Так" : "Ні"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Сканер відбитків пальців:</TableCell>
            <TableCell>{item.fields.fingerprintScanner ? "Так" : "Ні"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Цифрова клавіатура:</TableCell>
            <TableCell>{item.fields.numericKeypad ? "Так" : "Ні"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Сертифікація Intel Evo:</TableCell>
            <TableCell>{item.fields.intelEvoCertification ? "Так" : "Ні"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Адаптер Ethernet:</TableCell>
            <TableCell>{item.fields.ethernetAdapter ? "Так" : "Ні"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Wi-Fi:</TableCell>
            <TableCell>{item.fields.wifi}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Bluetooth:</TableCell>
            <TableCell>{item.fields.bluetooth}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Вага:</TableCell>
            <TableCell>{item.fields.weight}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Розміри:</TableCell>
            <TableCell>{item.fields.dimensions.width} x {item.fields.dimensions.height} x {item.fields.dimensions.depth}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Матеріал корпусу:</TableCell>
            <TableCell>{item.fields.bodyMaterial}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Колір кришки:</TableCell>
            <TableCell>{item.fields.lidColor}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Колір корпусу:</TableCell>
            <TableCell>{item.fields.bodyColor}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Робустний ноутбук:</TableCell>
            <TableCell>{item.fields.ruggedLaptop ? "Так" : "Ні"}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const TabletTable = ({ item }: { item: any }) => {
  return (
    <TableContainer component={Paper} sx = {{width: "50%", alignSelf: 'center', paddingBottom: 4}}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell style={font}>Бренд:</TableCell>
            <TableCell>{item.fields.brand}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Лінійка:</TableCell>
            <TableCell>{item.fields.line}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Попередньо встановлена ОС:</TableCell>
            <TableCell>{item.fields.preinstalledOS}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Діагональ екрану:</TableCell>
            <TableCell>{item.fields.screenDiagonal}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Роздільна здатність:</TableCell>
            <TableCell>{item.fields.resolution}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Тип матриці:</TableCell>
            <TableCell>{item.fields.matrixType}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Датчик освітленості:</TableCell>
            <TableCell>{item.fields.lightSensor ? "Так" : "Ні"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Оперативна пам'ять:</TableCell>
            <TableCell>{item.fields.memoryRAM}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Вбудована пам'ять:</TableCell>
            <TableCell>{item.fields.builtInMemory}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Слот розширення пам'яті:</TableCell>
            <TableCell>{item.fields.memoryExpansionSlot}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Процесор:</TableCell>
            <TableCell>{item.fields.processor}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Частота процесора:</TableCell>
            <TableCell>{item.fields.processorFrequency}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Кількість ядер процесора:</TableCell>
            <TableCell>{item.fields.processorCores}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Вбудовані динаміки:</TableCell>
            <TableCell>{item.fields.builtInSpeakers ? "Так" : "Ні"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Ємність батареї:</TableCell>
            <TableCell>{item.fields.batteryCapacity}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Фронтальна камера:</TableCell>
            <TableCell>{item.fields.frontCamera}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Тилова камера:</TableCell>
            <TableCell>{item.fields.rearCamera}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Wi-Fi:</TableCell>
            <TableCell>{item.fields.wifi}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Мережа 3G / 4G (LTE) / 5G:</TableCell>
            <TableCell>{item.fields.cellularNetwork}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Голосовий зв'язок в мережах GSM/3G:</TableCell>
            <TableCell>{item.fields.voiceCommunication ? "Так" : "Ні"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>GPS:</TableCell>
            <TableCell>{item.fields.gps}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>NFC:</TableCell>
            <TableCell>{item.fields.nfc ? "Так" : "Ні"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Зовнішні порти:</TableCell>
            <TableCell>{item.fields.externalPorts}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Вага:</TableCell>
            <TableCell>{item.fields.weight}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Розміри:</TableCell>
            <TableCell>{item.fields.dimensions.width} x {item.fields.dimensions.height} x {item.fields.dimensions.depth}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Колір кришки:</TableCell>
            <TableCell>{item.fields.lidColor}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Колір корпусу:</TableCell>
            <TableCell>{item.fields.bodyColor}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const MonitorTable = ({ item }: { item: any }) => {
  return (
    <TableContainer component={Paper} sx = {{width: "50%", alignSelf: 'center', paddingBottom: 4}}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell style={font}>Бренд:</TableCell>
            <TableCell>{item.fields.brand}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Діагональ екрану:</TableCell>
            <TableCell>{item.fields.screenDiagonal}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Тип матриці:</TableCell>
            <TableCell>{item.fields.matrixType}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Співвідношення сторін:</TableCell>
            <TableCell>{item.fields.aspectRatio}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Роздільна здатність:</TableCell>
            <TableCell>{item.fields.resolution}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Час відгуку:</TableCell>
            <TableCell>{item.fields.responseTime}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Кут огляду:</TableCell>
            <TableCell>{item.fields.viewingAngles}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Тип підсвічування:</TableCell>
            <TableCell>{item.fields.backlightType}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Яскравість:</TableCell>
            <TableCell>{item.fields.brightness}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Контрастність:</TableCell>
            <TableCell>{item.fields.contrastRatio}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Покриття екрану:</TableCell>
            <TableCell>{item.fields.screenCoating}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Зігнутий екран:</TableCell>
            <TableCell>{item.fields.curvedScreen ? "Так" : "Ні"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={font}>Частота оновлення:</TableCell>
            <TableCell>{item.fields.refreshRate}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const ItemPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { status, itemCurrent } = useAppSelector((state) => state.home);
  const { reviews, status_review } = useAppSelector((state) => state.reviews);
  const { afterOrder } = useAppSelector((state) => state.basket);
  const [openInfo, setOpenInfo] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (afterOrder) {
      dispatch(synchronizeBasket());
      dispatch(setAfterOrder(false));
    }
  }, [dispatch]);

  const renderTable = () => {
    switch (itemCurrent.items.category) {
      case "Ноутбуки":
        return <LaptopTable item={itemCurrent.items} />;
      case "Планшети":
        return <TabletTable item={itemCurrent.items} />;
      case "Монітори":
        return <MonitorTable item={itemCurrent.items} />;
      default:
        return null;
    }
  };

  function adjustPrice() {
    if (itemCurrent.items.sale === 0) {
      return itemCurrent.items.price;
    } else {
      return (
        itemCurrent.items.price -
        Math.round((itemCurrent.items.price * itemCurrent.items.sale) / 100)
      );
    }
  }

  async function basketItem_APPEND() {
    const basketItems = JSON.parse(localStorage.getItem("basketItems") || "{}");
    if (basketItems !== undefined) {
      const itemIndex = basketItems.findIndex(
        (item: TShippingItems) => item.name === itemCurrent.items.name
      );

      if (itemIndex !== -1) {
        basketItems[itemIndex] = {
          _id: itemCurrent.items._id,
          name: itemCurrent.items.name,
          description: itemCurrent.items.description,
          category: itemCurrent.items.category,
          price: adjustPrice(),
          sale: itemCurrent.items.sale,
          rating: itemCurrent.items.rating,
          image: itemCurrent.items.image,
          amount: basketItems[itemIndex].amount + 1,
          fields: itemCurrent.items.fields
        };
      } else {
        basketItems.push({
          _id: itemCurrent.items._id,
          name: itemCurrent.items.name,
          description: itemCurrent.items.description,
          category: itemCurrent.items.category,
          price: adjustPrice(),
          sale: itemCurrent.items.sale,
          rating: itemCurrent.items.rating,
          image: itemCurrent.items.image,
          amount: 1,
          fields: itemCurrent.items.fields
        });
      }
    }
    localStorage.setItem("basketItems", JSON.stringify(basketItems));

    dispatch(synchronizeBasket());
  }

  function handleBackToCatalog() {
    navigate("/catalog");
  }

  const Item = () => {
    return (
    
      <>
        <Button
          sx={{ fontFamily: "Comfortaa", marginTop: 15, fontSize: 15 }}
          onClick={handleBackToCatalog}
          variant="contained"
        >
          Каталог
        </Button>

        <Box
          width={"100%"}
          height={"100%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"column"}
        >
          <Box>
            <Carousel
              sx={{
                width: {
                  xs: 350,
                  md: 825,
                  lx: 1200,
                },

                height: {
                  xs: 500,
                  md: 700,
                },

                display: "flex",
                alignContent: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Box>
                <img
                  src={itemCurrent.items.image[0]}
                  alt="img1"
                  style={{ width: "100%", height: "100%", objectFit: "fill" }}
                />
              </Box>
              <Box>
                <img
                  src={itemCurrent.items.image[1]}
                  alt="img2"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>
              <Box>
                <img
                  src={itemCurrent.items.image[2]}
                  alt="img3"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>
              {/* <Box display = {'flex'} justifyContent={'center'} alignItems={'center'} width={400}>
          <img src={props.image[1]} style={{display : 'flex', objectFit: 'contain'}}/>
        </Box>
        <Box display = {'flex'} justifyContent={'center'} alignItems={'center'} width={400}>
          <img src={props.image[2]} style={{display : 'flex', objectFit: 'contain'}}/>
        </Box> */}
            </Carousel>
          </Box>

          <Box display={"flex"} flexDirection={"column"} alignItems={"left"}>
            {itemCurrent.items.quantity <= 10 ? (
              <Typography
                fontFamily={"Comfortaa"}
                sx={{ paddingLeft: 0.3, background: "#fdfacf" }}
                fontSize={25}
              >
                Товар закінчується! Залишилось: {itemCurrent.items.quantity}
              </Typography>
            ) : (
              <></>
            )}
            <Typography
              fontFamily={"Comfortaa"}
              sx={{ paddingLeft: 0.3 }}
              fontSize={25}
            >
              {itemCurrent.items.name}
            </Typography>

            <Box
              display={"flex"}
              width={100}
              justifyContent={"space-between"}
              flexDirection={"row"}
            >
              <Typography
                paddingLeft={0.3}
                fontFamily={"Comfortaa"}
                color={itemCurrent.items.sale ? "info" : "error"}
                sx={
                  itemCurrent.items.sale
                    ? {
                        fontSize: 17,
                        textDecoration: "line-through !important",
                      }
                    : { fontSize: 22 }
                }
              >
                {itemCurrent.items.price} ₴
              </Typography>
              {itemCurrent.items.sale ? (
                <Typography
                  paddingLeft={0.3}
                  fontSize={22}
                  fontFamily={"Comfortaa"}
                  color={"error"}
                >
                  {itemCurrent.items.price -
                    Math.round((itemCurrent.items.price * itemCurrent.items.sale) / 100)}
                  ₴
                </Typography>
              ) : (
                <></>
              )}
            </Box>
            <Rating name="read-only" value={itemCurrent.items.rating} readOnly />

            <Typography
              fontFamily={"Comfortaa"}
              sx={{ paddingLeft: 0.3, paddingTop: 3 }}
            >
              {itemCurrent.items.description}
            </Typography>
            {renderTable()}
          </Box>
          <Box>
            <Button
              onClick={() => basketItem_APPEND()}
              sx={{
                width: {
                  xs: 210,
                  md: 225,
                },
                fontSize: {
                  xs: 12,
                  md: 14,
                },
              }}
              variant="contained"
            >
              Покласти у кошик
            </Button>
          </Box>
          <Box paddingTop={10}>
            <Typography
              fontFamily={"Comfortaa"}
              sx={{ textAlign: "center" }}
              fontSize={25}
            >
              Відгуки
            </Typography>
            <ReviewForm {...itemCurrent.items} />
            <Box>{StatusReviewHandler(status_review)}</Box>
          </Box>
        </Box>
      </>
    );
  };

  function StatusReviewHandler(status_review: Status) {
    switch (status_review) {
      case "success":
        if (reviews !== undefined) {
          let countRatingAmount = 0;
          dispatch(
            setReviewsAmount(parseInt(reviews.reviews.length.toString()))
          );
          if (reviews.reviews.length === 0) {
            dispatch(setRatingAmount(0));
          }
          return reviews.reviews
            .slice()
            .reverse()
            .map((review, index) => {
              countRatingAmount =
                parseInt(countRatingAmount.toString()) +
                parseInt(review.rating.toString());
              if (index === reviews.reviews.length - 1) {
                dispatch(setRatingAmount(countRatingAmount));
              }
              return <Review {...review} />;
            });
        } else {
          return (
            <Typography fontFamily={"Comfortaa"} fontSize={20}>
              Пусто...
            </Typography>
          );
        }
      case "pending":
        <CircularProgress />;
        return "";
      case "error":
        return (
          <Typography fontFamily={"Comfortaa"} fontSize={20}>
            Пусто...
          </Typography>
        );
      default:
        return (
          <Typography fontFamily={"Comfortaa"} fontSize={20}>
            Пусто...
          </Typography>
        );
    }
  }

  function StatusItemHandler(status: Status) {
    switch (status) {
      case "success":
        console.log(itemCurrent.items);
        if (itemCurrent.items !== undefined) {
          return <Item />;
        } else {
          navigate('/catalog')
          return <NotFoundPage />;
        }
      case "pending":
        return <LoadingPage/>;
      case "error":
        navigate('/catalog')
        return <NotFoundPage />;
      default:
        navigate('/catalog')
        return <NotFoundPage />;
    }
  }

  return StatusItemHandler(status);
};

export default ItemPage;
