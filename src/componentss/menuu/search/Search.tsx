import { Autocomplete, Box, TextField, debounce } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { Items } from "../../../redux/types";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getItemById, searchItems } from "../../../redux/home/asyncActions";
import { useNavigate } from "react-router-dom";
import { getItemReviews } from "../../../redux/review/asyncActions";

export default function Search() {
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

  function setAsRecentlyReviewed() {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <Box sx={{ width: 500 }}>
        <Autocomplete
        
          
          size="small"
          sx={{ marginTop: 3, backgroundColor: "white", borderRadius: 2}}
          options={searchResults === undefined ? [] : searchResults}
          inputValue={searchQuery}
          onInputChange={handleSearchChange}
          onChange={(e, value) => {
            if (value) {
              dispatch(getItemById(value._id)).then((result: any) => {
                if (result.meta.requestStatus === "fulfilled") {
                  dispatch(getItemReviews(value._id)).then((result: any) => {
                    if (result.meta.requestStatus === "fulfilled") {
                      navigate("/catalog/item");
                      setAsRecentlyReviewed();
                    }
                  });
                }
              });
            }
          }}
          renderInput={(params) => (
            <TextField {...params} sx={{color: "white"}}   label="Пошук..."/>
          )}
          style={{ marginBottom: 16 , fontFamily: 'Roboto', color: "white"}}
          getOptionLabel={(option) => option.name || ""}
          fullWidth
          noOptionsText={"(·_·)"}
        />
      </Box>
    </>
  );
}
