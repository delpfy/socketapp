import React from "react";
import BasketItemBlock from "../../Components/BasketElements/item/BasketItemBlock";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import { getBasketItemByUser } from "../../redux/basket/asyncActions";
import { Box, Grid,  } from "@mui/material";
import { IBasketItems, Status } from "../../redux/types";


import { checkAuthorization } from "../../redux/user/asyncActions";
import NoItemsPage from "../ItemsAbsence";
import NotFoundPage from "../PageAbsence";
import Skeleton from "../../Components/Catalog/block/Skeleton";


export const BasketPage = () => {
  const {items} = useAppSelector((state) => state.basket.items);
  const {status} = useAppSelector((state) => state.basket);
  const {user} = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  
  React.useEffect(() => {
    dispatch(checkAuthorization());
    dispatch(getBasketItemByUser(user.id));
  }, []);

  const Catalog = () => {
    return (
      <Box width={"100%"} paddingTop={"2%"}>
        
        <Box>
          <Grid
            container
            padding={"2%"}
            spacing={{ xs: 1, sm: 3, md: 4 }}
            columns={{ xs: 1, sm: 4, md: 8, lg: 8, xl: 10 }}
          >
            {items.map((item: IBasketItems) => (
              
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
                <BasketItemBlock key={item._id} {...item} />
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
        
        <Box>
          <Grid
            container
            padding={"2%"}
            spacing={{ xs: 1, sm: 2, md: 4, lg: 8, xl: 10}}
            columns={{ xs: 1, sm: 4, md: 8, lg: 8, xl: 10 }}
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
      if(items.length === 0){
        return <NoItemsPage />
        
      }else if (items !== undefined){
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
    StatusHandler(status)
  );
};

export default BasketPage;
