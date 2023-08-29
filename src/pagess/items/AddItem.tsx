import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import LaptopCategory from "./addItem_Categories/LaptopCategory";
import CabelsCategory from "./addItem_Categories/CabelsCategory";
import MonitorCategory from "./addItem_Categories/MonitorCategory";
import { useAppSelector } from "../../redux/hooks";
import NetworkCategory from "./addItem_Categories/NetworkCategory";
import ElectronicsCategory from "./addItem_Categories/ElectronicsCategory";

export default function AddItem() {
  const { category, editItemMode } = useAppSelector((state) => state.home);
  const [categoryLocal, setCategory] = useState(editItemMode ? category : "");

  function handleCategoryChange(e: any) {
    setCategory(e.target.value);
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  function DisplayParams() {
    switch (categoryLocal) {
      case "Ноутбуки":
        return <LaptopCategory category={categoryLocal} />;
      case "Кабелі та перехідники":
        return <CabelsCategory category={categoryLocal} />;
      case "Мережеве обладнання":
        return <NetworkCategory category={categoryLocal} />;
        case "Аксесуари для електроніки":
        return <ElectronicsCategory category={categoryLocal} />;
        
      case "Монітори":
        return <MonitorCategory category={categoryLocal} />;
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
              value={categoryLocal}
              label="Age"
              onChange={handleCategoryChange}
            >
              <MenuItem value={"Ноутбуки"}>Ноутбуки</MenuItem>
              <MenuItem value={"Монітори"}>Монітори</MenuItem>
              <MenuItem value={"Кабелі та перехідники"}>Кабелі та перехідники</MenuItem>
              <MenuItem value={"Мережеве обладнання"}>Мережеве обладнання</MenuItem>
              <MenuItem value={"Аксесуари для електроніки"}>Аксесуари для електроніки</MenuItem>
              
            </Select>
          </FormControl>
        </Box>
        {DisplayParams()}
      </Box>
    </>
  );
}
