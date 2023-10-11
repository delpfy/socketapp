import {
    DialogActions,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    Button,
  } from "@mui/material";
  
  type Props = {
    openDelete: boolean;
    DeleteDialog_close: () => void;
    DeleteFunc: () => void;
  };
  
  export default function DeleteDialog({
    openDelete,
    DeleteDialog_close,
    DeleteFunc,
  }: Props) {
    function executeDeleteFunc (){
        DeleteFunc();
        DeleteDialog_close()
    }
    return (
      <Dialog open={openDelete} onClose={DeleteDialog_close}>
        <DialogTitle sx={{ fontFamily: "Comfortaa", fontSize: 15 }}>
          Підтверження
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            display={"flex"}
            flexDirection={"row"}
            sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
          >
            Видалити?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
            onClick={executeDeleteFunc}
          >
            Так
          </Button>
          <Button
            sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
            onClick={DeleteDialog_close}
          >
            Ні
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  