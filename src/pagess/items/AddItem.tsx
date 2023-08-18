import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import LaptopCategory from "./addItem_Categories/LaptopCategory";
import TabletCategory from "./addItem_Categories/TabletCategory";
import MonitorCategory from "./addItem_Categories/MonitorCategory";


export default function AddItem() {
  const [category, setCategory] = useState("");

  function handleCategoryChange(e: any) {
    setCategory(e.target.value);
  }

  function DisplayParams() {
    switch (category) {
      case "Ноутбуки":
        return <LaptopCategory category={category} />;
      case "Планшети":
        return <TabletCategory category={category} />;
      case "Монітори":
        return <MonitorCategory category={category} />;;
    }
  }

  return (
    <>
      <Box
        paddingTop={15}
        paddingBottom={15}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
      >
        <Box
          width={700}
          paddingBottom={5}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Typography
            variant="h1"
            textAlign={"center"}
            fontSize={30}
            fontFamily={"Ubuntu"}
            width={300}
          >
            Категорія :
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Категорія</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Age"
              onChange={handleCategoryChange}
            >
              <MenuItem value={"Ноутбуки"}>Ноутбуки</MenuItem>
              <MenuItem value={"Монітори"}>Монітори</MenuItem>
              <MenuItem value={"Планшети"}>Планшети</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {DisplayParams()}
      </Box>
    </>
  );
}
