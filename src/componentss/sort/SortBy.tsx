import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Slider,
} from "@mui/material";
import { useAppDispatch } from "../../redux/hooks";
import {
  sortByCost_ASC,
  sortByCost_DESC,
  sortByCostRange,
  sortByRelevance_ASC,
  sortByRelevance_DESC,
  sortByRelevanceRange,
} from "../../redux/home/homeSlice";

export default function SortBy() {
  const [relevanceValue, setRelevanceValue] = React.useState("asc");
  const [costValue, setCostValue] = React.useState("asc");
  const [costRangeValue, setCostRangeValue] = React.useState<number[]>([
    0, 70000,
  ]);
  const [relevanceRangeValue, setRelevanceRangeValue] = React.useState<number[]>([
    1, 5,
  ]);
  const dispatch = useAppDispatch();

  const handleCostRangeChange = (event: Event, newValue: number | number[]) => {
    setCostRangeValue(newValue as number[]);
    dispatch(sortByCostRange(newValue as number[]));
  };
  const handleRelevanceRangeChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    setRelevanceRangeValue(newValue as number[]);
    dispatch(sortByRelevanceRange(newValue as number[]));
  };

  const handleRelevanceSortChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRelevanceValue((event.target as HTMLInputElement).value);
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

    switch ((event.target as HTMLInputElement).value) {
      case "asc":
        dispatch(sortByCost_ASC());

        break;
      case "desc":
        dispatch(sortByCost_DESC());

        break;
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Сортувати за:</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Ціною</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={costValue}
                  onChange={handleCostSortChange}
                >
                  <FormControlLabel
                    value="asc"
                    control={<Radio color="success" />}
                    label="Від дешевих до дорогих"
                  />
                  <FormControlLabel
                    value="desc"
                    control={<Radio color="success" />}
                    label="Від дорогих до дешевих"
                  />
                </RadioGroup>
              </FormControl>
              <Box sx={{ width: "100%" }}>
                <Slider
                  sx={{ color: "#2e7d32" }}
                  value={costRangeValue}
                  step={1}
                  min={1}
                  max={70000}
                  onChange={handleCostRangeChange}
                  valueLabelDisplay="auto"
                />
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography>{costRangeValue[0]}</Typography>
                <Typography>{costRangeValue[1]}</Typography>
              </Box>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Релевантністю</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={relevanceValue}
                  onChange={handleRelevanceSortChange}
                >
                  <FormControlLabel
                    value="desc"
                    control={<Radio color="success" />}
                    label="За збільшенням"
                  />
                  <FormControlLabel
                    value="asc"
                    control={<Radio color="success" />}
                    label="За зменшенням"
                  />
                </RadioGroup>
              </FormControl>
              <Box sx={{ width: "100%" }}>
                <Slider
                  sx={{ color: "#2e7d32" }}
                  value={relevanceRangeValue}
                  step={1}
                  min={1}
                  max={5}
                  onChange={handleRelevanceRangeChange}
                  valueLabelDisplay="auto"
                />
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography>{relevanceRangeValue[0]}</Typography>
                <Typography>{relevanceRangeValue[1]}</Typography>
              </Box>
            </AccordionDetails>
          </Accordion>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
