import React, { useEffect } from "react";

import CatalogField from "../../Components/Catalog/Field/CatalogField";
import { useAppDispatch } from "../../redux/hooks";
import { getAllItems } from "../../redux/home/asyncActions";
import { Box } from "@mui/material";

export const HomePage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllItems());
  }, []);

  return (
    <>
      <Box>
        <CatalogField />
      </Box>
    </>
  );
};

export default HomePage;
