

//const {   Usermodel,Employeemodel} = require('../models/People');
const adminmodel= require("../models/adminmodel")

const mongoose= require("mongoose")
// const bcrypt= require("bcrypt")

const bcrypt = require('bcryptjs'); // Use bcryptj
const jwt = require("jsonwebtoken");

const cookieParser = require("cookie-parser");
const fs = require('fs').promises;
const path= require("path");
const { json } = require('express');

const SalaryTypes= require("./Salary")

const { employschemaValidation, Employeemodel, Usermodel,} = require('../models/People');
const { resolve } = require("dns");


const generator= require('generate-password')
const nodemailer = require('nodemailer');
const Admin = require("../models/adminmodel");
//register

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const hashpassword = await bcrypt.hash(password, 10);

  try {
    const exist = await  adminmodel.findOne({ email });

    if (exist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const saveuser = await  adminmodel.create({
      name: req.body.name,
      email: req.body.email,
      password: hashpassword,
    });

    if (saveuser) {
      const token = jwt.sign({ userid: saveuser._id }, "123", {
        expiresIn: "10s",
      });

      // res.status(200).json({ message: "successfgully register", token });
      console.log("data save succes fully");

      res.cookie("jwt", token, {
        httpOnly: true,

        maxAge: 1000 * 10,
      },);
      res.status(200).json({ message: "Successfully registered" });
    }
  } catch (error) {
    console.log(error);
  }
};

// for login

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await adminmodel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid password" });
   
      // throw new Error( "Invalid password" );
     
    }

    const token = jwt.sign({ userId: user._id },"123", {
      expiresIn: '7h',
    });

    res.cookie('jwt', token, {
      httpOnly: true,
    });
    
    // Send response
    res.status(200).json({ message: "Login successfully" ,token:token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }}










// for  Employes login

const Employlogin =  async (req,res) => {
 
  try {
    // const { email, password } = req.body;
    const email = req.body.email.trim();
    const password = req.body.password.trim();  
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
      // return res.json({ message: "Email is required" });
    }
    
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
      // return res.json({ message: "Password is required" });
    }
    
    // Proceed with further processing if both fields are provided
    
    const user = await Usermodel.findOne({ email});
    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });
      // return res.json({ message: "User not found" })
    
    }  
   

 // Compare passwords
 const isValidPassword = await  bcrypt.compare (password,user.password);
 console.log("Password match result:", isValidPassword);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
      // throw new Error( "Invalid password" );
      // return res.json({ message: "Invalid password" })
    }

  
      const token = jwt.sign({ userId: user._id ,Role:user.Role},"123", {
        expiresIn: '7h',
      });
  
      return res.status(200).json({ message: "successfull login",token:token });
    
    

  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }}




const emailsend= (email,randompassword)=>{



// Mailsender

  const transporter = nodemailer.createTransport({
    service: 'gmail',
  
    port: 465,
  secure: true,
    auth: {
        user: 'midreesbaloch79@gmail.com',
        pass: 'qcgc vvtv oaom rxpn'
    }
  });
  // Define email options
  const mailOptions = {
    from: 'midreesbaloch79@gmail.com', 
    to: email, 
    subject: 'Email Test', 
    text: `Your password is: ${randompassword}`, 
  };
  
  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
  
  

}

  






//--------userApi------

