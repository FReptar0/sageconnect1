const sql = require('mssql');
require('dotenv').config({ path: '.env.credentials.database' });

const dbConfig = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    server: process.env.SERVER,
    database: process.env.DATABASE, // por defecto, usa la base de datos FESA
};

async function runQuery(query, database = 'FESA') {
    const pool = await new sql.ConnectionPool({
        ...dbConfig,
        database: database, // si se especifica otra base de datos, se usa esa en vez de la FESA
        options: {
            trustServerCertificate: true
        }
    }).connect();

    const result = await pool.request().query(query);

    console.log(result)

    pool.close();
    return result;
}

/* runQuery().catch((err) => {
    console.log(err)
}) */

module.exports = {
    runQuery
};
