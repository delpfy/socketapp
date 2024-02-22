import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Category } from "../../redux/types";
import {
  clearCurrentBannerImages,
  setSecondProcess,
  setThirdProcess,
} from "../../redux/admin/adminSlice";
import { useEffect, useRef, useState } from "react";
import {
  createBanner,
  deleteBanner,
  getAllBanners,
  getBannerById,
  updateBanner,
  uploadBannerImage,
} from "../../redux/admin/asyncActions";
import InfoDialog from "../../componentss/dialogs/InfoDialog";

export default function ShowBanners() {
  const {
    _banners,
    bannerImage,
    selectedBanner,

    second_process,
    third_process,
  } = useAppSelector((state) => state.admin);

  const [openInfo, setOpenInfo] = useState(false);
  const [infoMessage, setInfoMessage] = useState<string>("Some info");
  function InfoDialog_open() {
    setOpenInfo(true);
  }

  function InfoDialog_close() {
    setOpenInfo(false);
  }

  const bannerImageRef = useRef<HTMLInputElement | null>(null);

  function handleImageChange(e: any) {
    console.log(e.target.files[0]);

    const formData = new FormData();
    for (let i = 0; i < e.target.files.length; i++) {
      formData.append("banner_images", e.target.files[i]);
    }

    dispatch(uploadBannerImage(formData));
  }

  function handleLoadImageClick() {
    if (bannerImageRef.current) {
      bannerImageRef.current.click();
    }
  }

  function handleAddBanner() {
    if (bannerImage === "" || bannerImage === undefined) {
      InfoDialog_open();
      setInfoMessage("Ви не вказали зображення");
      return;
    }
    switch (second_process) {
      case "add-banner":
        dispatch(
          createBanner({
            bannerData: {
              image: bannerImage,
            },
          })
        ).then((result: any) => {
          if (result.meta.requestStatus === "fulfilled") {
            dispatch(setSecondProcess("none"));
            dispatch(getAllBanners());
          }
        });
        return;
      case "edit-banner":
        dispatch(
          updateBanner({
            bannerId: selectedBanner._id,
            bannerData: {
              image: bannerImage,
            },
          })
        ).then((result: any) => {
          if (result.meta.requestStatus === "fulfilled") {
            dispatch(setSecondProcess("none"));
            dispatch(getAllBanners());
          }
        });
        return;
    }
  }

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllBanners());
  }, [dispatch]);

  function handleEditBanner(bannerId: string): void {
    dispatch(getBannerById({ bannerId })).then((result: any) => {
      if (result.meta.requestStatus === "fulfilled") {
        dispatch(setSecondProcess("edit-banner"));
      }
    });
  }

  return (
    <>
      <InfoDialog
        openInfo={openInfo}
        InfoDialog_close={InfoDialog_close}
        infoMessage={infoMessage}
      />
      <Button
        onClick={() =>
          dispatch(
            setSecondProcess(
              second_process === "add-banner"
                ? "none"
                : second_process === "edit-banner"
                ? "none"
                : "add-banner"
            )
          )
        }
        variant="outlined"
        sx={{ margin: 5, marginLeft: 0, width: 200, justifySelf: "flex-start" }}
      >
        {" "}
        {second_process === "add-banner" ? (
          <>Відмінити додавання</>
        ) : second_process === "edit-banner" ? (
          <>Відмінити редагування</>
        ) : (
          <>Додати баннер</>
        )}{" "}
      </Button>

      {second_process === "add-banner" || second_process === "edit-banner" ? (
        <>
          <Box padding={2} paddingLeft={0}>
            <Typography>Новий Баннер</Typography>

            <Box>
              <Typography
                variant="h1"
                textAlign={"center"}
                fontSize={20}
                fontFamily={"Ubuntu"}
                width={300}
              >
                Зображення:
              </Typography>
              <Box maxWidth={500} padding={4}>
                {bannerImage !== undefined ? (
                  <img
                    src={`https://socket-express-bssu.onrender.com${bannerImage}`}
                    style={{ height: 60 }}
                    alt={bannerImage}
                  />
                ) : (
                  <></>
                )}
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"space-evenly"}
                  alignItems={"flex-end"}
                >
                  <input
                    hidden
                    ref={bannerImageRef}
                    color="warning"
                    type="file"
                    multiple
                    onChange={handleImageChange}
                  />

                  <Button
                    color="warning"
                    variant="contained"
                    sx={{ fontFamily: "Comfortaa", fontSize: 15, marginTop: 6 }}
                    onClick={handleLoadImageClick}
                  >
                    Додати зображення
                  </Button>
                  <Button
                    color="error"
                    variant="contained"
                    sx={{ fontFamily: "Comfortaa", fontSize: 15, marginTop: 6 }}
                    onClick={() => dispatch(clearCurrentBannerImages())}
                  >
                    Очистити
                  </Button>
                </Box>
              </Box>
            </Box>
            <Button
              onClick={handleAddBanner}
              variant="outlined"
              sx={{
                margin: 5,
                marginLeft: 0,
                width: 200,
                justifySelf: "flex-start",
              }}
            >
              Підтвердити баннер
            </Button>
          </Box>
        </>
      ) : (
        <></>
      )}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Зображення</TableCell>
              <TableCell>Функції</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {_banners.map((banner) => (
              <TableRow key={banner._id}>
                <TableCell>
                  <img
                    src={`https://socket-express-bssu.onrender.com${banner.image}`}
                    alt={banner.name}
                    style={{ height: 50 }}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() =>
                      dispatch(deleteBanner({ bannerId: banner._id })).then(
                        (result: any) => {
                          if (result.meta.requestStatus === "fulfilled") {
                            dispatch(getAllBanners());
                          }
                        }
                      )
                    }
                  >
                    Видалити
                  </Button>
                  <Button onClick={() => handleEditBanner(banner._id)}>
                    Редагувати
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
