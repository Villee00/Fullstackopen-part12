/* eslint-disable react/display-name */
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';


function CustomFooterStatusComponent(props) {
  return <div> { props.races.length} races</div>;
}

const useStyles = makeStyles({
  root: {
    '& .super-app.negative': {
      backgroundColor: 'rgba(157, 255, 118, 0.49)',
      fontWeight: '600',
    },
    '& .super-app.positive': {
      backgroundColor: '#d47483',
      fontWeight: '600',
    },
  },
});


const columns = [
  { field: 'grandPrix',  headerName: 'Grand Prix', flex: 1 ,width: 300, renderCell: (params) =>(
    <Link to={`/seasons/drivers/${encodeURIComponent(params.value)}`} >
      {params.value}
    </Link>
  )},
  { field: 'weather', headerName: 'Weather', flex: 0.7, width: 200 },
  { field: 'positionsGained', headerName: 'Gained positions', flex: 0.3,  type: 'number',
    cellClassName: ({value}) =>
      clsx('super-app', {
        negative: value > 0,
        positive: value < 0,
      }), },
];

const DriverRacesTable = ({races}) =>{
  const classes = useStyles();

  const data = races.map(result => {
    return result.race?.grandPrix?({...result, grandPrix: result.race.grandPrix, weather: result.race.weather}): null;
  });

  return(
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid rows={data} columns={columns} getRowId={() => Math.random()}
        components={{
          Footer: CustomFooterStatusComponent
        }}
        componentsProps={{
          footer: { races }
        }}
        className={classes.root}/>
    </div>
  );
};

export default DriverRacesTable;