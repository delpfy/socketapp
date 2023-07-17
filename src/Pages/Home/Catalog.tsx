import React, { useEffect } from "react";

import CatalogField from "../../Components/Catalog/Field/CatalogField";
import { useAppDispatch } from "../../redux/hooks";
import { getAllItems } from "../../redux/home/asyncActions";
import { Box } from "@mui/material";
import AppBarMenu from "../../Components/Menu/appbar/Menu";

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
