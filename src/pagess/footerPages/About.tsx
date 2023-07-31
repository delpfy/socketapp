import { Box, Paper, Typography } from "@mui/material";
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
        <Typography
          variant="h1"
          textAlign={"center"}
          paddingBottom={5}
          fontSize={30}
          fontFamily={"Ubuntu"}
        >
          О компанії
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
              Інтернет-магазин "Сокет" - надійний партнер у світі електроніки та
              побутової техніки в Україні.
            </Typography>
            <Typography
              variant="h1"
              paddingBottom={5}
              fontSize={22}
              fontFamily={"Ubuntu"}
            >
              "Сокет" - це одна з найбільших торгових мереж в Україні, яка
              заслужено користується довіру споживачів завдяки своїй якості
              обслуговування та широкому асортименту товарів. Наша мета -
              зробити процес покупки електроніки та побутової техніки
              максимально комфортним і приємним для кожного клієнта.{" "}
            </Typography>
            <Typography
              variant="h1"
              paddingBottom={5}
              fontSize={22}
              fontFamily={"Ubuntu"}
            >
              Заснована у 1994 році, "Сокет" з початку своєї діяльності ставить
              на перше місце задоволення потреб клієнтів. За 29 років роботи ми
              змогли значно розширити мережу магазинів і на даний момент
              налічуємо вже 162 заклади з загальною площею торгових приміщень
              154 тис. кв. м. Наші магазини розташовані у 90 обласних та
              районних центрах по всій Україні, наближаючи зручність покупки
              кожному клієнту.
            </Typography>
            <Typography
              variant="h1"
              paddingBottom={5}
              fontSize={22}
              fontFamily={"Ubuntu"}
            >
              Ми прагнемо створювати не просто магазини електроніки, але і
              справжні місця, де кожен покупець може знайти все необхідне для
              комфортного та сучасного життя. Ми віримо, що доступ до новітніх
              технологій та інновацій має бути легким і зрозумілим, тому ми
              докладаємо максимум зусиль, щоб забезпечити вас тільки якісними та
              перевіреними товарами.
            </Typography>
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
              image
            </Paper>
            <Typography
              variant="h1"
              paddingBottom={5}
              fontSize={22}
              fontFamily={"Ubuntu"}
            >
              Компанія "Сокет" продовжує активно розвиватися та займати провідні
              позиції на ринку електроніки та побутової техніки в Україні.
              Інновації та сучасні технології завжди перебувають в центрі нашої
              уваги, і ми пишаємося, що можемо пропонувати нашим клієнтам лише
              найкраще.
            </Typography>
            <Typography
              variant="h1"
              paddingBottom={5}
              fontSize={22}
              fontFamily={"Ubuntu"}
            >
              Ребрендинг "Сокет" в 2019-2020 роках став важливим етапом в
              історії компанії. З призивом "Оновлюйся!" ми змінили
              позиціонування та візуальний стиль, покращили комунікацію зі
              споживачами та зробили покупки у наших магазинах ще приємнішими.
              Перші магазини нового формату відкрилися в Броварах, а починаючи з
              цього часу, ми поступово змінюємо обличчя більшості магазинів
              нашої мережі.
            </Typography>
            <Typography
              variant="h1"
              paddingBottom={5}
              fontSize={22}
              fontFamily={"Ubuntu"}
            >
              "Сокет" завжди прагне залишатися на злагоді з часом, тому ми
              активно диджиталізуємо бізнес-процеси та комунікацію зі
              споживачами. Наша програма лояльності "Фокс Клуб" нараховує вже
              10,8 мільйонів учасників, які отримують спеціальні пропозиції та
              першочерговий доступ до новинок.
            </Typography>
            <Typography
              variant="h1"
              paddingBottom={5}
              fontSize={22}
              fontFamily={"Ubuntu"}
            >
              Ми пишаємося, що компанія "Сокет" не лише вирізняється як
              провідний ритейлер електроніки та техніки, але й служить прикладом
              корпоративної соціальної відповідальності. Проекти "Зелений офіс"
              та "ЕКОклас" свідчать про наш прагнення зменшити вплив на
              навколишнє середовище та забезпечити екологічну грамотність. Наша
              участь у проекті "Школа безпеки" допомагає підвищити безпеку дітей
              в різних сферах життя.
            </Typography>
            <Typography
              variant="h1"
              paddingBottom={5}
              fontSize={22}
              fontFamily={"Ubuntu"}
            >
              Наш бренд "Сокет" займає провідну позицію в рейтингах найкращих
              компаній-роботодавців в Україні. Ми віримо, що найціннішим
              ресурсом є наші співробітники, тому надаємо їм всі можливості для
              розвитку та самореалізації.
            </Typography>
            <Typography
              variant="h1"
              paddingBottom={5}
              fontSize={22}
              fontFamily={"Ubuntu"}
            >
              "Сокет" - це не просто торгова мережа, це спільнота людей, які
              прагнуть вдосконалюватися, рости та змінювати світ навколо себе.
              Ми продовжуємо розвиватися та впроваджувати інновації, дбаючи про
              задоволення наших клієнтів та зберігаючи наші лідерські позиції на
              ринку. Дякуємо вам за те, що обираєте "Сокет" - вашу надійну
              платформу для покупки електроніки та побутової техніки.{" "}
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
