import connection from '../db/db.js';

function Food(id, name, price , imageLink){
    this.id = id;
    this.name = name;
    this.price = price;
    this.imageLink = imageLink;

    this.save = async function(){
        return new Promise(
            (resolve, reject) => {
                connection.query(
                    'INSERT INTO food (name, price, image_link) VALUES (?, ?, ?)',
                    [this.name, this.price, this.imageLink],
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
    this.update = async function(){
        return new Promise(
            (resolve, reject) => {
                connection.query(
                    'UPDATE food SET name = ?, price = ?, image_link = ? WHERE id = ?',
                    [this.name, this.price, this.imageLink, this.id],
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
    
}
export async function getAllFoodFromDB(){
    return new Promise(
        (resolve, reject) => {
            connection.query(
                'SELECT * FROM food',
                (err, result) => {
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                }
            )
        }
    )
}
export async function deleteFoodFromDB(id){
    return new Promise(
        (resolve, reject) => {            
            connection.query(
                'DELETE FROM food WHERE id = ?',
                [parseInt(id)],
                (err, result) => {
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                }
            )
        }
    )
}
export default Food;