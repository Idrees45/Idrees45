

const {   Usermodel,Employeemodel} = require('../models/People');
const adminmodel= require("../models/adminmodel")

const mongoose= require("mongoose")
const bycrpt = require("bcrypt");

const jwt = require("jsonwebtoken");

const cookieParser = require("cookie-parser");
const fs = require('fs').promises;
const path= require("path");
const { json } = require('express');

const SalaryTypes= require("./Salary")



//register

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const hashpassword = await bycrpt.hash(password, 10);

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

    const isValidPassword = await bycrpt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id },"123", {
      expiresIn: '1h',
    });

    res.cookie('jwt', token, {
      httpOnly: true,
    });
    
    // Send response
    res.status(200).json({ message: "Login successfully" ,token:token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }}

//--------userApi------

const User = async (req, res) => {
  try {
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
if (!object.values(SalaryTypes) .includes(method)) {
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
    }
  
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//  employ get api 

const right = async (req, res) => {
  try {
    const  employId = req.body.id
console.log(employId)
const found = await Employeemodel.findById(employId).populate({
  path: 'user',
  select: '-email -password'  
});;

  if (found ) {
        res.status(200).send(found);
  }else{
        res.send({ message: "employ not found" });
   } 
} catch (error) {
    res.status(500).send({ message: error.message });
}
};

// remove any single user

const removeuser = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(userId)
    // Find the user to get the associated employees and their image paths
    const employees = await Employeemodel.find({ user: userId });

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
      return await Employeemodel.findByIdAndDelete(employee._id);
    });

    // Wait for all employee deletions to complete
    await Promise.all(deleteEmployees);

    /*Delete all employees related to the user
    const deleteEmployees = await Employeemodel.deleteMany({ user: userId });*/
    // Delete the user itself
    const deleteUser = await Usermodel.findByIdAndDelete(userId);

    if (deleteUser) {
        res.status(200).json({ message: "User and related employees deleted successfully" });
    } else {
        res.status(404).json({ message: "User not found" });
    }
} catch (error) {
    res.status(500).json({ message: error.message });
}}


// update Api

const userupdate= async(req,res)=>{

try {
  const id= req.params.id
  const updateuserdetail = await Employeemodel.findOneAndUpdate({user:id}, req.body, { new: true });
const updatedUser = await Usermodel.findByIdAndUpdate(id,req.body,{new:true})
console.log(updateuserdetail)
if (updatedUser && updateuserdetail) {
  res.status(200).json({ message: "User updated", user: updatedUser ,employ:updateuserdetail});
} else {
  res.status(404).json({ message: "User not found" });
}
} catch (error) {
res.status(500).json({message:error.message})
}}



module.exports = {
  register,
  login,
  User,
  removeuser,
  right,
  userupdate
};
