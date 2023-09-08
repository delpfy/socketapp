import React from "react";
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

type ItemsAccordsProps = {
  uniqueFieldNames: string[];
  uniqueFieldUkrNames: string[];
};

export default function ItemsAccords(props: ItemsAccordsProps) {
  const { itemsCategory } = useAppSelector((state) => state.home);
  const uniqueCabelsFields = itemsCategory
    ? props.uniqueFieldNames.map((fieldName: any) =>
        Array.from(
          new Set(
            itemsCategory.items?.map((item: any) => item.fields[fieldName]) ??
              []
          )
        )
      )
    : [];

  const [selectedSortParams, setSelectedSortParams] =
    React.useState<SelectedSortParams>({});

  const dispatch = useAppDispatch();

  function performSort(paramName: string, paramValue: any) {
    setSelectedSortParams((prevSelectedParams) => {
      console.log(prevSelectedParams);
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
      return updatedParams;
    });
  }

  function displayItemParameterAmount(parameterName: any, parameterValue: any) {
    const itemAmount = itemsCategory.items.filter(
      (item: any) => item.fields[parameterName] === parameterValue
    );
    return itemAmount.length.toString();
  }

  function ParameterAccord({ name, index }: { name: string; index: number }) {
    return (
        
            window.innerWidth > 600 ?
            (<Box>
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
                  {uniqueCabelsFields[index].map((val: any) => (
                    <Box
                      display={"flex"}
                      flexDirection={"row"}
                      alignItems={"center"}
                      key={val}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              typeof selectedSortParams[
                                props.uniqueFieldNames[index]
                              ]?.includes(val.toString()) === "boolean"
                                ? selectedSortParams[
                                    props.uniqueFieldNames[index]
                                  ]?.includes(val.toString())
                                  ? true
                                  : false
                                : false
                            }
                            onChange={() =>
                              performSort(props.uniqueFieldNames[index], val)
                            }
                          />
                        }
                        label={typeof val === "boolean" ? (val ? "Так" : "Ні") : val}
                      />
        
                      <Typography color={"default"}>
                        (
                        {displayItemParameterAmount(props.uniqueFieldNames[index], val)}
                        )
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>)
            :
            (<Accordion sx={{ borderTop: "2px solid black"}}>
                <AccordionSummary sx = {{display: 'flex', justifyContent: 'space-between',alignItems: 'center',   }}>
                  <Typography
                    width={240}
                    
                    fontSize={14}
                  >
                    {name}
                  </Typography>

                  <Typography
                   fontSize={14}
                   sx = {{paddingRight: 0.6}}
                    
                  >
                    Усі
                  </Typography>
                  <img
                  src={require("../../img/filtersIconBlack.png")}
                  style={{ width: 10, height: 10 , marginTop: 5}}
                  alt="sdf"
                />
                </AccordionSummary>
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
                  {uniqueCabelsFields[index].map((val: any) => (
                    <Box
                      display={"flex"}
                      flexDirection={"row"}
                      alignItems={"center"}
                      key={val}
                    >
                      <FormControlLabel
                      sx={{paddingLeft: 2, fontSize: 16}}
                        control={
                          <Checkbox
                            checked={
                              typeof selectedSortParams[
                                props.uniqueFieldNames[index]
                              ]?.includes(val.toString()) === "boolean"
                                ? selectedSortParams[
                                    props.uniqueFieldNames[index]
                                  ]?.includes(val.toString())
                                  ? true
                                  : false
                                : false
                            }
                            onChange={() =>
                              performSort(props.uniqueFieldNames[index], val)
                            }
                          />
                        }
                        label={typeof val === "boolean" ? (val ? "Так" : "Ні") : val}
                      />
        
                      <Typography color={"default"} fontSize={16}>
                        (
                        {displayItemParameterAmount(props.uniqueFieldNames[index], val)}
                        )
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Accordion>)
        
      
    );
  }

  const ParameterAccords = () => {
    return (
      <Box display={"flex"} flexDirection={"column"}>
        {props.uniqueFieldUkrNames.map((name, index) => {
          return <ParameterAccord name={name} index={index} />;
        })}
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
              sx={{ justifySelf: "flex-end", margin: 3, background: "black" }}
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
