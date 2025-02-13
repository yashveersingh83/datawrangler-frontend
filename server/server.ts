const jsonServer = require('json-server');
const fs = require('fs');

// Create server and router
const server = jsonServer.create();
//const router = jsonServer.router('server/db.json');
const middlewares = jsonServer.defaults();

// Use default middlewares
server.use(middlewares);
server.use(jsonServer.bodyParser);

// Helper function to read data from JSON file
function readData(key) {
  const dbRaw = fs.readFileSync('./server/db.json', 'utf-8');
  const data = JSON.parse(dbRaw);
  return data[key] || [];
}

// Helper function to write data to JSON file
function writeData(key, newData) {
  const dbRaw = fs.readFileSync('./server/db.json', 'utf-8');
  const data = JSON.parse(dbRaw);
  data[key] = newData;
  fs.writeFileSync('./server/db.json', JSON.stringify(data, null, 2), 'utf-8');
}

// GET endpoint for inforequests
server.get('/infolist', (req, res) => {
  try {
    const infoRequests = readData('inforequests');
    res.status(200).send(infoRequests);
  } catch (error) {
    console.error('Error fetching info requests:', error);
    res.status(500).send({ error: 'Failed to fetch info requests' });
  }
});

// POST endpoint to add an info request
server.post('/addinforequest', (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send({ error: 'Request body is missing' });
      return;
    }
    const infoRequests = readData('inforequests');
    infoRequests.push(req.body);
    writeData('inforequests', infoRequests);
    res.status(201).send({ message: 'Info request added successfully' });
  } catch (error) {
    console.error('Error adding info request:', error);
    res.status(500).send({ error: 'Failed to add info request' });
  }
});

// GET endpoint for userList
server.get('/userList', (req, res) => {
  try {
    const userList = readData('userList');
    res.status(200).send(userList);
  } catch (error) {
    console.error('Error fetching user list:', error);
    res.status(500).send({ error: 'Failed to fetch user list' });
  }
});

// GET endpoint for import history
server.get('/history', (req, res) => {
  try {
    const importHistory = readData('importHistory');
    res.status(200).send(importHistory);
  } catch (error) {
    console.error('Error fetching import history:', error);
    res.status(500).send({ error: 'Failed to fetch import history' });
  }
});

// Default router


// Start the server
server.listen(3000, () => {
  console.log('JSON Server is running on http://localhost:3000');
});
