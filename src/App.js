import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Box } from "@mui/material";
import Registration from "./screens/RegistrationForm/Registration";
import ViewTable from "./screens/RegistrationForm/components/Table";

const App = () => {
  return (
    <Box>
      <Router>
        <Switch>
          <Route exact path={"/"} component={ViewTable} />
          <Route exact path={"/user/:userId"} component={Registration} />
        </Switch>
      </Router>
    </Box>
  );
};

export default App;
