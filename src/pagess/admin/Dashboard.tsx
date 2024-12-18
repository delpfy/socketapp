import { Box, Button, Typography } from "@mui/material";
import { blue, pink } from "@mui/material/colors";
import { BarChart } from "@mui/x-charts/BarChart";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import TimerIcon from "@mui/icons-material/Timer";
import HandshakeIcon from "@mui/icons-material/Handshake";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

import { PieChart } from "@mui/x-charts/PieChart";
import React, { useEffect, useState } from "react";
import ReactGA from "react-ga4";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  getAllOrders,
  getAVGSessionDuration,
  getCategoriesViews,
  getCurrentUsers,
  getNewUsersLastMonth,
  getTotalSessions,
} from "../../redux/admin/asyncActions";
import Grid2 from "@mui/material/Unstable_Grid2";
import {
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  SvgIcon,
} from "@mui/joy";
import { CATEGORY_METRICS } from "../../redux/types";

export default function Dashboard() {
  const [_activeUsers, setActiveUsers] = useState(0);
  const [_newUsersLastMonth, setNewUsersLastMonth] = useState(0);
  const [_ordersAmount, setOrdersAmount] = useState(0);
  const [_avgSessionDuration, setAvgSessionDuration] = useState(0);
  const [_totalSessions, setTotalSessions] = useState(0);
  const [_categoriesViews, setCategoriesViews] = useState(
    {} as CATEGORY_METRICS[]
  );

  const {
    currentUsersAmount,
    _orders,
    newUsersAmount,
    avgSessionDuration,
    totalSessions,
    _categoryPageViews,
  } = useAppSelector((state) => state.admin);

  const dispatch = useAppDispatch();

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
    dispatch(getCurrentUsers()).then((result: any) => {
      if (result.meta.requestStatus === "fulfilled") {
        console.log("fulfilled " + currentUsersAmount);
        setActiveUsers(currentUsersAmount);
      }
    });
    dispatch(getNewUsersLastMonth()).then((result: any) => {
      if (result.meta.requestStatus === "fulfilled") {
        console.log("fulfilled " + newUsersAmount);
        setNewUsersLastMonth(newUsersAmount);
      }
    });
    dispatch(getAVGSessionDuration()).then((result: any) => {
      if (result.meta.requestStatus === "fulfilled") {
        console.log("fulfilled " + avgSessionDuration);
        setAvgSessionDuration(avgSessionDuration);
      }
    });
    dispatch(getTotalSessions()).then((result: any) => {
      if (result.meta.requestStatus === "fulfilled") {
        console.log("fulfilled " + totalSessions);
        setTotalSessions(totalSessions);
      }
    });

    dispatch(getCategoriesViews()).then((result: any) => {
      if (result.meta.requestStatus === "fulfilled") {
        console.log("fulfilled getCategoriesViews");
        console.log(_categoryPageViews);

        setCategoriesViews(_categoryPageViews);
      }
    });

    dispatch(getAllOrders()).then((result: any) => {
      if (result.meta.requestStatus === "fulfilled") {
        console.log("fulfilled " + _orders);
        setOrdersAmount(_orders.length);
      }
    });
  }, []);

  return (
    <Box
      paddingTop={2}
      paddingBottom={15}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      <Grid2 container spacing={6} sx={{ paddingTop: 6, paddingBottom: 8 }}>
        <Grid2 xs={4}>
          <Card variant="solid" color="primary" invertedColors>
            <CardContent orientation="horizontal">
              <CircularProgress size="lg" determinate value={0}>
                <PersonPinIcon sx={{ height: 40, width: 40 }} />
              </CircularProgress>
              <CardContent>
                <Typography>Активних користувачів:</Typography>
                <Typography>{_activeUsers}</Typography>
              </CardContent>
            </CardContent>
          </Card>
          {/* <Box
            sx={{ backgroundColor: "#2E96FF" }}
            height={200}
            width={200}
            borderRadius={2}
            border={"solid #2E96FF"}
          >
            <Typography
              variant={"h3"}
              fontSize={30}
              fontFamily={"Comfortaa"}
              sx={{
                marginTop: {
                  xs: 3,
                  md: 3,
                },
              }}
              paddingBottom={2}
              textAlign={"center"}
            >
              Активних користувачів:
            </Typography>
            <Typography
              variant={"h3"}
              fontSize={30}
              fontFamily={"Comfortaa"}
              sx={{
                marginTop: {
                  xs: 3,
                  md: 3,
                },
              }}
              paddingBottom={2}
              textAlign={"center"}
            >
              {_activeUsers}
            </Typography>
          </Box> */}
        </Grid2>
        <Grid2 xs={4}>
          <Card variant="solid" invertedColors>
            <CardContent orientation="horizontal">
              <CircularProgress size="lg" determinate value={0}>
                <TimerIcon sx={{ height: 40, width: 40 }} />
              </CircularProgress>
              <CardContent>
                <Typography>Середня тривалість сесії:</Typography>
                <Typography>{_avgSessionDuration}</Typography>
              </CardContent>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 xs={4}>
          <Card variant="solid" color="success" invertedColors>
            <CardContent orientation="horizontal">
              <CircularProgress size="lg" determinate value={0}>
                <HandshakeIcon sx={{ height: 40, width: 40 }} />
              </CircularProgress>
              <CardContent>
                <Typography>Кількість замовлень:</Typography>
                <Typography>{_ordersAmount}</Typography>
              </CardContent>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 xs={4}>
          <Card
            variant="solid"
            color={"danger"}
            invertedColors
            sx={{ height: 65 }}
          >
            <CardContent orientation="horizontal">
              <CircularProgress size="lg" determinate value={0}>
                <AccessibilityNewIcon sx={{ height: 40, width: 40 }} />
              </CircularProgress>
              <CardContent>
                <Typography>Нових користувачів за місяць:</Typography>
                <Typography>{_newUsersLastMonth}</Typography>
              </CardContent>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 xs={4}>
          <Card variant="solid" color="warning" invertedColors>
            <CardContent orientation="horizontal">
              <CircularProgress size="lg" determinate value={0}>
                <RemoveRedEyeIcon sx={{ height: 40, width: 40 }} />
              </CircularProgress>
              <CardContent>
                <Typography>Відвідувань за місяць:</Typography>
                <Typography>{_totalSessions}</Typography>
              </CardContent>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
      <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
        <Typography
          sx={{ marginRight: 10 }}
          paddingBottom={3}
          fontFamily={"Comfortaa"}
          fontSize={30}
        >
          {" "}
          Перегляди категорій{" "}
        </Typography>
        <PieChart
          series={[
            {
              data: _categoryPageViews.map((item) => ({
                label: item.category,
                value: item.pageViews + 1,
              })),
            },
          ]}
          width={800}
          height={350}
        />
      </Box>
    </Box>
  );
}