const TeamModel= require("../models/Teammodel")

const Addteam= async(req,res)=>{
    try {
        const { Teamname, branch } = req.body;
        
        console.log(Teamname, branch);
        if(!Teamname){
            // return res.status(204).json({ message: "Team name required" });
            return res.status(400).send({ message: "Team name is required" });
        }
        if(!branch){
            // return res.status(204).json({ message: "branch is required" });
            return res.status(400).send({ message: "Branch is required" });
        }
        const teamSave = await TeamModel.create({
            Teamname:Teamname,
            branch:branch
        });
        res.status(200).send({ message: "Team added successfully", team: teamSave });
    
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    };


const Readteam=async(req,res)=>{

    try {
        const {id}=req.body

       const user= await TeamModel.find({})
       if(user){
        res.status(200).json({message:"sucessfully found",teams:user})
       }else{
        res.status(400).json({message:"user not found"})
       }
    } catch (error) {
    res.status(500).send({ message: error.message });
    }
}
const updateTeam=async(req,res)=>{
    try {
        const {id,Teamname, branch}=req.body
        console.log("Update_Team",id)
        if(!Teamname){
           return  res.status(400).send({ message: "Team name is required" });
        }
        if(!branch){
          return  res.status(400).send({ message: "Branch is required" });
        }
        const user = await TeamModel.findByIdAndUpdate(
            id, // Find by ID
            { Teamname:Teamname,
                branch: branch},
            { new: true } 
        );
        if(user){
        return  res.status(200).json({message:"sucessfully updated",data:user})
        }else{
           return  res.status(400).json({message:"user not found"})
        }

    } catch (error) {
         return res.status(500).send({ message: error.message });
    }
}

const Removeteam= async(req,res)=>{
    try {
        const { ids } = req.body;
console.log("RemoveTeam_Id",ids)
const removeteam = await TeamModel.deleteMany({ _id: { $in: ids } });

       
        if(removeteam){
           return  res.status(200).json({message:"sucessfully Removed"})
        }else{
            res.status(400).json({message:"user not found"})
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const Readsingelteam=async(req,res)=>{

    try {
        const { id } = req.params;
console.log("singel_Team_idparams",id)
       const user= await TeamModel.findById(id)
       if(user){
         return res.status(200).json({message:"sucessfully found",singelteam:user})
       }else{
        return res.status(404).json({ message: "User not found" });
       }
    } catch (error) {
    return res.status(500).send({ message: error.message });
    }
}
module.exports = {
Addteam,
Readteam,
updateTeam,
Removeteam,
Readsingelteam
}
