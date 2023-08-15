import connection from "../db/db.js";

function CartItem(email,food_id,quantity) {
    this.email = email;
    this.quantity = quantity;
    this.food_id = food_id;

    this.save = async function () {
        return new Promise((resolve, reject) => {
            connection.beginTransaction((err) => {
                if (err) {
                    reject(err);
                    return;
                }
    
                connection.query(
                    `INSERT INTO cart (email, food_id, qty) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE qty = qty + VALUES(qty);`,
                    [this.email, this.food_id, this.quantity],
                    (err, result) => {
                        if (err) {
                            connection.rollback(() => {
                                reject(err);
                            });
                        } else {
                            // Continue with the DELETE operation
                            connection.query(
                                `DELETE FROM cart WHERE qty < 1;`,
                                (err, deleteResult) => {
                                    if (err) {
                                        connection.rollback(() => {
                                            reject(err);
                                        });
                                    } else {
                                        connection.commit((err) => {
                                            if (err) {
                                                connection.rollback(() => {
                                                    reject(err);
                                                });
                                            } else {
                                                this.validated = true;
                                                resolve(result);
                                            }
                                        });
                                    }
                                }
                            );
                        }
                    }
                );
            });
        });
    };
    
}
export function getUserCart(email){
    return new Promise(
        (resolve, reject) => {
            connection.query(
                'SELECT * FROM cart INNER JOIN food ON cart.food_id = food.id WHERE email = ? ',
                [email],
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
export default CartItem