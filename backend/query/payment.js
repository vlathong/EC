var config = require('../config/dbconfig');
const sql = require('mssql');
async function getAddress(req) {
    try {
        let pool = await sql.connect(config);
        let order = await pool.request().query(`select ID,ADDR_LINE1,City from USER_ADD where USER_ID=${req}`);
        console.log(order.recordset)
        return order.recordset
    }
    catch (error) {
        return error
    }
}
async function insertAddress(req) {
    try {
        let pool = await sql.connect(config);
        let order = await pool.request()
        .input('USER_ID', sql.Char(5), req.body.USER_ID)
        .input('ADDR_LINE1', sql.NChar(100), req.body.ADDR_LINE1)
        .input('CITY', sql.NChar(20), req.CITY)
        .query(`insert USER_ADD(ID,USER_ID,ADDR_LINE1,CITY) values ((select top 1 ID from USER_ADD order by ID desc)+1,@USER_ID,@ADDR_LINE1,@CITY)`);
        return "success"
    }
    catch (error) {
        return error
    }
}

async function getPointLimit(req) {
    try {
        let pool = await sql.connect(config);
        let order = await pool.request().query(`select point from USER_INFO where ID=1`);
        return order.recordset
    }
    catch (error) {
        return error
    }
}

module.exports = {
    getAddress:getAddress,
    getPointLimit:getPointLimit,
    insertAddress:insertAddress
}