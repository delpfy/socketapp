import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import AdminPanel from "./AdminPanel";
import ShowCategories from "./ShowCategories";

import ShowItems from "./ShowItems";
import ShowAttributes from "./ShowAttributes";
import { checkAuthorization } from "../../redux/user/asyncActions";
import ShowItem from "./ShowItem";
import ShowUsers from "./ShowUsers";
import ShowOrders from "./ShowOrders";
import ShowReviews from "./ShowReviews";
import AddOneUser from "./AddOneUser";
import EditOneUser from "./EditOneUser";
import ShowOneOrder from "./ShowOneOrder";
import ShowBanners from "./ShowBanners";
import SendUrgentNewsletter from "./SendUrgentNewsletter";
import Dashboard from "./Dashboard";


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
        return <ShowCategories />;
      case "add-newsletter":
        return <SendUrgentNewsletter />;
      case "show-many-banners":
        return <ShowBanners />;
      case "show-many-items":
        return <ShowItems />;
      case "edit-one-item":
        return <ShowItem />;
      case "add-one-item":
        return <ShowItem />;
      case "show-many-attributes":
        return <ShowAttributes />;
      case "show-many-users":
        return <ShowUsers />;
      case "add-one-user":
        return <AddOneUser />;
      case "edit-one-user":
        return <EditOneUser />;
      case "show-many-orders":
        return <ShowOrders />;
      case "show-one-order":
        return <ShowOneOrder />;
      case "show-many-reviews":
        return <ShowReviews />;
      case "show-dashboard":
        return <Dashboard />;
    }
  }

  useEffect(() => {
    dispatch(checkAuthorization()).then((result: any) => {
      if (result.meta.requestStatus === "fulfilled") {
        if (result.payload.user.role !== "admin") {
          navigate("/");
        }
        if (!user.authorized_admin) {
          navigate("/admin-auth");
        }
      }
      if (result.meta.requestStatus === "rejected") {
        navigate("/");
      }
    });
  }, []);
  return (
    <>
      <Box
        paddingTop={25}
        paddingBottom={15}
        margin={"0 auto"}
        width={"90%"}
        display={"flex"}
        flexDirection={"row"}
      >
        <AdminPanel />
        <Box display={"flex"} flexDirection={"column"} width={"90%"}>
          {showProcess()}
        </Box>
      </Box>
    </>
  );
}
