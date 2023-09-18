import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
  } from "@mui/material";
  import { useAppDispatch, useAppSelector } from "../../redux/hooks";
  import { setProcess } from "../../redux/admin/adminSlice";
  import { deleteUser, getAllUsers,  getUserById } from "../../redux/admin/asyncActions";
  import { useState } from "react";
  import InfoDialog from "../../componentss/dialogs/InfoDialog";
  
  export default function ShowReviews() {
    const { _users, _orders } = useAppSelector((state) => state.admin);
    const dispatch = useAppDispatch();
    const [openInfo, setOpenInfo] = useState(false);
    const [infoMessage, setInfoMessage] = useState<string>("Some info");
    function InfoDialog_open() {
      setOpenInfo(true);
    }
    function InfoDialog_close() {
      setOpenInfo(false);
    }
    return (
      <>
      <InfoDialog
          openInfo={openInfo}
          InfoDialog_close={InfoDialog_close}
          infoMessage={infoMessage}
        />
        <Button onClick={() => dispatch(setProcess("add-one-user"))}>
          Додати користувача
        </Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Вказане ім'я</TableCell>
                <TableCell>Пошта</TableCell>
                <TableCell>Роль</TableCell>
                <TableCell>Функції</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {_users.map((_user: any) => {
                return (
                  <TableRow>
                    <TableCell>{_user.fullName}</TableCell>
                    <TableCell>{_user.email}</TableCell>
                    <TableCell>{_user.role}</TableCell>
                    <TableCell>
                      {_user.role === "admin" ? (
                        <></>
                      ) : (
                        <Button
                          onClick={() =>
                            
                              dispatch(deleteUser({ userId: _user._id })).then((result: any) => {
                              if (result.meta.requestStatus === "fulfilled") {
                                InfoDialog_open();
                                setInfoMessage("Успішно видалено");
                                dispatch(getAllUsers());
                              }
                              if (result.meta.requestStatus === "rejected") {
                                InfoDialog_open();
                                setInfoMessage("Не успішно видалено");
                                dispatch(getAllUsers());
                              }
                            })
                          }
                        >
                          Видалити
                        </Button>
                      )}
                    
                    {_user.role === "admin" ? (
                        <></>
                      ) : (
                        <Button
                          onClick={() =>
                            
                              dispatch(getUserById({ userId: _user._id })).then((result: any) => {
                              if (result.meta.requestStatus === "fulfilled") {
                                
                                dispatch(setProcess('edit-one-user'));
                              }
                              if (result.meta.requestStatus === "rejected") {
                                InfoDialog_open();
                                setInfoMessage("Не знайдено");
                                dispatch(getAllUsers());
                              }
                            })
                          }
                        >
                          Редагувати
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
  