import { Box, IconButton, Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Telegram, Instagram, YouTube, Facebook } from "@mui/icons-material";
import LogoFooter from "./menuu/logotype/LogoFooter";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <Box
    width="100%"
      sx={{
        backgroundColor: "black",
        marginTop: {
          xs: 3, md: 0
        } 
      }}
    >
      <Box
        width="100%"
        sx={{
          display: "flex",
          paddingTop: 7,
          paddingBottom: 7,
          justifyContent: "flex-start",
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: "100%",
            width: "21%",

            flexDirection: "column",
            alignItems: "flex-start",

            paddingLeft: "15%",
            justifyContent: "space-between",
          }}
        >
          <LogoFooter />
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "row", md: "column" },
              alignItems: { xs: "flex-start", md: "flex-start" },
              
            }}
          >
            <Box paddingTop={1}>
              <Typography fontFamily={"Comfortaa"} fontSize={18} color="white">
                Консультація
              </Typography>

              <Typography fontFamily={"Comfortaa"} fontSize={13} color="white">
                0-800-707-400
              </Typography>
            </Box>

            <Box paddingTop={1} sx = {{marginLeft: {xs: 5, md: 0}}}>
              <Typography fontFamily={"Comfortaa"} fontSize={19} color="white">
                Контакти
              </Typography>

              <Typography fontFamily={"Comfortaa"} fontSize={13} color="white">
                info@socket.store.ua
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
            }}
            justifyContent={"space-between"}
            alignItems={"flex-end"}
            paddingTop={1}
            maxWidth={150}
            minWidth={150}
          >
            <Link href="https://www.facebook.com/">
              <IconButton sx={{ paddingLeft: 0 }}>
                <img
                  src={require("../img/facebookIcon.png")}
                  style={{ width: 8, height: 18 }}
                  alt="sdf"
                />
              </IconButton>
            </Link>
            <Link href="https://twitter.com/">
              <IconButton sx={{ paddingLeft: 0 }}>
                <img
                  src={require("../img/twitterIcon.png")}
                  style={{ width: 23, height: 18 }}
                  alt="sdf"
                />
              </IconButton>
            </Link>

            <Link href="https://www.linkedin.com">
              <IconButton sx={{ paddingLeft: 0 }}>
                <img
                  src={require("../img/inIcon.png")}
                  style={{ width: 20, height: 18 }}
                  alt="sdf"
                />
              </IconButton>
            </Link>

            <Link href="https://www.instagram.com/">
              <IconButton sx={{ paddingLeft: 0 }}>
                <img
                  src={require("../img/instaIcon.png")}
                  style={{ width: 20, height: 18 }}
                  alt="sdf"
                />
              </IconButton>
            </Link>
          </Box>

          <Typography
            fontFamily={"Comfortaa"}
            marginTop={"21%"}
            marginBottom={"6%"}
            color="white"
            width={200}
          >
            &copy; 2023 Socket.store
          </Typography>
        </Box>

        <Box
          width="40%"
          sx={{
            paddingTop: 4,

            alignItems: "flex-start",
            flexDirection: "column",
            justifyContent: "space-between",
            display: {
              xs: "none",
              md: "flex",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              alignSelf: "flex-start",
              width: "60%",
              height: "40%",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                height: "100%",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <Typography fontFamily={"Comfortaa"} fontSize={20} color="white">
                Компанія
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  sx={{
                    color: "rgba(255,255,255,.5)",
                    cursor: "pointer",
                    "&:hover": { color: "#fff" },
                    transition: "color .2s ease",
                  }}
                  fontFamily={"Comfortaa"}
                  color="white"
                  onClick={() => navigate("/about")}
                >
                  О компанії
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(255,255,255,.5)",
                    cursor: "pointer",
                    "&:hover": { color: "#fff" },
                    transition: "color .2s ease",
                  }}
                  fontFamily={"Comfortaa"}
                  color="white"
                  onClick={() => navigate("/posts")}
                >
                  Статті
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(255,255,255,.5)",
                    cursor: "pointer",
                    "&:hover": { color: "#fff" },
                    transition: "color .2s ease",
                  }}
                  fontFamily={"Comfortaa"}
                  color="white"
                  onClick={() => navigate("/contact")}
                >
                  Контакти
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: {
                  xs: "none",
                  md: "flex",
                },
                height: "100%",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <Typography fontFamily={"Comfortaa"} fontSize={20} color="white">
                Покупцям
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",

                  justifyContent: "space-between",
                }}
              >
                <Typography
                  sx={{
                    color: "rgba(255,255,255,.5)",
                    cursor: "pointer",
                    "&:hover": { color: "#fff" },
                    transition: "color .2s ease",
                  }}
                  fontFamily={"Comfortaa"}
                  color="white"
                  onClick={() => navigate("/return")}
                >
                  Повернення товару
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(255,255,255,.5)",
                    cursor: "pointer",
                    "&:hover": { color: "#fff" },
                    transition: "color .2s ease",
                  }}
                  fontFamily={"Comfortaa"}
                  color="white"
                  onClick={() => navigate("/delivery")}
                >
                  Доставка
                </Typography>

                <Typography
                  sx={{
                    color: "rgba(255,255,255,.5)",
                    cursor: "pointer",
                    "&:hover": { color: "#fff" },
                    transition: "color .2s ease",
                  }}
                  fontFamily={"Comfortaa"}
                  color="white"
                  onClick={() => navigate("/quarantees")}
                >
                  Гарантії
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
