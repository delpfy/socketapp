import { Box, Paper, Typography } from "@mui/material";
import RecentlyReviewed from "../../componentss/RecentlyReviewed";
import { useEffect } from "react";

import { TPost } from "../../redux/types";
import { useAppSelector } from "../../redux/hooks";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export default function PostPage() {
 const {currentPost} = useAppSelector(state => state.posts);
 const test = currentPost.content;
  const recentlyReviewed = JSON.parse(
    localStorage.getItem("recentlyReviewed") || "{}"
  );
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
          {currentPost.name}
          
        </Typography>
        <ReactMarkdown>
       {test}
        </ReactMarkdown>
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
