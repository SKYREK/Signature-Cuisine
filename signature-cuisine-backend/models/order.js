import connection from "../db/db.js"

function Order(id,email,address,outlet_id,total , orderItems){
    //get current date and time
    
    this.id = id
    this.email  =  email
    this.address = address
    this.time = new Date()
    this.outlet_id  = outlet_id
    this.total = total

    this.save = async function(){
        
        return new Promise(
            async(resolve,reject)=>{
                connection.query(
                    'INSERT INTO `orders` (email,address,time,outlet_id,total) VALUES (?,?,?,?,?)',
                    [this.email,this.address,this.time,this.outlet_id,this.total],
                    async (err,result)=>{
                        if(err){
                            console.log(err)
                            reject(err)
                        }else{
                            for(let i = 0 ; i < orderItems.length ; i++){
                                const orderItem = new OrderItem(result.insertId,orderItems[i].name,orderItems[i].price,orderItems[i].qty)
                                await orderItem.save()
                                
                            }
                            resolve(result)
                        }
                    }
                )
            }
        )
    }
}
export default Order

function OrderItem(order_id, name , price , qty){
    this.order_id = order_id
    this.name = name
    this.price = price
    this.qty = qty

    this.save = async function(){
        return new Promise(
            (resolve,reject)=>{
                connection.query(
                    'INSERT INTO `order_item` (order_id,name,price,qty) VALUES (?,?,?,?)',
                    [this.order_id,this.name,this.price,this.qty],
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
export async function getOrdersForOutlet(outlet_id){
    
    return new Promise(
        (resolve,reject)=>{
            connection.query(
                'SELECT * FROM `orders` WHERE `outlet_id` = ?',
                [outlet_id],
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
export async function getOrderItemsForOrder(id){
    return new Promise(
        (resolve,reject)=>
        {
            connection.query(
                'SELECT * FROM `order_item` WHERE `order_id` = ?',
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