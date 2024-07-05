   

   const mongoose= require("mongoose");


   mongoose.connect('mongodb://127.0.0.1:27017/Project1').then(() => {
    console.log("Connected successfully to the database");
  }).catch((err) => {
    console.log(err);
  });



  const adminschema=  mongoose.Schema({


name:String,
email:String,
password:String,


  })



  const Admin = mongoose.model('collection', adminschema);

  module.exports = Admin;