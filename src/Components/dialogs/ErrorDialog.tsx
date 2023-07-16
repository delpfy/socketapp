import {
    DialogActions,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    Button,
  } from "@mui/material";
  
  type Props = {
      openError: boolean,
      closeErrorDialog: () => void
      errorMessage: string
  }
  
  export default function ErrorDialog({openError, closeErrorDialog, errorMessage}: Props) {
    return (
        <Dialog open={openError} onClose={closeErrorDialog}>
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
            onClick={closeErrorDialog}
          >
            Зрозуміло
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  