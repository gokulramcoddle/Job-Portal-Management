const db = require('../config/db');

const usersData = async() => {
    const [users] = await db.query('SELECT firstname, lastname, email FROM users');
    return users;
}

const userExist = async(userID) => {
    const [user] = await db.query('SELECT * FROM users WHERE userID = ?', [userID]);
    return user;
}

const emailExist = async(email) => {
    const [existEmail] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return existEmail;
}

const addUser = async(firstname, lastname, email, password) => {
    const [rows] = await db.query('SELECT MAX(userID) AS maxId FROM users');
    const nextID = (rows[0].maxId || 0) + 1;
    const userAdd = await db.query(
       'INSERT INTO users (userID, firstname, lastname, email, password) VALUES (?, ?, ?, ?, ?)',
       [nextID, firstname, lastname, email, password]
     );

     return userAdd;
}

const updateUser = async(firstname, lastname, email, password, userID) => {
    const [updateData] = await db.query('UPDATE users SET firstname = ?, lastname = ?, email = ?, password = ? WHERE userID = ?',
          [firstname, lastname, email, password, userID]);
          return updateData;   
}

const deleteUser = async(userID) => {
    const [deleteUserData] = await db.query('DELETE FROM users WHERE userID = ?', [userID]);
    return deleteUserData;
}

const userById = async(userID) => {
    const [exist] = await db.query('SELECT firstname, lastname, email FROM users WHERE userID = ?', [userID]);
    return exist;
}


module.exports = {
    usersData,
    userExist,
    emailExist,
    addUser,
    updateUser,
    deleteUser,
    userById
}
