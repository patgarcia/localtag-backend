import React from 'react';
import { Grid } from '@material-ui/core';
import Header from './components/Header';
import Main from './components/Main';




const  App = () => {
  return (
     <Grid container direction="column">
       <Header />
       <Main />
     </Grid>
  );
}

export default App;
