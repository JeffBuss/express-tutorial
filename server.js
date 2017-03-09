const express = require('express');
const app = express();
const fs = require('fs');

const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({ dest: 'C:/tmp/' });


// const urlencodedParser = bodyParser.urlencoded({ extended: false })


// app.get('/', (req, res) => {
//    res.send('Hello World');
// })
//

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(multer({ dest: '/tmp/'}));

app.get('/index.htm', (req, res) => {
   res.sendFile( __dirname + "/" + "index.htm" );
})

// app.get('/', (req, res) => {
//    console.log("Got a GET request for the homepage");
//    res.send('Hello GET');
// })
//
// app.post('/', (req, res) => {
//    console.log("Got a POST request for the homepage");
//    res.send('Hello POST');
// })
//
// app.delete('/del_user', (req, res) => {
//    console.log("Got a DELETE request for /del_user");
//    res.send('Hello DELETE');
// })
//
// app.get('/list_user', (req, res) => {
//    console.log("Got a GET request for /list_user");
//    res.send('Page Listing');
// })
//
// app.get('/ab*cd',(req, res) => {
//    console.log("Got a GET request for /ab*cd");
//    res.send('Page Pattern Match');
// })

// app.get('/process_get', (req, res) => {
//    response = {
//       first_name: req.query.first_name,
//       last_name: req.query.last_name,
//    };
//    console.log(response);
//    res.end(JSON.stringify(response));
// })

// app.post('/process_post', urlencodedParser, (req, res) => {
//   response = {
//     first_name: req.body.first_name,
//     last_name: req.body.last_name,
//   };
//   console.log(response);
//   res.end(JSON.stringify(response))
// })

app.post('/file_upload', upload.single('file'), (req, res) => {
   console.log(req.files.file.name);
   console.log(req.files.file.path);
   console.log(req.files.file.type);
   var file = __dirname + "/" + req.files.file.name;

   fs.readFile( req.files.file.path, (err, data) => {
      fs.writeFile(file, data, (err) => {
         if( err ) {
            console.log( err );
            } else {
               response = {
                  message: 'File uploaded successfully',
                  filename: req.files.file.name,
               };
            }
         console.log( response );
         res.end( JSON.stringify( response ) );
      });
   });
})

const server = app.listen(8081, () => {

   const host = server.address().address
   const port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})
