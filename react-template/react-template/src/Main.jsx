import React from "react";
import Cards from "./Cards";
import { Grid } from "@material-ui/core";
import cardList from "./data";


const Content = () => {
  const getCards = cardObj => {
    return (
      <Grid item xs={12} sm={4}>
        <Cards data={cardObj} />
      </Grid>
    );
  };

  return (
    <Grid container spacing={2}>
      {cardList.map(cardObj => getCards(cardObj))}
    </Grid>
  );
};

export default Content;
