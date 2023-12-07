# Crypto Tracker Server

This Node.js server, built with Express, Axios, and `dotenv`, provides endpoints for fetching cryptocurrency data and performing currency conversion. It addresses Cross-Origin Resource Sharing (CORS) by allowing requests from a specified origin.

## Table of Contents

- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [CORS Configuration](#cors-configuration)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/crypto-tracker-server.git
   cd crypto-tracker-server
npm install
Create .env File:
Create a .env file in the project root and set your environment variables.
API=your_api_value
API_KEY=your_api_key_value

Run the Server:
node index.js

API Endpoints
1. /list
Method: GET
Description: Fetches the latest cryptocurrency listings.
Example Request:


GET http://localhost:4000/list

2. /convert
Method: GET
Description: Converts cryptocurrency amounts.
Query Parameters:
amount (Numeric): The amount to convert.
symbol (String): The symbol of the cryptocurrency to convert.
convert (String): The target currency symbol.
Example Request:

GET http://localhost:4000/convert?amount=1&symbol=BTC&convert=INR


CORS Configuration
To handle CORS, the server is configured to allow requests from http://localhost:3000 (update with your React app's origin). This is implemented using Express middleware.

Environment Variables
The server uses dotenv to load environment variables from the .env file. Ensure that you set your API and API_KEY values in this file.

API=your_api_value
API_KEY=your_api_key_value
