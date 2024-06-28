const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());

// health check endpoint
app.get('/health', (req, res) => {
  res.send('OK');
});

app.post('/data', (req, res) => {
  const requestBody = req.body;
  // Handle the POST request and access the request body here
  // You can perform any necessary operations with the data
  console.log(requestBody);
  res.send('POST request received');
});

app.get('/data', (req, res) => {
  // Handle the GET request here
  // You can send back any necessary data as the response
  
  res.send('GET request received');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});