import React from "react";

import CatalogField from "../../componentss/catalogg/fieldd/CatalogField";
import { Box } from "@mui/material";
import AppBarMenu from "../../componentss/menuu/appbar/Menu";

export const HomePage = () => {
  return (
    <>
      <AppBarMenu />
      <Box width={'85%'} margin={'0 auto'}>
        <CatalogField />
      </Box>
    </>
  );
};

export default HomePage;
