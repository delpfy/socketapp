import {
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
} from "@mui/material";

import React from "react";

import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  Authorize,
  Register,
  checkAuthorization,
} from "../../../redux/user/asyncActions";
import BasketPage from "../../../Pages/Basket/BasketPage";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LockPersonRoundedIcon from "@mui/icons-material/LockPersonRounded";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { NullifyToken } from "../../../redux/user/userSlice";

export const Basket = () => {
  const { user, token } = useAppSelector((state) => state.user);
  const { isOnItemPage } = useAppSelector((state) => state.basket);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [openLogin, setOpenLogin] = React.useState(false);
  const [openRegister, setOpenRegister] = React.useState(false);
  const [openBasket, setOpenBasket] = React.useState(false);
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [role, setRole] = React.useState<string>("");
  const [fullName, setFullName] = React.useState<string>("");
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");
  const [maxWidth, setMaxWidth] = React.useState<DialogProps["maxWidth"]>("md");

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
    } else {
      openLoginDialog();
    }
  }
  function closeBasketDialog() {
    setOpenBasket(false);
  }
  function openLoginDialog() {
    if (user.authorized === true) {
      alert("Ви вже увійшли");
    } else {
      closeRegDialog();
      setOpenLogin(true);
    }
  }

  function closeLoginDialog() {
    setOpenLogin(false);
  }

  function openRegDialog() {
    closeLoginDialog();
    setOpenRegister(true);
  }

  function closeRegDialog() {
    setOpenRegister(false);
  }

  function RedirectLogin(email: string, password: string) {
    try {
      dispatch(
        Authorize({
          email: email,
          password: password,
        })
      );

      closeLoginDialog();
    } catch (error) {
      alert(error);
    }
  }

  function RedirectRegister(
    email: string,
    fullName: string,
    role: string,
    password: string
  ) {
    try {
      dispatch(NullifyToken());
      dispatch(
        Register({
          email: email,
          fullName: fullName,
          role: role,
          password: password,
        })
      );
    } catch (error) {
      alert(error);
    }
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
      return <AccountCircleRoundedIcon sx={{ width: 40, height: 40 }} />;
    } else {
      return <LockPersonRoundedIcon sx={{ width: 40, height: 40 }} />;
    }
  };

  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        width={200}
      >
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          width={180}
        >
          <Typography variant={"h2"} component={"h2"} fontSize={35}>
            {user.expences === 0 ? "" : user.expences + "₴"}
          </Typography>
          <IconButton onClick={openBasketDialog}>
            <ShoppingCartIcon sx={{ width: 40, height: 40 }} />
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
        <DialogTitle>Авторизація</DialogTitle>
        <DialogContent>
          <DialogContentText display={"flex"} flexDirection={"row"}>
            Ще не маєш аккаунт?
            <Typography
              color={"#1976d2"}
              onClick={openRegDialog}
              sx={{
                cursor: "pointer",
                paddingLeft: "0.6%",
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
          <Button onClick={closeLoginDialog}>Вийти</Button>
          <Button
            onClick={() => {
              RedirectLogin(email, password);
            }}
          >
            Продовжити
          </Button>
        </DialogActions>
      </Dialog>
      {/*</Login Dialog>*/}

      {/*<Register Dialog>*/}
      <Dialog open={openRegister} onClose={closeRegDialog}>
        <DialogTitle>Регистрація</DialogTitle>
        <DialogContent>
          <DialogContentText display={"flex"} flexDirection={"row"}>
            Маєш аккаунт?
            <Typography
              color={"#1976d2"}
              onClick={openLoginDialog}
              sx={{
                cursor: "pointer",
                paddingLeft: "0.6%",
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
              <FormControlLabel
                value="manager"
                control={<Radio onChange={handleChange} />}
                label="Менеджер"
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeRegDialog}>Вийти</Button>
          <Button
            onClick={() => RedirectRegister(email, fullName, role, password)}
          >
            Продовжити
          </Button>
        </DialogActions>
      </Dialog>
      {/*</Register Dialog>*/}
      {/*<Basket Dialog>*/}
      <Dialog
        open={openBasket}
        onClose={closeBasketDialog}
        scroll={scroll}
        maxWidth={maxWidth}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Кошик</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            <BasketPage />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeBasketDialog}>Вийти</Button>
        </DialogActions>
      </Dialog>
      {/*</Basket Dialog>*/}
    </>
  );
};

export default Basket;
