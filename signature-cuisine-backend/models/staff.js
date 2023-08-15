import connection from "../db/db.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

function Staff(username,fullName,age,outlet,nic){
    this.username = username;
    this.fullName = fullName;
    this.age = age;
    this.outlet = outlet;
    this.nic = nic;

    this.save = async function(){
        return new Promise(
            (resolve,reject)=>{
            connection.query(
                'INSERT INTO staff (username,name,age,outlet_id,nic) VALUES (?,?,?,?,?)',
                [this.username,this.fullName,this.age,this.outlet,this.nic],
                (err,result)=>{
                    if(err){                      
                        reject(err)
                    }else{         

                        resolve(result)
                    }
                }
            )
        }
        );
    }
    this.delete = async function(){
        return new Promise(
            (resolve,reject)=>{
                connection.query(
                    'DELETE FROM staff WHERE username = ?',
                    [this.username],
                    (err,result)=>{
                        if(err){
                            reject(err)
                        }else{
                            resolve(result)
                        }
                    }
                )
            }
        )
    }
    this.update = async function(){
        return new Promise(
            (resolve,reject)=>{
                connection.query(
                    'UPDATE staff SET name = ?, age = ?, outlet_id = ?, nic = ? WHERE username = ?',
                    [this.fullName,this.age,this.outlet,this.nic,this.username],
                    (err,result)=>{
                        if(err){
                            reject(err)
                        }else{
                            resolve(result)
                        }
                    }
                )
            }
        )
    }
    this.login = async function(){
        return new Promise(
            (resolve,reject)=>{
                connection.query(
                    'SELECT * FROM staff WHERE username = ? AND nic = ?',
                    [this.username,this.nic],
                    (err,result)=>{
                        if(err){
                            reject(err)
                        }else{
                            if(result.length > 0){
                                this.validated = true;
                                const token = jwt.sign({userEmail: this.email,user : result[0]}, process.env.JWT_SECRET, {expiresIn: '1h'});
                                result[0].token = token;
                                resolve(result)
                            }else{
                                reject('Invalid username or password')
                            }
                        }
                    }
                )
            }
        )
    }

}
export async function getAllStaffFromDB(){
    return new Promise(
        (resolve,reject)=>{
            connection.query(
                `SELECT staff.*, outlet.name as outlet_name
                FROM staff
                INNER JOIN outlet ON staff.outlet_id = outlet.id;
                `,
                (err,result)=>{
                    if(err){
                        reject(err)
                    }else{
                        resolve(result)
                    }
                }
            )
        }
    )
} 

export default Staff;