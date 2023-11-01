import {
  Box,
  CircularProgress,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import RecentlyReviewed from "../../componentss/RecentlyReviewed";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { getAllPosts, getPostById } from "../../redux/posts/asyncActions";
import { formatDate } from "../../utils/usefulFunc";
import { TPost, TPostPOST } from "../../redux/types";

export default function Posts() {
  const { posts, loading, error } = useAppSelector((state) => state.posts);
  const { user } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const recentlyReviewed = JSON.parse(
    localStorage.getItem("recentlyReviewed") || "{}"
  );

  function handlePostClick(post: TPost) {
    dispatch(getPostById(post._id));
    navigate(`/posts/${post.slugString}`);
  }
  function handleAddPostClick() {
    navigate("/addpost");
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getAllPosts());
  }, []);
  return (
    <>
      <Box paddingTop={15}>
        <Typography
          variant="h1"
          textAlign={"center"}
          paddingBottom={5}
          fontSize={30}
          fontFamily={"Ubuntu"}
        >
          Статті
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: "90%",
              padding: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {loading || error ? (
              <CircularProgress />
            ) : (
              <>
                {user.role === "manager" || user.role === "admin" ? (
                  <Box
                    width={"80%"}
                    margin={"0 auto"}
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"center"}
                  >
                    <Button
                      color="warning"
                      variant="contained"
                      sx={{
                        width: {
                          xs: 200,
                          sm: 300,
                          md: 300,
                        },
                        fontFamily: "Comfortaa",
                        fontSize: 15,
                        background: "black",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "black",
                          color: "white",
                        },
                      }}
                      onClick={() => handleAddPostClick()}
                    >
                      Додати статтю
                    </Button>
                  </Box>
                ) : (
                  <></>
                )}

                {posts
                  .slice()
                  .reverse()
                  .map((post) => {
                    return (
                      <Box
                        key={post._id}
                        width={"80%"}
                        sx={{ cursor: "pointer", padding: 2, margin: 2 }}
                        alignSelf={"center"}
                        onClick={() => handlePostClick(post)}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: {
                              xs: "column",
                              md: "row",
                            },
                            alignItems: "center",
                            justifyContent: {
                              xs: "center",
                              md: "space-between",
                            },
                          }}
                        >
                          <Typography
                            variant="h1"
                            sx={{
                              fontSize: {
                                xs: 23,
                                sm: 28,
                                md: 30,
                              },
                              paddingBottom: {
                                xs: 2,
                                md: 5,
                              },
                            }}
                            fontFamily={"Ubuntu"}
                          >
                            {post.title}
                          </Typography>
                          <Typography
                            variant="h1"
                            sx={{
                              fontSize: {
                                xs: 20,
                                sm: 22,
                                md: 24,
                              },
                              paddingBottom: {
                                xs: 2,
                                md: 5,
                              },
                            }}
                            fontFamily={"Ubuntu"}
                          >
                            {post.createdAt !== post.updatedAt
                              ? "Оновлено " + formatDate(post.updatedAt) + " "
                              : formatDate(post.createdAt)}
                          </Typography>
                        </Box>

                        <Typography
                          variant="h1"
                          paddingBottom={5}
                          fontSize={22}
                          textAlign={"justify"}
                          fontFamily={"Ubuntu"}
                        >
                          {post.description}
                        </Typography>
                      </Box>
                    );
                  })}
              </>
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
        </Box>
      </Box>
    </>
  );
}
