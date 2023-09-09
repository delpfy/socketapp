import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Slider,
  TextField,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  setReset,
  sortByCost_ASC,
  sortByCost_DESC,
  sortByCostRange,
  sortByRelevance_ASC,
  sortByRelevance_DESC,
  sortByRelevanceRange,
} from "../../redux/home/homeSlice";
import LaptopFields from "./fields/LaptopFields";
import MonitorFields from "./fields/MonitorFields";
import CabelsFields from "./fields/CablesFields";
import ElectronicsFields from "./fields/ElectronicsFields";
import NetworkFields from "./fields/NetworkFields";
import { useEffect } from "react";

export default function SortBy() {
  const { category, reset } = useAppSelector((state) => state.home);
  const [relevanceValue, setRelevanceValue] = React.useState("");
  const [costValue, setCostValue] = React.useState("");
  const [costRangeValue, setCostRangeValue] = React.useState<number[]>([
    0, 70000,
  ]);

  const [relevanceRangeValue, setRelevanceRangeValue] = React.useState<
    number[]
  >([1, 5]);
  const dispatch = useAppDispatch();

  const handleRelevanceInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setReset(false));
    const { name, value } = event.target;
    const updatedRange = [...relevanceRangeValue];

    if (event.target.value.length !== 0) {
      updatedRange[name === "min" ? 0 : 1] = parseFloat(value);
      if (parseFloat(value) > 0 && parseFloat(value) <= 5) {
        setRelevanceRangeValue(updatedRange);
      }
      if (parseFloat(value) > 5) {
        if (
          parseFloat(event.target.value[event.target.value.length - 1]) <= 5
        ) {
          updatedRange[name === "min" ? 0 : 1] = parseFloat(
            event.target.value[event.target.value.length - 1]
          );
          setRelevanceRangeValue(updatedRange);
        }
      }
    } else {
      updatedRange[name === "min" ? 0 : 1] = 1;
      setRelevanceRangeValue(updatedRange);
    }
  };

  const handleCostInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setReset(false));
    const { name, value } = event.target;
    const updatedRange = [...costRangeValue];

    if (event.target.value.length !== 0) {
      updatedRange[name === "min" ? 0 : 1] = parseFloat(value);
      if (parseFloat(value) >= 0 && parseFloat(value) <= 70000) {
        setCostRangeValue(updatedRange);
      }
    } else {
      updatedRange[name === "min" ? 0 : 1] = 1;
      setCostRangeValue(updatedRange);
    }
  };

  const handleRelevanceOkButtonClick = () => {
    dispatch(setReset(false));
    setRelevanceValue("");
    setCostValue("");
    setRelevanceRangeValue(relevanceRangeValue as number[]);
    dispatch(sortByRelevanceRange(relevanceRangeValue as number[]));
  };

  const handleCostOkButtonClick = () => {
    dispatch(setReset(false));
    setRelevanceValue("");
    setCostValue("");
    setCostRangeValue(costRangeValue as number[]);
    dispatch(sortByCostRange(costRangeValue as number[]));
  };

  const handleRelevanceSortChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setReset(false));
    setRelevanceValue((event.target as HTMLInputElement).value);
    setCostValue("");
    console.log((event.target as HTMLInputElement).value);
    switch ((event.target as HTMLInputElement).value) {
      case "asc":
        dispatch(sortByRelevance_ASC());
        break;
      case "desc":
        dispatch(sortByRelevance_DESC());
        break;
    }
  };
  const handleCostSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCostValue((event.target as HTMLInputElement).value);
    setRelevanceValue("");
    dispatch(setReset(false));
    switch ((event.target as HTMLInputElement).value) {
      case "asc":
        dispatch(sortByCost_ASC());

        break;
      case "desc":
        dispatch(sortByCost_DESC());

        break;
    }
  };

  function showFieldsSort() {
    switch (category) {
      case "Ноутбуки":
        return <LaptopFields />;
      case "Кабелі та перехідники":
        return <CabelsFields />;
      case "Аксесуари для електроніки":
        return <ElectronicsFields />;
      case "Мережеве обладнання":
        return <NetworkFields />;
      case "Монітори":
        return <MonitorFields />;
    }
  }

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
            display={window.innerWidth > 600 ? "none" : "flex"}
            paddingBottom={2}
            flexDirection={"row"}
            alignItems={"center"}
          >
            <img
              src={require("../../img/filtersIconLeft.png")}
              style={{ width: 9, height: 11 }}
              alt="sdf"
            />
            <Typography fontSize={26} paddingLeft={1}>
              Фільтри
            </Typography>
          </Box>
          <Box>
            <Box>
              <Box>
                <Typography fontWeight={"bold"}>Ціна</Typography>
              </Box>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={costValue}
                  onChange={handleCostSortChange}
                >
                  <FormControlLabel
                    value="asc"
                    checked={reset ? false : costValue === "asc" ? true : false}
                    control={<Radio color="success" />}
                    label="Від дешевих до дорогих"
                  />
                  <FormControlLabel
                    value="desc"
                    checked={
                      reset ? false : costValue === "desc" ? true : false
                    }
                    control={<Radio color="success" />}
                    label="Від дорогих до дешевих"
                  />
                </RadioGroup>
              </FormControl>
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                }}
              >
                <Box
                  sx={{
                    padding: 1,
                    height: "100%",
                    width: "95%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <TextField
                    sx={{ width: 90, padding: 0 }}
                    size="small"
                    name="min"
                    value={costRangeValue[0]}
                    onChange={handleCostInputChange}
                  />
                  <Typography> - </Typography>
                  <TextField
                    inputProps={{ style: { appearance: "textfield" } }}
                    sx={{ width: 90 }}
                    size="small"
                    name="max"
                    value={costRangeValue[1]}
                    onChange={handleCostInputChange}
                  />
                </Box>
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  sx={{ marginRight: 1, background: "black" }}
                  onClick={handleCostOkButtonClick}
                >
                  OK
                </Button>
              </Box>
            </Box>
          </Box>
          <Box>
            <Box>
              <Typography fontWeight={"bold"}>Рейтинг</Typography>
            </Box>
            <Box>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={relevanceValue}
                  onChange={handleRelevanceSortChange}
                >
                  <FormControlLabel
                    value="desc"
                    checked={
                      reset ? false : relevanceValue === "desc" ? true : false
                    }
                    control={<Radio color="success" />}
                    label="За збільшенням"
                  />
                  <FormControlLabel
                    value="asc"
                    checked={
                      reset ? false : relevanceValue === "asc" ? true : false
                    }
                    control={<Radio color="success" />}
                    label="За зменшенням"
                  />
                </RadioGroup>
              </FormControl>
              <Box>
                <Box
                  sx={{
                    padding: 1,
                    height: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <TextField
                    sx={{ width: 60 }}
                    size="small"
                    name="min"
                    type="number"
                    value={relevanceRangeValue[0]}
                    onChange={handleRelevanceInputChange}
                  />
                  <Typography>-</Typography>
                  <TextField
                    inputProps={{ style: { appearance: "textfield" } }}
                    sx={{ width: 60 }}
                    size="small"
                    name="max"
                    type="number"
                    value={relevanceRangeValue[1]}
                    onChange={handleRelevanceInputChange}
                  />
                  <Button
                    variant="contained"
                    sx={{ background: "black" }}
                    size="small"
                    color="primary"
                    onClick={handleRelevanceOkButtonClick}
                  >
                    OK
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>

          {showFieldsSort()}
        </Box>
      </Box>
    </Box>
  );
}
