import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { createUser, getAllUsers } from "../../redux/admin/asyncActions";
import InfoDialog from "../../componentss/dialogs/InfoDialog";
import { setProcess } from "../../redux/admin/adminSlice";

export default function AddOneUser() {
  const [newUser, setNewUser] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "customer",
  });
  const [openInfo, setOpenInfo] = useState(false);
  const [infoMessage, setInfoMessage] = useState<string>("Some info");
  function InfoDialog_open() {
    setOpenInfo(true);
  }
  function InfoDialog_close() {
    setOpenInfo(false);
  }
  const dispatch = useAppDispatch();

  function handleUserChange(e: any) {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  }

  function addNewUserToDatabase() {
    if (
      newUser.fullName.trim() === "" ||
      newUser.password.trim() === "" ||
      newUser.email.trim() === "" ||
      newUser.role.trim() === ""
    ) {
      InfoDialog_open();
      setInfoMessage("Не всі поля заповнено коректно");
      return;
    }

    dispatch(
      createUser({
        fullName: newUser.fullName,
        password: newUser.password,
        email: newUser.email,
        role: newUser.role,
        avatarUrl: "",
        expences: 0,
      })
    ).then((result: any) => {
      if (result.meta.requestStatus === "fulfilled") {
        dispatch(getAllUsers()).then((result: any) => {
          if (result.meta.requestStatus === "fulfilled") {
            dispatch(setProcess("show-many-users"));
          }
        });
      }
      if (result.meta.requestStatus === "rejected") {
        InfoDialog_open();
        setInfoMessage(
          "Помилка при створенні користувача. Скоріш за все ви вказали вже зареєстровну пошту"
        );
      }
    });
  }
  return (
    <>
      <InfoDialog
        openInfo={openInfo}
        InfoDialog_close={InfoDialog_close}
        infoMessage={infoMessage}
      />
      <Typography>Новий користувач</Typography>
      <Box
        padding={5}
        display={"flex"}
        height={300}
        width={300}
        flexDirection={"column"}
        justifyContent={"space-between"}
      >
        <TextField
          value={newUser.fullName}
          name="fullName"
          label={"Ім'я"}
          onChange={handleUserChange}
        />
        <TextField
          value={newUser.email}
          name="email"
          label={"Пошта"}
          onChange={handleUserChange}
        />
        <TextField
          value={newUser.password}
          name="password"
          label={"Пароль"}
          onChange={handleUserChange}
        />

        <Select
          label={"Роль"}
          value={newUser.role}
          name="role"
          onChange={handleUserChange}
        >
          {["admin", "manager", "customer"].map((role) => (
            <MenuItem key={role} value={role}>
              {role}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Button variant="outlined" onClick={addNewUserToDatabase}>
        Створити
      </Button>
    </>
  );
}
