const express= require("express")
const authenticateToken = require("../middelwares/Auth")

const router= express.Router();
const upload= require("../middelwares/multer")
const{register,login,User,right,removeuser,userupdate,getuserbyid,Employlogin,profilgt,changpassword, ForgetPassword, verifyUser, confirmverifieduser}=require('../controller/admincontroller');
const bodyParser = require('body-parser');
const {Addteam, Readteam, updateTeam, Removeteam, Readsingelteam}=require("../controller/Team");
const { Addrole, Readroles, updateRole, Removeroles, ReadsingeRole, AddbulkRole } = require("../controller/RoleController");
const { AddPermission, ReadPermissions, ReadsingelPermission,updatepermission, RemovePermission, AddbulkPermission } = require("../controller/PermissionController");
const { Addbulkemploye } = require("../controller/Bulkemployecontroller");



router.use(bodyParser.json())

router.post("/register",register)
router.post("/login",login)
router.post("/user",authenticateToken,upload.single('uploadedFile'),User)
router.patch("/update-user/:id",authenticateToken,upload.single('uploadedFile'),userupdate)
router.post("/remove-employ",removeuser)
router.get("/get-Employe",authenticateToken,right)
router.get("/get-user/:id",getuserbyid)
router.post("/Empoy-login",Employlogin)
router.get("/profil-gt/:id",authenticateToken,profilgt)
router.post("/chang-password",changpassword)
router.post("/Forget-password",ForgetPassword)
router.post("/verify-user",verifyUser)
router.post("/signup_verifieduser",confirmverifieduser)
// ---------Team_Crud-----------
router.post("/Add_Team",Addteam)
router.get("/get_Team",Readteam)
router.patch("/update_Team",updateTeam)
router.delete("/Remove_Team",Removeteam)
router.get("/get_singel_Team/:id",Readsingelteam)
//-------Roles_Crud-------
router.post ("/Add-ROle",Addrole)
router.get("/get-Roles",Readroles)
router.patch("/update-Role",updateRole)
router.delete("/Remove_Roles",Removeroles)
router.get("/get-singel-Role/:id",ReadsingeRole)
// ------- Permission_crud---------
router.post ("/Add-Permission",AddPermission)
router.get("/get-Permissions",ReadPermissions)
router.get("/get-singel-Permission/:id",ReadsingelPermission)
router.patch("/update-Permission",updatepermission)
router.delete("/Remove-Permission",RemovePermission)
//////-----Bulk-permision--------------

router.post ("/Add-bulkpermission",AddbulkPermission)
router.post ("/Add-bulkRole",AddbulkRole)
router.post("/Add-bulkemploye",Addbulkemploye)
//---- Authmiddelware------

router.post('/data' , (req, res) => {

  if(  req.body ){
    console.log("tokn ha", )
     res.json({ message: 'Athorized access to daaaata',  })}

});

 

module.exports = router;