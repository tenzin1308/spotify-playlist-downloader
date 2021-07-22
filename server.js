const express = require('express'); 
const app = express(); 
const port = process.env.PORT || 5000;

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); 

app.get('/start_download', downloader);

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