import { Box, Paper, Typography } from "@mui/material";
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
        <Typography
          variant="h1"
          textAlign={"center"}
          paddingBottom={5}
          fontSize={30}
          fontFamily={"Ubuntu"}
        >
          Повернення та обмін
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
              fontSize={22}
              fontFamily={"Ubuntu"}
            >
             Обравши техніку в інтернет-магазині "Сокет", ви можете розраховувати на отримання оригінальних та якісних приладів. Повернення, обмін або заміна виробів здійснюється відповідно до положень Закону України під назвою "Про захист прав споживачів".
            </Typography>
            <Typography
              variant="h1"
              paddingBottom={5}
              fontSize={22}
              fontFamily={"Ubuntu"}
            >
              Якщо товар якісний, покупцю надається право розірвати укладений на відстані договір протягом 14 днів після його оформлення.
            </Typography>
            <Typography
              variant="h1"
              paddingBottom={5}
              fontSize={22}
              fontFamily={"Ubuntu"}
            >
              Щоб право на розірвання угоди зберігалось, споживачеві потрібно стежити за збереженням продукції у початковому стані. Якщо прилад знищений, пошкоджений або зіпсований не за вину клієнта, клієнт не позбавляється можливості розірвати угоду. Якщо через розпакування товару або перевірки його функціонування вартість зменшилась, це не означає, що споживач не може написати заяву на повернення грошей.
            </Typography>
            <Typography
              variant="h1"
              paddingBottom={5}
              fontSize={22}
              fontFamily={"Ubuntu"}
            >
              Товар не приймається назад, якщо відсутній хоча б один з компонентів:
            </Typography>
            <Typography
              variant="h1"
              paddingBottom={5}
              fontSize={22}
              fontFamily={"Ubuntu"}
            >
              <ul style={{paddingLeft: 25}}>
                <li  > техніка в повній комплектації;</li>
                <li >чек, що підтверджує факт покупки в інтернет-магазині "Сокет";</li>
                <li >гарантійний талон;</li>
                <li >акт з описом недоліку, який склала сервісна служба.</li>
            </ul>
            </Typography>
            
        
            <Typography
              variant="h1"
              paddingBottom={5}
              fontSize={22}
              fontFamily={"Ubuntu"}
            >
              Гроші за товар будуть повернуті у терміни, встановлені діючим законодавством.
            </Typography>
            <Typography
              variant="h1"
              paddingBottom={5}
              fontSize={22}
              fontFamily={"Ubuntu"}
            >
              Претензії та залишені питання можна задати за телефоном 0 800-300-353 або у онлайн-форматі, заповнивши форму зворотного зв'язку. При складанні претензії за основу береться діюче українське законодавство.
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
