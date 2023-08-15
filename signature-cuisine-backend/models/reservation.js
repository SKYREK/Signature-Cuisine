import connection from "../db/db.js"

function Reservation(id, email ,  description , time , outlet_id){
   
    this.id = id
    this.email  =  email
    this.description = description
    this.time = time
    this.outlet_id  = outlet_id
    this.save = async function(){
        return new Promise(
            (resolve,reject)=>{
                connection.query(
                    'INSERT INTO `reservation` (email,description,time,outlet_id) VALUES (?,?,?,?)',
                    [this.email,this.description,this.time,this.outlet_id],
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
export default Reservation
export async function getAllReservationBYOutlet(id){
    return new Promise(
        (resolve,reject)=>{
            connection.query(
                'SELECT * FROM `reservation` WHERE `outlet_id` = ?',
                [id],
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