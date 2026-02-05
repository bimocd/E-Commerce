import express from "express";
import pool from "../config/db.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const router = express.Router()

const cookieOptions = {
    httpOnly:true,
    secure:false, // to be changed later since it should be true in order to send cookies in https(secure)
    sameSite:'Lax',
    maxAge: 30*24*60*60*1000
}


// create jwt token

const generateToken = (id) => { 
    return jwt.sign({id}, '123123',{  // the sign should accept the payload and the secret key
        expiresIn: '30d'
    })
}

// 

router.post('/signup', async (req, res) => {
    const {email ,password ,name} = req.body
    if(!email ||!password ||!name ){
        return res.status(400).json({message:'please enter all the required fields'})
    }

    const user = await pool.query('select * from users where email=$1',[email])
    if(user.rows.length > 0){
        return res.status(400).json({message:'the user already exists'})
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await pool.query('insert into users (name,email,password) VALUES ($1,$2,$3) returning *',[name,email, hashedPassword])

    const token = generateToken(newUser.rows.id)
    res.cookie('token', token,cookieOptions)
    return res.status(201).json(newUser.rows[0])
})

router.post("/login", async (req, res) => {
    const {email, password} = req.body
    if(!email || !password){
        return res.status(400).json({message:'enter all the required fields'})
    }

    const user = await pool.query('select * from users where email=$1',[email])
    if(user.rows.length === 0){
        return res.status(400).json({message:'you need to sign up'})
    }

    const userData = user.rows[0]
    const isMatched = await bcrypt.compare(password, userData.password)
    if(!isMatched){
        return res.status(400).json({message:'the passord is incorrect try again'})
    }
    const token = generateToken(userData.id)
    res.cookie('token', token , cookieOptions)
    return res.status(201).json({id:userData.id, name: userData.name, password: userData.password })
    
})

export default router