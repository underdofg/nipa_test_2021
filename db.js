const { Pool } = require('pg')

const db = new Pool({
    user: "postgres",
    host: "nipaticket.cuuld1mdxq97.us-east-2.rds.amazonaws.com",
    database: "postgres",
    password: "12345678",
    port: 5432,
})

exports.db = db;