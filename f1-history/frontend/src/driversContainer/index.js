import { useQuery } from '@apollo/client';
import { CircularProgress, Container, Pagination, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { GET_DRIVERS, GET_DRIVER_COUNT } from '../queries';
import DriverCard from './DriverCard';
import Link from '@mui/material/Link';

const DriversContainer = () =>{
  const driverCount = useQuery(GET_DRIVER_COUNT);
  const [page, setPage] = useState(1);
  const {data, fetchMore} = useQuery(GET_DRIVERS,{
    variables: {
      offset: (page -1)* 12,
      limit: 12
    },
  });
  

  const handleChange = (event, value) =>{
    setPage(value);
    fetchMore({
      variables: {
        offset: (value)* 12,
        limit: 12
      }
    });

  };

  if(driverCount.loading){
    return(
      <CircularProgress/>
    );
  }

  const drivers = data?.getDrivers? data?.getDrivers: [];
  const pageCount = Math.ceil(driverCount.data.getDriverCount/12);

  return(
    <Container maxWidth="xl" >
      <Typography variant="h2" textAlign="center">
        Drivers ordered by age
      </Typography>
      <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="center">
        {drivers.map((driver) => 
          <Link key={driver.id} component={RouterLink} underline="none" to={`/drivers/${driver.id}`}>
            <DriverCard driver={driver} />
          </Link>)}

      </Box>
      <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="center">
        <Pagination count={pageCount} value={page ? page : ' '}  color="primary" onChange={handleChange} size="large" boundaryCount={2}/>
      </Box>
    </Container>
  );
};

export default DriversContainer;