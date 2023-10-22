import { Box, IconButton, Link, Typography } from "@mui/material";
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
            width: {
              xs: "80%",
              sm: "73%",
            },
            margin: "0 auto",
            display: "flex",
            flexDirection: {
              xs: "column",
              sm: "column",
              md: "row",
            },
            alignItems: {
              xs: "center",
              sm: "center",
              md: "flex-start",
            },
            justifyContent: "space-around",
          }}
        >
          <Box
            border={"1px solid black"}
            sx={{
              width: {
                xs: "100%",
                sm: "100%",
                md: "40%",
              },
              marginBottom: {
                xs: 1,
                sm: 1,
                md: 0,
              },
              padding: 2,

              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box
              paddingBottom={5}
              width={290}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <img
                src={require("../../img/feedbackIcon.png")}
                style={{ width: 35, height: 35 }}
                alt="sdf"
              />
              <Typography
                fontWeight={"bold"}
                fontSize={28}
                fontFamily={"Ubuntu"}
              >
                Зворотній зв'язок
              </Typography>
            </Box>

            <Box>
              <Box
                paddingBottom={2}
                width={"100%"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography fontSize={27} fontFamily={"Ubuntu"}>
                  Gmail:
                </Typography>
                <Typography fontSize={27} fontFamily={"Ubuntu"}>
                  email@gmail.com
                </Typography>
              </Box>

              <Box
                paddingBottom={17}
                width={"100%"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography fontSize={27} fontFamily={"Ubuntu"}>
                  Номер телефона:
                </Typography>
                <Typography fontSize={27} fontFamily={"Ubuntu"}>
                  0 666 666-666
                </Typography>
              </Box>
            </Box>
            <Typography fontWeight={"bold"} fontSize={27} fontFamily={"Ubuntu"}>
              Безкоштовно зі стаціонарних і мобільних телефонів в Україні
            </Typography>
          </Box>
          <Box
            sx={{
              width: {
                xs: "100%",
                sm: "100%",
                md: "50%",
              },

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
              <Box
                paddingBottom={4}
                width={290}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <img
                  src={require("../../img/informationIcon.png")}
                  style={{ width: 35, height: 35 }}
                  alt="sdf"
                />
                <Typography
                  fontWeight={"bold"}
                  fontSize={28}
                  fontFamily={"Ubuntu"}
                >
                  Довідковий центр
                </Typography>
              </Box>
              <Typography
                variant="h1"
                paddingBottom={1}
                fontSize={27}
                fontFamily={"Ubuntu"}
              >
                Контакти прес-служби: email@gmail.com
              </Typography>
              <Typography
                variant="h1"
                paddingBottom={1}
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
                flexDirection: {
                  xs: "column",
                  sm: "row",
                },
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="h1"
                paddingBottom={2}
                fontSize={28}
                fontFamily={"Ubuntu"}
              >
                Ми в соцмережах
              </Typography>
              <Box
                sx={{
                  display: "flex",

                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <Link href="https://www.facebook.com/">
                  <IconButton
                    sx={{
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-3px)",
                      },
                      "&:active": {
                        transform: "translateY(0)",
                      },
                    }}
                  >
                    <img
                      src={require("../../img/facebookBlackIcon.png")}
                      style={{ width: 13, height: 26 }}
                      alt="sdf"
                    />
                  </IconButton>
                </Link>
                <Link href="https://twitter.com/">
                  <IconButton
                    sx={{
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-3px)",
                      },
                      "&:active": {
                        transform: "translateY(0)",
                      },
                    }}
                  >
                    <img
                      src={require("../../img/twitterBlackIcon.png")}
                      style={{ width: 28, height: 23 }}
                      alt="sdf"
                    />
                  </IconButton>
                </Link>

                <Link href="https://www.linkedin.com">
                  <IconButton
                    sx={{
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-3px)",
                      },
                      "&:active": {
                        transform: "translateY(0)",
                      },
                    }}
                  >
                    <img
                      src={require("../../img/inBlackIcon.png")}
                      style={{ width: 25, height: 23 }}
                      alt="sdf"
                    />
                  </IconButton>
                </Link>

                <Link href="https://www.instagram.com/">
                  <IconButton
                    sx={{
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-3px)",
                      },
                      "&:active": {
                        transform: "translateY(0)",
                      },
                    }}
                  >
                    <img
                      src={require("../../img/instaBlackIcon.png")}
                      style={{ width: 25, height: 23 }}
                      alt="sdf"
                    />
                  </IconButton>
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
