import React, { useEffect } from "react";

import CatalogField from "../../components/catalog/field/CatalogField";
import { useAppDispatch } from "../../redux/hooks";
import { getAllItems } from "../../redux/home/asyncActions";
import { Box } from "@mui/material";
import AppBarMenu from "../../components/menu/appbar/Menu";

export const HomePage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllItems());
  }, [dispatch]);

  return (
    <>
    <AppBarMenu/>
      <Box>
        <CatalogField />
      </Box>
    </>
  );
};

export default HomePage;
