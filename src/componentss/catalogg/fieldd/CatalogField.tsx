import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { Items, Status } from "../../../redux/types";
import { getItemsByCategory } from "../../../redux/home/asyncActions";

import Card from "../block/CatalogCard";
import Skeleton from "../block/CatalogSkeleton";
import NotFoundPage from "../../../pagess/PageAbsence";
import { useNavigate } from "react-router-dom";
import {
  setAfterOrder,
  synchronizeBasket,
} from "../../../redux/basket/basketSlice";
import { setEditItemMode } from "../../../redux/home/homeSlice";

export const CatalogField = () => {
  const { category, status, editItemMode } = useAppSelector(
    (state) => state.home
  );
  const { user } = useAppSelector((state) => state.user);
  const { afterOrder } = useAppSelector((state) => state.basket);

  // ItemsDisplay has {items: [{...}]} field in it, so we trying to get
  // exactly that field.
  const { itemsCategory, itemsSorted, sorted } = useAppSelector(
    (state) => state.home
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Trying to make request to get items from same category.
  useEffect(() => {
    dispatch(getItemsByCategory(category));
  }, [category, dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (afterOrder) {
      dispatch(synchronizeBasket());
      dispatch(setAfterOrder(false));
    }
    if (editItemMode) {
      dispatch(setEditItemMode(false));
    }
  }, []);

  function redirectToAddItemPage() {
    navigate("/add-item");
  }

  const CatalogSkeletons = () => {
    return (
      <Box
        width={"100%"}
        sx={{
          paddingTop: {
            xs: "25%",
            md: "15%",
            lg: "10%",
          },
        }}
      >
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
            {Array.from({ length: 6 }, (param, index) => {
              return (
                <Grid
                  item
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  xs={2}
                  sm={4}
                  md={4}
                  lg={4}
                  xl={5}
                  key={index}
                >
                  <Skeleton />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>
    );
  };

  function StatusHandler(status: Status) {
    switch (status) {
      case "success":
        if (
          itemsCategory.items !== undefined ||
          itemsSorted.items !== undefined
        ) {
          return (
            <>
              <Box width={"100%"}>
                <Box
                  display={"flex"}
                  justifyContent={"flex-end"}
                  alignItems={"center"}
                  sx={{ paddingTop: { xs: "20%", md: "13%", lg: "10%" } }}
                >
                  <Box
                    width={"55%"}
                    alignSelf={"flex-end"}
                    marginRight={3}
                    marginBottom={5}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant={"h3"}
                      fontSize={30}
                      fontFamily={"Comfortaa"}
                    >
                      {category}
                    </Typography>
                    {user.role === "manager" ? (
                      <Button
                        variant="contained"
                        onClick={redirectToAddItemPage}
                      >
                        Додати товар
                      </Button>
                    ) : (
                      <></>
                    )}
                  </Box>
                </Box>
                <Box
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"center"}
                  alignItems={"flex-start"}
                >
                  <Grid
                    container
                    padding={"2%"}
                    paddingTop={0}
                    spacing={{ xs: 1, sm: 3, md: 4 }}
                    columns={{ xs: 1, sm: 8, md: 12, lg: 16, xl: 20 }}
                  >
                    {sorted
                      ? itemsSorted.items.map((item: Items) => (
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
                        ))
                      : itemsCategory.items.map((item: Items) => (
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
            </>
          );
          //return <CatalogSkeletons />
        } else {
          return <CatalogSkeletons />;
        }
      case "pending":
        return <CatalogSkeletons />;
      case "error":
        return <NotFoundPage />;
      default:
        return <NotFoundPage />;
    }
  }

  return (
    // 'success' | 'pending'| 'error'
    StatusHandler(status)
  );
};

export default CatalogField;
