var express = require('express');
var cors = require('cors');
const multer = require('multer');
const mongoose = require('mongoose');
require('dotenv').config();


var app = express();
const storage = multer.diskStorage({destination: (req, file, cb) => cb(null, 'uploads/'), filename: (req, file, cb) => cb(null, file.originalname)});
const upload = multer({ storage: storage });


app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {

  console.log(req.file);
  let name = req.file.originalname;
  let type = req.file.mimetype;
  let size = req.file.size
  res.json({
    name, type, size
  })
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
