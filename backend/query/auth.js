var config = require('../config/dbconfig');
var moment = require('moment');
const sql = require('mssql');
const bcrypt = require('bcrypt');
const saltRounds = 10; 
async function login(req) {
    try {
        let pool = await sql.connect(config);
        let user = await pool.request().query(`SELECT * from USER_INFO where username='${req.body.username}'`);
        const check = await bcrypt.compare(req.body.password, user.recordset[0].PASS.trim())
        if(check)
        {
            return ['success',user.recordset[0].ID]
        }
        else return 'fail'
    }
    catch (error) {
        return error
    }
}
async function register(req) {
    let pool = await sql.connect(config);
    let user = await pool.request().query('SELECT COUNT(ID) AS ID FROM USER_INFO');
    let checkuser = await pool.request().query(`SELECT ID from USER_INFO where username='${req.body.username}' or tel='${req.body.tel}'`);
        if(checkuser.recordset.length==1)
        {
            return 'fail'
        }
    try {
        
        const date = new Date();
        const formattedDate = moment(date).format('YYYY-MM-DD');

        //const salt = await bcrypt.genSalt(saltRounds)
        let hash = await bcrypt.hash(req.body.pass, saltRounds);
        console.log(hash.length)
        let order = await pool.request()
        .input('ID', sql.Char(5), String(parseInt(user.recordset[0].ID)+1))
        .input('USERNAME', sql.Char(50), req.body.username)
        .input('PASS', sql.Char(72), hash)
        .input('FIRST_NAME', sql.NChar(10), req.body.fName)
        .input('LAST_NAME', sql.NChar(20), req.body.lName)
        .input('TEL', sql.Char(15), req.body.tel)
        .input('CREATED_AT', sql.Date, formattedDate)
        .input('MODIFIED_AT', sql.Date, formattedDate)
        .query(`INSERT INTO USER_INFO (ID,USERNAME,PASS,FIRST_NAME,LAST_NAME,TEL,CREATED_AT,MODIFIED_AT) VALUES(@ID,@USERNAME,@PASS,@FIRST_NAME,@LAST_NAME,@TEL,@CREATED_AT,@MODIFIED_AT);`);
        console.log(req.body)

        await pool.request()
        .input('ADDR_LINE1',sql.NChar(100),'default')
        .input('CITY',sql.NChar(20),'TP.HCM')
        .query(`INSERT INTO USER_ADD (ID,USER_ID,ADDR_LINE1,CITY) VALUES(${String(parseInt(user.recordset[0].ID)+1)},${String(parseInt(user.recordset[0].ID)+1)},@ADDR_LINE1,@CITY);`)
        return "Successful"
    }   
    catch (error) {
        
        return error
    }
}
module.exports = {
    login: login,
    register: register
}