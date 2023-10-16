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

export default function Return() {
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
            Повернення товару
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
                  <Typography
                    fontSize={20}
                    fontFamily={"Ubuntu"}
                    variant="h4"
                    gutterBottom
                  >
                    Вибравши техніку в інтернет-магазині Сокет , ви можете
                    розраховувати на отримання оригінальних і якісних приладів.
                    Повернення, обмін або заміна виробів здійснюється відповідно
                    до положень Закону України під назвою "Про захист прав
                    споживачів".
                  </Typography>
                  <Typography
                    fontSize={20}
                    fontFamily={"Ubuntu"}
                    variant="h4"
                    gutterBottom
                  >
                    <br />
                    <br />
                    Якщо товар якісний, покупцеві надається право розірвати
                    укладений на відстані договір протягом 14 днів після його
                    оформлення.
                  </Typography>
                  <Typography
                    fontSize={20}
                    fontFamily={"Ubuntu"}
                    variant="h4"
                    marginBottom={8}
                    gutterBottom
                  >
                    <br />
                    <br />
                    Щоб право на розірвання угоди зберігалося, споживачеві
                    потрібно відстежувати збереження продукції в первісному
                    стані. Якщо прилад знищено, пошкоджено або зіпсований не з
                    вини клієнта, клієнт не позбавляється можливості розірвати
                    договір. Якщо через розпакування товару або перевірку
                    працездатності вартість зменшилася, це не означає, що
                    споживач не може написати заяву на повернення грошей.
                  </Typography>

                  <Box
                    sx={{
                      borderLeft: "1px solid black",
                    }}
                  >
                    <Box paddingLeft={5}>
                      <Typography
                        fontSize={20}
                        fontFamily={"Ubuntu"}
                        variant="h4"
                        fontWeight={"bold"}
                        marginBottom={4}
                        gutterBottom
                      >
                        Товар не приймається назад, якщо відсутня хоча б одна із
                        складових:
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        paddingLeft: {
                          xs: 5,
                          sm: 15,
                        },
                      }}
                    >
                      <ul>
                        <li style={{ fontSize: 20 }}>
                          техніка у повній комплектації;
                          <br />
                          <br />
                        </li>
                        <li style={{ fontSize: 20 }}>
                          чек, що доводить факт покупки в інтернет-магазині;
                          <br />
                          <br />
                        </li>
                        <li style={{ fontSize: 20 }}>
                          гарантійний талон;
                          <br />
                          <br />
                        </li>
                        <li style={{ fontSize: 20 }}>
                          акт із описом недоліку, який склала сервісна служба.
                          <br />
                          <br />
                        </li>
                      </ul>
                    </Box>
                  </Box>
                  <Typography
                    fontSize={20}
                    fontFamily={"Ubuntu"}
                    variant="h4"
                    gutterBottom
                  >
                    <br />
                    <br />
                    Гроші за товар будуть повернуті в терміни, встановлені
                    чинним законодавством.
                  </Typography>
                  <Typography
                    fontSize={20}
                    fontFamily={"Ubuntu"}
                    variant="h4"
                    marginBottom={8}
                    gutterBottom
                  >
                    <br />
                    <br />
                    Претензії та питання, що залишилися, можна поставити за
                    телефоном 0 800-300-353 або в онлайн-форматі, заповнивши
                    форму зворотного зв'язку. Під час складання претензії за
                    основу береться чинне українське законодавство.
                  </Typography>
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
