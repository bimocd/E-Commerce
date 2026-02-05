import { Pool } from "pg";

const pool = new Pool({
    host:"localhost",
    user:"postgres",
    port:5432,
    password:"123123",
    database:"e-commerce"
})


pool.on("connect", () => { 
    console.log('connected to db')
 })

pool.on('error', (error) => { 
    console.error('DB error:', error )
 } )



export default pool