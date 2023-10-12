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
            Гарантії
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
                    На товари в нашому магазині надається гарантія, що
                    підтверджує зобов'язання щодо відсутності у товарі
                    заводських дефектів. Гарантія надається терміном від 2
                    тижнів до 36 місяців залежно від сервісної політики
                    виробника. Термін гарантії вказаний в описі кожного товару
                    на нашому сайті. <br />
                    <br /> Будь ласка, перевіряйте комплектність та відсутність
                    дефектів у товарі при отриманні. <br />
                    <br /> Гарантійним обслуговуванням займаються сервісні
                    центри авторизовані виробниками. Ви можете надіслати товар
                    на гарантійний ремонт або викликати майстра за рахунок
                    сервісного центру. Доступні варіанти вказані у гарантійному
                    талоні. Адреси та телефони сервісних центрів можна знайти на
                    гарантійному талоні або у списку сервісних центрів.
                    <br />
                    <br /> Якщо у вашому місті немає сервісного центру, який
                    обслуговує товар, ви можете звернутися до сервісного відділу
                    нашого магазину. Або надіслати товар "Новою поштою" або
                    Meest. Як це зробити читайте тут.
                    <br />
                    <br /> У разі необхідності ремонту товарів, які передбачають
                    підключення до водогазопроводу, необхідно звернутися до
                    найближчого сервісного центру виробника для виклику майстра.
                    Майстер огляне товар та складе акт про гарантійність
                    випадку. Якщо на місці буде складено акт із зазначенням
                    того, що випадок справді гарантійний та товар не підлягає
                    ремонту – товар може бути замінений шляхом звернення до
                    сервісного відділу магазину.
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
