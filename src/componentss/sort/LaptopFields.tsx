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
import { sortLaptopsByParameters } from "../../redux/home/homeSlice";
import { SelectedSortParams } from "../../redux/types";

export default function LaptopFields() {
  const { itemsCategory } = useAppSelector((state) => state.home);
  const uniqueBrands =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) => item.fields.brand) ?? []
          )
        )
      : [];

  const uniqueResolutionValues =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) => item.fields.resolution) ??
              []
          )
        )
      : [];
  const uniqueProcessorValues =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) => item.fields.processor) ?? []
          )
        )
      : [];
  const uniqueMemoryValues =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) => item.fields.RAM) ?? []
          )
        )
      : [];
  const uniqueSeriesValues =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) => item.fields.series) ?? []
          )
        )
      : [];
  const uniqueConstructionValues =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) => item.fields.construction) ??
              []
          )
        )
      : [];
  const uniqueOperatingSystemValues =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map(
              (item: any) => item.fields.operatingSystem
            ) ?? []
          )
        )
      : [];
  const uniqueScreenDiagonalValues =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map(
              (item: any) => item.fields.screenDiagonal
            ) ?? []
          )
        )
      : [];
  const uniqueMatrixTypeValues =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) => item.fields.matrixType) ??
              []
          )
        )
      : [];
  const uniqueCoatingTypeValues =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) => item.fields.coatingType) ??
              []
          )
        )
      : [];
  const uniqueTouchScreenValues =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) => item.fields.touchScreen) ??
              []
          )
        )
      : [];
  const uniqueRefreshRateValues =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) => item.fields.refreshRate) ??
              []
          )
        )
      : [];
  const uniqueBrightnessValues =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) => item.fields.brightness) ??
              []
          )
        )
      : [];
  const uniqueOtherDisplayFeaturesValues =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map(
              (item: any) => item.fields.otherDisplayFeatures
            ) ?? []
          )
        )
      : [];
  const uniqueMaxRAMValues =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) => item.fields.maxRAM) ?? []
          )
        )
      : [];
  const uniqueStorageTypeValues =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) => item.fields.storageType) ??
              []
          )
        )
      : [];
  const uniqueStorageCapacityValues =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map(
              (item: any) => item.fields.storageCapacity
            ) ?? []
          )
        )
      : [];
  const uniqueOpticalDriveValues =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) => item.fields.opticalDrive) ??
              []
          )
        )
      : [];

  const uniqueCardReaderValues =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) => item.fields.cardReader) ??
              []
          )
        )
      : [];
  const uniqueWebcamValues =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) => item.fields.webcam) ?? []
          )
        )
      : [];
  const uniqueKeyboardBacklightValues =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map(
              (item: any) => item.fields.keyboardBacklight
            ) ?? []
          )
        )
      : [];
  const uniquePassiveCoolingValues =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map(
              (item: any) => item.fields.passiveCooling
            ) ?? []
          )
        )
      : [];
  const uniqueFingerprintScannerValues =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map(
              (item: any) => item.fields.fingerprintScanner
            ) ?? []
          )
        )
      : [];
  const uniqueNumericKeypadValues =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map(
              (item: any) => item.fields.numericKeypad
            ) ?? []
          )
        )
      : [];

  const uniqueEthernetAdapterValues =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map(
              (item: any) => item.fields.ethernetAdapter
            ) ?? []
          )
        )
      : [];
  const uniqueWifiValues =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) => item.fields.wifi) ?? []
          )
        )
      : [];
  const uniqueBluetoothValues =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) => item.fields.bluetooth) ?? []
          )
        )
      : [];
  const uniqueWeightValues =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) => item.fields.weight) ?? []
          )
        )
      : [];
  const uniqueBodyMaterialValues =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) => item.fields.bodyMaterial) ??
              []
          )
        )
      : [];
  const uniqueLidColorValues =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) => item.fields.lidColor) ?? []
          )
        )
      : [];
  const uniqueBodyColorValues =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) => item.fields.bodyColor) ?? []
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
      dispatch(sortLaptopsByParameters({ selectedParams: updatedParams }));
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
            case "Процесор":
              return item.fields.processor?.toString() === paramValue;
            case "Обсяг ОЗУ":
              return item.fields.RAM?.toString() === paramValue;
            case "Серія":
              return item.fields.series?.toString() === paramValue;
            case "Тип конструкції":
              return item.fields.construction?.toString() === paramValue;
            case "Операційна система":
              return item.fields.operatingSystem?.toString() === paramValue;
            case "Тип покриття матриці":
              return item.fields.coatingType === paramValue;
            case "Сенсорний екран":
              return item.fields.touchScreen === paramValue;
            case "Частота оновлення":
              return item.fields.refreshRate?.toString() === paramValue;
            case "Яскравість":
              return item.fields.brightness?.toString() === paramValue;
            case "Інші функції дисплея":
              return (
                item.fields.otherDisplayFeatures?.toString() === paramValue
              );
            case "Максимальний обсяг ОЗУ":
              return item.fields.maxRAM?.toString() === paramValue;
            case "Тип накопичувача":
              return item.fields.storageType?.toString() === paramValue;
            case "Обсяг накопичувача":
              return item.fields.storageCapacity?.toString() === paramValue;
            case "Оптичний привід":
              return item.fields.opticalDrive === paramValue;
            case "Рідер карт пам'яті":
              return item.fields.cardReader === paramValue;
            case "Веб-камера":
              return item.fields.webcam === paramValue;
            case "Підсвітка клавіатури":
              return item.fields.keyboardBacklight === paramValue;
            case "Пасивне охолодження":
              return item.fields.passiveCooling === paramValue;
            case "Сканер відбитків пальців":
              return item.fields.fingerprintScanner === paramValue;
            case "Цифрова клавіатура":
              return item.fields.numericKeypad === paramValue;
            case "Адаптер Ethernet":
              return item.fields.ethernetAdapter === paramValue;
            case "Wi-Fi":
              return item.fields.wifi?.toString() === paramValue;
            case "Bluetooth":
              return item.fields.bluetooth?.toString() === paramValue;
            case "Вага":
              return item.fields.weight === paramValue;
            case "Матеріал корпусу":
              return item.fields.bodyMaterial === paramValue;
            case "Колір кришки":
              return item.fields.lidColor === paramValue;
            case "Колір корпусу":
              return item.fields.bodyColor === paramValue;
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
                dispatch(sortLaptopsByParameters({ selectedParams: {} }));
              }}
            >
              сброс
            </Button>
          </Box>
          {ParameterAccord("Бренд", uniqueBrands)}
          {ParameterAccord("Тип матриці", uniqueMatrixTypeValues)}
          {ParameterAccord("Розмір матриці", uniqueScreenDiagonalValues)}
          {ParameterAccord("Роздільна здатність", uniqueResolutionValues)}
          {ParameterAccord("Процесор", uniqueProcessorValues)}
          {ParameterAccord("Обсяг ОЗУ", uniqueMemoryValues)}
          {ParameterAccord("Серія", uniqueSeriesValues)}
          {ParameterAccord("Тип конструкції", uniqueConstructionValues)}
          {ParameterAccord("Операційна система", uniqueOperatingSystemValues)}
          {ParameterAccord("Тип покриття матриці", uniqueCoatingTypeValues)}
          {ParameterAccord("Сенсорний екран", uniqueTouchScreenValues)}
          {ParameterAccord("Частота оновлення", uniqueRefreshRateValues)}
          {ParameterAccord("Яскравість", uniqueBrightnessValues)}
          {ParameterAccord(
            "Інші функції дисплея",
            uniqueOtherDisplayFeaturesValues
          )}
          {ParameterAccord("Максимальний обсяг ОЗУ", uniqueMaxRAMValues)}
          {ParameterAccord("Тип накопичувача", uniqueStorageTypeValues)}
          {ParameterAccord("Обсяг накопичувача", uniqueStorageCapacityValues)}
          {ParameterAccord("Оптичний привід", uniqueOpticalDriveValues)}
          {ParameterAccord("Рідер карт пам'яті", uniqueCardReaderValues)}
          {ParameterAccord("Веб-камера", uniqueWebcamValues)}
          {ParameterAccord(
            "Підсвітка клавіатури",
            uniqueKeyboardBacklightValues
          )}
          {ParameterAccord("Пасивне охолодження", uniquePassiveCoolingValues)}
          {ParameterAccord(
            "Сканер відбитків пальців",
            uniqueFingerprintScannerValues
          )}
          {ParameterAccord("Цифрова клавіатура", uniqueNumericKeypadValues)}
          {ParameterAccord("Адаптер Ethernet", uniqueEthernetAdapterValues)}
          {ParameterAccord("Wi-Fi", uniqueWifiValues)}
          {ParameterAccord("Bluetooth", uniqueBluetoothValues)}
          {ParameterAccord("Вага", uniqueWeightValues)}
          {ParameterAccord("Матеріал корпусу", uniqueBodyMaterialValues)}
          {ParameterAccord("Колір кришки", uniqueLidColorValues)}
          {ParameterAccord("Колір корпусу", uniqueBodyColorValues)}
        </>
      )}
    </>
  );
}
