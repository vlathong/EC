var config = require('../config/dbconfig');
const sql = require('mssql');

async function getProducts() {
    try {
        let pool = await sql.connect(config);
        let order = await pool.request().query(`SELECT * from PRODUCT P`);
        return order.recordset
    }
    catch (error) {
        return error
    }
}
async function getBrands() {
    try {
        let pool = await sql.connect(config);
        let order = await pool.request().query(`SELECT DISTINCT BRAND from PRODUCT`);
        return order.recordset
    }
    catch (error) {
        return error
    }
}
async function getProduct(req) {
    try {
        let pool = await sql.connect(config);
        let order = await pool.request()
        .input('ID',sql.Char(5), req)
        .query(`SELECT P.ID AS PID, PNAME, BRAND, PRICE, SIZE, COLOR, GENDER, NAME, IMAGE  
        from PRODUCT P, PRODUCT_DETAILS PCD, PRODUCT_CATEGORY PC 
        WHERE P.ID = PCD.PID AND PCD.ID = @ID AND PC.ID = P.CATE_ID`);
        console.log(order.recordset)
        return order.recordset
    }
    catch (error) {
        return error
    }
}
async function searchProduct(req) {
    try {
        let pool = await sql.connect(config);
        let order = await pool.request()
        .input('INPUT',sql.Char(5), req)
        .query(`SELECT * from PRODUCT P, PRODUCT_DETAILS PCD WHERE P.ID = PCD.PID AND P.NAME LIKE '%${req}%'`);
        return order.recordset
    }
    catch (error) {
        return error
    }
}
async function createProduct(req) {
    try {
        let pool = await sql.connect(config);
        let order = await pool.request()
        .input('ID', sql.Char(5), req.ID)
        .input('PNAME', sql.Char(40), req.PNAME)
        .input('DESCRIPT', sql.NText, req.DESCRIPT)
        .input('GENDER', sql.Char(6), req.GENDER)
        .input('CATE_ID', sql.Char(5), req.CATE_ID)
        .input('PRICE', sql.Money, req.PRICE)
        .input('BRAND', sql.Char(20), req.BRAND)
        .input('DISCOUNT_ID', sql.Char(5), req.DISCOUNT_ID)
        .input('IMAGE', sql.VarBinary(MAX), req.IMAGE)
        .input('CREATED_AT', sql.Date, req.CREATED_AT)
        .input('MODIFIED_AT', sql.Date, req.MODIFIED_AT)
        .query(`INSERT INTO PRODUCT VALUES(@ID,@PNAME,@DESCRIPT
              ,@CATE_ID,@PRICE,@GENDER, @BRAND, @DISCOUNT_ID,@IMAGE,@CREATED_AT,@MODIFIED_AT);`);
        return "Successful"
    }
    catch (error) {
        return error
    }
}
async function updateProduct(req) {
    try {
        console.log(typeof(req.IMAGE))
        let pool = await sql.connect(config);
        let order = await pool.request()
        .input('id', sql.Char(5), req.ID)
        .input('PName', sql.NChar(40), req.PNAME)
        .input('Size', sql.Int, req.SIZE)
        .input('Gender', sql.Char(6), req.GENDER)
        .input('Category', sql.Char(40), req.CATEGORY)
        .input('Price', sql.Money, req.PRICE)
        .input('Brand', sql.Char(20), req.BRAND)
        .input('Color', sql.NChar(10), req.COLOR)
        // .input('Image', sql.VarBinary(sql.MAX), req.IMAGE)
        .execute(`updateProduct`);
        console.log(2)
        return "Successful"
    }
    catch (error) {
        console.log(error)
        return error
    }
}
async function deleteProduct(req) {
    try {
        let pool = await sql.connect(config);
        let order = await pool.request()
        .input('ID', sql.Char(5), req)
        .query(`DELETE FROM PRODUCT
                WHERE ID = @ID;`);
        return "Successful"
    }
    catch (error) {
        return error
    }
}
async function searchProduct(req) {
    try {
        let pool = await sql.connect(config);
        let order = await pool.request()
        .input('INPUT',sql.Char(40), req)
        .query(`SELECT * from PRODUCT P, PRODUCT_DETAILS PCD WHERE P.ID = PCD.PID AND P.PNAME LIKE '%${req}%'`);
        return order.recordset
    }
    catch (error) {
        return error
    }
}
async function getProductCus(req) {
    try {
        console.log(req)
        let pool = await sql.connect(config);
        let order = await pool.request()
        .input('ID',sql.Char(5), req)
        .query(`SELECT P.ID AS PID, PCD.ID AS ID, PNAME, PRICE, SIZE, COLOR, IMAGE  
        from PRODUCT P, PRODUCT_DETAILS PCD
        WHERE P.ID = PCD.PID AND PCD.PID = @ID `);
        return order.recordset
    }
    catch (error) {
        return error
    }
}
module.exports = {
    getProducts: getProducts,
    getBrands: getBrands,
    getProduct: getProduct,
    createProduct: createProduct,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct,
    searchProduct: searchProduct,
    getProductCus:getProductCus
}