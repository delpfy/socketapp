import React, { useEffect } from "react";

import CatalogField from "../../componentss/catalogg/fieldd/CatalogField";
import { useAppDispatch } from "../../redux/hooks";
import { getAllItems } from "../../redux/home/asyncActions";
import { Box, Button } from "@mui/material";
import AppBarMenu from "../../componentss/menuu/appbar/Menu";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllItems());
  }, [dispatch]);

  const navigate = useNavigate();
  return (
    <>
    <AppBarMenu/>
      <Box >
        <CatalogField />
      </Box>
    </>
  );
};

export default HomePage;
