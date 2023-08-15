import connection from "../db/db.js"

function Message(email, type, content, time){
    this.email = email
    this.type = type
    this.content = content
    this.time = time

    this.save = async function(){
        return new Promise(
            (resolve,reject)=>{
                connection.query(
                    'INSERT INTO `message` (email,type,content,time) VALUES (?,?,?,?)',
                    [this.email,this.type,this.content,this.time],
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
}
export async function getAllMessagesByEmail(email){
    return new Promise(
        (resolve,reject)=>{
            connection.query(
                'SELECT * FROM `message` WHERE email = ?',
                [email],
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
export function getAllMessagedUsers(){
    return new Promise(
        (resolve,reject)=>{
            connection.query(
                'SELECT DISTINCT email FROM `message`',
                (err,result)=>{
                    console.log(result)
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
export default Message;