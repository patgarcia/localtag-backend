import React from 'react';
import { Grid } from '@material-ui/core';
import { AppBar, Typography } from "@material-ui/core";
import AcUnitRoundedIcon from "@material-ui/icons/AcUnitRounded";
import { createStyles, makeStyles } from "@material-ui/styles";
import AddLocationIcon from '@material-ui/icons/AddLocation';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import createTypography from '@material-ui/core/styles/createTypography';
import { RotateRight } from '@material-ui/icons';


const useStyles = makeStyles(() => ({
  typographyStyles: {
    flex: 1
  },
  avatar: {
    backgroundColor: red[500],
    position: "static",
    alignItems: RotateRight
  },
}));


const Header = () => {
  const classes = useStyles();
  return (
    <Grid item>
      <AddLocationIcon />
      <Avatar aria-label="Avatar" /> 
      {/* </Avatar> */}
      <Typography variant="h1" className={classes.typographyStyles}>
          Local Tag
        </Typography>
    </Grid>
  );
};

export default Header;