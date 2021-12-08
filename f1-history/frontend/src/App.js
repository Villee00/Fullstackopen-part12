import React from 'react';
import AppBar from './components/AppBar';
import {BrowserRouter as Router, Route, Switch, Link as RouterLink} from 'react-router-dom';
import Link from '@mui/material/Link';
import RaceInfo from './raceInfo';
import DriversContainer from './driversContainer';
import SeasonsContainer from './seasonContainer';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import DriverInfo from './driverInfo';
import { Container, Typography } from '@mui/material';

const App = () =>{
  return(
    <Router>
      <Container maxWidth="l" sx={{display:'flex', flexDirection:'column', alignItems: 'center'}}>
        <Link component={RouterLink} underline='hover' to="/">
          <Typography variant="h3">F1 HISTORY</Typography>
        </Link>
        <AppBar/>

        <Switch>
          <Route path="/seasons/:year/:gp" exact>
            <RaceInfo/>
          </Route>
          <Route path="/drivers" exact>
            <DriversContainer/>
          </Route>
          <Route path="/drivers/:id" exact>
            <DriverInfo/>
          </Route>
          <Route exact path="/seasons/:year">
            <SeasonsContainer/>
          </Route>
          <Route exact path="/seasons/">
            <SeasonsContainer/>
          </Route>
          <Route  path="/" exact>
            <SeasonsContainer/>
          </Route>
        </Switch>
      </Container >
    </Router>
  );
};

export default App;