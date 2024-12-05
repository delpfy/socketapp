import * as React from "react";

import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Button } from "@mui/material";
import { useAppDispatch } from "../../redux/hooks";
import { setProcess } from "../../redux/admin/adminSlice";
import { getAllItems } from "../../redux/home/asyncActions";
import {
  getAllBanners,
  getAllOrders,
  getAllUsers,
} from "../../redux/admin/asyncActions";

export default function AdminPanel() {
  const dispatch = useAppDispatch();

  return (
    <Box
      paddingBottom={10}
      sx={{
        width: {
          xs: 310,
          md: 340,
        },
      }}
    >
      <Box
        sx={{
          width: "90%",
        }}
      >
        <Box>
        <Box
            sx={{
              border: "1px solid black",
              borderRadius: 1,
              margin: 1,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box>
              <Button
                onClick={() => {
                  dispatch(getAllUsers()).then((result: any) => {
                    if (result.meta.requestStatus === "fulfilled") {
                      dispatch(setProcess("show-dashboard"));
                    }
                  });
                }}
              >
                Дашборд
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              border: "1px solid black",
              borderRadius: 1,
              margin: 1,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box>
              <Button
                onClick={() => dispatch(setProcess("show-many-categories"))}
              >
                Редагувати категорії
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              border: "1px solid black",
              borderRadius: 1,
              margin: 1,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box>
              <Button
                onClick={() => {
                  dispatch(getAllItems()).then((result: any) => {
                    if (result.meta.requestStatus === "fulfilled") {
                      dispatch(setProcess("show-many-items"));
                    }
                  });
                }}
              >
                Редагувати товари
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              border: "1px solid black",
              borderRadius: 1,
              margin: 1,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box>
              <Button
                onClick={() => dispatch(setProcess("show-many-attributes"))}
              >
                Редагувати атрибути
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              border: "1px solid black",
              borderRadius: 1,
              margin: 1,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box>
              <Button
                onClick={() => {
                  dispatch(getAllUsers()).then((result: any) => {
                    if (result.meta.requestStatus === "fulfilled") {
                      dispatch(setProcess("show-many-users"));
                    }
                  });
                }}
              >
                Редагувати користувачів
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              border: "1px solid black",
              borderRadius: 1,
              margin: 1,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box>
              <Button onClick={() => dispatch(setProcess("show-many-reviews"))}>
                Редагувати відгуки
              </Button>
            </Box>
          </Box>

          <Box
            sx={{
              border: "1px solid black",
              borderRadius: 1,
              margin: 1,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box>
              <Button
                onClick={() => {
                  dispatch(getAllBanners()).then((result: any) => {
                    if (result.meta.requestStatus === "fulfilled") {
                      dispatch(setProcess("show-many-banners"));
                    }
                  });
                }}
              >
                Редагувати банери
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              border: "1px solid black",
              borderRadius: 1,
              margin: 1,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box>
              <Button
                onClick={() => {
                  dispatch(getAllOrders()).then((result: any) => {
                    if (result.meta.requestStatus === "fulfilled") {
                      dispatch(setProcess("show-many-orders"));
                    }
                  });
                }}
              >
                Усі замовлення
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              border: "1px solid black",
              borderRadius: 1,
              margin: 1,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box>
              <Button onClick={() => dispatch(setProcess("add-newsletter"))}>
                Створити розсилку
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
