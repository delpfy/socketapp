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
  InfoDialog_close: () => void;
  infoMessage: string;
};

export default function InfoDialog({
  openInfo,
  InfoDialog_close,
  infoMessage,
}: Props) {
  return (
    <Dialog open={openInfo} onClose={InfoDialog_close}>
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
          onClick={InfoDialog_close}
        >
          Зрозуміло
        </Button>
      </DialogActions>
    </Dialog>
  );
}
