const express= require("express")
const authenticateToken = require("../middelwares/Auth")

const router= express.Router();
const upload= require("../middelwares/multer")
const{register,login,User,right,removeuser, userupdate}=require('../controller/admincontroller');


router.post("/register",register)
router.post("/login",login)
router.post("/user",upload.single('uploadedFile'),User)
router.patch("/update-user/:id", userupdate)
router.delete("/remove-employ/:id",removeuser)
router.get("/get-Employe",right)

//---- Authmiddelware------

router.get('/data' ,authenticateToken, (req, res) => {
    res.json({ message: 'Authorized access to data', user: req.user });
  });


module.exports = router;