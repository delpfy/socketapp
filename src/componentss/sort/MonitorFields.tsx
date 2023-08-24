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
import { sortMonitorsByParameters } from "../../redux/home/homeSlice";
import { SelectedSortParams } from "../../redux/types";

export default function MonitorFields() {
  const { itemsCategory } = useAppSelector((state) => state.home);

  const uniqueBrands =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) => item.fields.brand) ?? []
          )
        )
      : [];

  const uniqueScreenDiagonals =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) => item.fields.screenDiagonal)
          )
        )
      : [];

  const uniqueMatrixTypes =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) => item.fields.matrixType)
          )
        )
      : [];

  const uniqueAspectRatios =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) => item.fields.aspectRatio)
          )
        )
      : [];

  const uniqueResolutions =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) => item.fields.resolution)
          )
        )
      : [];

  const uniqueResponseTimes =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) => item.fields.responseTime)
          )
        )
      : [];

  const uniqueViewingAngles =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) => item.fields.viewingAngles)
          )
        )
      : [];

  const uniqueBacklightTypes =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) => item.fields.backlightType)
          )
        )
      : [];

  const uniqueBrightnessValues =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) => item.fields.brightness)
          )
        )
      : [];

  const uniqueContrastRatios =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) => item.fields.contrastRatio)
          )
        )
      : [];

  const uniqueScreenCoatings =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) => item.fields.screenCoating)
          )
        )
      : [];

  const uniqueCurvedScreenValues =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) => item.fields.curvedScreen)
          )
        )
      : [];

  const uniqueRefreshRates =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) => item.fields.refreshRate)
          )
        )
      : [];

  const [selectedSortParams, setSelectedSortParams] =
    React.useState<SelectedSortParams>({});

  const dispatch = useAppDispatch();
  function performSort(paramName: string, paramValue: any) {
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
      dispatch(sortMonitorsByParameters({ selectedParams: updatedParams }));
      return updatedParams;
    });
  }

  function displayItemParameterAmount(parameterName: any, parameterValue: any) {
    console.log();
    const selectedParams = {
      [parameterName]: [parameterValue],
    } as SelectedSortParams;

    const itemAmount = itemsCategory.items.filter((item: any) => {
      return Object.keys(selectedParams).every((paramName: any) => {
        const paramValues = selectedParams[paramName];

        if (paramValues.length === 0) {
          return true;
        }

        return paramValues.some((paramValue) => {
          switch (paramName) {
            case "Бренд":
              return item.fields.brand?.toString() === paramValue;
            case "Тип матриці":
              return item.fields.matrixType?.toString() === paramValue;
            case "Розмір матриці":
              return item.fields.screenDiagonal?.toString() === paramValue;
            case "Роздільна здатність":
              return item.fields.resolution?.toString() === paramValue;
            case "Час відгуку":
              return item.fields.responseTime?.toString() === paramValue;
            case "Кути огляду":
              return item.fields.viewingAngles?.toString() === paramValue;
            case "Тип підсвічування":
              return item.fields.backlightType?.toString() === paramValue;
            case "Яскравість":
              return item.fields.brightness?.toString() === paramValue;
            case "Співвідношення контрастності":
              return item.fields.contrastRatio?.toString() === paramValue;
            case "Співвідношення сторін":
              return item.fields.aspectRatio?.toString() === paramValue;
            case "Покриття екрану":
              return item.fields.screenCoating?.toString() === paramValue;
            case "Зігнута матриця":
              return item.fields.curvedScreen === paramValue;
            case "Частота оновлення":
              return item.fields.refreshRate?.toString() === paramValue;
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
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>{name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
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
              <Typography color={"error"}>
                {displayItemParameterAmount(name, val)}
              </Typography>
            </Box>
          ))}
        </AccordionDetails>
      </Accordion>
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
              sx={{ justifySelf: "flex-end", margin: 3 }}
              onClick={() => {
                setSelectedSortParams({});
                dispatch(sortMonitorsByParameters({ selectedParams: {} }));
              }}
            >
              сброс
            </Button>
          </Box>
          {ParameterAccord("Бренд", uniqueBrands)}
          {ParameterAccord("Розмір матриці", uniqueScreenDiagonals)}
          {ParameterAccord("Тип матриці", uniqueMatrixTypes)}
          {ParameterAccord("Співвідношення сторін", uniqueAspectRatios)}
          {ParameterAccord("Роздільна здатність", uniqueResolutions)}
          {ParameterAccord("Час відгуку", uniqueResponseTimes)}
          {ParameterAccord("Кути огляду", uniqueViewingAngles)}
          {ParameterAccord("Тип підсвічування", uniqueBacklightTypes)}
          {ParameterAccord("Яскравість", uniqueBrightnessValues)}
          {ParameterAccord(
            "Співвідношення контрастності",
            uniqueContrastRatios
          )}
          {ParameterAccord("Покриття екрану", uniqueScreenCoatings)}
          {ParameterAccord("Зігнута матриця", uniqueCurvedScreenValues)}
          {ParameterAccord("Частота оновлення", uniqueRefreshRates)}
        </>
      )}
    </>
  );
}
