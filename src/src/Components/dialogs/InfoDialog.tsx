import {
  DialogActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
} from "@mui/material";

type Props = {
  openInfo: boolean;
  closeInfoDialog: () => void;
  infoMessage: string;
};

export default function InfoDialog({
  openInfo,
  closeInfoDialog,
  infoMessage,
}: Props) {
  return (
    <Dialog open={openInfo} onClose={closeInfoDialog}>
      <DialogTitle sx={{ fontFamily: "Comfortaa", fontSize: 15 }}>
        Інформація
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          display={"flex"}
          flexDirection={"row"}
          sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
        >
          {infoMessage}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
          onClick={closeInfoDialog}
        >
          Зрозуміло
        </Button>
      </DialogActions>
    </Dialog>
  );
}
