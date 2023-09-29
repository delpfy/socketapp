import React, { useCallback, useState } from "react";
import {
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Checkbox,
  Box,
  Button,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { setReset, sortItemsByParameters } from "../../redux/home/homeSlice";
import { SelectedSortParams } from "../../redux/types";

export default function ItemsAccords() {
  const {
    itemsCategory,
    uniqueItemFieldsNames,
    uniqueItemFieldsValues,
  } = useAppSelector((state) => state.home);

  const [accordionStates, setAccordionStates] = useState([]);

  const toggleAccordion = (index: any) => {
    setAccordionStates((prevStates: any) => ({
      ...prevStates,
      [index]: !prevStates[index],
    }));
  };

  const [selectedSortParams, setSelectedSortParams] =
    React.useState<SelectedSortParams>({});

  const dispatch = useAppDispatch();

  const performSort = useCallback((paramName: any, paramValue: any) => {
    setSelectedSortParams((prevSelectedParams) => {
      const updatedParams = { ...prevSelectedParams };
      if (updatedParams[paramName]) {
        if (updatedParams[paramName].includes(paramValue.toString())) {
          updatedParams[paramName] = updatedParams[paramName].filter(
            (param) => param !== paramValue.toString()
          );
        } else {
          updatedParams[paramName].push(paramValue.toString());
        }

        if (updatedParams[paramName].length === 0) {
          delete updatedParams[paramName];
        }
      } else {
        updatedParams[paramName] = [paramValue.toString()];
      }
      dispatch(sortItemsByParameters({ selectedParams: updatedParams }));
      console.log(updatedParams);
      return updatedParams;
    });
  }, []);

  function displayItemParameterAmount(parameterValue: any, index: number) {
    const itemAmount =
      itemsCategory.items !== undefined
        ? itemsCategory.items.filter(
            (item: any) =>
              Object.values(item.fields[index])[0] === parameterValue
          )
        : [];
    return itemAmount.length.toString();
  }

  function ParameterAccord({ name, index }: { name: string; index: number }) {
    return window.innerWidth > 1024 ? (
      <Box>
        <Box>
          <Typography
            sx={{ borderTop: "2px solid black", paddingTop: 1 }}
            fontWeight={"bold"}
          >
            {name}
          </Typography>
        </Box>
        <Box
          paddingRight={2}
          maxHeight={400}
          sx={{
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "10px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#000000",
              borderRadius: "5px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#D9D9D9",
              borderRadius: "5px",
            },
          }}
        >
          {uniqueItemFieldsValues[index].map((val: any) => (
            <Box
              display={"flex"}
              flexDirection={"row"}
              alignItems={"center"}
              key={val}
            >
              <FormControlLabel
                control={
                  <Checkbox
                  sx={{color: 'black', '&.Mui-checked': {
                    color: 'black'
                  }}}
                    checked={
                      selectedSortParams[
                        uniqueItemFieldsNames[index]
                      ]?.includes(val.toString())
                        ? true
                        : false
                    }
                    onChange={() =>
                      performSort(uniqueItemFieldsNames[index], val)
                    }
                  />
                }
                label={typeof val === "boolean" ? (val ? "Так" : "Ні") : val}
              />

              <Typography color={"default"}>
                ({displayItemParameterAmount(val, index)})
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    ) : (
      <Accordion
        key={index}
        sx={{
          borderTop: "2px solid black",
        }}
        expanded={accordionStates[index] as boolean}
        onChange={() => toggleAccordion(index)}
      >
        <AccordionSummary
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography width={220} fontSize={14}>
            {name}
          </Typography>

          <Typography fontSize={14} sx={{ paddingRight: 0.6 }}>
            Усі
          </Typography>
          <img
            src={require("../../img/filtersIconBlack.png")}
            style={{ width: 10, height: 10, marginTop: 5 }}
            alt="sdf"
          />
        </AccordionSummary>
        <AccordionDetails
          sx={{
            maxHeight: 400,
            paddingRight: 2,
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "10px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#000000",
              borderRadius: "5px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#D9D9D9",
              borderRadius: "5px",
            },
          }}
        >
          {uniqueItemFieldsValues[index].map((val: any) => (
            <Box
              display={"flex"}
              flexDirection={"row"}
              alignItems={"center"}
              key={val}
            >
              <FormControlLabel
               sx={{color: 'black'}}
                control={
                  <Checkbox
                  sx={{color: 'black', '&.Mui-checked': {
                    color: 'black'
                  }}}
                    checked={
                      selectedSortParams[
                        uniqueItemFieldsNames[index]
                      ]?.includes(val.toString())
                        ? true
                        : false
                    }
                    onChange={() => 
                      performSort(uniqueItemFieldsNames[index], val)
                    }
                  />
                }
                label={typeof val === "boolean" ? (val ? "Так" : "Ні") : val}
              />

              <Typography color={"default"}>
                ({displayItemParameterAmount(val, index)})
              </Typography>
            </Box>
          ))}
        </AccordionDetails>
      </Accordion>
    );
  }

  const ParameterAccords = () => {
    return (
      <Box display={"flex"} flexDirection={"column"}>
        {uniqueItemFieldsNames.map((name: string, index: number) => (
          <ParameterAccord name={name} index={index} />
        ))}
      </Box>
    );
  };

  return (
    <>
      {itemsCategory === undefined ? (
        <></>
      ) : (
        <>
          <Box display={"flex"} flexDirection={"column"}>
            <Button
              variant="contained"
              size="small"
              sx={{ justifySelf: "flex-end", margin: 3, background: "black", "&:hover": {
                backgroundColor: "black",
                color: "white",
              }, }}
              onClick={() => {
                setSelectedSortParams({});
                dispatch(setReset(true));
                dispatch(sortItemsByParameters({ selectedParams: {} }));
              }}
            >
              сброс
            </Button>
          </Box>
          <ParameterAccords />
        </>
      )}
    </>
  );
}
