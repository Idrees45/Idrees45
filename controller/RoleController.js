const RoleModel = require("../models/RoleModel")


const Addrole = async (req, res) => {
    try {
        const {roleName} = req.body;
        console.log("ROLE_NAME",req.body)
        if (!roleName) {
            return res.status(400).send({ message: "Role name is required" });
        }
        const Save = await RoleModel.create({
            Roles:roleName
        });
        res.status(200).send({ message: "Role added successfully", Role: Save });

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};


const Readroles = async (req, res) => {

    try {

        const user = await RoleModel.find({})
        if (user) {
            res.status(200).json({ message: "sucessfully found", Roles: user })
        } else {
            res.status(400).json({ message: "Roles not found" })
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}


const updateRole = async (req, res) => {
    try {
        const { id,roleName } = req.body
        console.log("Update_Role", id)
        if (!roleName) {
            return res.status(400).send({ message: "Role name is required" });
        }
        const user = await RoleModel.findByIdAndUpdate(
            id, // Find by ID
            { Roles:roleName },
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

const Removeroles = async (req, res) => {
    try {
        const { ids } = req.body;
        console.log("RemoveRole_Id", ids)
        const removeroles = await RoleModel.deleteMany({ _id: { $in: ids } });


        if (removeroles) {
            return res.status(200).json({ message: "sucessfully Removed" })
        } else {
            res.status(400).json({ message: "Role not found" })
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const ReadsingeRole=async(req,res)=>{

    try {
        const { id } = req.params;
console.log("singel_Role_idparams",id)
       const user= await RoleModel.findById(id)
       if(user){
         return res.status(200).json({message:"sucessfully found",singelRole:user})
       }else{
        return res.status(404).json({ message: "User not found" });
       }
    } catch (error) {
    return res.status(500).send({ message: error.message });
    }
}
// ------Bulk rolr--controller_______-


const AddbulkRole = async (req, res) => {
    try {
      const { Roles } = req.body;
      console.log("permission_NAME",  Roles);
  
      if (! Roles || !Array.isArray( Roles)) {
        return res.status(400).send({ message: "Permission names are required and should be an array" });
      }
  
      const savedPermissions = [];
  
      for (const element of  Roles) {
        const savedPermission = await RoleModel.create({
            Roles: element,
        });
        savedPermissions.push(savedPermission);
      }
  
      res.status(200).send({
        message: "Roles added successfully",
        Permissions: savedPermissions,
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };
  


// const AddbulkRole = async (req, res) => {
//     try {
//       const { Roles } = req.body;
//       console.log("Roles received:", Roles);
  
//       // Validate input
//       if (!Roles || !Array.isArray(Roles) || Roles.length === 0) {
//         return res.status(400).send({ message: "Roles are required and should be a non-empty array" });
//       }
  
//       // Validate each role
//       for (const role of Roles) {
//         if (typeof role !== 'string' || role.trim() === '') {
//           return res.status(400).send({ message: "Each role must be a non-empty string" });
//         }
//       }
  
//       // Create roles concurrently
//       const savedPermissions = await Promise.all(Roles.map(async (element) => {
//         return await RoleModel.create({
//           Roles: element,
//         });
//       }));
  
//       res.status(200).send({
//         message: "Roles added successfully",
//         Permissions: savedPermissions,
//       });
//     } catch (error) {
//       console.error("Error adding roles:", error); // Log error for debugging
//       res.status(500).send({ message: "Internal Server Error: " + error.message });
//     }
//   };
  

module.exports = {
    Addrole,
    Readroles,
    updateRole,
    Removeroles,
    ReadsingeRole,
    AddbulkRole
}