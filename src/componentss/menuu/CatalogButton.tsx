import { Box, Typography } from "@mui/material";

export default function CatalogButton() {
  return (
    <>
      <Box
        width={200}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: {
            xs: "white",
            sm: "white",
            md: "black",
          },
          color: {
            xs: "black",
            sm: "black",
            md: "white",
          },
        }}
        paddingRight={2}
      >
        <img
          src={require(window.innerWidth > 1024
            ? "../../img/catalogWhiteIcon.png"
            : "../../img/catalogBlackIcon.png")}
          style={{ width: 20, height: 20 }}
          alt="sdf"
        />
        <Typography width={"83%"} fontSize={15}>
          Каталог товарів
        </Typography>{" "}
      </Box>
    </>
  );
}
