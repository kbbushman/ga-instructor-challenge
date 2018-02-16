const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('file-system');
const path = require('path');

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware - parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// Body Parser Middleware - parse application/json
app.use(bodyParser.json());

// Set Favorites GET route
app.get('/favorites', function(req, res){
  var data = fs.readFileSync('./data.json');
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});

// Set Favorites POST route
app.post('/favorites', function(req, res){
  if (!req.body.name || !req.body.oid) {
    res.send("Error");
    return
  }
  
    var data = JSON.parse(fs.readFileSync('./data.json'));
    data.push(req.body);
    fs.writeFile('./data.json', JSON.stringify(data));
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
});

// Start Server
app.listen(process.env.PORT || 3000, () => {
  console.log('Listening on port 3000');
});
