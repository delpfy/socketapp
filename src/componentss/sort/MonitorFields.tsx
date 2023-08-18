import React from "react";
import {

  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Checkbox,
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
            <FormControlLabel
              key={val}
              control={
                <Checkbox
                  checked={selectedSortParams[name]?.includes(val.toString())}
                  onChange={() => performSort(name, val)}
                />
              }
              label={typeof val === "boolean" ? (val ? "Так" : "Ні") : val}
            />
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
