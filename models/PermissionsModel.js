
const mongoose = require('mongoose');


const Permissionschema= new  mongoose.Schema({
  PermissionName: { type: String }



},{
    timestamps: true
 })


const Permissionmodel = mongoose.model('Permission',Permissionschema);



module.exports =Permissionmodel
