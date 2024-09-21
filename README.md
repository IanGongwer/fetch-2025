# Project Overview:
This project is a REST API for managing user points transactions, allowing users to add, spend, and check their point balances.

Please choose a folder and use the command: ```git clone https://github.com/IanGongwer/fetch-2025.git```
# Prerequisites:
## Node.js Installation:
If you do not have Node.js installed, please install it from Node.js official website: https://nodejs.org/en (Choose the LTS version for stability). Follow the prompts and choose the defaults.
After installation, verify the installation of Node.js and npm using the following commands in your terminal:
```
node -v
npm -v
```

## Install Express Framework:
This project uses the Express framework. It should be installed in the node_modules folder automatically when you run the application. If it is not installed, you can manually install it by running:
npm install express

## Running the Application:
- Navigate to the Project Directory
- Open your terminal and change to the project directory where app.js is located.
- Run the command: node app.js. The server will start and listen on port 8000.

## API Endpoints:
### Add Points:
- Route: /add
- Method: POST
- Request Body Example:
```
{
  "payer": "DANNON",
  "points": 5000,
  "timestamp": "2020-11-02T14:00:00Z"
}
```

### Spend Points:
- Route: /spend
- Method: POST
- Request Body Example:
```
{
  "points": 5000
}
```

### Get Points Balance:
- Route: /balance
- Method: GET
- Response Example:
```
{
  "DANNON": 1000,
  "UNILEVER": 0,
  "MILLER COORS": 5300
}
```

Testing the API: You can test the API using tools like Postman or curl to make requests to the endpoints.