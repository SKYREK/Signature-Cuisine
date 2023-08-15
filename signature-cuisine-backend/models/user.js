import connection from "../db/db.js";
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export default function User(email,password, name){
    this.email = email;
    this.passwordHash = hashPassword(password);
    this.name = name;
    this.validated = false;

    this.save = async function(){
        return new Promise(
            (resolve, reject) => {
                connection.query(
                    'INSERT INTO user (email, password_hash, name) VALUES (?, ?, ?)',
                    [this.email, this.passwordHash, this.name],
                    (err, result) => {
                        if(err){
                            reject(err);
                        }else{
                            this.validated = true;
                            resolve(result);
                        }
                    }
                )
            }
        )
        
    }
    this.login = async function(){
        return new Promise(
            (resolve, reject) => {
                connection.query(
                    'SELECT * FROM user WHERE email = ? AND password_hash = ?',
                    [this.email, this.passwordHash],
                    (err, result) => {
                        if(err){
                            reject(err);
                        }else{
                            if(result.length > 0){
                                this.validated = true;
                                const token = jwt.sign({userEmail: this.email,user : result[0]}, process.env.JWT_SECRET, {expiresIn: '1h'});
                                result[0].token = token;
                                resolve(result);
                            }else{
                                reject('Invalid email or password');
                            }
                        }
                    }
                )
            }
        )
    }
    this.loadFromEmail = async function(){
        return new Promise(
            (resolve, reject) => {
                connection.query(
                    'SELECT * FROM user WHERE email = ?',
                    [this.email],
                    (err, result) => {
                        if(err){
                            reject(err);
                        }else{
                            if(result.length > 0){
                                this.validated = true;
                                resolve(result);
                            }else{
                                reject('Invalid email or password');
                            }
                        }
                    }
                )
            }
        )
    }

}

export function hashPassword(password) {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
  }