import React from 'react';
import { Grid } from '@material-ui/core';
import Header from './Header';
import Main from './Main';
import Home from './Home';



const  App = () => {
  return (
    <Grid container direction="column">
      <Header />
      <Main />
    </Grid>

    //    <Grid item>
    //       <Logo />
    //    </Grid>

    //    <Grid item container>
    //      <Grid item xs={false} sm={2} />
    //      <Grid item xs={12} sm={8}>
    //       <Content />
    //    </Grid>
    //    <Grid item xs={false} sm={2} />
    //    </Grid>

  );
}

export default App;

