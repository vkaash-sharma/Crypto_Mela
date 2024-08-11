import axios from "axios";
import React, { useEffect, useState } from "react";
import { SingleCoin } from "../config/api";
import { useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import ReactHtmlParser from "react-html-parser"
import { LinearProgress, Typography, makeStyles } from "@material-ui/core";
import CoinInfo from "../components/CoinInfo";
import { numberWithCommas } from "../components/CoinsTable";

const CoinsPage = () => {
  const [coin, setCoin] = useState([]);
  console.log("here is the coin" , coin)
  let { currency, currencySymbol, setCurrency } = CryptoState();
  const { id } = useParams();

  const fetchCoinDetail = async () => {
    console.log("helo111");
    try {
      let { data } = await axios.get(SingleCoin(id));
      console.log("Coin data:", data); // Log the fetched data
      setCoin(data);
    } catch (error) {
      console.error("Error fetching coin details:", error);
    }
  };

  useEffect(() => {
    console.log("sdoifsjdfjsdoji")
    fetchCoinDetail();
  }, []);

  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    sidebar: {
      width: "30%",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid grey",
    },
    heading: {
      fontWeight: "bold",
      marginBottom: 20,
      fontFamily: "Montserrat",
    },
    description: {
      width: "100%",
      fontFamily: "Montserrat",
      padding: 25,
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: "justify",
    },
    marketData: {
      alignSelf: "start",
      padding: 25,
      paddingTop: 10,
      width: "100%",
      [theme.breakpoints.down("md")]: {
        display: "flex",
        justifyContent: "space-around",
      },
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center",
      },
      [theme.breakpoints.down("xs")]: {
        alignItems: "start",
      },
    },
  }));

  const classes = useStyles();
  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <div className={classes.container}>
      {/* handle the sidebar */}
      <div className={classes.sidebar}>
        <img
          src={coin?.image?.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className={classes.heading}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" className={classes.description}>
          {ReactHtmlParser(coin?.description?.en.split(". ")[0])}.
        </Typography>
        <div className={classes.marketData}>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {currencySymbol}{" "}
              {numberWithCommas(
                coin?.market_data?.current_price[currency.toLowerCase()]
              )}
            </Typography>
           </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {currencySymbol}{" "}
              {numberWithCommas(
                coin?.market_data?.market_cap[currency?.toLowerCase()]
                  ?.toString()
                  .slice(0, -6)
              )}
              
            </Typography>
          </span>
         </div>
      </div>

      {/* handle the right side */}
      <CoinInfo coin={coin} />
    </div>
  );
};

export default CoinsPage;
