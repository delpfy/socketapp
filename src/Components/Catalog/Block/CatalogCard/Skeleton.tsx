import * as React from "react";
import Card from "@mui/material/Card";
import { CircularProgress } from "@mui/material";

export default function CatalogSkeleton() {
  return (
    <Card
      sx={{
        maxWidth: 345,
        minWidth: 345,
        minHeight: 450,
        maxHeight: 450,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2%",
      }}
    >
      <CircularProgress size={50} />
    </Card>
  );
}
