import React from "react";

import {
  Badge,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { Authorize, Register, checkAuthorization } from "../../../redux/user/asyncActions";
import { NullifyToken } from "../../../redux/user/userSlice";

import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LockPersonRoundedIcon from "@mui/icons-material/LockPersonRounded";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import BasketPage from "../../../Pages/cart/Cart";

export const Basket = () => {
  const { user } = useAppSelector((state) => state.user);
  const { isOnItemPage, itemsAmount } = useAppSelector((state) => state.basket);

  const dispatch = useAppDispatch();

  const [cartSelected, setCartSelected] = React.useState(false)
  const [personSelected, setPersonSelected] = React.useState(false)

  const [openLogin, setOpenLogin] = React.useState(false);
  const [openLogout, setOpenLogout] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [openInfo, setOpenInfo] = React.useState(false);
  const [openRegister, setOpenRegister] = React.useState(false);
  const [openBasket, setOpenBasket] = React.useState(false);
 

  const [local_error, setLocalError] = React.useState<string>("Unhandled error")
  
  const [local_info, setLocalInfo] = React.useState<string>("Some info")

  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [role, setRole] = React.useState<string>("");
  const [fullName, setFullName] = React.useState<string>("");
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");
  const [maxWidth, setMaxWidth] = React.useState<DialogProps["maxWidth"]>("md");
  const [fullWidth, setFullWidth] = React.useState(true);
  
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  
  React.useEffect(() => {
    closeBasketDialog();
  }, [isOnItemPage]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRole(event.target.value);
  };


  function openBasketDialog() {
    
    if (user.authorized === true) {
      closeRegDialog();
      closeLoginDialog();
      setOpenBasket(true);
      setCartSelected(true);
      console.log("CART " + cartSelected)
    } else {
      openLoginDialog();
    }
  }
  function closeBasketDialog() {
    setOpenBasket(false);
    setCartSelected(false);
  }
  function openLoginDialog() {
    
    if (user.authorized === true) {
      openLogoutDialog();
    } else {
      setPersonSelected(true)
      closeRegDialog();
      setOpenLogin(true);
    }
  }

  function closeRegAfterSuccess(){
    setOpenRegister(false);
    setLocalInfo("Все добре, теперь увійдіть");
    openInfoDialog();
  }
  
  function openInfoDialog(){
    setOpenInfo(true);
  }

  function closeInfoDialog(){
    setOpenInfo(false);
  }

  function openLogoutDialog(){
    setPersonSelected(true)
    setOpenLogout(true);
  }

  function closeLogoutDialog(){
    setPersonSelected(false)
    setOpenLogout(false);
  }

  function openErrorDialog(){
    setOpenError(true);
  }

  function closeErrorDialog(){
    setOpenError(false);
  }

  function closeLoginDialog() {
    setPersonSelected(false)
    setOpenLogin(false);
  }

  function openRegDialog() {
    setPersonSelected(true)
    closeLoginDialog();
    setOpenRegister(true);
  }

  function closeRegDialog() {
    setPersonSelected(false)
    setOpenRegister(false);
  }

  async function RedirectLogin(email: string, password: string) {

    if (!validateEmail(email)) {
      openErrorDialog()
      setLocalError("Некоректный формат пошти")
      return;
    }

    if (password.length < 5) {
      openErrorDialog()
      setLocalError('Пароль має бути завдовжки мінімум 5 символів')
      return;
    }

    
      await dispatch(
        Authorize({
          email: email,
          password: password,
        })
      ).then((result: any) => {
        console.log("result.status " + result.meta.requestStatus)
        if (result.meta.requestStatus === 'fulfilled') {
            closeLoginDialog();
        } else if (result.meta.requestStatus === 'rejected') {
          openErrorDialog();
            setLocalError("Схоже при реєстрації виникла помилка");
        }
  });
  /* closeLoginDialog(); */
      
    
  }

  function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function RedirectRegister(
    email: string,
    fullName: string,
    role: string,
    password: string
  ) {

    if (!validateEmail(email)) {
      openErrorDialog()
      setLocalError("Некоректный формат пошти")
      return;
    }

    
  
    if(!fullName){
      openErrorDialog()
      setLocalError('Ви не вказали ім\'я')
      return;
    }

    
    if (password.length < 5) {
      openErrorDialog()
      setLocalError('Пароль має бути завдовжки мінімум 5 символів')
      return;
    }

    
    const validRoles = ['customer'];
    if (!validRoles.includes(role)) {
      openErrorDialog()
      setLocalError('Ви не обрали ролі')
      return;
    }
  
    

    try {
      dispatch(NullifyToken());
      dispatch(
        Register({
          email: email,
          fullName: fullName,
          role: role,
          password: password,
          expences: 0,
        })
      ).then((result: any) => {
        console.log("result.status " + result.meta.requestStatus)
        if (result.meta.requestStatus === 'fulfilled') {
          closeRegAfterSuccess();
        } else if (result.meta.requestStatus === 'rejected') {
          openErrorDialog();
            setLocalError("Схоже при реєстрації виникла помилка");
        }
  });
      
      
    } catch (error: any) {
      openErrorDialog()
      setLocalError(error);
    }
  }

  function Logout(){
    closeLogoutDialog();
    dispatch(NullifyToken());
    
  }

  /*  function Redirect() {
    if (user.authorized === true) {
      navigate("/socketapp/basket");
    } else {
      openLoginDialog();
    }
  } */

  /* function LoginDialog() {
    return (
      <>
        <Dialog
          open={openLogin}
          onClose={closeLoginDialog}
        >
          <DialogTitle>Авторизація</DialogTitle>
          <DialogContent>
            <DialogContentText display={"flex"} flexDirection={"row"}>
              Ще не маєш аккаунт?
              <Typography
                color={"#1976d2"}
                onClick={openRegDialog}
                sx={{
                  cursor: "pointer",
                  paddingLeft: '0.6%',
                }}
              >
                Реєструйся!
              </Typography>
              </DialogContentText>
            <TextField
              margin="dense"
              label="Пошта"
              type="email"
              fullWidth
              variant="standard"
              onChange={(e) => setEmail(e.target.value)}
            />
            
            <TextField
              margin="dense"
              id="password"
              label="Пароль"
              type="password"
              fullWidth
              variant="standard"
              onChange={e => setPassword(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeLoginDialog}>Вийти</Button>
            <Button onClick={() => {RedirectLogin(email, password)}}>Продовжити</Button>
          </DialogActions>
        </Dialog>
      </>
    );
  } */

  /*  function RegisterDialog() {
    return (
      <>
        <Dialog
          open={openRegister}
          onClose={closeRegDialog}
        >
          <DialogTitle>Регистрація</DialogTitle>
          <DialogContent>
            <DialogContentText display={"flex"} flexDirection={"row"}>
              Маєш аккаунт?
              
              <Typography
                color={"#1976d2"}
                onClick={openLoginDialog}
               
                sx={{
                  cursor: "pointer",
                  paddingLeft: '0.6%',
                }}
              >
                Заходь!
              </Typography>
              
              
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Пошта"
              type="email"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="fullName"
              label="Ваше гарне ім'я"
              type="name"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="password"
              label="Пароль"
              type="password"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeRegDialog}>Вийти</Button>
            <Button onClick={Redirect}>Продовжити</Button>
          </DialogActions>
        </Dialog>
      </>
    );
  } */

  const Locker = () => {
    if (user.authorized === true) {
      return (
        <AccountCircleRoundedIcon
        color = {personSelected ? 'info' : 'warning'} 
          sx={{
            width: 45,
            height: 45
          }}
        />
      );
    } else {
      return (
        <LockPersonRoundedIcon
        color = {personSelected ? 'info' : 'warning'} 

          sx={{
            width: 45,
            height: 45
          }}
        />
      );
    }
  };

  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        maxWidth={200}
      >
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          maxWidth={180}
        >
          <IconButton onClick={openBasketDialog} >
            <Badge badgeContent={itemsAmount} color="warning">
              <ShoppingCartIcon
              color = {cartSelected ? 'info' : 'warning'} 
              
                sx={{
                  width: 40,
                  height: 40,
                }}
              />
            </Badge>
          </IconButton>
        </Box>
        <Box>
          <IconButton onClick={openLoginDialog}>
            <Locker />
          </IconButton>
        </Box>
      </Box>

      {/*<Login Dialog>*/}
      <Dialog open={openLogin} onClose={closeLoginDialog}>
        <DialogTitle sx={{ fontFamily: "Comfortaa", fontSize: 15 }}>
          Авторизація
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            display={"flex"}
            flexDirection={"row"}
            sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
          >
            Ще не маєш аккаунт?
            <Typography
              color={"#1976d2"}
              onClick={openRegDialog}
              sx={{
                cursor: "pointer",
                paddingLeft: "0.6%",
                fontFamily: "Comfortaa",
                fontSize: 15,
              }}
            >
              Реєструйся!
            </Typography>
          </DialogContentText>
          <TextField
            margin="dense"
            label="Пошта"
            type="email"
            value={email}
            fullWidth
            variant="standard"
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            margin="dense"
            label="Пароль"
            value={password}
            type="password"
            fullWidth
            variant="standard"
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
            onClick={closeLoginDialog}
          >
            Вийти
          </Button>
          <Button
            sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
            onClick={() => {
              RedirectLogin(email, password);
            }}
          >
            Продовжити
          </Button>
        </DialogActions>
      </Dialog>
      {/*</Login Dialog>*/}

      {/*<Logout Dialog>*/}
      <Dialog open={openLogout} onClose={closeLogoutDialog}>
        <DialogTitle sx={{ fontFamily: "Comfortaa", fontSize: 15 }}>
          Логаут
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            display={"flex"}
            flexDirection={"row"}
            sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
          >
            Ви дійсно бажаете вийти з вашого акаута?
            
          </DialogContentText>
          
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
            onClick={closeLogoutDialog}
          >
            Ні
          </Button>
          <Button
            sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
            onClick={() => {
              Logout();
              
              
            }}
          >
            Так, вийти
          </Button>
        </DialogActions>
      </Dialog>
      {/*</Logout Dialog>*/}

      {/*<Error Dialog>*/}
      <Dialog open={openError} onClose={closeErrorDialog}>
        <DialogTitle sx={{ fontFamily: "Comfortaa", fontSize: 15 }}>
          Помилка
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            display={"flex"}
            flexDirection={"row"}
            sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
          >
            {local_error}
            
          </DialogContentText>
          
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
            onClick={closeErrorDialog}
          >
            Зрозуміло
          </Button>
          
        </DialogActions>
      </Dialog>
      {/*</Error Dialog>*/}
      

      {/*<Info Dialog>*/}
      <Dialog open={openInfo} onClose={closeInfoDialog}>
        <DialogTitle sx={{ fontFamily: "Comfortaa", fontSize: 15 }}>
          Інформація
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            display={"flex"}
            flexDirection={"row"}
            sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
          >
            {local_info}
            
          </DialogContentText>
          
        </DialogContent>
        <DialogActions>
        <Button
            sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
            onClick={() => (closeInfoDialog(), openLoginDialog())}
          >
            Увійти
          </Button>
          <Button
            sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
            onClick={closeInfoDialog}
          >
            Закрити
          </Button>
          
        </DialogActions>
      </Dialog>
      {/*</Info Dialog>*/}

      {/*<Register Dialog>*/}
      <Dialog open={openRegister} onClose={closeRegDialog}>
        <DialogTitle sx={{ fontFamily: "Comfortaa", fontSize: 15 }}>
          Регистрація
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
            display={"flex"}
            flexDirection={"row"}
          >
            Маєш аккаунт?
            <Typography
              color={"#1976d2"}
              onClick={openLoginDialog}
              sx={{
                cursor: "pointer",
                paddingLeft: "0.6%",
                fontFamily: "Comfortaa",
                fontSize: 15,
              }}
            >
              Заходь!
            </Typography>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Пошта"
            type="email"
            value={email}
            fullWidth
            variant="standard"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="fullName"
            label="Ваше гарне ім'я"
            type="name"
            value={fullName}
            fullWidth
            variant="standard"
            onChange={(e) => setFullName(e.target.value)}
          />

          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Пароль"
            type="password"
            value={password}
            fullWidth
            variant="standard"
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Роль користувача
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="customer"
                control={<Radio onChange={handleChange} />}
                label="Користувач"
              />
              {/* <FormControlLabel
                value="manager"
                control={<Radio onChange={handleChange} />}
                label="Менеджер"
              /> */}
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
            onClick={closeRegDialog}
          >
            Вийти
          </Button>
          <Button
            sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
            onClick={() => RedirectRegister(email, fullName, role, password)}
          >
            Продовжити
          </Button>
        </DialogActions>
      </Dialog>
      {/*</Register Dialog>*/}

      {/*<Basket Dialog>*/}
      <Dialog open={openBasket} onClose={closeBasketDialog}
        scroll={scroll}
        maxWidth={maxWidth}
        fullWidth={fullWidth}
        fullScreen={fullScreen}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle
          id="scroll-dialog-title"
          width={"90%"}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography fontFamily={"Comfortaa"} fontSize={22}>
            Кошик
          </Typography>
          <Box
            sx={{
              width: {
                xs: 173,
                md: 220,
              },
            }}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: 15,
                  md: 19,
                },
              }}
              fontFamily={"Comfortaa"}
            >
              Сума товарів:{" "}
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  xs: 15,
                  md: 19,
                },
              }}
              fontFamily={"Comfortaa"}
              color={"error"}
            >
              {user.expences}₴
            </Typography>
          </Box>
        </DialogTitle>

        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            <BasketPage />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
            onClick={closeBasketDialog}
          >
            Вийти
          </Button>
        </DialogActions>
      </Dialog>
      {/*</Basket Dialog>*/}
    </>
  );
};

export default Basket;