const User = async (req, res) => {
  try {



    var randompassword = generator.generate({
      length: 10,
      numbers: true
    });

console.log("paswordrandom",randompassword )

const hashpassword =  await bcrypt.hash(randompassword, 10);

// const hashPassword = await bcrypt.hash(randomPassword, 10);
if(!req.user){
  res.status(400).send({ message: "tokn not providd" })
}

    
      const { employmentType, hiring,Role, ...rest } = req.body;
     const parsedEmploymentType = employmentType ? JSON.parse(employmentType) : null;
      const parsedHiring = hiring ? JSON.parse(hiring) : null;
      // const parsedRole = Role ? (typeof Role === 'string' ? JSON.parse(Role) : Role) : null;
  console.log("frontendrole", req.body.Role)
      // Combine req.body and req.file into a single object
      const parsedRole = Array.isArray(Role) 
  ? Role 
  : JSON.parse(Role); 


      const dataToValidate = {
        ...rest,
        Role:parsedRole,
        employmentType: parsedEmploymentType,
        hiring: parsedHiring,
        file: req.file ? req.file.path : null
      };
  
      const validatedData = await employschemaValidation.validateAsync(dataToValidate);
     console.log("valid_role", validatedData.Role);
    
  
if (validatedData){
  const  newUser=   await Usermodel.create({
    
firstName:validatedData.firstName,
lastName:validatedData.lastName,
email:validatedData.email,
password:hashpassword,
Role: validatedData.Role
  })
  emailsend(newUser.email,randompassword)
  console.log("idddd",newUser._id,)
  if( newUser){
      await Employeemodel.create( {
        user: newUser._id,
      jobDescription: validatedData.jobDescription,  
      jobtitle:validatedData.jobtitle,
      employmentType:validatedData.employmentType,
      img: validatedData.file,  
      workingschedule: validatedData.workingschedule,
      country:validatedData.country,
      hiring:validatedData.hiring,
      salary:{ method:validatedData.method ,
          amount:validatedData.amount
        },
        Team: req.body.Teamid
  })}
    

      res.status(200).send({ message: "User successfully created" });
}else{
  res.status(401).json({message:"Please validate"})
}

  }catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//---------- All employes get api------------- 


const right = async (req, res) => {
  try {
    
if(!req.user){
  res.status(400).send({ message: "tokn not providd" })
}

const found = await Employeemodel.find({}).populate({
  path: 'user',
  select: '-password'  
});
  if (found ) {
        res.status(200).send(found);
  }else{
        res.send({ message: "employ not found" });
   } 
} catch (error) {
    res.status(500).send({ message: error.message });
}
};





// ----------remove any single user------------

const removeuser = async (req, res) => {
  try {
    const{ids}= req.body;
    console.log('IDs from request body:', ids);

    
   
    


    // Find the user to get the associated employees and their image paths
    const employees = await Employeemodel.find({ user: ids });
    console.log('Retrieved employees:', employees);
    // Delete all employees related to the user and their images
    const deleteEmployees = employees.map(async (employee) => {
      // Assuming each employee has an 'imagePath' field
      if (employee.img) {
        try {
          // Delete the image file from the server
          await fs.unlink(employee.img);
        } catch (error) {
          console.error(`Error deleting image file ${employee.img}: ${error.message}`);
          // Handle error, maybe log it or throw an exception if necessary
        }
      }
    //  return await Employeemodel.findByIdAndDelete(employee._id);
    return await Employeemodel.deleteMany({ _id: { $in: employee._id} })
    });

    // Wait for all employee deletions to complete
    await Promise.all(deleteEmployees);

    //Delete all employees related to the user
    //const deleteEmployees = await Employeemodel.deleteMany({ user: userId });
    // Delete the user itself
    //const deleteUser = await Usermodel.findByIdAndDelete(userId);
    const deleteUser = await Usermodel.deleteMany({ _id: { $in: ids } })
    if (deleteUser) {
        res.status(200).json({ message: "User and related employees deleted successfully" });
    } else {
        res.status(404).json({ message: "User not found" });
    }
} catch (error) {
    res.status(500).json({ message: error.message });
}}


//----------- update--------------

const userupdate= async(req,res)=>{

try {

  const { employmentType, hiring, ...rest } = req.body;
  const parsedEmploymentType = employmentType ? JSON.parse(employmentType) : null;
   const parsedHiring = hiring ? JSON.parse(hiring) : null;



  const { id } = req.params;

  // `req.body` will contain the non-file data
  const data = req.body;
console.log("file",req.file.path)
console.log("body",data)


const imagePath = req.file ? req.file.path : null;

// Update employee details with image path

if(imagePath)
{
  const employees = await Employeemodel.findById(id);
  //const employs = await Employeemodel.findByIdAndDelete(id);
  await fs.unlink(employees.img);
}

const  updateuserdetail = await Employeemodel.findByIdAndUpdate(
  id,
  { ...data, img: imagePath ,employmentType:parsedEmploymentType,hiring:parsedHiring}, // Include the image path
  { new: true }
);


 // const updateuserdetail = await Employeemodel.findByIdAndUpdate(id, req.body, {img:req.file.Path},{ new: true });
const usrid = updateuserdetail.user;
const updatedUser = await Usermodel.findByIdAndUpdate(usrid, req.body, { new: true });


if (updatedUser && updateuserdetail) {
  res.status(200).json({ message: "Userupdated", user: updatedUser ,employ:updateuserdetail});
} else {
  res.status(404).json({ message: "User not found" });
}
} catch (error) {
res.status(500).json({message:error.message})
}}




// ----------forupdat usr {{{{singel_ user_Get}}}-------------
const getuserbyid = async (req, res) => {
  try {
    const id= req.params.id
console.log("uuuuuuppppdattttttttttt",id)


const found = await Employeemodel.findById({_id:id}).populate({
  path: 'user',
  select: '-password'  
},).populate({
  path: 'Team', // Assuming the field is called 'Team'
  select: 'Teamname branch' // Select specific fields from the Team model
});

  if (found ) {
        res.status(200).send(found);
  }else{
        res.send({ message: "employ not found" });
   } 
} catch (error) {
    res.status(500).send({ message: error.message });
}
};


const profilgt= async(req,res)=>{
try{
  const id= req.params.id

    if (!id) {
      return res.status(400).json({ message: 'ID is required' });
    }

    console.log(`Received ID: ${id}`);

    // Find employee and populate user
    const employee = await Employeemodel.findOne({ user: id })
      .populate({
        path: 'user',
        select: '-password' // Exclude sensitive fields
      });



    if (employee) {
      // console.log('Employee found:', employee);
     return  res.status(200).json({ found: employee });
    } else {
      console.log('No employee data found for this user');
    return   res.status(404).json({ message: 'No employee data found for this user' });
    }
}
catch (error) {
  res.status(500).send({ message: error.message });
}
}


//chang password

const changpassword= async(req,res)=>{

try {
  const { oldPassword,newPassword,id}=req.body

  const password = oldPassword.trim();  
console.log(req.user)
    const usr=  await Usermodel.findById(id)

    if (!usr) {
      return res.status(404).send({ message: 'User not found' });
    }

    const isValidPassword =  await bcrypt.compare( password,usr.password);
    if (!isValidPassword) {
      return res.status(400).send({ message: 'Incorrect old password' });
    }


    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user with the new password
    const updatedUser = await Usermodel.findByIdAndUpdate(id, { password: hashedPassword }, { new: true });
    if (!updatedUser) {
      return res.status(500).send({ message: 'Failed to update password' });
    }

    console.log('Password updated successfully', updatedUser);
    res.status(200).send({ message: 'Password updated successfully' });

} catch (error) {
  res.status(500).send({ message: error.message });
}

}
// -------ForgetPassword----------

const ForgetPassword=async(req,res)=>{
  try {
    const {email}=req.body
   
    if(!email){
    return res.status(402).json({message:"Email is required"})
    }
    const user = await Usermodel.findOne({ email: email })
  if(user){
  
    var randompassword = generator.generate({
      length: 6,
      numbers: true
    });
    const OTPEntry = await Usermodel.findOneAndUpdate({
      email:email,
      OTP:randompassword,
      is_verified:false
    })
      if(OTPEntry){
    emailsend(user.email,randompassword)}
    res.status(200).json({message:"check you Gmail for verify"})
  }else{
    res.status(400).json({message:"User not found"})
  }
    

  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}
// // ----------Verify_user-------------

const verifyUser= async(req,res)=>{
 
try {
  const {email,password}=req.body
 
  console.log("password-verify",password)
  if (!password) {
    return res.status(400).json({ message: "Password is required" });

  }
   const user = await Usermodel.findOne({email:email,
  
   })
   if(user){
    if(user.OTP===password){
    const verified=   await Usermodel.findOneAndUpdate({email:email,
        OTP:null,
        is_verified:true
       })
       if(verified){
      res.status(200).json({message:"userverify- success"})}
    }
   }else{
    res.status(400).json({message:"user not found"})
   }

} catch (error) {
  res.status(500).send({ message: error.message });
}
}

// --------COnfirm_verified_user_Login-----------

const confirmverifieduser= async(req,res)=>{
  try {
    const {email,password}=req.body
    console.log("email-confirm",email)
    console.log("Password-confirm",password)

    const user= await  Usermodel.findOne({email:email})
    if(user){
   if(user.is_verified===true){
    const hashpassword = await bcrypt.hash(password, 10);
    await Usermodel.findOneAndUpdate({ email: email }, {
      is_verified:false,
      password:hashpassword
    })
    res.status(200).json({message:"Userupdatedsucessfully"})
   }
    }else{
      res.status(400).json({message:"Usero found"})
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}


module.exports = {
  register,
  login,
  User,
  removeuser,
  right,
  userupdate,
  getuserbyid,
  Employlogin,
  profilgt,
  changpassword,
  ForgetPassword,
  verifyUser,
  confirmverifieduser
};












    /*
  const{username,email, password, phoneNumber,firsttName, lasttName,jobDescription,jobtitle,workingschedule ,Parttime,Ondemand,Negotiable, Fulltime }= req.body;
    const {array, data,selectedOption,} = req.body;
    const { username, email, password, phoneNumber,firsttName, lasttName,jobDescription,jobtitle,workingschedule} = data;
    const { Parttime,Ondemand,Negotiable, Fulltime } = array;
    const { value} = selectedOption;
    console.log('Data:', data); 
    console.log('Array:', array); 
    console.log("select:",selectedOption)
    const uploadedFile = req.file;
console.log(uploadedFile)
    if (!uploadedFile) {
      return res.status(400).send({ message: 'File upload failed' });
    }*/
      //const usrrvalidation= await usrvalidation.validateAsync(req.body)
    
   //console.log("body",req.body,"fil ha",req.file);
/*
    if (req.body.employmentType || req.body.hiring) {
      req.body.hiring = JSON.parse(req.body.hiring);
      req.body.employmentType = JSON.parse(req.body.employmentType)// store in left   mean  req.body.employmentTy  {=}
      
    }
    
   
   

      const validatedData = await employschemaValidation.validateAsync(req.body);*/













/*
    // Create a new user record in Usermodel
    const newUser = await Usermodel.create({
      firstName: usrvalidation.firstName,
      lastName:usrvalidation.lastName,
      email:usrvalidation.email
      // Add other fields from validatedData as needed
    });

    if (newUser) {
      // Create a new employee record in Employeemodel
      const newEmployee = await Employeemodel.create({
        user: newUser._id,
        jobDescription: validatedData.jobDescription,
        jobtitle: validatedData.jobtitle,
        //img: uploadedFile ? uploadedFile.path : '', // Assuming img is optional
        workingschedule: validatedData.workingschedule,
        hiringmultiplecandidates: validatedData.hiring,
        // Add other fields from validatedData as needed
      });

      if (newEmployee) {
        res.status(200).json({ message: "User and employee created successfully" });
      } else {
        // Handle if creating employee fails
        res.status(500).json({ message: "Failed to create employee" });
      }
    } else {
      // Handle if creating user fails
      res.status(500).json({ message: "Failed to create user" });
    }
     */
 
      /*
      const {
        firstName,
        lastName,
        email,
        jobtitle,
        jobDescription,
        shift,
        parttime,
        country,
        method,
        amount
  
      } = req.body;



// Validate method
if (!Object.values(SalaryTypes).includes(method)) { // Use capital "O"
  return res.status(400).json({ error: 'Invalid salary method' });
}
       console.log("Method",method)
      console.log('First Name:', firstName);
      console.log('Last Name:', lastName);
      console.log('Email:', email);
      console.log('Job Title:', jobtitle);
      console.log('Job Description:', jobDescription);
      console.log('Shift:', shift);
      console.log('Parttime:', parttime);
  
 
      const uploadedFile = req.file;
      console.log('Uploaded File:', uploadedFile);
      
      if (!uploadedFile) {
        return res.status(400).send({ message: 'File upload failed' });
      }
    
 
   // Normalize parttime object
   const parsedParttime = JSON.parse(parttime);
   console.log('Normalized Parttime:', parsedParttime);

const {Negotiable,Ondemand,Parttime,Fulltime ,hiring} =parsedParttime
    // Create a new user
    const newUser = await  Usermodel.create({
      firstName:  firstName,
      lastName: lastName,
      email: email,    
    });
    if (newUser) {
      const userid = await Employeemodel.create({
        user: newUser._id,
        jobDescription: jobDescription,  
        jobtitle:jobtitle,
        employmentType:parsedParttime,
        img: uploadedFile.path,  
        workingschedule: shift,
        hiringmultiplecandidates:hiring,
        country:country,
          salary: {
            method,
            amount
          }

      });

    
      res.status(200).send({ message: "User successfully created" });
    } else {
      res.status(400).send({ message: "User creation failed" });
    }*/