var config = require('../config/dbconfig');
const sql = require('mssql');

async function getListCategory(req){
    try{
        let pool = await sql.connect(config);
        let flat = await pool.request().query(`SELECT * from PRODUCT_CATEGORY`);
        return flat.recordset
    }
    catch (error) {
        return error
    }
}
async function getCategory(req){
    try{
        let pool = await sql.connect(config);
        let flat = await pool.request().query(`SELECT * from PRODUCT_CATEGORY WHERE '${req.body.id}'= ID`);
        return flat.recordset
    }
    catch (error) {
        return error
    }
}
async function updateCategory(req) {
    try {
        let pool = await sql.connect(config);
        let flat = await pool.request()
        .input('ID', sql.Int, req.ID)
        .input('NAME', sql.Char(50), req.NAME)
        .input('DESCRIPT', sql.NText, req.DESCRIPT)
        .input('CREATED_AT', sql.Date, req.CREATED_AT)
        .input('MODIFIED_AT', sql.Date, req.MODIFIED_AT)

        .query(`UPDATE ORDER_DETAILS SET NAME= @NAME, DESCRIPT = @DESCRIPT, CREATED_AT = @CREATED_AT, MODIFIED_AT = @MODIFIED_AT
                WHERE ID = @ID`);

        return 'success'
    }
    catch (error) {
        return error
    }
}
async function deleteCategory(req) {
    try {
        let pool = await sql.connect(config);
        let flat = await pool.request()
        .input('ID', sql.Int, req.ID)
        .query(`DELETE FROM ORDER_DETAILS
                WHERE ID = @ID;`);
        
        return 'success'
    }
    catch (error) {
        return error
    }
}
module.exports = {
    getListCategory: getListCategory,
    updateCategory: updateCategory,
    getCategory: getCategory,
    deleteCategory: deleteCategory
}