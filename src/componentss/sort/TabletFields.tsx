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
import {
  sortLaptopsByParameters,
  sortTabletsByParameters,
} from "../../redux/home/homeSlice";

export default function TabletFields() {
  const { itemsCategory } = useAppSelector((state) => state.home);

  const uniqueTabletBrands =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) => item.fields.brand) ?? []
          )
        )
      : [];

  const uniqueTabletLines =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) => item.fields.line) ?? []
          )
        )
      : [];

  const uniqueTabletPreinstalledOS =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map(
              (item: any) => item.fields.preinstalledOS
            ) ?? []
          )
        )
      : [];

  const uniqueTabletScreenDiagonals =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map(
              (item: any) => item.fields.screenDiagonal
            ) ?? []
          )
        )
      : [];

  const uniqueTabletResolutions =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) => item.fields.resolution) ??
              []
          )
        )
      : [];

  const uniqueTabletMatrixTypes =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) => item.fields.matrixType) ??
              []
          )
        )
      : [];


  const uniqueTabletMemoryRAM =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) => item.fields.memoryRAM) ?? []
          )
        )
      : [];

  const uniqueTabletBuiltInMemory =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map(
              (item: any) => item.fields.builtInMemory
            ) ?? []
          )
        )
      : [];

  const uniqueTabletMemoryExpansionSlots =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map(
              (item: any) => item.fields.memoryExpansionSlot
            ) ?? []
          )
        )
      : [];

  const uniqueTabletProcessors =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) => item.fields.processor) ?? []
          )
        )
      : [];

  const uniqueTabletProcessorFrequencies =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map(
              (item: any) => item.fields.processorFrequency
            ) ?? []
          )
        )
      : [];

  const uniqueTabletProcessorCores =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map(
              (item: any) => item.fields.processorCores
            ) ?? []
          )
        )
      : [];

  const uniqueTabletBuiltInSpeakers =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map(
              (item: any) => item.fields.builtInSpeakers
            ) ?? []
          )
        )
      : [];

  const uniqueTabletBatteryCapacities =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map(
              (item: any) => item.fields.batteryCapacity
            ) ?? []
          )
        )
      : [];

  const uniqueTabletFrontCameras =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) => item.fields.frontCamera) ??
              []
          )
        )
      : [];

  const uniqueTabletRearCameras =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) => item.fields.rearCamera) ??
              []
          )
        )
      : [];

  const uniqueTabletWifi =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) => item.fields.wifi) ?? []
          )
        )
      : [];

  const uniqueTabletCellularNetworks =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map(
              (item: any) => item.fields.cellularNetwork
            ) ?? []
          )
        )
      : [];
  const uniqueTabletVoiceCommunication =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map(
              (item: any) => item.fields.voiceCommunication
            ) ?? []
          )
        )
      : [];

  const uniqueTabletGPS =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) => item.fields.gps) ?? []
          )
        )
      : [];

  const uniqueTabletNFC =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) => item.fields.nfc) ?? []
          )
        )
      : [];

  const uniqueTabletExternalPorts =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map(
              (item: any) => item.fields.externalPorts
            ) ?? []
          )
        )
      : [];

  const uniqueTabletWeight =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) => item.fields.weight) ?? []
          )
        )
      : [];

  const uniqueTabletBodyColor =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) => item.fields.bodyColor) ?? []
          )
        )
      : [];

  const uniqueTabletFrontPanelColor =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map(
              (item: any) => item.fields.frontPanelColor
            ) ?? []
          )
        )
      : [];

  const [selectedTabletBrand, setSelectedTabletBrand] = React.useState("");
  const [selectedTabletLine, setSelectedTabletLine] = React.useState("");
  const [selectedTabletPreinstalledOS, setSelectedTabletPreinstalledOS] =
    React.useState("");
  const [selectedTabletScreenDiagonal, setSelectedTabletScreenDiagonal] =
    React.useState("");
  const [selectedTabletResolution, setSelectedTabletResolution] =
    React.useState("");
  const [selectedTabletMatrixType, setSelectedTabletMatrixType] =
    React.useState("");
  
  const [selectedTabletMemoryRAM, setSelectedTabletMemoryRAM] =
    React.useState("");
  const [selectedTabletBuiltInMemory, setSelectedTabletBuiltInMemory] =
    React.useState("");
  const [
    selectedTabletMemoryExpansionSlot,
    setSelectedTabletMemoryExpansionSlot,
  ] = React.useState("");
  const [selectedTabletProcessor, setSelectedTabletProcessor] =
    React.useState("");
  const [
    selectedTabletProcessorFrequency,
    setSelectedTabletProcessorFrequency,
  ] = React.useState("");
  const [selectedTabletProcessorCores, setSelectedTabletProcessorCores] =
    React.useState("");
  const [selectedTabletBuiltInSpeakers, setSelectedTabletBuiltInSpeakers] =
    React.useState("");
  const [selectedTabletBatteryCapacity, setSelectedTabletBatteryCapacity] =
    React.useState("");
  const [selectedTabletFrontCamera, setSelectedTabletFrontCamera] =
    React.useState("");
  const [selectedTabletRearCamera, setSelectedTabletRearCamera] =
    React.useState("");
  const [selectedTabletWifi, setSelectedTabletWifi] = React.useState("");
  const [selectedTabletCellularNetwork, setSelectedTabletCellularNetwork] =
    React.useState("");
  const [
    selectedTabletVoiceCommunication,
    setSelectedTabletVoiceCommunication,
  ] = React.useState("");
  const [selectedTabletGPS, setSelectedTabletGPS] = React.useState("");
  const [selectedTabletNFC, setSelectedTabletNFC] = React.useState("");
  const [selectedTabletExternalPorts, setSelectedTabletExternalPorts] =
    React.useState("");
  const [selectedTabletWeight, setSelectedTabletWeight] = React.useState("");
  const [selectedTabletBodyColor, setSelectedTabletBodyColor] =
    React.useState("");
  const [selectedTabletFrontPanelColor, setSelectedTabletFrontPanelColor] =
    React.useState("");

  const dispatch = useAppDispatch();
  function performSort(
    paramName: string,
    paramValue: any,
    setSelectValue: Dispatch<SetStateAction<any>>
  ) {
    setSelectValue(paramValue);
    dispatch(
      sortTabletsByParameters({ param: paramName, paramValue: paramValue })
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
            uniqueTabletBrands,
            selectedTabletBrand,
            setSelectedTabletBrand
          )}
          {ParameterAccord(
            "Лінійка",
            uniqueTabletLines,
            selectedTabletLine,
            setSelectedTabletLine
          )}
          {ParameterAccord(
            "Операційна система",
            uniqueTabletPreinstalledOS,
            selectedTabletPreinstalledOS,
            setSelectedTabletPreinstalledOS
          )}
          {ParameterAccord(
            "Розмір матриці",
            uniqueTabletScreenDiagonals,
            selectedTabletScreenDiagonal,
            setSelectedTabletScreenDiagonal
          )}
          {ParameterAccord(
            "Роздільна здатність",
            uniqueTabletResolutions,
            selectedTabletResolution,
            setSelectedTabletResolution
          )}
          {ParameterAccord(
            "Тип матриці",
            uniqueTabletMatrixTypes,
            selectedTabletMatrixType,
            setSelectedTabletMatrixType
          )}
          
          {ParameterAccord(
            "Обсяг пам'яті RAM",
            uniqueTabletMemoryRAM,
            selectedTabletMemoryRAM,
            setSelectedTabletMemoryRAM
          )}
          {ParameterAccord(
            "Вбудована пам'ять",
            uniqueTabletBuiltInMemory,
            selectedTabletBuiltInMemory,
            setSelectedTabletBuiltInMemory
          )}
          {ParameterAccord(
            "Слот розширення пам'яті",
            uniqueTabletMemoryExpansionSlots,
            selectedTabletMemoryExpansionSlot,
            setSelectedTabletMemoryExpansionSlot
          )}
          {ParameterAccord(
            "Процесор",
            uniqueTabletProcessors,
            selectedTabletProcessor,
            setSelectedTabletProcessor
          )}
          {ParameterAccord(
            "Частота процесора",
            uniqueTabletProcessorFrequencies,
            selectedTabletProcessorFrequency,
            setSelectedTabletProcessorFrequency
          )}
          {ParameterAccord(
            "Кількість ядер процесора",
            uniqueTabletProcessorCores,
            selectedTabletProcessorCores,
            setSelectedTabletProcessorCores
          )}
          {ParameterAccord(
            "Вбудовані динаміки",
            uniqueTabletBuiltInSpeakers,
            selectedTabletBuiltInSpeakers,
            setSelectedTabletBuiltInSpeakers
          )}
          {ParameterAccord(
            "Ємність батареї",
            uniqueTabletBatteryCapacities,
            selectedTabletBatteryCapacity,
            setSelectedTabletBatteryCapacity
          )}
          {ParameterAccord(
            "Фронтальна камера",
            uniqueTabletFrontCameras,
            selectedTabletFrontCamera,
            setSelectedTabletFrontCamera
          )}
          {ParameterAccord(
            "Тилова камера",
            uniqueTabletRearCameras,
            selectedTabletRearCamera,
            setSelectedTabletRearCamera
          )}
          {ParameterAccord(
            "Wi-Fi",
            uniqueTabletWifi,
            selectedTabletWifi,
            setSelectedTabletWifi
          )}
          {ParameterAccord(
            "Мобільна мережа",
            uniqueTabletCellularNetworks,
            selectedTabletCellularNetwork,
            setSelectedTabletCellularNetwork
          )}
          {ParameterAccord(
            "Голосова комунікація",
            uniqueTabletVoiceCommunication,
            selectedTabletVoiceCommunication,
            setSelectedTabletVoiceCommunication
          )}
          {ParameterAccord(
            "GPS",
            uniqueTabletGPS,
            selectedTabletGPS,
            setSelectedTabletGPS
          )}
          {ParameterAccord(
            "NFC",
            uniqueTabletNFC,
            selectedTabletNFC,
            setSelectedTabletNFC
          )}
          {ParameterAccord(
            "Зовнішні порти",
            uniqueTabletExternalPorts,
            selectedTabletExternalPorts,
            setSelectedTabletExternalPorts
          )}
          {ParameterAccord(
            "Вага",
            uniqueTabletWeight,
            selectedTabletWeight,
            setSelectedTabletWeight
          )}
          {ParameterAccord(
            "Колір корпусу",
            uniqueTabletBodyColor,
            selectedTabletBodyColor,
            setSelectedTabletBodyColor
          )}
          {ParameterAccord(
            "Колір фронтальної панелі",
            uniqueTabletFrontPanelColor,
            selectedTabletFrontPanelColor,
            setSelectedTabletFrontPanelColor
          )}
        </>
      )}
    </>
  );
}
