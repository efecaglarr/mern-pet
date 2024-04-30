import React from "react";
import { Grid, Typography } from "@material-ui/core";
import useStyles from "./styles"; // Your custom styles
import petBackGround2 from "../../images/pet-back2.png"; // Background image
import petBackGround3 from "../../images/pet-back3.jpeg"; // Background image

const Hero = () => {
  const classes = useStyles();

  return (
    <div className={classes.hero}>
      <img src={petBackGround3} className={classes.hero__image} alt="Pet Background" />
      <div className={classes.textOverlay}>
        <Typography className={classes.hero__title} variant="h1">
          Adopt, don't shop
        </Typography>
        <Typography className={classes.hero__subtitle} variant="h3">
          "A better future for pets begins with you."
        </Typography>
      </div>
    </div>
  );
};

export default Hero;