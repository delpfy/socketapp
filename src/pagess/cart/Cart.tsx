import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import { getBasketItemsByUser } from "../../redux/basket/asyncActions";
import { Box, Grid,  } from "@mui/material";
import { ShippingItems, Status } from "../../redux/types";


import { checkAuthorization } from "../../redux/user/asyncActions";
import NoItemsPage from "../ItemsAbsence";
import NotFoundPage from "../PageAbsence";
import CatalogSkeleton from "../../componentss/catalogg/block/CatalogSkeleton";
import CartItemCard from "../../componentss/cart/block/CartItemCard";


export const BasketPage = () => {
  const {items} = useAppSelector((state) => state.basket.items);
  const {status, itemsAmount} = useAppSelector((state) => state.basket);
  const {user} = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  
  React.useEffect(() => {
    dispatch(getBasketItemsByUser(user.id));
  }, [dispatch, user.id, itemsAmount]);

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
            {items.map((item: ShippingItems) => (
              
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
                <CartItemCard key={item._id} {...item} />
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
              
              Array.from({ length: 5 }, () => {
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
                <CatalogSkeleton />
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
      if (items !== undefined){
        if(items.length === 0){
          return <NoItemsPage />
          
        }
        else{
          return <Catalog />
        }
         
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
