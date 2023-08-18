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
            itemsCategory.items?.map((item: any) => item.fields.memory) ?? []
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
            itemsCategory.items?.map((item: any) =>
              item.fields.coatingType?.toLowerCase()
            ) ?? []
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
            itemsCategory.items?.map((item: any) =>
              item.fields.bodyMaterial?.toLowerCase()
            ) ?? []
          )
        )
      : [];
  const uniqueLidColorValues =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) =>
              item.fields.lidColor?.toLowerCase()
            ) ?? []
          )
        )
      : [];
  const uniqueBodyColorValues =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) =>
              item.fields.bodyColor?.toLowerCase()
            ) ?? []
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