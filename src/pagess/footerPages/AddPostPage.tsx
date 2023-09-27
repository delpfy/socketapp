import { Box, Typography, TextField, Button } from "@mui/material";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useAppDispatch } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../redux/posts/asyncActions";
import { useState } from "react";
import slugify from "slugify";

export default function AddPostPage() {
  const [editorContent, setEditorContent] = useState("");
  const [editorTitle, setEditorTitle] = useState("");
  const [editorDescription, setEditorDescription] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  function handleAddPost() {
    dispatch(
      createPost({
        title: editorTitle,
        description: editorDescription,
        image: "img",
        content: editorContent,
        slugString: slugify(editorTitle),
      })
    ).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/posts");
      }
    });
  }
  return (
    <>
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
            Назва статті:
          </Typography>
          <TextField
            fullWidth
            value={editorTitle}
            onChange={(event: any) => {
              setEditorTitle(event.target.value);
            }}
          />
        </Box>
        <Box width={"90%"}>
          <Typography
            variant="h1"
            textAlign={"center"}
            paddingBottom={5}
            fontSize={30}
            fontFamily={"Ubuntu"}
          >
            Опис статті:
          </Typography>
          <TextField
            multiline
            rows={4}
            fullWidth
            value={editorDescription}
            onChange={(event: any) => {
              setEditorDescription(event.target.value);
            }}
          />
        </Box>
        <Box width={"90%"}>
          <Typography
            variant="h1"
            textAlign={"center"}
            paddingBottom={5}
            fontSize={30}
            fontFamily={"Ubuntu"}
          >
            Контент статті:
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
              sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
              onClick={() => handleAddPost()}
            >
              Зберігти
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
