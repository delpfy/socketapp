import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Button,
} from "@mui/material";
import { useAppDispatch} from "../../redux/hooks";
import { setProcess } from "../../redux/admin/adminSlice";
import { getAllItems } from "../../redux/home/asyncActions";
import { getAllOrders, getAllUsers } from "../../redux/admin/asyncActions";

export default function AdminPanel() {
  const dispatch = useAppDispatch();

  return (
    <Box
      paddingBottom={10}
      sx={{
        width: {
          xs: 310,
          md: 340,
        },
      }}
    >
      <Box
        sx={{
          width: "90%",
        }}
      >
        <Box>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Категорії</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Button
                onClick={() => dispatch(setProcess("show-many-categories"))}
              >
                Редагувати категорії
              </Button>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Товари</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Button onClick={() => {
                
                dispatch(getAllItems()).then((result: any) => {
                  if(result.meta.requestStatus === 'fulfilled'){
                    dispatch(setProcess("show-many-items"))
                  }
                })
              }}>
                Редагувати товари
              </Button>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Атрибути</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Button
                onClick={() => dispatch(setProcess("show-many-attributes"))}
              >
                Редагувати атрибути
              </Button>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Користувачі</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Button
                onClick=
                {() => {
                
                  dispatch(getAllUsers()).then((result: any) => {
                    if(result.meta.requestStatus === 'fulfilled'){
                      dispatch(setProcess("show-many-users"))
                    }
                  })
                }}
              >
                Редагувати користувачів
              </Button>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Відгуки</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Button
              
                onClick={() => dispatch(setProcess("show-many-reviews"))}
              >
                Редагувати відгуки
              </Button>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Замовлення</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Button
              onClick=
              {() => {
              
                dispatch(getAllOrders()).then((result: any) => {
                  if(result.meta.requestStatus === 'fulfilled'){
                    dispatch(setProcess("show-many-orders"))
                  }
                })
              }}
                
              >
                Усі замовлення
              </Button>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
    </Box>
  );
}
