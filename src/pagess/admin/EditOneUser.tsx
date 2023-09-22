import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  createUser,
  getAllUsers,
  updateUserById,
} from "../../redux/admin/asyncActions";
import InfoDialog from "../../componentss/dialogs/InfoDialog";
import { setProcess } from "../../redux/admin/adminSlice";
import { Update } from "../../redux/user/asyncActions";

export default function EditOneUser() {
  const { _currentUser } = useAppSelector((state) => state.admin);
  const [newUser, setNewUser] = useState({
    fullName: _currentUser.fullName,
    email: _currentUser.email,
    role: _currentUser.role,
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

  function updateSelectedUser() {
    if (
      newUser.fullName.trim() === "" ||
      newUser.email.trim() === "" ||
      newUser.role.trim() === ""
    ) {
      InfoDialog_open();
      setInfoMessage("Не всі поля заповнено коректно");
      return;
    }

    dispatch(
      updateUserById({
        userId: _currentUser._id,
        userData: {
          fullName: newUser.fullName,
          email: newUser.email,
          role: newUser.role,
        },
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
          "Помилка при оновленні користувача. Скоріш за все ви вказали вже зареєстровну пошту"
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
      <Typography>Користувач {_currentUser.fullName}</Typography>
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
      <Button variant="outlined" onClick={updateSelectedUser}>
        Оновити
      </Button>
    </>
  );
}
