

 const PORT = process.env.PORT || 5000 //DE LA APP
 const DB_HOST = process.env.DB_HOST || 'containers-us-west-114.railway.app'
 const DB_USER = process.env.DB_USER || 'root'
 const DB_PASSWORD = process.env.DB_PASSWORD || 'vOvnY80otKnReO1V1Ofl'
 const DB_NAME = process.env.DB_NAME || 'railway'
 const DB_PORT = process.env.DB_HOST || '6760'

 module.exports={
    DB_HOST,
    DB_NAME,
    DB_PORT,
    DB_PASSWORD,
    DB_USER
 }
