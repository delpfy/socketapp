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

export default function About() {
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
            О компанії
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
                    Socket.store – найбільший онлайн-рітейлер у країні. З 2005
                    року ми втілюємо маленькі мрії та грандіозні плани мільйонів
                    людей. В нас можна знайти буквально все. Ми продаємо за
                    справедливою ціною та надаємо гарантію, оскільки вважаємо,
                    що онлайн-шопінг має бути максимально зручним та безпечним.
                    І щоразу, коли хтось натискає «Купити», ми розуміємо, що
                    робимо потрібну справу.
                  </Typography>
                  <Box
                    flexDirection={"row"}
                    justifyContent={"center"}
                    marginLeft={"auto"}
                    marginRight={"auto"}
                    marginTop={10}
                    marginBottom={10}
                    alignItems={"center"}
                    color={"black"}
                    /* paddingBottom={1} */

                    sx={{
                      cursor: "pointer",
                      color: "black",
                      transition: "transform 0.3s ease",

                      display: "flex",
                    }}
                  >
                    <Typography
                      variant={"h3"}
                      fontSize={70}
                      height={40}
                      fontWeight={"bold"}
                      /* paddingTop={1} */
                      fontFamily={"'Roboto light', sans-serif"}
                    >
                      Socket
                    </Typography>
                    <Typography
                      variant={"h3"}
                      fontSize={34}
                      height={34}
                      fontWeight={"bold"}
                      paddingBottom={2.2}
                      fontFamily={"'Roboto light', sans-serif"}
                    >
                      .store
                    </Typography>
                  </Box>
                  <Typography
                    fontSize={24}
                    marginBottom={3}
                    fontFamily={"Ubuntu"}
                    variant="h4"
                    fontWeight={"bold"}
                    gutterBottom
                  >
                    <br />
                    <br />
                    Наша мета – бути корисними
                  </Typography>
                  <Typography
                    fontSize={20}
                    fontFamily={"Ubuntu"}
                    variant="h4"
                    gutterBottom
                  >
                    Ми віримо, що речі існують для того, щоб робити життя
                    простішим, приємнішим і добрішим. Тому і пошук тієї самої
                    речі має бути швидким, зручним та приємним. Ми не просто
                    продаємо побутову техніку, електроніку, прикраси чи вино. Ми
                    допомагаємо знайти саме те, що потрібно, в одному місці та
                    без зайвих хвилювань, щоб ви не витрачали життя на пошуки, а
                    просто жили щасливо. Rozetka – це універсальна відповідь на
                    будь-який запит, початок пошуку та його кінцева зупинка,
                    справжній помічник. Ми назавжди позбавляємо своїх покупців
                    неприємних компромісів, виконуємо бажання і дозволяємо
                    мріяти сміливіше. Завдяки розумному пошуку та чесному
                    сервісу ми робимо життя наших клієнтів трішки кращими прямо
                    зараз.
                  </Typography>
                  <Typography
                    fontSize={24}
                    marginBottom={3}
                    fontFamily={"Ubuntu"}
                    variant="h4"
                    fontWeight={"bold"}
                    gutterBottom
                  >
                    <br />
                    <br />
                    Щастя починається з простих речей
                  </Typography>
                  <Typography
                    fontSize={20}
                    fontFamily={"Ubuntu"}
                    variant="h4"
                    gutterBottom
                  >
                    І ми допомагаємо знайти ці речі: закоханим нагадуємо, чим
                    здивувати один одного; спортивних мотивуємо ніколи не
                    здаватися та швидше прогресувати; господарським даємо
                    можливість створити справжній затишок. Ми хочемо, щоб ви
                    знали, що шукаєте, і могли б аргументувати свій вибір. Для
                    цього ми знімаємо відеоогляди, пишемо статті та відстежуємо
                    новинки.
                  </Typography>
                  <Typography
                    fontSize={24}
                    marginBottom={3}
                    fontFamily={"Ubuntu"}
                    variant="h4"
                    fontWeight={"bold"}
                    gutterBottom
                  >
                    <br />
                    <br />
                    Щоб мрії здійснювалися легко
                  </Typography>
                  <Typography
                    fontSize={20}
                    fontFamily={"Ubuntu"}
                    variant="h4"
                    gutterBottom
                  >
                    Ми відкриваємо величезні офлайн-магазини, щоб ви могли
                    прийти, потримати в руках і протестувати продукт, що
                    сподобався. Ми хочемо, щоб у нас був найкращий у світі
                    сервіс, тому навчаємо співробітників не лише технічній
                    стороні роботи, а й роботі з клієнтом.
                  </Typography>
                  <Box>
                    <Box
                      display={"flex"}
                      flexDirection={"row"}
                      justifyContent={"center"}
                    >
                      <Box width={300}>
                        <Typography
                          fontSize={35}
                          marginBottom={1}
                          fontFamily={"Ubuntu"}
                          variant="h4"
                          fontWeight={"bold"}
                          gutterBottom
                        >
                          <br />
                          <br />
                          3.9 млн
                        </Typography>
                        <Typography
                          fontSize={20}
                          fontFamily={"Ubuntu"}
                          variant="h4"
                          gutterBottom
                        >
                          доступних до купівлі товарів
                        </Typography>
                      </Box>
                      <Box marginLeft={3} width={300}>
                        <Typography
                          fontSize={35}
                          marginBottom={1}
                          fontFamily={"Ubuntu"}
                          variant="h4"
                          fontWeight={"bold"}
                          gutterBottom
                        >
                          <br />
                          <br />
                          789 млн
                        </Typography>
                        <Typography
                          fontSize={20}
                          fontFamily={"Ubuntu"}
                          variant="h4"
                          gutterBottom
                        >
                          користувачів відвідали Socket.store у 2018 році
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      display={"flex"}
                      flexDirection={"row"}
                      justifyContent={"center"}
                    >
                      <Box width={300}>
                        <Typography
                          fontSize={35}
                          marginBottom={1}
                          fontFamily={"Ubuntu"}
                          variant="h4"
                          fontWeight={"bold"}
                          gutterBottom
                        >
                          <br />
                          <br />
                          81%
                        </Typography>
                        <Typography
                          fontSize={20}
                          fontFamily={"Ubuntu"}
                          variant="h4"
                          gutterBottom
                        >
                          наших покупців повертаються
                        </Typography>
                      </Box>
                      <Box marginLeft={3} width={300}>
                        <Typography
                          fontSize={35}
                          marginBottom={1}
                          fontFamily={"Ubuntu"}
                          variant="h4"
                          fontWeight={"bold"}
                          gutterBottom
                        >
                          <br />
                          <br />
                          2.5 млн
                        </Typography>
                        <Typography
                          fontSize={20}
                          fontFamily={"Ubuntu"}
                          variant="h4"
                          gutterBottom
                        >
                          відвідувачів на день
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Typography
                    fontSize={24}
                    marginBottom={3}
                    fontFamily={"Ubuntu"}
                    variant="h4"
                    fontWeight={"bold"}
                    gutterBottom
                  >
                    <br />
                    <br />
                    Зручна доставка
                  </Typography>
                  <Typography
                    fontSize={20}
                    fontFamily={"Ubuntu"}
                    variant="h4"
                    gutterBottom
                  >
                    І звісно, будь-який товар можна замовити з доставкою. Ми
                    доставляємо Києвом протягом одного дня, а Україною —
                    наступного дня. Все – без передоплати, якщо потрібно – у
                    кредит. Оплата готівкова чи безготівкова – як вам зручніше.
                  </Typography>

                  <Typography
                    fontSize={24}
                    marginBottom={3}
                    fontFamily={"Ubuntu"}
                    variant="h4"
                    fontWeight={"bold"}
                    gutterBottom
                  >
                    <br />
                    <br />
                    Дальше більше
                  </Typography>
                  <Typography
                    fontSize={20}
                    fontFamily={"Ubuntu"}
                    variant="h4"
                    gutterBottom
                  >
                    Ми хочемо, щоб у наших клієнтів взагалі ніколи не виникало
                    питання «де знайти щось потрібне». Тому тепер ми не лише
                    найбільший онлайн-рітейлер, але ще й майданчик для
                    продавців. Хтось почне з нами свій перший бізнес (або
                    розширить існуючий), а хтось привезе в Україну продукти,
                    яких поки що немає. Це вигідно всім: і покупцям, і
                    продавцям, і навіть нам — адже так ми допоможемо більшій
                    кількості людей стати трохи щасливішими.
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
