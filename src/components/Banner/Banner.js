import { Container, Typography, makeStyles } from "@material-ui/core";
import React from "react";
import Banner2 from "../../Assets/Images/banner2.jpg";
import Carousel from "./Carousel";
const Banner = () => {
  const useStyles = makeStyles(() => ({
    banner: {
      backgroundImage: `url(${Banner2})`,
    },
    bannerContext: {
      height: 400,
      display: "flex",
      flexDirection: "column",
      paddingTop: 25,
      justifyContent: "space-around",
    },
    tagline: {
      display: "flex",
      height: "40%",
      flexDirection: "column",
      justifyContent: "center",
      textAlign: "center",
    },
  }));
  const classes = useStyles();
  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContext}>
        <div className={classes.tagline}>
          <Typography
            variant="h2"
            style={{
              marginBottom: 15,
              fontWeight: "bold",
              fontFamily: "Montserrat",
            }}
          >
            Crypto Mela
          </Typography>

          <Typography
            variant="subtitle2"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Discover everything you need to know about your favorite
            cryptocurrency!
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
};

export default Banner;
