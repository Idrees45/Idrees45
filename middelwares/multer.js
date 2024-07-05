
const path= require("path")
const multer = require("multer");

var storage = multer.diskStorage({   
    destination: function(req, file, cb) { 
    // destination is used to specify the path of the directory in which the files have to be stored

    cb(null, './uploads');
  }, 
  filename: function (req, file, cb) { 
// It is the filename that is given to the saved file.
cb(null, file.originalname);
  }
});

// Configure storage engine instead of dest object.

 const upload = multer({ storage: storage })

 module.exports= upload
