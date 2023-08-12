import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import RecentlyReviewed from "../../componentss/RecentlyReviewed";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Guarantees() {
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
          Гарантії
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
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography fontSize={23}>Гарантійне обслуговування</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Paper
                  elevation={5}
                  sx={{
                    marginBottom: 5,
                    height: 400,
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    fontFamily: "Ubuntu",
                  }}
                >
                  banner
                </Paper>
                <Box maxWidth="md">
                  <Typography
                    fontSize={23}
                    fontFamily={"Ubuntu"}
                    variant="h4"
                    gutterBottom
                  >
                    Гарантійне обслуговування товарів у Сокет
                  </Typography>
                  <Typography
                    fontSize={23}
                    fontFamily={"Ubuntu"}
                    variant="body1"
                    paragraph
                  >
                    На всі товари, придбані у Сокет, надається гарантія, яка дає
                    право на:
                  </Typography>
                  <ul>
                    <li style={{ fontFamily: "Ubuntu", fontSize: "22px" }}>
                      Обмін або повернення товару протягом 14 днів з моменту
                      придбання
                    </li>
                    <li style={{ fontFamily: "Ubuntu", fontSize: "22px" }}>
                      Безкоштовний ремонт в гарантійний період з правилами
                      експлуатації
                    </li>
                    <li style={{ fontFamily: "Ubuntu", fontSize: "22px" }}>
                      Обмін чи повернення товару за актом від Авторизованого
                      сервісного центру після гарантійного обслуговування
                      (згідно із Законом України «Про захист прав споживачів»)
                    </li>
                  </ul>
                  <Typography
                    fontSize={23}
                    fontFamily={"Ubuntu"}
                    variant="body1"
                    paragraph
                  >
                    Для розгляду гарантійного обслуговування, дотримуйте
                    наступних рекомендацій:
                  </Typography>
                  <Typography
                    fontSize={23}
                    fontFamily={"Ubuntu"}
                    variant="body1"
                  >
                    <strong>
                      Для товарів з інформацією (смартфони, ноутбуки, планшети
                      тощо):
                    </strong>
                  </Typography>

                  <Typography
                    fontSize={23}
                    fontFamily={"Ubuntu"}
                    variant="body1"
                  >
                    <strong>
                      Для великої побутової техніки та товарів, що потребують
                      демонтажу:
                    </strong>
                  </Typography>

                  <Typography
                    fontSize={23}
                    fontFamily={"Ubuntu"}
                    variant="body1"
                  >
                    Передайте товар для гарантійного обслуговування разом з
                    наступними документами:
                  </Typography>

                  <Typography
                    fontSize={23}
                    fontFamily={"Ubuntu"}
                    variant="body1"
                    paragraph
                  >
                    Якщо ви придбали товар у магазині Сокет, виберіть один із
                    способів передачі:
                  </Typography>
                  <ul>
                    <li style={{ fontFamily: "Ubuntu", fontSize: "22px" }}>
                      До Авторизованого сервісного центру виробника
                    </li>
                    <li style={{ fontFamily: "Ubuntu", fontSize: "22px" }}>
                      До найближчого магазину Сокет
                    </li>
                  </ul>
                  <Typography
                    fontSize={23}
                    fontFamily={"Ubuntu"}
                    variant="body1"
                    paragraph
                  >
                    Якщо продавцем не є Сокет, то зверніться до продавця за
                    деталями.
                  </Typography>
                  <Typography
                    fontSize={23}
                    fontFamily={"Ubuntu"}
                    variant="body1"
                  >
                    Для додаткової інформації про права споживача перегляньте{" "}
                    <Link href="#">
                      статтю 8 Закону України «Про захист прав споживачів»
                    </Link>
                    .
                  </Typography>
                  <Typography
                    fontSize={23}
                    fontFamily={"Ubuntu"}
                    variant="body1"
                  >
                    Якщо у вас є додаткові питання, зв'яжіться з нами на гарячій
                    лінії (0 800) 300 100 .
                  </Typography>
                </Box>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography fontSize={23}>Обмін і повернення</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Paper
                  elevation={5}
                  sx={{
                    marginBottom: 5,
                    height: 400,
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  banner
                </Paper>
                <Box maxWidth="md">
                  <Typography
                    fontSize={23}
                    fontFamily={"Ubuntu"}
                    variant="h4"
                    gutterBottom
                  >
                    <strong>Обмін і повернення по гарантії</strong>
                  </Typography>
                  <Typography
                    fontSize={23}
                    fontFamily={"Ubuntu"}
                    variant="body1"
                    paragraph
                  >
                    Для того, щоб скористатися послугою повернення або обміну
                    потрібно переконатися, що ви маєте все необхідне:
                  </Typography>
                  <ul style={{ paddingBottom: 25 }}>
                    <li style={{ fontFamily: "Ubuntu", fontSize: "22px" }}>
                      Минуло не більше 14 днів з моменту придбання товару
                    </li>
                    <li style={{ fontFamily: "Ubuntu", fontSize: "22px" }}>
                      Товар в повній комплектації без ознак використання і
                      пошкоджень
                    </li>
                    <li style={{ fontFamily: "Ubuntu", fontSize: "22px" }}>
                      Акт прийому-передачі, видаткова накладна (документ, що
                      підтверджує факт придбання товару)
                    </li>
                    <li style={{ fontFamily: "Ubuntu", fontSize: "22px" }}>
                      Візьміть з собою паспорт або інший документ, що посвідчує
                      особу
                    </li>
                  </ul>
                  <Typography
                    fontSize={23}
                    fontFamily={"Ubuntu"}
                    variant="body1"
                  >
                    <strong>
                      Як обміняти або повернути товар, який не влаштував, не
                      сподобався або з іншої причини?
                    </strong>
                  </Typography>
                  <ul style={{ paddingBottom: 25 }}>
                    <li style={{ fontFamily: "Ubuntu", fontSize: "22px" }}>
                      Переконайтеся, будь ласка, що від дати покупки минуло не
                      більше 14 днів без урахування дня купівлі;
                    </li>
                    <li style={{ fontFamily: "Ubuntu", fontSize: "22px" }}>
                      Перевірте, будь ласка, відсутність вашого товару в
                      Переліку товарів належної якості, що не підлягають обміну
                      чи поверненню;
                    </li>
                    <li style={{ fontFamily: "Ubuntu", fontSize: "22px" }}>
                      Переконайтеся, що на товарі відсутні ознаки використання
                      та пошкодження, наявна повна комплектація товару (як на
                      момент придбання), збережено його товарний вигляд та всі
                      споживчі властивості (товар вмикається, всі функції
                      робочі). Якщо товар не вмикається або працює з проблемами
                      – будь ласка, ознайомтеся з інформацією про гарантійне
                      обслуговування.
                    </li>
                    <li style={{ fontFamily: "Ubuntu", fontSize: "22px" }}>
                      Візьміть з собою паспорт або інший документ, що посвідчує
                      особу
                    </li>
                  </ul>

                  <Typography
                    fontSize={23}
                    fontFamily={"Ubuntu"}
                    variant="body1"
                  >
                    <strong>
                      Підготуйте, будь ласка, всі необхідні документи:
                    </strong>
                  </Typography>
                  <ul style={{ paddingBottom: 25 }}>
                    <li style={{ fontFamily: "Ubuntu", fontSize: "22px" }}>
                      Виданий продавцем розрахунковий документ (чек / акт
                      приймання-передачі / накладна або ін.), що засвідчує факт
                      купівлі;
                    </li>
                    <li style={{ fontFamily: "Ubuntu", fontSize: "22px" }}>
                      Гарантійний талон;
                    </li>
                    <li style={{ fontFamily: "Ubuntu", fontSize: "22px" }}>
                      Документ, що посвідчує особу;
                    </li>
                    <li style={{ fontFamily: "Ubuntu", fontSize: "22px" }}>
                      Iдентифікаційний податковий номер (ІПН);
                    </li>
                    <li style={{ fontFamily: "Ubuntu", fontSize: "22px" }}>
                      В разі сплати покупки банківською карткою – актуальні
                      реквізити карткового рахунку.
                    </li>
                  </ul>

                  <Typography
                    fontSize={23}
                    fontFamily={"Ubuntu"}
                    variant="body1"
                  >
                    Шановний клієнт
                  </Typography>
                  <Typography
                    fontSize={23}
                    fontFamily={"Ubuntu"}
                    variant="body1"
                  >
                    Якщо у вас виникнуть додаткові питання, зверніться на нашу
                    гарячу лінію (0 800) 300 100.
                  </Typography>
                  <Typography
                    fontSize={23}
                    fontFamily={"Ubuntu"}
                    variant="body1"
                  >
                    Корисна інформація про права споживача у разі придбання ним
                    товару належної якості – стаття{" "}
                    <Link href="#">
                      9 Закону України «Про захист прав споживачів».
                    </Link>
                  </Typography>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Paper>
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
