import React from "react";
import { useHistory } from "react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";

const ViewTable = () => {
  const history = useHistory();
  const userDataFromRedux = useSelector((state) => state.user.formData);

  const editTask = (userId) => {
    history.push("/user/" + userId);
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={() => history.push("user/ceateUser")}
        mb={3}
      >
        Creat user
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>DOB</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!!userDataFromRedux.length &&
              userDataFromRedux.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.age}</TableCell>
                  <TableCell>{item.dob}</TableCell>
                  <TableCell>{item.phone_number}</TableCell>
                  <TableCell>{item.address?.join(", ")}</TableCell>
                  <TableCell>
                    <EditIcon onClick={() => editTask(item.phone_number)} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ViewTable;
