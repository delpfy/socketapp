import { Box, Card, CircularProgress } from "@mui/material";



export default function HomeSkeleton() {
    return(
        <Card
          sx={{
            maxWidth: 200,
            minWidth: 200,
            minHeight: 320,
            maxHeight: 320,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "11%",
          }}
        >
            <CircularProgress size={50} />
        </Card>
    )
}