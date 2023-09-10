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
import LaptopFields from "../../componentss/sort/fields/LaptopFields";
import MonitorFields from "../../componentss/sort/fields/MonitorFields";
import CabelsFields from "../../componentss/sort/fields/CablesFields";
import ElectronicsFields from "../../componentss/sort/fields/ElectronicsFields";
import NetworkFields from "../../componentss/sort/fields/NetworkFields";
import { useEffect } from "react";
import { setProcess } from "../../redux/admin/adminSlice";

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
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Категорії</Typography>
        </AccordionSummary>
        <Button onClick={() => dispatch(setProcess('show-many-categories'))}>
          Редагувати категорії
        </Button>
        
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Товари</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Атрибути</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
        </Box>
      </Box>
    </Box>
  );
}
