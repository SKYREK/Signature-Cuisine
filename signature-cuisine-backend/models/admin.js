import { hashPassword } from "./user.js";
import connection from "../db/db.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export default function Admin(username, password){
    this.username = username;
    this.password = hashPassword(password);
    this.validated = false;

    this.login = async function(){
        return new Promise(
            (resolve, reject) => {
                connection.query(
                    'SELECT * FROM admin WHERE email = ? AND password_hash = ?',
                    [this.username, this.password],
                    (err, result) => {
                        if(err){
                            reject(err);
                        }else{
                            if(result.length > 0){
                                this.validated = true;
                                const token = jwt.sign({adminEmail: this.email}, process.env.JWT_SECRET);
                                result[0].token = token;
                                resolve(result);
                            }else{
                                reject('Invalid username or password');
                            }
                        }
                    }
                )
            }
        )
    }
}