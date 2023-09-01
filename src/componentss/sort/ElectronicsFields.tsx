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
import { sortElectronicsByParameters } from "../../redux/home/homeSlice";
import { SelectedSortParams } from "../../redux/types";

export default function ElectronicsFields() {
  const { itemsCategory } = useAppSelector((state) => state.home);

  const uniqueElectronicsBrands =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) => item.fields.brand) ?? []
          )
        )
      : [];

  const uniqueElectronicsTypes =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) => item.fields.type) ?? []
          )
        )
      : [];

  const uniqueElectronicsCompatibility =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map(
              (item: any) => item.fields.compatibility
            ) ?? []
          )
        )
      : [];

  const uniqueElectronicsMaterials =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) => item.fields.material) ?? []
          )
        )
      : [];

  const uniqueElectronicsWireless =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) => item.fields.wireless) ?? []
          )
        )
      : [];

  const uniqueElectronicsColors =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) => item.fields.color) ?? []
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
      dispatch(sortElectronicsByParameters({ selectedParams: updatedParams }));
      return updatedParams;
    });
  }

  function displayItemParameterAmount(parameterName: any, parameterValue: any) {
    const selectedParams = {
      [parameterName]: [parameterValue],
    } as SelectedSortParams;

    const itemAmount = itemsCategory.items.filter((item: any) => {
      return Object.keys(selectedParams).every((paramName: any) => {
        const paramValues = selectedParams[paramName];

        if (paramValues.length === 0) {
          return true;
        }

        return paramValues.some((paramValue: any) => {
          switch (paramName) {
            case "Бренд":
              return item.fields.brand === paramValue;
            case "Тип":
              return item.fields.type?.toString() === paramValue;
            case "Бездротовий":
              return item.fields.wireless === paramValue;
            case "Сумісність":
              return item.fields.compatibility?.toString() === paramValue;
            case "Матеріал":
              return item.fields.material?.toString() === paramValue;
            case "Колір":
              return item.fields.color?.toString() === paramValue;
            default:
              return false;
          }
        });
      });
    });
    return itemAmount.length.toString();
  }

  function ParameterAccord(name: string, values: any) {
    return (
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
          {values.map((val: any) => (
            <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
              <FormControlLabel
                key={val}
                control={
                  <Checkbox
                    checked={
                      typeof selectedSortParams[name]?.includes(
                        val.toString()
                      ) === "boolean"
                        ? selectedSortParams[name]?.includes(val.toString())
                          ? true
                          : false
                        : false
                    }
                    onChange={() => performSort(name, val)}
                  />
                }
                label={typeof val === "boolean" ? (val ? "Так" : "Ні") : val}
              />
              <Typography color={"default"}>
                ({displayItemParameterAmount(name, val)})
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    );
  }

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
              sx={{ justifySelf: "flex-end", margin: 3, background: 'black' }}
              onClick={() => {
                setSelectedSortParams({});
                dispatch(sortElectronicsByParameters({ selectedParams: {} }));
              }}
            >
              сброс
            </Button>
          </Box>
          {ParameterAccord("Бренд", uniqueElectronicsBrands)}
          {ParameterAccord("Тип", uniqueElectronicsTypes)}
          {ParameterAccord("Бездротовий", uniqueElectronicsWireless)}
          {ParameterAccord("Сумісність", uniqueElectronicsCompatibility)}
          {ParameterAccord("Матеріал", uniqueElectronicsMaterials)}
          {ParameterAccord("Колір", uniqueElectronicsColors)}
        </>
      )}
    </>
  );
}
