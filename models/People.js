





///////----------for btest bulk upload
const mongoose = require('mongoose');




const userschema= new  mongoose.Schema({

    firstName:{ type: String},
    lastName: { type:String},
    email: {
        type: String,
        },
      password:{
        type:String
      },
      Role: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Role', 
      }],

      OTP:String,
      is_verified: {
        type: Boolean,
        default: false,
      },
} );

 const  Usermodel = mongoose.model('User',  userschema);


const Employschema = new mongoose.Schema({


 

    jobDescription: { type: String },
    jobtitle: { type: String },
    employmentType: {
        Fulltime: { type: Boolean, default: false },
        Parttime: { type: Boolean, default: false },
        Ondemand: { type: Boolean, default: false },
        Negotiable: { type: Boolean, default: false }
    },
    workingschedule: { type: String },
   img: { type: String },
    hiring: {hiring: { type: Boolean, default: false }},
    country: { type: String },
//    salary: {
//         method: { type: String, ...Object.values(SalaryTypes) },
//         amount: { type: String }
//    },
    user: {
       type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    Team: {
        type: mongoose.Schema.Types.ObjectId,
         ref: "Team"
     }

    
},{
    timestamps: true
 });


const Employeemodel = mongoose.model('Employee', Employschema);

module.exports = {
    Employeemodel,
  
    Usermodel,
};

















































// /*
// const SalaryTypes = require('../controller/Salary');
// const userschema= new  mongoose.Schema({

//     firstName:{ type: String},
//     lastName: { type:String},

//     password: {
//         type: String,
       
//     },
//     email: {
//         type: String,
       
//     },


//     birthdate: Date,
//     gender: {
//         type: String,
//         enum: ['Male', 'Female', 'Other']
//     },
//     phoneNumber: String,
//     avatar: String,
//     isActive: {
//         type: Boolean,
//         default: true
//     },
//     isAdmin: {
//         type: Boolean,
//         default: false
//     } 
// });

//  const  Usermodel = mongoose.model('User',  userschema);




   
// const Employschema= new mongoose.Schema({

    
//     jobDescription:{
//         type:String
//     },
//     jobtitle:{
//         type:String
//     },
//      employmentType:{
//         Fulltime: { type: Boolean, default: false },
//         Parttime: { type: Boolean, default: false },
//         Ondemand: { type: Boolean, default: false },
//         Negotiable: { type: Boolean, default: false },
//       },
     

//       workingschedule:{
//         type:String
//       },
//       img: { type: String },

//       hiringmultiplecandidates:{
//            type:Boolean,
//           default:false
//       },
//       country:{
//         type:String
//       },

//      /*
// salary:{
//     Method: {type:String},
//     Amount:{type:String}
// },

// //Object.values(SalaryTypes)  This method   convert object into array

// salary: {
//     method: { type: String, enum: Object.values(SalaryTypes), required: true },
//     amount: { type: String, required: true }
//   },


//       user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
     
//       }
    
//     });
    
    
    
//     const  Employeemodel= mongoose.model('Employee', Employschema);
        

//     module.exports = {
//         Employeemodel,
//         Usermodel
    
//     }*/
