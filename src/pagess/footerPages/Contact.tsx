import { Box, Link, Typography } from "@mui/material";
import RecentlyReviewed from "../../componentss/RecentlyReviewed";
import { useEffect } from "react";
import { Facebook, Instagram, Telegram, YouTube } from "@mui/icons-material";

export default function Contact() {
  const recentlyReviewed = JSON.parse(
    localStorage.getItem("recentlyReviewed") || "{}"
  );
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Box paddingTop={15} marginBottom={4}>
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
            Контакти
          </Typography>
        </Box>
        <Box
          sx={{
            width: "73%",
            margin: "0 auto",
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-around",
          }}
        >
          <Box
            border={"1px solid black"}
            sx={{
              width: "40%",

              padding: 2,
              paddingBottom: 8,
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
              Зворотній зв'язок
            </Typography>
            <Typography
              variant="h1"
              paddingBottom={5}
              fontSize={30}
              fontFamily={"Ubuntu"}
            >
              email@gmail.com
            </Typography>
            <Typography
              variant="h1"
              paddingBottom={5}
              fontSize={30}
              fontFamily={"Ubuntu"}
            >
              0 666 666-666
            </Typography>
            <Typography
              variant="h1"
              paddingBottom={5}
              fontSize={30}
              fontFamily={"Ubuntu"}
            >
              Безкоштовно зі стаціонарних і мобільних телефонів в Україні
            </Typography>
          </Box>
          <Box
            sx={{
              width: "50%",

              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Box
              border={"1px solid black"}
              sx={{
                width: "100%",

                marginBottom: 1,
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
                Контакти прес-служби: email@gmail.com
              </Typography>
              <Typography
                variant="h1"
                paddingBottom={5}
                fontSize={20}
                fontFamily={"Ubuntu"}
              >
                Прес-служба торгової мережі Сокет дякує вам за виявлений
                інтерес. Ми завжди раді своєчасно відповісти на ваш запит і
                розвивати ефективну співпрацю з усіх питань, пов’язаних із
                наданням актуальних матеріалів, офіційних коментарів спікерів і
                експертів компанії, інших публікацій у засобах масової
                інформації.
              </Typography>
            </Box>
            <Box
              border={"1px solid black"}
              sx={{
                width: "100%",
                padding: 2,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="h1"
                paddingBottom={2}
                fontSize={30}
                fontFamily={"Ubuntu"}
              >
                Ми в соцмережах
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  width: "50%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <Link href="https://web.telegram.org/">
                  <Telegram color="info" sx={{ paddingRight: 2 }} />
                </Link>
                <Link href="https://www.instagram.com/">
                  <Instagram color="info" sx={{ paddingRight: 2 }} />
                </Link>
                <Link href="https://www.youtube.com/">
                  <YouTube color="info" sx={{ paddingRight: 2 }} />
                </Link>
                <Link href="https://www.facebook.com/">
                  <Facebook color="info" sx={{ paddingRight: 2 }} />
                </Link>
                <Link href="https://www.viber.com/">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3938/3938039.png"
                    alt=""
                    style={{ width: 25, height: 25 }}
                  />
                </Link>
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
