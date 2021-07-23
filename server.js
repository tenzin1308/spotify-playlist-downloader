const express = require('express');
const fs = require('fs');
var cors = require('cors')
var multer = require('multer');
var upload = multer();
var {PythonShell} = require('python-shell')

// python script requirment
const { spawn } = require('child_process');


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
  response.setHeader('Connection', 'Transfer-Encoding'); 
  response.setHeader('Content-Type', 'text/html; charset=utf-8');
  response.write("downloading");
  fs.writeFile('dataset.txt', JSON.stringify(request.body), function (err) {
    if (err) {
      response.writeHead(500);
      response.end();
      return
    }
    
    var pyshell = new PythonShell('./python/downloader.py');

    pyshell.on('message', function (message) {
      console.log(message);
    });

    pyshell.end(function (err) {
      if (err) {
        throw err;
      };
      console.log('finished');
      response.write("finished");
      response.end();
    });


    //   const pyScript = spawn('python', ['/Users/tenzintashi/Colz/Coding Files/spotify-playlist-downloader/python/downloader.py']);

    //   pyScript.stdout.on('data', (data) => {
    //     console.log(`code successfully executed`);
    //     // response.writeHead(200);
    //     // response.write('received');
      
    //       // console.log("data from getStat routs =>", data);
    //       // res.json(JSON.stringify(data));
    //   });

    //   pyScript.stderr.on('data', (data) => {
    //     console.log(`stderr: ${data}`);
    //     return
    //   });

    //   pyScript.on('close', (code) => {
    //     console.log(`Exited with code: ${code}`);
    //     return
    //   });
    
    // })
    // response.end();
    // return

  });
  });



// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); 
}); //Line 11



// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));
