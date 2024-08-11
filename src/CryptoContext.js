import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

const Crypto = createContext();
const CryptoContext = ({ children }) => {
  let [currency, setCurrency] = useState("INR");
  let [currencySymbol, setCurrencySymbol] = useState("₹");
  useEffect(() => {
    if (currency === "INR") setCurrencySymbol("₹");
    else if (currency === "USD") setCurrencySymbol("$");
  }, [currency]);
  return (
    <Crypto.Provider value={{ currency, currencySymbol, setCurrency }}>
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
