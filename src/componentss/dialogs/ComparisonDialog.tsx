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
} from "@mui/material";
import { useEffect, useState } from "react";
import BasketPage from "../../pagess/cart/Cart";
import { useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import ErrorDialog from "./ErrorDialog";
import InfoDialog from "./InfoDialog";
import ComparisonPage from "../../pagess/comparison/Comparison";

type Props = {
  openComparison: boolean;
  ComparisonDialog_close: () => void;
};

export default function ComparisonDialog({
  openComparison,
  ComparisonDialog_close,
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
    ComparisonDialog_close();
  }, [itemCurrent]);

  function InfoDialog_close() {
    setOpenInfo(false);
  }

  function ErrorDialog_close() {
    setOpenError(false);
  }

  function handleContinueShopping() {
    ComparisonDialog_close();
    navigate("/");
  }

  return (
    <>
      <Dialog
        open={openComparison}
        onClose={ComparisonDialog_close}
        scroll={scroll}
        maxWidth={maxWidth}
        fullWidth={fullWidth}
        fullScreen={fullScreen}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle
          id="scroll-dialog-title"
          width={"90%"}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography fontFamily={"Comfortaa"} fontSize={22}>
            Порівняння товарів
          </Typography>
        </DialogTitle>

        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            <ComparisonPage />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
            onClick={handleContinueShopping}
          >
            Продовжити покупки
          </Button>
        </DialogActions>
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
