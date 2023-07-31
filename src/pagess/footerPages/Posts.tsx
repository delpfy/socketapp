import { Box, Paper, Typography } from "@mui/material";
import RecentlyReviewed from "../../componentss/RecentlyReviewed";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { TPost } from "../../redux/types";
import { useNavigate } from "react-router-dom";
import { setCurrentPost } from "../../redux/posts/postsSlice";

export default function Posts() {
  const { posts } = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const recentlyReviewed = JSON.parse(
    localStorage.getItem("recentlyReviewed") || "{}"
  );

  function handlePostClick (post: TPost) {
    dispatch(setCurrentPost(post));
    navigate("/post")
  }

  useEffect(() => {
    window.scrollTo(0, 0);
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
            {posts.map((post) => {
              return (
                <Box width={"80%"} sx = {{cursor: "pointer"}} alignSelf={"center"} onClick = {() => handlePostClick(post)}>
                  <Typography
                    variant="h1"
                    paddingBottom={5}
                    fontSize={30}
                    fontFamily={"Ubuntu"}
                  >
                    {post.name}
                  </Typography>
                  <Paper
                    elevation={5}
                    sx={{
                      marginBottom: 2,
                      height: 400,
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    banner
                  </Paper>
                  <Typography
                    variant="h1"
                    paddingBottom={5}
                    fontSize={22}
                    fontFamily={"Ubuntu"}
                  >
                    {post.description}
                  </Typography>
                </Box>
              );
            })}

            
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
