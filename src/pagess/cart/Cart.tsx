import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import { getBasketItemsByUser } from "../../redux/basket/asyncActions";
import { Box, Grid } from "@mui/material";
import { TShippingItems, Status } from "../../redux/types";

import NoItemsPage from "../ItemsAbsence";
import NotFoundPage from "../PageAbsence";
import CatalogSkeleton from "../../componentss/catalogg/block/CatalogSkeleton";
import CartItemCard from "../../componentss/cart/block/CartItemCard";
import ItemsAbsence from "../ItemsAbsence";
import { synchronizeBasket } from "../../redux/basket/basketSlice";

export default function BasketPage () {
  const { user } = useAppSelector((state) => state.user);
  const {items} = useAppSelector(state => state.basket);
  const dispatch = useAppDispatch();



  
    return (
      <Box width={"100%"} paddingTop={"2%"}>
        <Box>
          <Grid
            container
            padding={"2%"}
            spacing={{ xs: 1, sm: 3, md: 4 }}
            columns={{ xs: 1, sm: 4, md: 8, lg: 8, xl: 10 }}
          >
            {
              items.length === 0
              ?
              <ItemsAbsence/>
              :
              items.map((item: TShippingItems) => (
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
              ))
            }
          </Grid>
        </Box>
      </Box>
    );


}


