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
import { setReset, sortNetworkByParameters } from "../../redux/home/homeSlice";
import { SelectedSortParams } from "../../redux/types";

export default function NetworkFields() {
  const { itemsCategory } = useAppSelector((state) => state.home);

  const uniqueNetworkBrands =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) => item.fields.brand) ?? []
          )
        )
      : [];

  const uniqueNetworkTypes =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) => item.fields.type) ?? []
          )
        )
      : [];

  const uniqueNetworkMaxSpeed =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) => item.fields.maxSpeed) ?? []
          )
        )
      : [];

  const uniqueNetworkPowerSupply =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) => item.fields.powerSupply) ??
              []
          )
        )
      : [];

  const uniqueNetworkPoeSupport =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) => item.fields.poeSupport) ??
              []
          )
        )
      : [];
  const uniqueNetworkVpnSupport =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) => item.fields.vpnSupport) ??
              []
          )
        )
      : [];
  const uniqueNetworkFirewall =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map((item: any) => item.fields.firewall) ?? []
          )
        )
      : [];
  const uniqueNetworkRackMountable =
    itemsCategory !== undefined
      ? Array.from(
          new Set(
            itemsCategory.items?.map(
              (item: any) => item.fields.rackMountable
            ) ?? []
          )
        )
      : [];

  const uniqueNetworkColors =
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
      dispatch(sortNetworkByParameters({ selectedParams: updatedParams }));
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
              return item.fields.type === paramValue;
            case "Максимальна швидкість":
              return item.fields.maxSpeed?.toString() === paramValue;
            case "Постачання живлення":
              return item.fields.powerSupply?.toString() === paramValue;
            case "Монтаж у стійку":
              return item.fields.rackMountable === paramValue;
            case "Підтримка PoE":
              return item.fields.poeSupport === paramValue;
            case "Підтримка VPN":
              return item.fields.vpnSupport === paramValue;
            case "Файервол":
              return item.fields.firewall === paramValue;
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
                dispatch(setReset(true))
                dispatch(sortNetworkByParameters({ selectedParams: {} }));
              }}
            >
              сброс
            </Button>
          </Box>
          {ParameterAccord("Бренд", uniqueNetworkBrands)}
          {ParameterAccord("Тип", uniqueNetworkTypes)}
          {ParameterAccord("Максимальна швидкість", uniqueNetworkMaxSpeed)}
          {ParameterAccord("Постачання живлення", uniqueNetworkPowerSupply)}
          {ParameterAccord("Монтаж у стійку", uniqueNetworkRackMountable)}
          {ParameterAccord("Підтримка VPN", uniqueNetworkVpnSupport)}
          {ParameterAccord("Підтримка PoE", uniqueNetworkPoeSupport)}
          {ParameterAccord("Файервол", uniqueNetworkFirewall)}
          {ParameterAccord("Колір", uniqueNetworkColors)}
        </>
      )}
    </>
  );
}
