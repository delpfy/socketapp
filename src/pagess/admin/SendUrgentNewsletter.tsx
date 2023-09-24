import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import InfoDialog from "../../componentss/dialogs/InfoDialog";
import { createNewsletter } from "../../redux/admin/asyncActions";

export default function SendUrgentNewsletter() {
  const [editorContent, setEditorContent] = useState("");
  const [openInfo, setOpenInfo] = useState(false);
  const [infoMessage, setInfoMessage] = useState<string>("Some info");
  function InfoDialog_open() {
    setOpenInfo(true);
  }
  function InfoDialog_close() {
    setOpenInfo(false);
  }
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  function handleAddPost() {
    if(editorContent.trim() === ""){
        InfoDialog_open();
        setInfoMessage("Повідомлення пусте");
        return;
    }
    dispatch(
      createNewsletter({
        new_message: editorContent,
      })
    ).then((result: any) => {
      if (result.meta.requestStatus === "fulfilled") {
        InfoDialog_open();
        setInfoMessage("Відправлено");
      }
      if (result.meta.requestStatus === "rejected") {
        InfoDialog_open();
        setInfoMessage("Не відправлено");
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
      <Box
        paddingTop={15}
        paddingBottom={15}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
      >
        <Box width={"90%"}>
          <Typography
            variant="h1"
            textAlign={"center"}
            paddingBottom={5}
            fontSize={30}
            fontFamily={"Ubuntu"}
          >
            Нове повідомлення 
          </Typography>
          <CKEditor
            editor={ClassicEditor}
            data={editorContent}
            onChange={(event, editor) => {
              const data = editor.getData();
              setEditorContent(data);
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: 300,
              justifyContent: "space-between",
              alignItem: "center",
            }}
          >
            <Button
              color="warning"
              variant="contained"
              sx={{ fontFamily: "Comfortaa", fontSize: 15, marginTop: 15 }}
              onClick={() => handleAddPost()}
            >
              Надіслати
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
