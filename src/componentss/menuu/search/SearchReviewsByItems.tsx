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
import {
  getItemById,
  getItemsByCategory,
  searchCategories,
  searchItems,
} from "../../../redux/home/asyncActions";
import { useNavigate } from "react-router-dom";
import { getItemReviews } from "../../../redux/review/asyncActions";
import { setProcess } from "../../../redux/admin/adminSlice";

export default function SearchReviewsByItems() {
  const { itemsDisplay } = useAppSelector(
    (state) => state.home
  );
  const { process } = useAppSelector((state) => state.admin);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<readonly Items[]>([]);

  const dispatch = useAppDispatch();

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

  return (
    <>
      <Box
       
        sx={{
          
          alignSelf: "flex-start",
          
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
            width: 500
          }}
          options={searchResults === undefined ? [] : searchResults}
          inputValue={searchQuery}
          onInputChange={handleSearchChange}
          onChange={(e, value) => {
            if (value) {
              switch (process) {
                case "show-many-reviews":
                  dispatch(getItemById(value._id)).then((result: any) => {
                    if (result.meta.requestStatus === "fulfilled") {
                      dispatch(getItemReviews(value._id));
                    }
                  });

                  return;
                case "show-many-items":
                  dispatch(getItemById(value._id)).then((result: any) => {
                    if (result.meta.requestStatus === "fulfilled") {
                      dispatch(setProcess("edit-one-item"));
                    }
                  });

                  return;
              }
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
          
          noOptionsText={"(·_·)"}
        />
      </Box>
    </>
  );
}
