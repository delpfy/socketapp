import { Box, Card, CircularProgress } from "@mui/material";



export default function HomeSkeleton() {
    return(
        <Card
          sx={{
            maxWidth: {
              xs: 160,
              md: 200,
            },
            minWidth: {
              xs: 160,
              md: 200,
            },
            minHeight: 320,
            maxHeight: 320,
            display: "flex",
            flexDirection: "column",
            alignItems: 'center',
            justifyContent: "center",
            padding: "11%",
          }}
        >
            <CircularProgress size={50} sx = {{margin: '0 auto'}} />
        </Card>
    )
}