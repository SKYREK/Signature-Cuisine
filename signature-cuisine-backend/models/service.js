import connection from "../db/db.js";

function Service(id, name,description, price, imageLink){
    this.id = id;
    this.name = name;
    this.price = price;
    this.imageLink = imageLink;
    this.description = description;

    this.save = async function(){
        return new Promise(
            (resolve, reject) => {
                connection.query(
                    'INSERT INTO service (name,description, price, image_link) VALUES (?, ?, ?, ?)',
                    [this.name,this.description, this.price, this.imageLink],
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
    this.delete = async function(){
        return new Promise(
            (resolve, reject) => {
                connection.query(
                    'DELETE FROM service WHERE id = ?',
                    [this.id],
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
                    'UPDATE service SET name = ?, description = ?, price = ?, image_link = ? WHERE id = ?',
                    [this.name,this.description, this.price, this.imageLink, this.id],
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

export async function getAllServiceFromDB(){
    return new Promise(
        (resolve, reject) => {
            connection.query(
                'SELECT * FROM service',
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


export default Service;

