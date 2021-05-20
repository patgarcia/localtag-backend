import React from 'react';
import { Grid } from '@material-ui/core';
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import AddLocationIcon from '@material-ui/icons/AddLocation';
import Avatar from '@material-ui/core/Avatar';
// import { red } from '@material-ui/core/colors';
import createTypography from '@material-ui/core/styles/createTypography';
import { RotateRight } from '@material-ui/icons';



const useStyles = makeStyles(() => ({
  typographyStyles: {
    flex: 1
  }
}));


const Header = () => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar> 
        <Typography className={classes.typographyStyles}>
          Local Tag
        </Typography>
        <Avatar aria-label="Avatar" />
        <AddLocationIcon />
      </Toolbar>
    </AppBar>
    
  );
};

export default Header;