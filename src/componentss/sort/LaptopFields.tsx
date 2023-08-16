import React, { Dispatch, SetStateAction } from "react";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { sortLaptopsByParameters } from "../../redux/home/homeSlice";

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

  const [selectedBrand, setSelectedBrand] = React.useState("");
  const [selectedResolution, setSelectedResolution] = React.useState("");
  const [selectedProcessor, setSelectedProcessor] = React.useState("");
  const [selectedMemory, setSelectedMemory] = React.useState("");
  const [selectedSeries, setSelectedSeries] = React.useState("");
  const [selectedConstruction, setSelectedConstruction] = React.useState("");
  const [selectedOperatingSystem, setSelectedOperatingSystem] =
    React.useState("");
  const [selectedScreenDiagonal, setSelectedScreenDiagonal] =
    React.useState("");
  const [selectedMatrixType, setSelectedMatrixType] = React.useState("");
  const [selectedCoatingType, setSelectedCoatingType] = React.useState("");
  const [selectedTouchScreen, setSelectedTouchScreen] = React.useState(false);
  const [selectedRefreshRate, setSelectedRefreshRate] = React.useState("");
  const [selectedBrightness, setSelectedBrightness] = React.useState("");
  const [selectedOtherDisplayFeatures, setSelectedOtherDisplayFeatures] =
    React.useState("");
  const [selectedMaxRAM, setSelectedMaxRAM] = React.useState("");
  const [selectedStorageType, setSelectedStorageType] = React.useState("");
  const [selectedStorageCapacity, setSelectedStorageCapacity] =
    React.useState("");
  const [selectedOpticalDrive, setSelectedOpticalDrive] = React.useState(false);

  const [selectedCardReader, setSelectedCardReader] = React.useState(false);
  const [selectedWebcam, setSelectedWebcam] = React.useState(false);
  const [selectedKeyboardBacklight, setSelectedKeyboardBacklight] =
    React.useState(false);
  const [selectedPassiveCooling, setSelectedPassiveCooling] =
    React.useState(false);
  const [selectedFingerprintScanner, setSelectedFingerprintScanner] =
    React.useState(false);
  const [selectedNumericKeypad, setSelectedNumericKeypad] =
    React.useState(false);

  const [selectedEthernetAdapter, setSelectedEthernetAdapter] =
    React.useState(false);
  const [selectedWifi, setSelectedWifi] = React.useState("");
  const [selectedBluetooth, setSelectedBluetooth] = React.useState("");
  const [selectedWeight, setSelectedWeight] = React.useState("");
  const [selectedBodyMaterial, setSelectedBodyMaterial] = React.useState("");
  const [selectedLidColor, setSelectedLidColor] = React.useState("");
  const [selectedBodyColor, setSelectedBodyColor] = React.useState("");
  const dispatch = useAppDispatch();

  function performSort(
    paramName: string,
    paramValue: any,
    setSelectValue: Dispatch<SetStateAction<any>>
  ) {
    setSelectValue(paramValue);
    dispatch(
      sortLaptopsByParameters({ param: paramName, paramValue: paramValue })
    );
  }

  function ParameterAccord(
    name: string,
    values: any,
    selectValue: string | boolean,
    setSelectValue: Dispatch<SetStateAction<any>>
  ) {
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
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="brand"
              name="brand"
              value={selectValue}
              onChange={(event) =>
                performSort(name, event.target.value, setSelectValue)
              }
            >
              {values.map((val: any) => (
                <FormControlLabel
                  key={val}
                  value={val}
                  control={<Radio />}
                  label={typeof val === "boolean" ? (val ? "Так" : "Ні") : val}
                />
              ))}
            </RadioGroup>
          </FormControl>
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
          {ParameterAccord(
            "Бренд",
            uniqueBrands,
            selectedBrand,
            setSelectedBrand
          )}
          {ParameterAccord(
            "Тип матриці",
            uniqueMatrixTypeValues,
            selectedMatrixType,
            setSelectedMatrixType
          )}
          {ParameterAccord(
            "Розмір матриці",
            uniqueScreenDiagonalValues,
            selectedScreenDiagonal,
            setSelectedScreenDiagonal
          )}
          {ParameterAccord(
            "Роздільна здатність",
            uniqueResolutionValues,
            selectedResolution,
            setSelectedResolution
          )}
          {ParameterAccord(
            "Процесор",
            uniqueProcessorValues,
            selectedProcessor,
            setSelectedProcessor
          )}
          {ParameterAccord(
            "Обсяг пам'яті",
            uniqueMemoryValues,
            selectedMemory,
            setSelectedMemory
          )}
          {ParameterAccord(
            "Серія",
            uniqueSeriesValues,
            selectedSeries,
            setSelectedSeries
          )}
          {ParameterAccord(
            "Тип конструкції",
            uniqueConstructionValues,
            selectedConstruction,
            setSelectedConstruction
          )}
          {ParameterAccord(
            "Операційна система",
            uniqueOperatingSystemValues,
            selectedOperatingSystem,
            setSelectedOperatingSystem
          )}

          {ParameterAccord(
            "Тип покриття матриці",
            uniqueCoatingTypeValues,
            selectedCoatingType,
            setSelectedCoatingType
          )}
          {ParameterAccord(
            "Сенсорний екран",
            uniqueTouchScreenValues,
            selectedTouchScreen,
            setSelectedTouchScreen
          )}
          {ParameterAccord(
            "Частота оновлення",
            uniqueRefreshRateValues,
            selectedRefreshRate,
            setSelectedRefreshRate
          )}
          {ParameterAccord(
            "Яскравість",
            uniqueBrightnessValues,
            selectedBrightness,
            setSelectedBrightness
          )}
          {ParameterAccord(
            "Інші функції дисплея",
            uniqueOtherDisplayFeaturesValues,
            selectedOtherDisplayFeatures,
            setSelectedOtherDisplayFeatures
          )}
          {ParameterAccord(
            "Максимальний обсяг ОЗУ",
            uniqueMaxRAMValues,
            selectedMaxRAM,
            setSelectedMaxRAM
          )}
          {ParameterAccord(
            "Тип накопичувача",
            uniqueStorageTypeValues,
            selectedStorageType,
            setSelectedStorageType
          )}
          {ParameterAccord(
            "Обсяг накопичувача",
            uniqueStorageCapacityValues,
            selectedStorageCapacity,
            setSelectedStorageCapacity
          )}
          {ParameterAccord(
            "Оптичний привід",
            uniqueOpticalDriveValues,
            selectedOpticalDrive,
            setSelectedOpticalDrive
          )}

          {ParameterAccord(
            "Рідер карт пам'яті",
            uniqueCardReaderValues,
            selectedCardReader,
            setSelectedCardReader
          )}

          {ParameterAccord(
            "Веб-камера",
            uniqueWebcamValues,
            selectedWebcam,
            setSelectedWebcam
          )}
          {ParameterAccord(
            "Підсвітка клавіатури",
            uniqueKeyboardBacklightValues,
            selectedKeyboardBacklight,
            setSelectedKeyboardBacklight
          )}
          {ParameterAccord(
            "Пасивне охолодження",
            uniquePassiveCoolingValues,
            selectedPassiveCooling,
            setSelectedPassiveCooling
          )}
          {ParameterAccord(
            "Сканер відбитків пальців",
            uniqueFingerprintScannerValues,
            selectedFingerprintScanner,
            setSelectedFingerprintScanner
          )}
          {ParameterAccord(
            "Цифрова клавіатура",
            uniqueNumericKeypadValues,
            selectedNumericKeypad,
            setSelectedNumericKeypad
          )}

          {ParameterAccord(
            "Адаптер Ethernet",
            uniqueEthernetAdapterValues,
            selectedEthernetAdapter,
            setSelectedEthernetAdapter
          )}
          {ParameterAccord(
            "Wi-Fi",
            uniqueWifiValues,
            selectedWifi,
            setSelectedWifi
          )}
          {ParameterAccord(
            "Bluetooth",
            uniqueBluetoothValues,
            selectedBluetooth,
            setSelectedBluetooth
          )}
          {ParameterAccord(
            "Вага",
            uniqueWeightValues,
            selectedWeight,
            setSelectedWeight
          )}
          {ParameterAccord(
            "Матеріал корпусу",
            uniqueBodyMaterialValues,
            selectedBodyMaterial,
            setSelectedBodyMaterial
          )}
          {ParameterAccord(
            "Колір кришки",
            uniqueLidColorValues,
            selectedLidColor,
            setSelectedLidColor
          )}
          {ParameterAccord(
            "Колір корпусу",
            uniqueBodyColorValues,
            selectedBodyColor,
            setSelectedBodyColor
          )}
        </>
      )}
    </>
  );
}
