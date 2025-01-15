// const Joi = require('joi');
// const mongoose = require('mongoose');
// const SalaryTypes = require('../controller/Salary');



// // Define Joi validation schema for employmentType objectS
// const employmentTypeSchema = Joi.object({
//     Fulltime: Joi.boolean().default(false),
//     Parttime: Joi.boolean().default(false),
//     Ondemand: Joi.boolean().default(false),
//     Negotiable: Joi.boolean().default(false)
    
// }).or('Fulltime', 'Parttime', 'Ondemand', 'Negotiable');
// const HiringTypeSchema = Joi.object({
//     hiring: Joi.boolean().default(false),
  
    
// }).or('hiring');


// // Joi validation schema
// const objectSchema = Joi.object({
//     value: Joi.string().required(),
//     label: Joi.string().required()
//   })


// // Define Joi validation schema for Employschema
// const employschemaValidation = Joi.object({
//     jobDescription: Joi.string().allow(''),
//     jobtitle: Joi.string().allow(''),
//    employmentType:employmentTypeSchema .required(),
//    hiring:HiringTypeSchema ,
//    workingschedule: Joi.string().required(),
//    file: Joi.binary().allow(''),
  
//     country: Joi.string().required(),
//     Role: Joi.array(),
//     /*salary: Joi.object({
//         method: Joi.string().valid(...Object.values(SalaryTypes)).required(),
//         amount: Joi.string()
//     }),*/
//    method: Joi.string().valid(...Object.values(SalaryTypes)).required(),
//     amount: Joi.string(),
//     //user: Joi.string().required(), // Assuming user ID is required
//     firstName:Joi.string().required() ,
//     lastName:Joi.string().required() ,
//     email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
//     Teamid:Joi.string().allow() ,
// });

// // Define Mongoose schema for Employschema



// const userschema= new  mongoose.Schema({

//     firstName:{ type: String},
//     lastName: { type:String},
//     email: {
//         type: String,
//         },
//       password:{
//         type:String
//       },
//       Role: [{ 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: 'Role', 
//       }],

//       OTP:String,
//       is_verified: {
//         type: Boolean,
//         default: false,
//       },
// } );

//  const  Usermodel = mongoose.model('User',  userschema);


// const Employschema = new mongoose.Schema({


 

//     jobDescription: { type: String },
//     jobtitle: { type: String },
//     employmentType: {
//         Fulltime: { type: Boolean, default: false },
//         Parttime: { type: Boolean, default: false },
//         Ondemand: { type: Boolean, default: false },
//         Negotiable: { type: Boolean, default: false }
//     },
//     workingschedule: { type: String },
//    img: { type: String },
//     hiring: {hiring: { type: Boolean, default: false }},
//     country: { type: String },
//    salary: {
//         method: { type: String, ...Object.values(SalaryTypes) },
//         amount: { type: String }
//    },
//     user: {
//        type: mongoose.Schema.Types.ObjectId,
//         ref: "User"
//     },
//     Team: {
//         type: mongoose.Schema.Types.ObjectId,
//          ref: "Team"
//      }

    
// },{
//     timestamps: true
//  });


// const Employeemodel = mongoose.model('Employee', Employschema);

// module.exports = {
//     Employeemodel,
//     employschemaValidation ,// Export Joi validation schema for reuse
//     Usermodel,
// };





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