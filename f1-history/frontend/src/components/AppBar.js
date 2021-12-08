import React, {useEffect} from 'react';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const AppBar = () =>{
  const location = useLocation();
  const [value, setValue] = React.useState('seasons');
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() =>{
    setValue(location.pathname.split('/')[1] == ''? 'seasons': location.pathname.split('/')[1]);
  },[location]);
  
  return(
    <Box sx={{ width: '100%', typography: 'body1', paddingBottom: 5 }}>
      <TabContext value={value}>
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <TabList onChange={handleChange} centered>
            <Tab label="Seasons" value="seasons" to="/seasons" component={Link}/>
            <Tab label="Drivers" value="drivers" to="/drivers" component={Link}/>
          </TabList>
        </Box>
      </TabContext>
    </Box>
  );
};

export default AppBar;