import React, { useEffect } from "react";

import CatalogField from "../../Components/Catalog/field/CatalogField";
import { useAppDispatch } from "../../redux/hooks";
import { getAllItems } from "../../redux/home/asyncActions";
import { Box } from "@mui/material";
import AppBarMenu from "../../Components/menu/appbar/AppBarMenu";

export const HomePage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllItems());
  }, []);

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
