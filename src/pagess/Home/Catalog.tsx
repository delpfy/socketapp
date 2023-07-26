import React, { useEffect } from "react";

import CatalogField from "../../componentss/catalogg/fieldd/CatalogField";
import { useAppDispatch } from "../../redux/hooks";
import { getAllItems } from "../../redux/home/asyncActions";
import { Box } from "@mui/material";
import AppBarMenu from "../../componentss/menuu/appbar/Menu";


export const HomePage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllItems());
  }, [dispatch]);


  return (
    <>
      <AppBarMenu />
      <Box>
        <CatalogField />
      </Box>
    </>
  );
};

export default HomePage;
