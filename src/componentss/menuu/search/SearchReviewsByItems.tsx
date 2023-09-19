import {
  Autocomplete,
  Box,
  InputAdornment,
  TextField,
  debounce,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { Items } from "../../../redux/types";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getItemById, searchItems } from "../../../redux/home/asyncActions";
import { useNavigate } from "react-router-dom";
import { getItemReviews } from "../../../redux/review/asyncActions";

export default function SearchReviewsByItems() {
  const { itemsDisplay } = useAppSelector((state) => state.home);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<readonly Items[]>([]);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setSearchResults(itemsDisplay.items);
  }, [itemsDisplay]);

  function handleSearchChange(event: any, newInputValue: string) {
    setSearchQuery(newInputValue);

    if (newInputValue !== "" && newInputValue.length > 2) {
      searchDelayed(newInputValue);
    }
  }

  function loadLocations(newInputValue: any) {
    dispatch(searchItems(newInputValue.toString()));
  }

  const searchDelayed = useMemo(() => debounce(loadLocations, 300), []);

  function compareObjects(obj1: any, obj2: any) {
    for (const key in obj1) {
      if (obj1.hasOwnProperty(key)) {
        if (obj1[key] !== obj2[key]) {
          obj2[key] = obj1[key];
        }
      }
    }

    for (const key in obj2) {
      if (obj2.hasOwnProperty(key) && !obj1.hasOwnProperty(key)) {
        delete obj2[key];
      }
    }
  }

  function setAsRecentlyReviewed(currItem: any) {
    const recentlyReviewed = JSON.parse(
      localStorage.getItem("recentlyReviewed") || "{}"
    );

    if (recentlyReviewed !== undefined) {
      const itemIndex = recentlyReviewed.findIndex(
        (item: Items) => item.name === currItem.name
      );

      if (itemIndex === -1) {
        recentlyReviewed.push(currItem);
      } else {
        compareObjects(currItem, recentlyReviewed[itemIndex]);
      }
      localStorage.setItem(
        "recentlyReviewed",
        JSON.stringify(recentlyReviewed)
      );
    }
  }

  return (
    <>
      <Box
        alignItems={"center"}
        sx={{
          width: { xs: "65%", md: "80%" },
          alignSelf: "flex-start",
          margin: "0 auto",
        }}
      >
        <Autocomplete
          size="small"
          forcePopupIcon={false}
          sx={{
            marginTop: 2,
            backgroundColor: "white",
            borderRadius: 2,
            fontFamily: "'Roboto light', sans-serif!important",
          }}
          options={searchResults === undefined ? [] : searchResults}
          inputValue={searchQuery}
          onInputChange={handleSearchChange}
          onChange={(e, value) => {
            if (value) {
              dispatch(getItemById(value._id)).then((result: any) => {
                if (result.meta.requestStatus === "fulfilled") {
                  dispatch(getItemReviews(value._id));
                }
              });
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <img
                      src={require("../../../img/searchIcon.png")}
                      style={{ width: 23, height: 23, paddingLeft: 5 }}
                      alt="sdf"
                    />
                  </InputAdornment>
                ),
              }}
              size="small"
              variant="outlined"
              placeholder="Пошук..."
            />
          )}
          style={{
            marginBottom: 16,
            fontFamily: "'Roboto light', sans-serif !important",
            color: "white",
          }}
          getOptionLabel={(option) => option.name || ""}
          fullWidth
          noOptionsText={"(·_·)"}
        />
      </Box>
    </>
  );
}
