import React, { useState, useEffect } from "react";
import { convert, cryto } from "../services/Crypto";
import "./styles/HomePage.css";
const CryptoConverterPage = () => {
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [currencyOptions, setCurrencyOptions] = useState([]);

  const fetchData = async () => {
    let response = await cryto();
    const currencies = response.data.data.map((crypto) => crypto.symbol);
    setCurrencyOptions(currencies);
    // Set default currencies (e.g., BTC to INR)
    setFromCurrency("BTC");
    setToCurrency("INR");
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleConvert = async () => {
    try {
      const response = await convert(amount, fromCurrency, toCurrency);

       setConvertedAmount(response.data.data.quote[toCurrency].price);
    } catch (error) {
      console.error("Error converting currency:", error);
    }
  };

  return (
    <div className="container">
      <div className="converter-box">
        <h1 className="heading">Crypto Converter</h1>
        <div className="select-box">
          <label className="select-label">From Currency:</label>
          <select
            className="select-input"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            {currencyOptions.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
        <div className="select-box">
          <label className="select-label">To Currency:</label>
          <select
            className="select-input"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            {currencyOptions.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
        <div className="select-box">
          <label className="select-label">Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="amount-input"
          />
        </div>
        <button onClick={handleConvert} className="convert-button">
          Convert
        </button>
        {convertedAmount && (
          <p className="converted-amount">
            Converted Amount: {convertedAmount}
          </p>
        )}
      </div>
    </div>
  );
};

export default CryptoConverterPage;
