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
import {
  deletePost,
  getPostBySlug,
  updatePost,
} from "../../redux/posts/asyncActions";
import { useNavigate, useParams } from "react-router-dom";
import slugify from "slugify";

export default function PostPage() {
  const { user } = useAppSelector((state) => state.user);
  const { currentPost, loading, error } = useAppSelector(
    (state) => state.posts
  );
  const [editorContent, setEditorContent] = useState("");
  const [editorTitle, setEditorTitle] = useState("");
  const [editorDescription, setEditorDescription] = useState("");

  const { post_slug } = useParams();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const recentlyReviewed = JSON.parse(
    localStorage.getItem("recentlyReviewed") || "{}"
  );
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getPostBySlug(post_slug as string)).then((result: any) => {
      if (result.meta.requestStatus === "fulfilled") {
        setEditorContent(result.payload.content);
        setEditorTitle(result.payload.title);
        setEditorDescription(result.payload.description);
      }
    });
  }, []);

  function handleSavePost() {
    console.log(
      editorTitle ? slugify(editorTitle) : slugify(currentPost.title)
    );
    dispatch(
      updatePost({
        itemId: currentPost._id,
        params: {
          content: editorContent ? editorContent : currentPost.content,
          description: editorDescription
            ? editorDescription
            : currentPost.description,
          title: editorTitle ? editorTitle : currentPost.title,
          slugString: editorTitle
            ? slugify(editorTitle)
            : slugify(currentPost.title),
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
        ) : user.role === "manager" || user.role === "admin" ? (
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
              <Box width={"100%"} display={"flex"} justifyContent={"center"}>
                <Box
                  sx={{
                    display: "flex",

                    flexDirection: "row",
                    width: 300,
                    marginTop: 2,
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Button
                    color="warning"
                    variant="contained"
                    sx={{
                      fontFamily: "Comfortaa",
                      fontSize: 15,
                      background: "black",
                      color: "white",
                      backgroundColor: "black",
                      "&:hover": {
                        backgroundColor: "white",
                        color: "black",
                      },
                    }}
                    onClick={() => handleSavePost()}
                  >
                    Зберігти
                  </Button>
                  <Button
                    color="error"
                    variant="contained"
                    sx={{
                      fontFamily: "Comfortaa",
                      fontSize: 15,
                      background: "black",
                      color: "black",
                      backgroundColor: "white",
                      "&:hover": {
                        backgroundColor: "black",
                        color: "white",
                      },
                    }}
                    onClick={() => handleDeletePost()}
                  >
                    Видалити
                  </Button>
                </Box>
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
