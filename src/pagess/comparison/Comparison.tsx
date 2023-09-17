import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { Items } from "../../redux/types";
import ItemsAbsence from "../ItemsAbsence";

import ComparisonCard from "./ComparisonCard";
import { setDifferencesMode } from "../../redux/home/homeSlice";

export default function ComparisonPage() {
  const { itemsComparison, differencesMode, categories , category} = useAppSelector(
    (state) => state.home
  );

  const [comparisonCategory, setComparisonCategory] = useState(
    category === "" ? categories[0].name : category
  );

  useEffect(() => {
    setSortedItems(
      [...itemsComparison].filter(
        (item: any) => item.category === comparisonCategory
      )
    );
  }, [itemsComparison]);

  const [sortedItems, setSortedItems] = useState(
    [...itemsComparison].filter(
      (item: any) => item.category === comparisonCategory
    )
  );
  const categoriesWithItems = categories.filter((category) =>
    itemsComparison.some((item: any) => item.category === category.name)
  );
  function handleComparisonCategoryChange(e: any) {
    setComparisonCategory(e.target.value);
    setSortedItems(
      itemsComparison.filter((item: any) => item.category === e.target.value)
    );
  }

  const dispatch = useAppDispatch();

  return (
    <Box width={"100%"} paddingTop={"2%"}>
      <Box>
        <Grid
          container
          padding={"2%"}
          spacing={{ xs: 1, sm: 3, md: 4 }}
          columns={{ xs: 1, sm: 4, md: 8, lg: 12, xl: 19 }}
        >
          {itemsComparison.length === 0 ? (
            <ItemsAbsence />
          ) : (
            <>
              <FormControl fullWidth>
                <InputLabel id="processor-label">Категорія</InputLabel>
                <Select
                  labelId="processor-label"
                  id="processor-select"
                  value={comparisonCategory}
                  onChange={handleComparisonCategoryChange}
                  MenuProps={{
                    anchorOrigin: {
                      vertical: "bottom",
                      horizontal: "left",
                    },
                    transformOrigin: {
                      vertical: "top",
                      horizontal: "left",
                    },
                    PaperProps: {
                      style: {
                        maxHeight: 200,
                      },
                    },
                  }}
                >
                  {categoriesWithItems.map((item) => (
                    <MenuItem key={item.name} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <>
                {sortedItems.length === 0 ? (
                  <ItemsAbsence />
                ) : (
                  <>
                    <Box
                      display={"flex"}
                      flexDirection={"column"}
                      alignItems={"flex-start"}
                      paddingTop={3}
                    >
                      <Typography fontFamily={"Ubuntu"} fontSize={18}>
                        {" "}
                        Тільки відмінності
                      </Typography>
                      <Switch
                        checked={differencesMode}
                        onChange={(e: any) =>
                          dispatch(setDifferencesMode(e.target.checked))
                        }
                      />
                    </Box>
                    <Box
                      display={"flex"}
                      width={"100%"}
                      justifyContent={"start"}
                      alignItems={"center"}
                      sx={{ overflowX: "scroll" }}
                    >
                      {sortedItems.map((item) => (
                        <ComparisonCard key={item._id} {...item} />
                      ))}
                      <Grid item sx={{ width: "100%" }}>
                        <Box width="100%" height={20} />
                      </Grid>
                    </Box>
                  </>
                )}
              </>
            </>
          )}
        </Grid>
      </Box>
    </Box>
  );
}
