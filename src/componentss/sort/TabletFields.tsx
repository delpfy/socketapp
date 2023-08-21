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
import { sortTabletsByParameters } from "../../redux/home/homeSlice";
import { SelectedSortParams } from "../../redux/types";

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
      dispatch(sortTabletsByParameters({ selectedParams: updatedParams }));
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
                dispatch(sortTabletsByParameters({ selectedParams: {} }));
              }}
            >
              сброс
            </Button>
          </Box>
          {ParameterAccord("Бренд", uniqueTabletBrands)}
          {ParameterAccord("Лінійка", uniqueTabletLines)}
          {ParameterAccord("Операційна система", uniqueTabletPreinstalledOS)}
          {ParameterAccord("Розмір матриці", uniqueTabletScreenDiagonals)}
          {ParameterAccord("Роздільна здатність", uniqueTabletResolutions)}
          {ParameterAccord("Тип матриці", uniqueTabletMatrixTypes)}

          {ParameterAccord("Обсяг пам'яті RAM", uniqueTabletMemoryRAM)}
          {ParameterAccord("Вбудована пам'ять", uniqueTabletBuiltInMemory)}
          {ParameterAccord(
            "Слот розширення пам'яті",
            uniqueTabletMemoryExpansionSlots
          )}
          {ParameterAccord("Процесор", uniqueTabletProcessors)}
          {ParameterAccord(
            "Частота процесора",
            uniqueTabletProcessorFrequencies
          )}
          {ParameterAccord(
            "Кількість ядер процесора",
            uniqueTabletProcessorCores
          )}
          {ParameterAccord("Вбудовані динаміки", uniqueTabletBuiltInSpeakers)}
          {ParameterAccord("Ємність батареї", uniqueTabletBatteryCapacities)}
          {ParameterAccord("Фронтальна камера", uniqueTabletFrontCameras)}
          {ParameterAccord("Тилова камера", uniqueTabletRearCameras)}
          {ParameterAccord("Wi-Fi", uniqueTabletWifi)}
          {ParameterAccord("Мобільна мережа", uniqueTabletCellularNetworks)}
          {ParameterAccord(
            "Голосова комунікація",
            uniqueTabletVoiceCommunication
          )}
          {ParameterAccord("GPS", uniqueTabletGPS)}
          {ParameterAccord("NFC", uniqueTabletNFC)}
          {ParameterAccord("Зовнішні порти", uniqueTabletExternalPorts)}
          {ParameterAccord("Вага", uniqueTabletWeight)}
          {ParameterAccord("Колір корпусу", uniqueTabletBodyColor)}
          {ParameterAccord(
            "Колір фронтальної панелі",
            uniqueTabletFrontPanelColor
          )}
        </>
      )}
    </>
  );
}
