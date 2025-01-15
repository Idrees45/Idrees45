// const express = require('express');
// const router = express.Router();
// const { Usermodel, Employeemodel } = require('./models'); // Adjust the import based on your project structure
// const bcrypt = require('bcrypt');
// const nodemailer = require('nodemailer');
// const generator = require('generate-password');

// // Bulk upload API endpoint
// router.post('/bulk-upload', async (req, res) => {
//   try {
//     const usersData = req.body.users; // Get the array of user data from the request

//     for (const item of usersData) {
//       // Generate random password and hash it
//       const randomPassword = generator.generate({
//         length: 10,
//         numbers: true,
//       });
//       const hashedPassword = await bcrypt.hash(randomPassword, 10);

//       // Create a new user
//       const newUser = await Usermodel.create({
//         firstName: item["First Name"],
//         lastName: item["Last Name"],
//         email: item["Email"],
//         password: hashedPassword,
//         Role: item["Role"], // Ensure this is an array
//       });

//       // Send email
//       emailsend(newUser.email, randomPassword);

//       // Create employee record
//       await Employeemodel.create({
//         user: newUser._id,
//         jobDescription: item["Job Description"],
//         jobtitle: item["Job Title"],
//         employmentType: item["Employment Type"],
//         img: item["File"],
//         workingschedule: item["Working Schedule"],
//         country: item["Country"],
//         hiring: item["Hiring"], // Ensure this is present in your Excel
//         salary: {
//           method: item["Salary Method"],
//           amount: item["Salary Amount"],
//         },
//         Team: item["Team ID"], // Ensure this is present in your Excel
//       });
//     }

//     res.status(200).send({ message: "Users successfully created" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ message: "Error processing bulk upload" });
//   }
// });

// module.exports = router;


const { employschemaValidation, Employeemodel, Usermodel,} = require('../models/People');


const Addbulkemploye = async (req, res) => {
    try {
      const { jobtitle} = req.body;
      const data=req.body
    //   data.forEach(element => {
    //     const  newUser=   await Usermodel.create({
    
    //         firstName:element.firstName,
    //         lastName:element.lastName,
    //         email:element.email,
         
    //           })
    //   })
    

    const users = await Promise.all(
      data.map(async (element) => {
        // Create a new user
        const newUser = await Usermodel.create({
          firstName: element.FirstName,
          lastName: element.LastName,
          email: element.email,
        });
    
        // If the user is created successfully, create the corresponding employee
        if (newUser) {
          await Employeemodel.create({
            user: newUser._id,
            jobDescription: element.jobDescription, // Using 'element' instead of 'validatedData'
            jobtitle: element.jobtitle, // Assuming 'element' contains the required data
            employmentType: element.employmentType,
            img: element.file,
            workingschedule: element.workingschedule,
            country: element.country,
            hiring: element.hiring,
            salary: {
              method: element.method,
              amount: element.amount,
            },
            Team: req.body.Teamid,
          });
        }
      })
    );
    
    // If all users are processed successfully, send a response
    if (users) {
      return res.status(200).send({
        message: "Users and employees added successfully",
      });
    }
    


    //   console.log("permission_NAME",jobtitle);
  
    //   if (! Roles || !Array.isArray( Roles)) {
    //     return res.status(400).send({ message: "Permission names are required and should be an array" });
    //   }
  
    //   const savedPermissions = [];
  
    //   for (const element of  Roles) {
    //     const savedPermission = await RoleModel.create({
    //         Roles: element,
    //     });
    //     savedPermissions.push(savedPermission);
    //   }
  
    //   res.status(200).send({
    //     message: "Roles added successfully",
    //     // Permissions: savedPermissions,
    //   });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };
  

  module.exports = {
Addbulkemploye
}
