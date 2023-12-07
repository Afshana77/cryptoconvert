import React, { useState, useEffect } from "react";
import { cryto } from "../services/Crypto";
import "./styles/HomePage.css"; // Import your CSS file for styling

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Link } from "react-router-dom";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const HomePage = () => {
  const [cryptoData, setCryptoData] = useState([]);

  const fetchData = async () => {
    let cryptodata = await cryto();
    setCryptoData(cryptodata);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const chartData = {
    labels: cryptoData?.data?.data.slice(0, 10).map((crypto) => crypto.name),
    datasets: [
      {
        label: "Percentage Change (24h)",
        data: cryptoData?.data?.data
          .slice(0, 10)
          .map((crypto) => crypto.quote.INR?.percent_change_24h),

        fill: true,
        lineTension: 0.5,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
      },
      {
        label: "Percentage Change (7d)",
        data: cryptoData?.data?.data
          .slice(0, 10)
          .map((crypto) => crypto.quote.INR?.percent_change_7d),
        fill: true,
        lineTension: 0.5,
        backgroundColor: "rgba(255, 99, 132, 0.2)", // You can customize the color
        borderColor: "rgba(255, 99, 132, 1)", // You can customize the color
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        type: "category",
        title: {
          display: true,
          text: "Crypto",
        },
      },
    },
  };

  // as in the api image was not there so i have added random color appearing and added only the first letter of the crypto
  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  return (
    <>
      <div className="crypto-bg">
        <h1 className="text-center ">Crypto Tracker</h1>
        <div
          className="flex-main"
          style={{
            flexDirection: window.innerWidth > 768 ? "row" : "column",
          }}
        >
          <div
            style={{
              width: window.innerWidth > 768 ? "70%" : "100%",
              overflowX: "auto",
              overflowY: "hidden",
            }}
          >
            <Line data={chartData} options={chartOptions} />
            <div className="chart-options">
              <Link to="/conver-currency" className="link-button">
                Convert Currency
              </Link>
            </div>
          </div>

          <div
            className="listing"
            style={{
              width: window.innerWidth > 768 ? "25%" : "100%",
            }}
          >
            {cryptoData?.data?.data.map((crypto) => (
              <div key={crypto.id} className="crypto-card">
                <div className="flex-main">
                  <div
                    className="crypto-icon"
                    style={{
                      backgroundColor: getRandomColor(),
                    }}
                  >
                    <h5>{crypto.name.charAt(0)}</h5>
                  </div>
                  <div className="crypto-name">{crypto.name}</div>
                </div>
                <div className="main-div">
                  <div className="net-change-label">Current Value (INR)</div>{" "}
                  <div className="net-change-value">
                    {crypto.quote.INR?.price.toFixed(2)}
                  </div>
                </div>
                <div className="main-div">
                  <div className="net-change-label">Net Change (24h)</div>
                  <div
                    style={{
                      color:
                        crypto.quote.INR?.percent_change_24h < 0
                          ? "red"
                          : "#00A300",
                    }}
                  >
                    {crypto.quote.INR?.percent_change_24h}%
                  </div>
                </div>
                <div className="main-div">
                  <div className="net-change-label">Net Change (7d)</div>
                  <div
                    style={{
                      color:
                        crypto.quote.INR?.percent_change_7d < 0
                          ? "red"
                          : "#00A300",
                    }}
                  >
                    {crypto.quote.INR?.percent_change_7d}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
