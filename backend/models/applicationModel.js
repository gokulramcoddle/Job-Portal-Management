const db = require('../config/db');

const usersApplication = async() => {
   const [usersApplication] = await db.query(
        `SELECT a.ID, a.userID, j.jobtitle AS jobTitle, a.status, a.date 
         FROM jobpost_application a 
         JOIN jobpost j ON a.jobpostID = j.ID 
         ORDER BY a.date DESC`
        );

     return usersApplication;
}

const applicationById = async(userID) => {
    const [exist] = await db.query(
        `SELECT a.ID, a.userID, j.jobtitle AS jobTitle, a.status, a.date 
         FROM jobpost_application a 
         JOIN jobpost j ON a.jobpostID = j.ID
         WHERE a.userID = ?
         ORDER BY a.date DESC`, [userID]);

      return exist;
}

const addApplication = async(userID, jobpostID) => {
       const [result] = await db.query(
       `INSERT INTO jobpost_application(userID, jobpostID, status, date)
        VALUES(?, ?, 'Applied', now())`,[userID, jobpostID]);

        return result;
}

const updateApplication = async(status, ID) => {
    const [update] = await db.query('UPDATE jobpost_application SET status = ? WHERE ID = ?', [status, ID]);
    return update;
}

const applicationExist = async(ID) => {
    const [existApplication] = await db.query('SELECT * FROM jobpost_application WHERE ID = ?', [ID]);
    return existApplication;
}

const userApplication = async(userID, jobpostID) => {
    const [existUserApplication] = await db.query('SELECT * FROM jobpost_application WHERE userID = ? AND jobpostID = ?',
          [userID, jobpostID]);
    return existUserApplication;
}

const deleteApplication = async(ID) => {
    const [removeApplication] = await db.query('DELETE FROM jobpost_application WHERE ID = ?', [ID]);
    return removeApplication;
}


module.exports = {
    applicationById,
    usersApplication,
    addApplication,
    updateApplication,
    applicationExist,
    userApplication,
    deleteApplication
 };