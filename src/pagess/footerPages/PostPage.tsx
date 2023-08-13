import {
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import RecentlyReviewed from "../../componentss/RecentlyReviewed";
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { deletePost, updatePost } from "../../redux/posts/asyncActions";
import { useNavigate } from "react-router-dom";

export default function PostPage() {
  const { user } = useAppSelector((state) => state.user);
  const { currentPost, loading, error } = useAppSelector(
    (state) => state.posts
  );
  const [editorContent, setEditorContent] = useState(currentPost.content);
  const [editorTitle, setEditorTitle] = useState(currentPost.title);
  const [editorDescription, setEditorDescription] = useState(
    currentPost.description
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const recentlyReviewed = JSON.parse(
    localStorage.getItem("recentlyReviewed") || "{}"
  );
  useEffect(() => {
    window.scrollTo(0, 0);
    setEditorContent(currentPost.content);
    setEditorTitle(currentPost.title);
    setEditorDescription(currentPost.description);
  }, [currentPost]);

  function handleSavePost() {
    dispatch(
      updatePost({
        itemId: currentPost._id,
        params: {
          content: editorContent ? editorContent : currentPost.content,
          description: editorDescription
            ? editorDescription
            : currentPost.description,
          title: editorTitle ? editorTitle : currentPost.title,
        },
      })
    );
  }
  function handleDeletePost() {
    dispatch(
      deletePost({
        itemId: currentPost._id,
      })
    );
    navigate("/posts");
  }
  return (
    <>
      <Box
        paddingTop={15}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        minWidth={"100%"}
      >
        {loading || error ? (
          <CircularProgress />
        ) : user.role === "manager" ? (
          <>
            <Box minWidth={"90%"}>
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
                  onClick={() => handleSavePost()}
                >
                  Зберігти
                </Button>
                <Button
                  color="error"
                  variant="contained"
                  sx={{ fontFamily: "Comfortaa", fontSize: 15 }}
                  onClick={() => handleDeletePost()}
                >
                  Видалити
                </Button>
              </Box>
            </Box>
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minWidth: "90%",
              maxWidth: "90%",
            }}
          >
            <Typography
              variant="h1"
              textAlign={"center"}
              paddingBottom={5}
              fontSize={30}
              fontFamily={"Ubuntu"}
            >
              {loading || error ? <CircularProgress /> : currentPost.title}
            </Typography>
            <Paper
              elevation={5}
              sx={{
                minWidth: "100%",
                maxWidth: "100%",
                padding: 2,
                display: "flex",
                flexDirection: "column",
                justifySelf: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                fontFamily={"Ubuntu"}
                dangerouslySetInnerHTML={{ __html: currentPost.content }}
              />
            </Paper>
          </Box>
        )}
      </Box>
      <Box width={"100%"}>
        {recentlyReviewed === undefined || recentlyReviewed.length === 0 ? (
          <></>
        ) : (
          <>
            <Typography
              variant={"h3"}
              fontSize={37}
              fontFamily={"Ubuntu"}
              paddingTop={7}
              paddingBottom={4}
              textAlign={"center"}
            >
              Було переглянуто
            </Typography>
            <RecentlyReviewed />
          </>
        )}
      </Box>
    </>
  );
}
