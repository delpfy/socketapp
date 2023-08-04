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
        <Typography
          variant="h1"
          textAlign={"center"}
          paddingBottom={5}
          fontSize={30}
          fontFamily={"Ubuntu"}
        >
          Доставка
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Paper
            elevation={5}
            sx={{
              width: "90%",
              padding: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h1"
              paddingBottom={5}
              fontSize={30}
              fontFamily={"Ubuntu"}
            >
              Доставка з інтернет-магазину "Сокет"
            </Typography>
            <Typography
              variant="h1"
              paddingBottom={5}
              fontSize={25}
              fontFamily={"Ubuntu"}
            >
              (Пікап, самовивіз з магазину)
            </Typography>
            <Typography
              variant="h1"
              paddingBottom={5}
              fontSize={22}
              fontFamily={"Ubuntu"}
            >
              <ul style={{ paddingLeft: 25 }}>
                <li>
                  {" "}
                  Зробіть замовлення на сайті  {" "} <Link href = {"https://socketapp.vercel.app/"}>
                socketapp.vercel.app
                </Link> {" "} або за номером
                  телефону 0 800-300-353.
                </li>
                <li>
                  Виберіть у кошику метод доставки - самовивіз та вкажіть
                  бажаний магазин отримання товару.
                </li>
                <li>
                  Оплату можна здійснити карткою при оформленні замовлення на
                  сайті, або оплатити готівкою при отриманні.
                </li>
                <li>
                  Очікуйте SMS або дзвінка менеджера Call-центру для
                  підтвердження замовлення. Вам прийде SMS з номером замовлення
                  для отримання товару у вибраному магазині.
                </li>
              </ul>
            </Typography>
            <Box
              paddingBottom={5}
              sx={{
                background: "#fdfacf",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
              }}
            >
              <Typography variant="h1" fontSize={23} fontFamily={"Ubuntu"}>
                Важливо!
              </Typography>
              <Typography variant="h1" fontSize={22} fontFamily={"Ubuntu"}>
                Сума покупки не повинна перевищувати 49 999 грн, якщо ви
                плануєте оплату готівкою. Оплата товару здійснюється тільки в
                гривнях.
              </Typography>
            </Box>

            <Typography
              variant="h1"
              paddingBottom={5}
              fontSize={30}
              fontFamily={"Ubuntu"}
            >
              Нова Пошта
            </Typography>
            <Typography
              variant="h1"
              paddingBottom={5}
              fontSize={25}
              fontFamily={"Ubuntu"}
            >
              Вартість доставки до відділення Нова Пошта
            </Typography>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                paddingBottom: 2,
              }}
            >
              <TableContainer component={Paper} sx={{ width: "80%" }}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }} align="center">
                        Категорія товару
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700 }} align="center">
                        Вартість доставки до відділення НП
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell align="center">
                        Дрібна побутова техніка до 0.5 кг
                      </TableCell>
                      <TableCell align="center">79 грн</TableCell>
                    </TableRow>

                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell align="center">
                        Середня побутова техніка до 20 кг
                      </TableCell>
                      <TableCell align="center">99 грн</TableCell>
                    </TableRow>

                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell align="center">
                        Велика побутова техніка до 90 кг
                      </TableCell>
                      <TableCell align="center">449 грн</TableCell>
                    </TableRow>

                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell align="center">
                        Велика побутова техніка більше 90 кг
                      </TableCell>
                      <TableCell align="center">899 грн</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            <Typography
              variant="h1"
              paddingBottom={5}
              fontSize={20}
              fontFamily={"Ubuntu"}
            >
              При доставці до відділення Нова Пошта оплата товару готівкою
              можлива тільки, якщо сума замовлення не перевищує 149 999 грн.
            </Typography>
            <Typography
              variant="h1"
              paddingBottom={5}
              fontSize={25}
              fontFamily={"Ubuntu"}
            >
              Вартість доставки до поштоматів Нова Пошта
            </Typography>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                paddingBottom: 2,
              }}
            >
              <TableContainer component={Paper} sx={{ width: "80%" }}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }} align="center">
                        Категорія товару
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700 }} align="center">
                        Вартість доставки до поштоматів
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell align="center">
                        Дрібна побутова техніка до 0.5 кг
                      </TableCell>
                      <TableCell align="center">69 грн</TableCell>
                    </TableRow>

                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell align="center">
                        Середня побутова техніка до 20 кг
                      </TableCell>
                      <TableCell align="center">89 грн</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            <Typography
              variant="h1"
              paddingBottom={5}
              fontSize={20}
              fontFamily={"Ubuntu"}
            >
              Для одного товару з категорій середньої або дрібної побутової
              техніки, вартістю до 10000 грн. і вагою до 20 кг.
            </Typography>

            <Typography
              variant="h1"
              paddingBottom={5}
              fontSize={25}
              fontFamily={"Ubuntu"}
            >
              Вартість доставки по адресі клієнта службою Нова Пошта:
            </Typography>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                paddingBottom: 2,
              }}
            >
              <TableContainer component={Paper} sx={{ width: "80%" }}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }} align="center">
                        Категорія товару
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700 }} align="center">
                        Вартість адресної доставки НП
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700 }} align="center">
                        Підйом на поверх
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell align="center">
                        Дрібна побутова техніка до 0.5 кг
                      </TableCell>
                      <TableCell align="center">99 грн</TableCell>
                      <TableCell align="center">Безкоштовно</TableCell>
                    </TableRow>

                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell align="center">
                        Середня побутова техніка до 20 кг
                      </TableCell>
                      <TableCell align="center">199 грн</TableCell>
                      <TableCell align="center">Безкоштовно</TableCell>
                    </TableRow>

                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell align="center">
                        Велика побутова техніка до 90 кг
                      </TableCell>
                      <TableCell align="center">699 грн</TableCell>
                      <TableCell align="center">50 грн/поверх</TableCell>
                    </TableRow>

                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell align="center">
                        Велика побутова техніка більше 90 кг
                      </TableCell>
                      <TableCell align="center">1199 грн</TableCell>
                      <TableCell align="center">50 грн/поверх</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            <Typography
              variant="h1"
              paddingBottom={2}
              fontSize={20}
              fontFamily={"Ubuntu"}
            >
              У період з 15.06 до 31.07 діє Акція з безкоштовною доставкою,
              умови за посиланням.
            </Typography>
            <Typography
              variant="h1"
              paddingBottom={2}
              fontSize={20}
              fontFamily={"Ubuntu"}
            >
              Доставка до міст, де присутні магазини Сокет, вважається за
              тарифами Нової Пошти. При адресній доставці оплата товару готівкою
              можлива тільки, якщо сума замовлення не перевищує 49 999 грн. Якщо
              сума замовлення перевищує 49 999 грн, доставка можлива тільки до
              відділення перевізника. Усі інші форми оплати можливі при доставці
              перевізником Нова Пошта.
            </Typography>
            <Typography
              variant="h1"
              paddingBottom={5}
              fontSize={20}
              fontFamily={"Ubuntu"}
            >
              При залученні для доставки товару перевізника ТОВ "Нова Пошта",
              послуга підйому товару на поверх (в тому числі на перший поверх)
              здійснюється у випадку, якщо вага доставляємого товару разом з
              упаковкою не перевищує 100 кг. Підйом на поверх товару (в тому
              числі і на перший поверх), фактична вага якого разом з упаковкою
              перевищує 100 кг, при залученні для доставки перевізника ТОВ "Нова
              Пошта", не здійснюється!
            </Typography>

            <Typography
              variant="h1"
              paddingBottom={5}
              fontSize={30}
              fontFamily={"Ubuntu"}
            >
              Укр Пошта
            </Typography>

            <Typography
              variant="h1"
              paddingBottom={5}
              fontSize={25}
              fontFamily={"Ubuntu"}
            >
              Вартість доставки до відділення Укрпошти
            </Typography>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                paddingBottom: 2,
              }}
            >
              <TableContainer component={Paper} sx={{ width: "80%" }}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }} align="center">
                        Категорія товару
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700 }} align="center">
                        Вартість
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell align="center">
                        Дрібна побутова техніка до 0.5 кг
                      </TableCell>
                      <TableCell align="center">49 грн</TableCell>
                    </TableRow>

                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell align="center">
                        Середня побутова техніка до 20 кг
                      </TableCell>
                      <TableCell align="center">69 грн</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            <Typography
              variant="h1"
              paddingBottom={5}
              fontSize={25}
              fontFamily={"Ubuntu"}
            >
              Вартість доставки по адресі клієнта службою Укрпошта:
            </Typography>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                paddingBottom: 2,
              }}
            >
              <TableContainer component={Paper} sx={{ width: "80%" }}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }} align="center">
                        Категорія товару
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700 }} align="center">
                        Вартість
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell align="center">
                        Дрібна побутова техніка до 0.5 кг
                      </TableCell>
                      <TableCell align="center">99 грн</TableCell>
                    </TableRow>

                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell align="center">
                        Середня побутова техніка до 20 кг
                      </TableCell>
                      <TableCell align="center">199 грн</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            <Typography
              variant="h1"
              paddingBottom={5}
              fontSize={20}
              fontFamily={"Ubuntu"}
            >
              Для одного товару з категорій середньої або маленької побутової
              техніки, вартістю до 30000 грн. і вагою до 20 кг.
            </Typography>
            <Typography
              variant="h1"
              paddingBottom={5}
              fontSize={25}
              fontFamily={"Ubuntu"}
            >
              До товару додаються наступні документи:
            </Typography>
            <Typography
              variant="h1"
              paddingBottom={6}
              fontSize={22}
              fontFamily={"Ubuntu"}
            >
              <ul style={{ paddingLeft: 25 }}>
                <li>гарантійний талон;</li>
                <li>інструкція з експлуатації;</li>
                <li>документи про оплату.</li>
              </ul>
            </Typography>
            <Typography
              variant="h1"
              paddingBottom={3}
              fontSize={25}
              fontFamily={"Ubuntu"}
            >
              Маленька і середня побутова техніка:
            </Typography>
            <Typography
              variant="h1"
              paddingBottom={5}
              fontSize={21}
              fontFamily={"Ubuntu"}
            >
              Масажери, грилі, кавоварки, нарізальні машинки, мультиварки,
              пароварки, віджималки для соку, хлібопічки, а також витяжки,
              мікрохвильові печі, вбудовані мікрохвильові печі, обігрівачі,
              кухонні комбайни, телевізори, пилососи та інша техніка,{" "}
              <strong style={{ fontWeight: 800 }}>
                 об'єм якої не перевищує 0,24 м³, а вага - до 20 кілограмів.{" "}
              </strong>{" "}
            </Typography>

            <Typography
              variant="h1"
              paddingBottom={3}
              fontSize={25}
              fontFamily={"Ubuntu"}
            >
              Велика побутова техніка:
            </Typography>

            <Typography paddingBottom={5} variant="h1" fontSize={21} fontFamily={"Ubuntu"}>
              Пральні машини, вбудовані пральні машини, холодильники, вбудовані
              холодильники, посудомийні машини, вбудовані посудомийні машини,
              морозильні камери, вбудовані духовки, варильні поверхні,
              кондиціонери, водонагрівачі та інша техніка,{" "}
              <strong style={{ fontWeight: 800 }}>
                об'єм якої перевищує 0,24 м³, а вага - від 20 до 80 кілограмів.{" "}
              </strong>{" "}
            </Typography>


            <Typography
              variant="h1"
              fontSize={22}
              fontFamily={"Ubuntu"}
            >
             ТОВ "СКД-РИТЕЙЛ"
            </Typography>
            <Typography
              variant="h1"
              fontSize={22}
              fontFamily={"Ubuntu"}
            >
             04119, м.Київ, вул.Дорогожицька, буд. 1, поверх 6
            </Typography>
            
            <Typography
              variant="h1"
              fontSize={22}
              fontFamily={"Ubuntu"}
            >
             Зв'язок: +3806250826598
            </Typography>
            <Typography
              variant="h1"
              fontSize={22}
              fontFamily={"Ubuntu"}
            >
                <Link href = {"https://socketapp.vercel.app/"}>
                socketapp.vercel.app
                </Link>
             
            </Typography>
          </Paper>
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
        </Box>
      </Box>
    </>
  );
}
