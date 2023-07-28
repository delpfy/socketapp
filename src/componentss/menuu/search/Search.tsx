import { Autocomplete, Box, TextField, debounce } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { Items } from "../../../redux/types";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { searchItems } from "../../../redux/home/asyncActions";
import { useNavigate } from "react-router-dom";
import { setCurrentItem } from "../../../redux/home/homeSlice";



export default function Search(){
  const {itemsDisplay} = useAppSelector(state => state.home);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<readonly Items[]>([]);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setSearchResults(itemsDisplay.items);
  }, [itemsDisplay])

  function handleSearchChange(event: any, newInputValue: string) {
    setSearchQuery(newInputValue);

    if (newInputValue !== "" && newInputValue.length > 2) {
      searchDelayed(newInputValue);
    }
  }

  function loadLocations(newInputValue: any) {
    dispatch(searchItems( newInputValue.toString()));
  }

  
  function getCurrentItem(props: Items) {
    dispatch(setCurrentItem(props));
    navigate("/catalog/item");

    const recentlyReviewed = JSON.parse(
      localStorage.getItem("recentlyReviewed") || "{}"
    );

    if (recentlyReviewed !== undefined) {
      const itemIndex = recentlyReviewed.findIndex(
        (item: Items) => item.name === props.name
      );

      if (itemIndex === -1) {
        recentlyReviewed.push(props);
        localStorage.setItem(
          "recentlyReviewed",
          JSON.stringify(recentlyReviewed)
        );
      }
    }
  }

  const searchDelayed = useMemo(() => debounce(loadLocations, 300), []);


  return (
    <>
     <Box  sx = {{ width: 500}}>
            <Autocomplete
            color="success"
            size="small"
              sx = {{marginTop: 3, background: 'white'}}
              options={searchResults === undefined ? [] : searchResults}
              inputValue={searchQuery}
              onInputChange={handleSearchChange}
              onChange={(e, value) =>{ if(value){getCurrentItem(value)}} }
              renderInput={(params) => <TextField  {...params} color="success" required />}
              style={{ marginBottom: 16 }}
              getOptionLabel={(option) =>
                
                option.name || ""
              }
              fullWidth
              noOptionsText={"(·_·)"}
            />
          </Box>
    </>
  )
}