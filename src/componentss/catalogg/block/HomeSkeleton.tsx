import { Box, Card, CircularProgress } from "@mui/material";



export default function HomeSkeleton() {
    return(
        <Card
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
            <CircularProgress size={50} sx = {{margin: '0 auto'}} />
        </Card>
    )
}