const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

const usersData = async (req, res) => {
  try {
    const users = await userModel.usersData();
     return res.status(200).json(users);
  } catch (err) {
     return res.status(500).json({ error: err.message });
  }
}

const getUserById = async(req,res) => {
  const { userID } = req.params;
  try{
    const exist = await userModel.userById(userID);
    if(exist.length == 0){
      return res.status(404).json({message : "Error : User not exist"});
    }
    return res.status(200).json(exist);
  }
  catch(err){
    return res.status(500).json({Error : err.message});
  }
}

const editData = async(req,res) => {
   const { userID } = req.params;
   const { firstname, lastname, email, password} = req.body;
   try{
    const exist = await userModel.userById(userID);
    if(exist.length == 0){
      return res.status(404).json({message : "Error : User not exist"});
    }
   const hashedPassword = await bcrypt.hash(password,10);
   const updateData = await userModel.updateUser(firstname, lastname, email, hashedPassword, userID);
   console.log(req.body);
   return res.status(200).json(updateData);
   }
   catch(err){
    return res.status(500).json({error : err.message});
   }
 }

const deleteData = async(req,res) => {
    const { userID } =  req.params;
  try{  
    const[user] = await userModel.userExist(userID);
    if(user.length === 0){
      return res.status(404).json({message : "Error: User not exist"});
    } 
     const deleteUserData = await userModel.deleteUser(userID);
      return res.status(200).json(deleteUserData);
    }
    catch(err){
      return res.status(500).json({error : err.message});
    }
  }

  module.exports = { 
    usersData, 
    getUserById,
    editData, 
    deleteData
  };