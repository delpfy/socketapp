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
import { sortMonitorsByParameters } from "../../redux/home/homeSlice";

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

  const uniqueScreenDiagonals = itemsCategory !== undefined
      ? Array.from(
        new Set(
          itemsCategory.items?.map((item: any) => item.fields.screenDiagonal)
        )
      )
    : [];

  const uniqueMatrixTypes = itemsCategory !== undefined
      ? Array.from(
        new Set(itemsCategory.items?.map((item: any) => item.fields.matrixType))
      )
    : [];

  const uniqueAspectRatios = itemsCategory !== undefined
      ? Array.from(
        new Set(itemsCategory.items?.map((item: any) => item.fields.aspectRatio))
      )
    : [];

  const uniqueResolutions = itemsCategory !== undefined
      ? Array.from(
        new Set(itemsCategory.items?.map((item: any) => item.fields.resolution))
      )
    : [];

  const uniqueResponseTimes = itemsCategory !== undefined
      ? Array.from(
        new Set(
          itemsCategory.items?.map((item: any) => item.fields.responseTime)
        )
      )
    : [];

  const uniqueViewingAngles = itemsCategory !== undefined
      ? Array.from(
        new Set(
          itemsCategory.items?.map((item: any) => item.fields.viewingAngles)
        )
      )
    : [];

  const uniqueBacklightTypes = itemsCategory !== undefined
      ? Array.from(
        new Set(
          itemsCategory.items?.map((item: any) => item.fields.backlightType)
        )
      )
    : [];

  const uniqueBrightnessValues = itemsCategory !== undefined
      ? Array.from(
        new Set(itemsCategory.items?.map((item: any) => item.fields.brightness))
      )
    : [];

  const uniqueContrastRatios = itemsCategory !== undefined
      ? Array.from(
        new Set(
          itemsCategory.items?.map((item: any) => item.fields.contrastRatio)
        )
      )
    : [];

  const uniqueScreenCoatings = itemsCategory !== undefined
      ? Array.from(
        new Set(
          itemsCategory.items?.map((item: any) => item.fields.screenCoating)
        )
      )
    : [];

  const uniqueCurvedScreenValues = itemsCategory !== undefined
      ? Array.from(
        new Set(
          itemsCategory.items?.map((item: any) => item.fields.curvedScreen)
        )
      )
    : [];

  const uniqueRefreshRates = itemsCategory !== undefined
      ? Array.from(
        new Set(itemsCategory.items?.map((item: any) => item.fields.refreshRate))
      )
    : [];

  const [selectedBrand, setSelectedBrand] = React.useState("");
  const [selectedScreenDiagonal, setSelectedScreenDiagonal] =
    React.useState("");
  const [selectedMatrixType, setSelectedMatrixType] = React.useState("");
  const [selectedAspectRatio, setSelectedAspectRatio] = React.useState("");
  const [selectedResolution, setSelectedResolution] = React.useState("");
  const [selectedResponseTime, setSelectedResponseTime] = React.useState("");
  const [selectedViewingAngles, setSelectedViewingAngles] = React.useState("");
  const [selectedBacklightType, setSelectedBacklightType] = React.useState("");
  const [selectedBrightness, setSelectedBrightness] = React.useState("");
  const [selectedContrastRatio, setSelectedContrastRatio] = React.useState("");
  const [selectedScreenCoating, setSelectedScreenCoating] = React.useState("");
  const [selectedCurvedScreen, setSelectedCurvedScreen] = React.useState("");
  const [selectedRefreshRate, setSelectedRefreshRate] = React.useState("");

  const dispatch = useAppDispatch();
  function performSort(
    paramName: string,
    paramValue: any,
    setSelectValue: Dispatch<SetStateAction<any>>
  ) {
    setSelectValue(paramValue);
    dispatch(
      sortMonitorsByParameters({ param: paramName, paramValue: paramValue })
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
            "Розмір матриці",
            uniqueScreenDiagonals,
            selectedScreenDiagonal,
            setSelectedScreenDiagonal
          )}
          {ParameterAccord(
            "Тип матриці",
            uniqueMatrixTypes,
            selectedMatrixType,
            setSelectedMatrixType
          )}
          {ParameterAccord(
            "Співвідношення сторін",
            uniqueAspectRatios,
            selectedAspectRatio,
            setSelectedAspectRatio
          )}
          {ParameterAccord(
            "Роздільна здатність",
            uniqueResolutions,
            selectedResolution,
            setSelectedResolution
          )}
          {ParameterAccord(
            "Час відгуку",
            uniqueResponseTimes,
            selectedResponseTime,
            setSelectedResponseTime
          )}
          {ParameterAccord(
            "Кути огляду",
            uniqueViewingAngles,
            selectedViewingAngles,
            setSelectedViewingAngles
          )}
          {ParameterAccord(
            "Тип підсвічування",
            uniqueBacklightTypes,
            selectedBacklightType,
            setSelectedBacklightType
          )}
          {ParameterAccord(
            "Яскравість",
            uniqueBrightnessValues,
            selectedBrightness,
            setSelectedBrightness
          )}
          {ParameterAccord(
            "Співвідношення контрастності",
            uniqueContrastRatios,
            selectedContrastRatio,
            setSelectedContrastRatio
          )}
          {ParameterAccord(
            "Покриття екрану",
            uniqueScreenCoatings,
            selectedScreenCoating,
            setSelectedScreenCoating
          )}
          {ParameterAccord(
            "Зігнута матриця",
            uniqueCurvedScreenValues,
            selectedCurvedScreen,
            setSelectedCurvedScreen
          )}
          {ParameterAccord(
            "Частота оновлення",
            uniqueRefreshRates,
            selectedRefreshRate,
            setSelectedRefreshRate
          )}
        </>
      )}
    </>
  );
}
