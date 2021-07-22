const express = require('express');
const fs = require('fs');
var cors = require('cors')
var multer = require('multer');
var upload = multer();


const app = express(); 
const port = process.env.PORT || 5000;

app.use(cors())

// for parsing application/json
app.use(express.json());

// for parsing application/xwww-
//form-urlencoded
app.use(express.urlencoded({
  extended: true
}));

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));


app.post('/', function(req, res){
  //  console.log(req.body);
   res.send("recieved your request!");
});

app.post('/Mr-Logger', (request, response) => {
  fs.writeFile('dataset.txt', JSON.stringify(request.body), function(err) {
    if (err) {
      response.writeHead(500);
      response.end();
      return
    }
    response.writeHead(200);
    response.write('received');
    response.end();
    return
  })
})

function downloader(req, res) {
  // Use child_process.spawn method from
  // child_process module and assign it
  // to variable spawn
  var spawn = require("child_process").spawn;
  
  // Parameters passed in spawn -
  // 1. type_of_script
  // 2. list containing Path of the script
  //    and arguments for the script 
  
  // E.g : http://localhost:5000/start_download?song=CallMeByYourName&artists=Montero
  // so, song = Call Me By Your Name and artists = Montero
  var process = spawn('python3.9',["/Users/tenzintashi/Colz/Coding Files/spotify-playlist-downloader/python/downloader.py",
  req.query.song,
  req.query.artists] );
  
  // Takes stdout data from script which executed
  // with arguments and send this data to res object
  process.stdout.on('data', function(data) {
    res.send(data.toString());
  } )
} 

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); 
}); //Line 11



// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));
