const mongoose = require('mongoose');




const Teamschema= new  mongoose.Schema({

    Teamname:String,
    branch:String
},{
    timestamps: true
 })


const Employeemodel = mongoose.model('Team',Teamschema);



module.exports = Employeemodel
