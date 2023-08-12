import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
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
                <Typography fontSize={23} >Гарантійне обслуговування</Typography>
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
                    fontFamily: 'Ubuntu'
                  }}
                >
                  banner
                </Paper>
                <Box maxWidth="md">
                  <Typography fontSize={23} fontFamily={'Ubuntu'}variant="h4" gutterBottom>
                    Гарантійне обслуговування товарів у Сокет
                  </Typography>
                  <Typography fontSize={23} fontFamily={'Ubuntu'}variant="body1" paragraph>
                    На всі товари, придбані у Сокет, надається гарантія, яка дає
                    право на:
                  </Typography>
                  <ul>
                    <li style={{fontFamily: 'Ubuntu', fontSize: '22px'}}>
                      Обмін або повернення товару протягом 14 днів з моменту
                      придбання
                    </li>
                    <li style={{fontFamily: 'Ubuntu', fontSize: '22px'}}>
                      Безкоштовний ремонт в гарантійний період з правилами
                      експлуатації
                    </li>
                    <li style={{fontFamily: 'Ubuntu', fontSize: '22px'}}>
                      Обмін чи повернення товару за актом від Авторизованого
                      сервісного центру після гарантійного обслуговування
                      (згідно із Законом України «Про захист прав споживачів»)
                    </li>
                  </ul>
                  <Typography fontSize={23} fontFamily={'Ubuntu'}variant="body1" paragraph>
                    Для розгляду гарантійного обслуговування, дотримуйте
                    наступних рекомендацій:
                  </Typography>
                  <Typography fontSize={23} fontFamily={'Ubuntu'}variant="body1">
                    <strong>
                      Для товарів з інформацією (смартфони, ноутбуки, планшети
                      тощо):
                    </strong>
                  </Typography>
                  
                  <Typography fontSize={23} fontFamily={'Ubuntu'}variant="body1">
                    <strong>
                      Для великої побутової техніки та товарів, що потребують
                      демонтажу:
                    </strong>
                  </Typography>
                  
                  <Typography fontSize={23} fontFamily={'Ubuntu'}variant="body1">
                    Передайте товар для гарантійного обслуговування разом з
                    наступними документами:
                  </Typography>
                  
                  <Typography fontSize={23} fontFamily={'Ubuntu'}variant="body1" paragraph>
                    Якщо ви придбали товар у магазині Сокет, виберіть один із
                    способів передачі:
                  </Typography>
                  <ul>
                    <li style={{fontFamily: 'Ubuntu', fontSize: '22px'}}>До Авторизованого сервісного центру виробника</li>
                    <li style={{fontFamily: 'Ubuntu', fontSize: '22px'}}>До найближчого магазину Сокет</li>
                  </ul>
                  <Typography fontSize={23} fontFamily={'Ubuntu'}variant="body1" paragraph>
                    Якщо продавцем не є Сокет, то зверніться до продавця за
                    деталями.
                  </Typography>
                  <Typography fontSize={23} fontFamily={'Ubuntu'}variant="body1">
                    Для додаткової інформації про права споживача перегляньте{" "}
                    <Link href="#">
                      статтю 8 Закону України «Про захист прав споживачів»
                    </Link>
                    .
                  </Typography>
                  <Typography fontSize={23} fontFamily={'Ubuntu'}variant="body1">
                    Якщо у вас є додаткові питання, зв'яжіться з нами на{" "}
                    <Link href="">
                      гарячій лінії (0 800) 300 100
                    </Link>
                    .
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
                <Typography 
                  variant="h1"
                  paddingBottom={5}
                  fontSize={30}
                  fontFamily={"Ubuntu"}
                >
                  Інтернет-магазин "Сокет" - надійний партнер у світі
                  електроніки та побутової техніки в Україні.
                </Typography>
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
