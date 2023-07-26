import {
  DialogActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
} from "@mui/material";
import React from "react";

type Props = {
  openError: boolean;
  ErrorDialog_close: () => void;
  errorMessage: string;
};

export default function ErrorDialog({
  openError,
  ErrorDialog_close,
  errorMessage,
}: Props) {
  return (
    <Dialog open={openError} onClose={ErrorDialog_close}>
      <DialogTitle sx={{ fontFamily: "Comfortaa", fontSize: 15 }}>
        Помилка
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          display={"flex"}
          flexDirection={"row"}
          sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
        >
          {errorMessage}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
          onClick={ErrorDialog_close}
        >
          Зрозуміло
        </Button>
      </DialogActions>
    </Dialog>
  );
}
