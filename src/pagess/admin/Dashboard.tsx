import { Box, Button, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { BarChart } from "@mui/x-charts/BarChart";

import { PieChart } from "@mui/x-charts/PieChart";
import React, { useEffect, useState } from "react";
import ReactGA from "react-ga4";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getCurrentUsers } from "../../redux/admin/asyncActions";

export default function Dashboard() {
  const [activeUsers, setActiveUsers] = useState(0);
  const { currentUsersAmount } = useAppSelector((state) => state.admin);
  const dispatch = useAppDispatch();

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
    dispatch(getCurrentUsers()).then((result: any) => {
      if (result.meta.requestStatus === "fulfilled") {
        console.log("fulfilled " + currentUsersAmount);
        setActiveUsers(currentUsersAmount);
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
      <Box
        display={"flex"}
        flexDirection={"row"}
        alignContent={"space-between"}
      >
        <Box
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
            {activeUsers}
          </Typography>
        </Box>
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: 10, label: "series A" },
                { id: 1, value: 15, label: "series B" },
                { id: 2, value: 20, label: "series C" },
              ],
              innerRadius: 30,

              paddingAngle: 5,
              cornerRadius: 5,
              startAngle: -45,
              endAngle: 225,
            },
          ]}
          width={320}
          height={200}
        />
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: 10, label: "series A" },
                { id: 1, value: 15, label: "series B" },
                { id: 2, value: 20, label: "series C" },
              ],
            },
          ]}
          width={320}
          height={200}
        />
      </Box>

      <Box
        paddingTop={1}
        paddingBottom={1}
        display={"flex"}
        flexDirection={"row"}
        alignItems={"center"}
      >
        <BarChart
          series={[
            { data: [35, 44, 24, 34] },
            { data: [51, 6, 49, 30] },
            { data: [15, 25, 30, 50] },
            { data: [60, 50, 15, 25] },
          ]}
          height={290}
          xAxis={[{ data: ["Q1", "Q2", "Q3", "Q4"], scaleType: "band" }]}
          margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
        />
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: 10, label: "series A" },
                { id: 1, value: 15, label: "series B" },
                { id: 2, value: 20, label: "series C" },
              ],
            },
          ]}
          width={320}
          height={200}
        />
      </Box>
    </Box>
  );
}
