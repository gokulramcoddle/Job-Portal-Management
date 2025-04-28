const applicationModel = require('../models/applicationModel');
const jobModel = require('../models/jobModel');
const userModel = require('../models/userModel');

const usersApplication = async(req,res) => {
  try{
    const application = await applicationModel.usersApplication();
    return res.status(200).json(application);
  }
  catch(err){
   return res.status(500).json({error : err.message});
  }
}

const postApplication = async(req,res) => {
    const {userID, jobpostID} = req.body;
    if(!userID || !jobpostID){
      return res.status(400).json({Message : "Values cannot be empty"});
    }
  try{
    const userExist = await userModel.userExist(userID);
    const existJob = await jobModel.jobExist(jobpostID);
     if(userExist.length === 0 || existJob.length === 0){
       return res.status(401).json({message : "Invalid UserID or JobpostID "});
     }
    const alreadyApplied = await applicationModel.userApplication(userID, jobpostID);
     if(alreadyApplied.length > 0){
      return res.status(401).json({message : "User already applied for the same job"});
     }
       const addedApplication = await applicationModel.addApplication(userID, jobpostID);
       console.log(req.body);
       return res.status(200).json({message : "Application created", Application : addedApplication });
        
    }
    catch(err){
      return res.status(500).json({error : err.message});
    }
}

const updateJobStatus = async(req,res) => {
  const { status, ID } = req.body;
  try{
    const existApplication = await applicationModel.applicationExist(ID);
    if(existApplication.length === 0){
      return res.status(401).json({message : "Application ID not exist | Enter valid applicationID"})
    }
    await applicationModel.updateApplication(status, ID);
    console.log(req.body);
    return res.status(200).json({message : "Application status updated"});
    
  }
  catch(err){
    return res.status(500).json({error : err.message});
  }
}

const deleteApplication = async(req,res) => {
   const { ID } = req.params;
    try{
     const existApplication = await applicationModel.applicationExist(ID);
     if(existApplication.length === 0){
        return res.status(401).json({message : "Enter valid applicationID"});
     }
     const removeApplication = await applicationModel.deleteApplication(ID);
     return res.status(200).json({message : "Deleted application sucessfully", removeApplication});
    }
    catch(err){
       return res.status(500).json({error : err.message});
    }
}

const getApplicationById = async(req,res) => {
    const { userID } = req.params;
    try{
     const exist = await applicationModel.applicationById(userID);
      if(exist.length === 0){
        return res.status(401).json({message : "Error : User not exist"})
      }
      return res.status(200).json(exist);
    }
    catch(err){
      return res.status(500).json({Error : err.message})
    }
  }

module.exports = { 
  usersApplication, 
  postApplication, 
  updateJobStatus, 
  deleteApplication, 
  getApplicationById 
}