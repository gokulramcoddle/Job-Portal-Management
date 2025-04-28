const jobModel = require('../models/jobModel');

const fetchJob = async(req,res) => {
   try{ 
   const jobs = await jobModel.getJob();
   return res.status(200).json(jobs);
  }
   catch(err){
   return res.status(500).json({Error: err.message});
  }
}

const fetchJobByID = async(req,res) => {
  const {ID} = req.params;
  try{
    const jobById = await jobModel.getJobByID(ID);
    if(jobById.length === 0){
      return res.status(401).json({message : "Job not exist"});
    }
    return res.status(200).json(jobById);
  }
  catch(err){
    return res.status(500).json({error : err.message});
  }
}

const addJob = async(req,res) => {
  const { jobtitle, company, location, salary } = req.body;
  try{
    if(!jobtitle || !company || !location || !salary){
      return res.status(400).json({message: "Field cannot be empty"});
    }
    const addJob = await jobModel.postJob(jobtitle, company, location, salary);
    console.log(req.body);
    return res.status(200).json({message : "Added Successfully", addJob});
  }
  catch(err){
    return res.status(500).json({error : err.message});
  }
}

const editJob = async(req,res) => {
  const { jobtitle, company, location, salary } = req.body;
  const { ID } = req.params;
  try{
   const existJob = await jobModel.jobExist(ID);
   if(existJob.length === 0){
    return res.status(401).json({message : "Enter valid ID"});
   }
   const jobUpdate = await jobModel.updateJob(jobtitle, company, location, salary, ID);
   return res.status(200).json({message : "Updated successfully", jobUpdate})
  }
  catch(err){
    return res.status(500).json({error : err.message});
  }
}

const deleteJob = async(req,res) => {
  const { ID } = req.params;
   try{
    const existJob = await jobModel.jobExist(ID);
    if(existJob.length === 0){
      return res.status(400).json({message : "Enter valid ID"});
    }
    const jobRemove = await jobModel.removeJob(ID);
    return res.status(200).json({message : "Job deleted successfully", DeletedJob : existJob[0]});
   }
   catch(err){
    return res.status(500).json({error : err.message});
   }
}

module.exports = {
   fetchJob,
   fetchJobByID, 
   addJob, 
   editJob,
   deleteJob
  }