const PermissionModel = require("../models/PermissionsModel")


const AddPermission = async (req, res) => {
    try {
        const { permissionName} = req.body;
        console.log("permission_NAME",req.body)
        if (!permissionName) {
            return res.status(400).send({ message: "Permission name is required" });
        }
       
        const Save = await PermissionModel.create({
            PermissionName: permissionName
        });
        res.status(200).send({ message: "Permission added successfully", Permissions: Save });

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};



const ReadPermissions = async (req, res) => {

    try {

        const user = await PermissionModel.find({})
        if (user) {
            res.status(200).json({ message: "sucessfully found", Permissions: user })
        } else {
            res.status(400).json({ message: "Roles not found" })
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}


const updatepermission = async (req, res) => {
    try {
        const { id,Permissionname } = req.body
        console.log("Update_Permission",Permissionname)
        if (!Permissionname) {
            return res.status(400).send({ message: "Permission name is required" });
        }
        const user = await PermissionModel.findByIdAndUpdate(
            id, // Find by ID
            {  PermissionName:Permissionname },
            { new: true }
        );
        if (user) {
            return res.status(200).json({ message: "sucessfully updated", data: user })
        } else {
            return res.status(400).json({ message: "Role not found" })
        }

    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

const RemovePermission = async (req, res) => {
    try {
        const { ids } = req.body;
        console.log("RemoveRole_Id", ids)
        const removeroles = await PermissionModel.deleteMany({ _id: { $in: ids } });


        if (removeroles) {
            return res.status(200).json({ message: "sucessfully Removed" })
        } else {
            res.status(400).json({ message: "Role not found" })
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const ReadsingelPermission=async(req,res)=>{

    try {
        const { id } = req.params;
console.log("singel_Permission_idparams",id)
       const user= await PermissionModel.findById(id)
       if(user){
         return res.status(200).json({message:"sucessfully found",singelPermission:user})
       }else{
        return res.status(404).json({ message: "User not found" });
       }
    } catch (error) {
    return res.status(500).send({ message: error.message });
    }
}
// -------------Bulk_permission----------------





// const AddbulkPermission = async (req, res) => {
//     try {
//         const { permissions} = req.body;
//         console.log("permission_NAME",permissions)
//         if (! permissions) {
//             return res.status(400).send({ message: "Permission name is required" });
//         }
//         permissions.array.forEach(element => {
//             const Save = await PermissionModel.create({
//                 permissionNames:element
//             });
//         });

       
//         res.status(200).send({ message: "Permission added successfully", Permissions: Save });

//     } catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// };

const AddbulkPermission = async (req, res) => {
    try {
      const { permissions } = req.body;
      console.log("permission_NAME", permissions);
  
      if (!permissions || !Array.isArray(permissions)) {
        return res.status(400).send({ message: "Permission names are required and should be an array" });
      }
  
      const savedPermissions = [];
  
      for (const element of permissions) {
        const savedPermission = await PermissionModel.create({
            PermissionName: element,
        });
        savedPermissions.push(savedPermission);
      }
  
      res.status(200).send({
        message: "Permissions added successfully",
        Permissions: savedPermissions,
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };
  

module.exports = {
    AddPermission,
    ReadPermissions,
    updatepermission,
    RemovePermission,
    ReadsingelPermission,
    AddbulkPermission
}