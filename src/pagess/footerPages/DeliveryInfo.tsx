import {
  Box,
  Paper,
  TableContainer,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Link,
} from "@mui/material";
import RecentlyReviewed from "../../componentss/RecentlyReviewed";
import { useEffect } from "react";

export default function DeliveryInfo() {
  const recentlyReviewed = JSON.parse(
    localStorage.getItem("recentlyReviewed") || "{}"
  );
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Box paddingTop={15}>
        <Box
          display={"flex"}
          margin={"0 auto"}
          width={"70%"}
          justifyContent={"flex-start"}
          alignItems={"center"}
        >
          <Typography
            variant="h1"
            textAlign={"center"}
            paddingBottom={5}
            fontSize={25}
            fontFamily={"Ubuntu"}
            fontWeight={"bold"}
          >
            {"<"}
          </Typography>
          <Typography
            variant="h1"
            textAlign={"center"}
            paddingBottom={5}
            fontSize={30}
            fontFamily={"Ubuntu"}
            fontWeight={"bold"}
            paddingLeft={4}
          >
            Доставка
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: "70%",
              padding: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Box>
                <Box width={"100%"}>
                  <Box
                    sx={{
                      paddingLeft: {
                        xs: 5,
                        sm: 15,
                      },
                      borderLeft: "1px solid black",
                    }}
                  >
                    <ul>
                      <li style={{ fontSize: 20 }}>
                        Вартість та умови доставки визначаються перевізником,
                        якого Ви оберете.
                        <br />
                        <br />
                      </li>
                      <li style={{ fontSize: 20 }}>
                        Ми працюємо з компанією перевізником «Нова пошта»
                        <br />
                        <br />
                      </li>
                      <li style={{ fontSize: 20 }}>
                        Адресна доставка «Нова Пошта» здійснюється по всій
                        Україні та займає від одного до трьох днів. При
                        замовленні менеджер інтернет-магазину погодить дату
                        доставки. Доставити за адресою можна будь-який товар
                        вагою до 100 кг та/або габаритами до 150х165х150 см.
                        <br />
                        <br />
                      </li>
                      <li style={{ fontSize: 20 }}>
                        Передплата в розмірі вартості доставки є обов'язковою
                        для всіх товарів, де вартість доставки вище 100грн.
                        <br />
                        <br />
                      </li>
                      <li style={{ fontSize: 20 }}>
                        Передоплата здійснюється переказом відповідної суми за
                        допомогою будь-якого комерційного банку на банківську
                        картку інтернет-магазину, реквізити надасть оператор.
                        <br />
                        <br />
                      </li>
                      <li style={{ fontSize: 20 }}>
                        Товар вартістю до 500грн ми відправляємо лише після
                        повної оплати.
                        <br />
                        <br />
                      </li>
                      <li style={{ fontSize: 20 }}>
                        Вся техніка відправляється зі складу через кур'єру
                        транспортної компанії.
                      </li>
                    </ul>
                  </Box>
                  <Typography
                    fontSize={20}
                    fontFamily={"Ubuntu"}
                    variant="h4"
                    fontWeight={"bold"}
                    gutterBottom
                  >
                    <br />
                    <br />
                    ВАЖЛИВО!
                    <br />
                    ПРОВОДИТЕ ОГЛЯД ТОВАРУ У ВІДДІЛЕННІ ПЕРЕВЕЗНИКА У ПРИСУТНІ
                    ВІДПОВІДАЛЬНОГО СПІВРОБІТНИКА АБО У ПРИСУТНІ КУР'ЄРА ПРИ
                    АДРЕСНОЇ ДОСТАВКИ.
                    <br />
                    ПРЕТЕНЗІЇ ПОВ'ЯЗАНІ ІЗ ЗОВНІШНІМ ВИГЛЯДОМ ТОВАРУ І
                    КОМПЛЕКТАЦІЄЮ ВІЗНАЛЕНІ ПІСЛЯ ТОГО ЯК ВИ ЗАБРАЛИ У
                    ПЕРЕВЕЗНИКА – НЕ ПРИЙМАЮТЬСЯ!
                  </Typography>
                  <Typography
                    fontSize={20}
                    fontFamily={"Ubuntu"}
                    variant="h4"
                    gutterBottom
                  >
                    <br />
                    <br />
                    Самовивіз з магазину чи складу
                    <br />
                    Замовляйте та забирайте товар у магазинах Сокет та на складі
                    компанії самостійно. Сплатити товар будь-яким зручним для
                    вас способом можна у касі магазину, на карту інтернет
                    магазину. <br />
                    Перед замовленням необхідно уточнити наявність товару,
                    оператор одразу зарезервує товар для Вас. Якщо Ви забираєте
                    товар у наших магазинах самостійно, передоплата не потрібна.{" "}
                    <br />
                    Якщо ви забираєте товар самостійно, наші співробітники
                    допоможуть вам його завантажити в машину, єдина вимога –
                    враховуйте габарити, навантаження проводиться тільки в
                    машини, які розраховані на певні габарити товару.
                  </Typography>
                  <Typography
                    fontSize={20}
                    fontFamily={"Ubuntu"}
                    variant="h4"
                    fontWeight={"bold"}
                    gutterBottom
                  >
                    <br />
                    <br />
                    Адреса доставка "Сокет - до дверей"
                  </Typography>
                  <Typography
                    fontSize={20}
                    fontFamily={"Ubuntu"}
                    variant="h4"
                    gutterBottom
                  >
                    <br />
                    У містах де є магазини Сокет, а також у найближчих до них
                    населених пунктах, доставку здійснює служба доставки "Сокет"
                    <br />
                    Доставка здійснюється за поріг квартири або будинку (крім
                    твердопаливних котлів, печей та камінів барбекю, вони
                    доставляються до воріт)
                  </Typography>
                  <Typography
                    fontSize={20}
                    fontFamily={"Ubuntu"}
                    variant="h4"
                    fontWeight={"bold"}
                    gutterBottom
                  >
                    <br />
                    <br />
                    ВАРТІСТЬ:
                  </Typography>
                  <Typography
                    fontSize={20}
                    fontFamily={"Ubuntu"}
                    variant="h4"
                    fontWeight={"bold"}
                    gutterBottom
                  >
                    Стандартна доставка
                  </Typography>
                  <Box sx={{ paddingLeft: 2.5 }}>
                    <ul>
                      <li style={{ fontSize: 20 }}>У межах міста — 300 грн</li>
                    </ul>
                  </Box>
                  <Typography
                    fontSize={20}
                    fontFamily={"Ubuntu"}
                    variant="h4"
                    fontWeight={"bold"}
                    gutterBottom
                  >
                    <br />
                    <br />
                    Доставка зворотного товару
                  </Typography>
                  <Typography
                    fontSize={20}
                    fontFamily={"Ubuntu"}
                    variant="h4"
                    gutterBottom
                  >
                    <br />
                    Поворотна доставка від клієнта до магазину є платною, якщо
                    товар не має виявлених сервісним центром дефектів (не
                    підійшов за кольором, розміром, дизайном, не подобається як
                    працює і т.д.)
                    <br />
                    <br />
                  </Typography>
                  <Box sx={{ paddingLeft: 2.5 }}>
                    <ul>
                      <li style={{ fontSize: 20 }}>
                        у разі заміни на інший товар – 500 грн.
                        <br />
                        <br />
                      </li>
                      <li style={{ fontSize: 20 }}>
                        у разі повернення без заміни - 580 грн
                        <br />
                        <br />
                      </li>
                    </ul>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box width={"100%"}>
        {recentlyReviewed === undefined || recentlyReviewed.length === 0 ? (
          <></>
        ) : (
          <>
            <Typography
              variant={"h3"}
              fontSize={37}
              fontFamily={"Ubuntu"}
              paddingTop={7}
              paddingBottom={4}
              textAlign={"center"}
            >
              Було переглянуто
            </Typography>
            <RecentlyReviewed />
          </>
        )}
      </Box>
    </>
  );
}
