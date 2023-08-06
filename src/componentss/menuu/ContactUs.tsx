import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { Box, Divider, Link, Typography } from "@mui/material";
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { Telegram } from "@mui/icons-material";
import EmailIcon from '@mui/icons-material/Email';

export default function ContactUs() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Зв'язатися
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem> */}
        <Box padding={1} paddingLeft={0}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              padding: 1,
            }}
          >
            <LocalPhoneIcon
              color="warning"
              sx={{ padding: 1, paddingRight: 2 }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Typography fontSize={15}>0 666 666-666</Typography>
              <Typography fontSize={15}>Безкоштовно по Україні</Typography>
            </Box>
          </Box>
          <Divider light />
          
<Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              padding: 1,
            }}
          >
            <QuestionAnswerIcon
              color="warning"
              sx={{ padding: 1,  paddingRight: 2 }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Typography fontSize={15}>Чат на сайті</Typography>
            
            </Box>
          </Box>
          <Divider light />
            <Link href="https://web.telegram.org/k/"  sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              padding: 1,
            }}>
 <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              padding: 1,
            }}
          >
            <Telegram
              color="warning"
              sx={{  paddingRight: 2 }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Typography fontSize={15}>Telegram</Typography>
              
            </Box>
            
          </Box>
            </Link>
         
            <Divider light />
          <Link href="https://www.viber.com/"  sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              padding: 1,
            }}>
          <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                padding: 1,
              }}
          >
            
              <img src="https://cdn-icons-png.flaticon.com/512/3938/3938039.png" alt="" style={{width: 25, height: 25, padding: 1, paddingRight: 17 }}/>
              
            
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Typography fontSize={15}>Viber</Typography>
              
            </Box>
            
          </Box>
          </Link>
          <Divider light />
          <Link href="https://support.google.com/mail/answer/56256?hl=en"  sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              padding: 1,
            }}>
          <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                padding: 1,
              }}
          >
            
            <EmailIcon sx={{  paddingRight: 2 }} />
              
            
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Typography fontSize={15}>Email: gmailacc@gmail.com</Typography>
              
            </Box>
            
          </Box>
          </Link>
        </Box>
      </Menu>
    </div>
  );
}
