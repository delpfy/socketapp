import { Box, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { authorizeAdmin } from "../../redux/user/userSlice";
import AdminPanel from "./AdminPanel";
import ShowCategories from "./ShowCategories";

import EditCategory from "./EditCategory";

export default function AdminPage() {
  const { user } = useAppSelector((state) => state.user);
  const { process } = useAppSelector((state) => state.admin);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  /* useEffect(() => {
    return () => {
      dispatch(authorizeAdmin(false));
    };
  }, []); */

  function showProcess() {
  switch (process) {
      case "show-many-categories":
        return  <ShowCategories />;
        
      case "edit-category":
        return <EditCategory />;
        
    }
  }

  return (
    <>
      {user.role === "admin" ? (
        user.authorized_admin ? (
          <Box
            paddingTop={25}
            paddingBottom={15}
            margin={"0 auto"}
            width={"90%"}
            display={"flex"}
            flexDirection={"row"}
          >
            <AdminPanel />
            <Box display={'flex'} flexDirection={'column'}   width={"90%"}>
            
            {showProcess()}
            </Box>
            
            
          </Box>
        ) : (
          /* navigate("/admin-auth") */
          <Box
            paddingTop={25}
            paddingBottom={15}
            margin={"0 auto"}
            width={"90%"}
            display={"flex"}
            flexDirection={"row"}
          >
            <AdminPanel />
            <Box display={'flex'} flexDirection={'column'}   width={"90%"}>
            
            {showProcess()}
            </Box>
            
            
          </Box>
        )
      ) : (
        navigate("/")
      )}
    </>
  );
}
