import {
  DialogActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  DialogProps,
  useMediaQuery,
  useTheme,
  Typography,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import BasketPage from "../../pagess/cart/Cart";
import { useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import ErrorDialog from "./ErrorDialog";
import InfoDialog from "./InfoDialog";
import FavoritesPage from "../../pagess/favorites/Favorites";

type Props = {
  openFavorites: boolean;
  FavoritesDialog_close: () => void;
};

export default function FavoritesDialog({
  openFavorites,
  FavoritesDialog_close,
}: Props) {
  const { itemCurrent } = useAppSelector((state) => state.home);
  const navigate = useNavigate();

  const [openError, setOpenError] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string>("Unhandled error");
  const [infoMessage, setInfoMessage] = useState<string>("Some info");

  const [scroll] = useState<DialogProps["scroll"]>("paper");
  const [maxWidth] = useState<DialogProps["maxWidth"]>("md");
  const [fullWidth] = useState(true);

  const fullScreen = useMediaQuery(useTheme().breakpoints.down("md"));

  useEffect(() => {
    FavoritesDialog_close();
  }, [itemCurrent]);

  function InfoDialog_close() {
    setOpenInfo(false);
  }

  function ErrorDialog_close() {
    setOpenError(false);
  }

  

  return (
    <>
      <Dialog
        open={openFavorites}
        onClose={FavoritesDialog_close}
        scroll={scroll}
        maxWidth={maxWidth}
        fullWidth={fullWidth}
        fullScreen={fullScreen}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle
          sx={{
            fontFamily: "Comfortaa",
            fontSize: 20,
            borderBottom: "2px solid black",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Обране
          <IconButton onClick={FavoritesDialog_close}>
            <img
              src={require("../../img/crossIcon.png")}
              style={{ width: 15, height: 15 }}
              alt="sdf"
            />
          </IconButton>
        </DialogTitle>

        <DialogContent
          sx={{
            overflowY: "auto",
            overflowX: "none",
            marginRight: 2,
            "&::-webkit-scrollbar": {
              width: "10px",
              height: "10px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#000000",
              borderRadius: "5px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#D9D9D9",
              borderRadius: "5px",
            },
          }}
          dividers={scroll === "paper"}
        >
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            <FavoritesPage />
          </DialogContentText>
        </DialogContent>
      </Dialog>

      <ErrorDialog
        openError={openError}
        ErrorDialog_close={ErrorDialog_close}
        errorMessage={errorMessage}
      />
      <InfoDialog
        openInfo={openInfo}
        InfoDialog_close={InfoDialog_close}
        infoMessage={infoMessage}
      />
    </>
  );
}
