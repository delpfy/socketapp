import { Box, Card, CircularProgress, Skeleton } from "@mui/material";

export default function HomeSkeleton() {
  return (
    <Box
      sx={{
        maxWidth: {
          xs: 160,
          md: 186,
        },
        minWidth: {
          xs: 125,
          md: 186,
        },
        minHeight: 320,
        maxHeight: 320,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 3.5,
      }}
    >
      <Skeleton
        variant="rectangular"
        sx={{
          paddingTop: 0,
          maxHeight: {
            xs: 130,
            md: 180,
          },
          minHeight: {
            xs: 130,
            md: 180,
          },
          width: "100%",
          objectFit: "contain",
          overflow: "hidden",
        }}
      />
      <Skeleton
        sx={{
          paddingTop: 0,
          maxHeight: {
            xs: 40,
            md: 40,
          },
          minHeight: {
            xs: 40,
            md: 40,
          },
          objectFit: "contain",
          overflow: "hidden",
        }}
      />
      <Skeleton
        sx={{
          paddingTop: 0,
          maxHeight: {
            xs: 40,
            md: 40,
          },
          minHeight: {
            xs: 40,
            md: 40,
          },
          minWidth: 80,
          maxWidth: 80,
          objectFit: "contain",
          overflow: "hidden",
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Skeleton
          sx={{
            paddingTop: 0,
            maxHeight: {
              xs: 40,
              md: 40,
            },
            minHeight: {
              xs: 40,
              md: 40,
            },
            minWidth: 50,
            maxWidth: 50,
            objectFit: "contain",
            overflow: "hidden",
          }}
        />
        <Skeleton
          variant="circular"
          sx={{
            paddingTop: 0,
            maxHeight: {
              xs: 30,
              md: 30,
            },
            minHeight: {
              xs: 30,
              md: 30,
            },

            minWidth: 30,
            maxWidth: 30,
            objectFit: "contain",
            overflow: "hidden",
          }}
        />
      </Box>
    </Box>
  );
}
