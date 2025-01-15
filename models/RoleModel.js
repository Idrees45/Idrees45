
const mongoose = require('mongoose');


const Roleschema= new  mongoose.Schema({
    Roles: { type: String, unique: true }
},{
    timestamps: true
 })


const Rolemodel = mongoose.model('Role',Roleschema);



module.exports =Rolemodel
