import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Draggable from "react-draggable";

import { Alert, Button } from "@mui/material";
import { useEffect, useState } from "react";
import {
  getStateCovidDataForUser,
  deleteStateCovidData,
} from "../services/api.js";
import { getToken, getUser } from "../services/LocalStorageService.js";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function UserTables() {
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });
  const [data, setData] = useState([]);

  // for confirmation box
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const token = getToken();
  const user = JSON.parse(getUser());

  const getData = async () => {
    const res = await getStateCovidDataForUser(token, user.state);
    // console.log(res, "in usertable");
    if (res.data.status === "success") {
      setData(res.data.data);
      // console.log(data);
      // console.log(res.data.data);
      setError({ status: true, msg: res.data.message, type: "success" });
    } else {
      setError({ status: true, msg: res.data.message, type: "error" });
    }
  };

  useEffect(() => {
    getData();
  },[]);

  const calculatDate = (Isodate) => {
    var date = new Date(Isodate);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var dt = date.getDate();

    if (dt < 10) {
      dt = "0" + dt;
    }
    if (month < 10) {
      month = "0" + month;
    }
    return year + "-" + month + "-" + dt;
  };

  const handleDelete = async (id) => {
    // confirmation box
    handleClose();
    const res = await deleteStateCovidData(id, user.state, token);

    if (res.data.status === "success") {
      setError({ status: true, msg: res.data.message, type: "success" });
      getData();
    } else {
      setError({ status: true, msg: res.data.message, type: "error" });
    }
  };

  return (
    <TableContainer component={Paper} >
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Created On</StyledTableCell>
            <StyledTableCell align="right">Total Cases</StyledTableCell>
            <StyledTableCell align="right">Recovered</StyledTableCell>
            <StyledTableCell align="right">Active Cases</StyledTableCell>
            <StyledTableCell align="right">Death</StyledTableCell>
            <StyledTableCell align="right">Vaccinated</StyledTableCell>
            <StyledTableCell align="right">
              Approved On / Edit or Delete
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.sort((a,b) => b.state - a.state).map((data) => (
            <StyledTableRow key={data._id}>
              <StyledTableCell component="th" scope="row">
                {calculatDate(data.createdon)}
              </StyledTableCell>
              <StyledTableCell align="right">{data.totalcases}</StyledTableCell>
              <StyledTableCell align="right">{data.recovered}</StyledTableCell>
              <StyledTableCell align="right">
                {data.activecases}
              </StyledTableCell>
              <StyledTableCell align="right">{data.death}</StyledTableCell>
              <StyledTableCell align="right">{data.vaccinated}</StyledTableCell>
              {data.isapproved ? (
                <StyledTableCell align="right">
                  {calculatDate(data.dateapproved)}
                </StyledTableCell>
              ) : (
                <StyledTableCell align="right">
                  <Button href={`editstatecoviddata/${data._id}`}>Edit </Button>
                  <Button
                    onClick={() => {
                      handleClickOpen();
                    }}
                  >
                    Delete
                  </Button>

                  {/* dialog box  */}
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                  >
                    <DialogTitle
                      style={{ cursor: "move" }}
                      id="draggable-dialog-title"
                    >
                      Warning
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Are you sure you want to delete
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button autoFocus onClick={handleClose}>
                        Cancel
                      </Button>
                      <Button
                        onClick={() => {
                          handleDelete(data._id);
                        }}
                      >
                        Delete
                      </Button>
                    </DialogActions>
                  </Dialog>

                  
                </StyledTableCell>
              )}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      {error.status && error.type === "error" && (
        <Alert
          onClose={() => {
            setError({ status: false });
          }}
          severity={error.type}
          sx={{ mt: 3 }}
        >
          {error.msg}
        </Alert>
      )}
    </TableContainer>
  );
}
