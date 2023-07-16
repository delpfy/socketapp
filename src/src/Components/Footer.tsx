import { Box, Link, Typography } from "@mui/material";

export default function Footer () {
    return(
        <Box width='100%' height='6vh' sx = {{backgroundColor : 'black', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Typography  fontFamily={"Comfortaa"} color = 'white'>Created by  
              <Link href="https://github.com/delpfy" fontFamily={"Comfortaa"} > &copy;Delpfy</Link>
            </Typography>
        </Box>
    )
}