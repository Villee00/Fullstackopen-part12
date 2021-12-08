import { useQuery } from '@apollo/client';
import { CircularProgress, Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { GET_SEASON_RACES_BASIC } from '../queries';
import RaceCard from './RaceCard';

const RacesContainer = ({year}) =>{
  const {data, loading} = useQuery(GET_SEASON_RACES_BASIC,{
    variables:{
      SeasonYear: parseInt(year)
    }
  });

  if(loading){
    return(     
      <Box textAlign="center" margin={2}>
        <CircularProgress/>
        <Typography>Loading races</Typography>
        <Typography>This could take few minutes</Typography>
      </Box>);
  }

  const races = data?.allRaces.races;
  if(!races){
    return(
      <Box>
        <Typography>Error loading data</Typography>
      </Box>
      
    );
  }
  if(races.length == 0){
    return(
      <Box textAlign="center">
        <Typography variant="h6">No data could be parsed from {data?.allRaces.year} season</Typography>
        <Typography variant="subtitle2">Wikipedia article </Typography>
        <Typography variant="body1">
          <a href={data?.allRaces.wikipediaLink} >
            {data?.allRaces.wikipediaLink} 
          </a>
        </Typography>
      </Box>
    );
  }
  return(
    <Container maxWidth="xl" >
      <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="center">
        {races.map(race => 
          <Link key={race.id} underline="none" component={RouterLink} to={`/seasons/${year}/${encodeURIComponent(race.grandPrix)}`}>
            <RaceCard race={race} />
          </Link>)}
      </Box>
    </Container>
  );
};

export default RacesContainer;