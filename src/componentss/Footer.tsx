import { Box, Divider, Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Telegram, Instagram, YouTube, Facebook} from "@mui/icons-material";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        backgroundColor: "#0c061a",
      }}
    >
      <Box
        width="100%"
        
        sx={{
          display: "flex",
          
          justifyContent: "flex-start",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "30%",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: 10,
            justifyContent: "flex-start",
          }}
        >
          <Typography fontFamily={"Comfortaa"} fontSize={30} color="white">
            Сокет
          </Typography>
          <Typography fontFamily={"Comfortaa"} color="white">
            Created by
            <Link href="https://github.com/delpfy"> &copy;Delpfy</Link>
          </Typography>
        </Box>

        <Box
          width="40%"
          height={400}
          sx={{
            display: "flex",
            
            alignItems: "center",
            paddingTop: 5,
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              alignSelf: 'flex-start',
              width: "60%",
              height: 300,
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                height: "100%",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Typography fontFamily={"Comfortaa"} fontSize={20} color="white">
                Компанія
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",

                  height: 100,
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
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                height: "100%",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Typography fontFamily={"Comfortaa"} fontSize={20} color="white">
                Покупцям
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: 100,
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
                  onClick={() => navigate("/posts")}
                >
                  Статті
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box
            height={150}
            width={"100%"}
            sx={{
              display: "flex",
              alignSelf: 'flex-start',
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                color: "#fff"
              }}
              fontFamily={"Comfortaa"}
            >
              Ми в соцмережах: 
            </Typography>
            <Box sx={{
              display: "flex",
              width: "70%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}>
              <Link href="https://web.telegram.org/">
              <Telegram color="info" sx= {{paddingRight: 2}}/>
              </Link>
              <Link href="https://www.instagram.com/">
              <Instagram color="info" sx= {{paddingRight: 2}}/>
              </Link>
              <Link href="https://www.youtube.com/">
              <YouTube color="info" sx= {{paddingRight: 2}}/>
              </Link>
              <Link href="https://www.facebook.com/">
              <Facebook color="info" sx= {{paddingRight: 2}}/>
              </Link>
              <Link href="https://www.viber.com/">
              <img src="https://cdn-icons-png.flaticon.com/512/3938/3938039.png" alt="" style={{width: 25, height: 25}}/>
              </Link>
             
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
