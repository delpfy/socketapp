import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { IItems, Status } from "../../../redux/types";
import { getItemsByCategory } from "../../../redux/home/asyncActions";



import Card from "../Block/CatalogCard/Card";
import Skeleton from "../Block/CatalogCard/Skeleton";
import NotFoundPage from "../../../Pages/NotFound/NotFoundPage";

export const CatalogField = () => {
  const { category, status } = useAppSelector((state) => state.home);

  // IItemsDisplay has {items: [{...}]} field in it, so we trying to get
  // exactly that field.
  const { items } = useAppSelector((state) => state.home.itemsCategory);

  const dispatch = useAppDispatch();

  // Trying to make request to get items from same category.
  useEffect(() => {
    dispatch(getItemsByCategory(category));
  }, [category]);

  const Catalog = () => {
    return (
      <Box width={"100%"} paddingTop={"2%"}>
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <Typography variant={"h3"} fontSize={30} fontFamily={"Comfortaa"}>
            {category}
          </Typography>
        </Box>
        <Box>
          <Grid
            container
            padding={"2%"}
            spacing={{ xs: 1, sm: 3, md: 4 }}
            columns={{ xs: 1, sm: 8, md: 12, lg: 16, xl: 20 }}
          >
            {items.map((item: IItems) => (
              <Grid
                item
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                paddingBottom={2}
                xs={2}
                sm={4}
                md={4}
                lg={4}
                xl={5}
                key={item._id}
              >
                <Card key={item._id} {...item} />
              </Grid>
            ))}
            
          </Grid>
        </Box>
      </Box>
    );
  };

  const CatalogSkeletons = () => {
    return (
      <Box width={"100%"} paddingTop={"2%"}>
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <Typography variant={"h3"} fontSize={30} fontFamily={"Comfortaa"}>
            {category}
          </Typography>
        </Box>
        <Box>
          <Grid
            container
            padding={"2%"}
            spacing={{ xs: 1, sm: 3, md: 4 }}
            columns={{ xs: 4, sm: 8, md: 12, lg: 16, xl: 20 }}
          >
            {
              
              Array.from({ length: 10 }, () => {
                return <Grid
                item
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                xs={2}
                sm={4}
                md={4}
                lg={4}
                xl={5}
              >
                <Skeleton />
              </Grid>
              })
            }
          </Grid>
        </Box>
      </Box>
    );
  };

  function StatusHandler (status: Status) {
    switch(status){
      case "success" : 
      if(items !== undefined){
        return <Catalog />
      }
      else{
        return <CatalogSkeletons />
      }
      case "pending": return <CatalogSkeletons />
      case "error":  return <NotFoundPage/>
      default: return <NotFoundPage/>
    }
  }

  return (
    // 'success' | 'pending'| 'error'
    StatusHandler(status)
    
  );
};

export default CatalogField;
