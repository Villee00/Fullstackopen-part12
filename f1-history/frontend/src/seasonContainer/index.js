import React, { useEffect } from 'react';
import { Container, Grid, List, ListItemButton, ListItemText, ListSubheader, Typography } from '@mui/material';
import RacesContainer from '../racesContainer';
import { Box } from '@mui/system';
import { useHistory, useParams } from 'react-router-dom';


const SeasonsContainer = () =>{
  const {year} = useParams();
  const [selectedYear, setSelectedYear] = React.useState(1990);
  const history = useHistory();
  const years = [];

  const handleChange = (event, year) => {
    setSelectedYear(year);
    history.push('/seasons/'+year);
  };

  useEffect(() => {
    if(year < 1950){
      setSelectedYear(1950);
    }
    else if(year > 2020){
      setSelectedYear(2020);
    }
    else if(year != null){
      setSelectedYear(year);
    }
    return () => {};
  }, [year]);
  for (let year = 1950; year <= 2020; year++) {
    years.push(year);
  }
  return(
    <Container maxWidth="xl" sx={{alignItems:'center'}}>
      <Grid container spacing={2}>
        <Grid item xs="auto">
          <Box display="flex" flexDirection="column">
            <List subheader={<ListSubheader>Seasons</ListSubheader>}
              sx={{width: 150, position: 'relative', overflow: 'auto', height: '80vh'}}>
              {years.map(year=>
                <ListItemButton key={year} 
                  selected={selectedYear === year}
                  onClick={(event) =>handleChange(event, year)}>
                  <ListItemText primary={year}/>
                </ListItemButton>)}
            </List>
          </Box>
        </Grid>
        <Grid item xs sx={{textAlign:'center'}}>
          <Typography variant="h3" textAlign="center">
            {selectedYear} 
          </Typography>
          <Box sx={{ position: 'relative',overflow: 'auto', height: '74vh'}}>
            <RacesContainer year={selectedYear}/>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SeasonsContainer;