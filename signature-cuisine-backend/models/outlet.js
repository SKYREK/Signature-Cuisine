import connection from "../db/db.js";

function Outlet(id,name,location,phone,openHrs,facebook,instagram,gallery){
    this.id =id;
    this.name = name;
    this.location = location;
    this.phone = phone
    this.openHrs = openHrs
    this.facebook = facebook
    this.instagram = instagram
    this.gallery = gallery

    this.save = async function(){
        return new Promise(
            (resolve, reject) => {
                connection.query(
                    'INSERT INTO outlet (name, location, phone, open_time, facebook, instagram) VALUES (?, ?, ?, ?, ?, ?)',
                    [this.name, this.location, this.phone, this.openHrs, this.facebook, this.instagram],
                    (err, result) => {
                        if(err){
                            reject(err);
                        }else{
                            
                            //get latest id from outlet table
                            connection.query(
                                'SELECT id FROM outlet ORDER BY id DESC LIMIT 1',
                                (err, result) => {
                                    if(err){
                                        reject(err);
                                    }else{
                                        this.id = result[0].id;
                                        //loop through gallery array and insert into gallery table
                                        for(let i = 0; i < this.gallery.length; i++){
                                            connection.query(
                                                'INSERT INTO gallery (outlet_id, image_link) VALUES (?, ?)',
                                                [this.id, this.gallery[i]],
                                                (err, result) => {
                                                    if(err){
                                                        reject(err);
                                                    }else{
                                                        this.validated = true;                                                        
                                                    }
                                                }
                                            )
                                        }
                                        resolve(result);
                                    }
                                }
                            )                            
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
                    'DELETE FROM outlet WHERE id = ?',
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
            (resolve,reject)=>{
                connection.query(
                    'UPDATE outlet SET name = ?, location = ? , phone = ? , open_time = ? , facebook = ? , instagram = ? WHERE id = ?',
                    [this.name, this.location , this.phone , this.openHrs , this.facebook , this.instagram , this.id ],
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
export function getAllOutletsFromDB(){
    return new Promise(
        (resolve, reject) => {
            connection.query(
                'SELECT * FROM outlet',
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
export function getGalleryFromDB(outletId){
    return new Promise(
        (resolve, reject) => {
            connection.query(
                'SELECT image_link FROM gallery WHERE outlet_id = ?',
                [outletId],
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
export async function insertPhotoIntoGallery(outletId, imageLink){
    return new Promise(
        (resolve, reject) => {
            connection.query(
                'INSERT INTO gallery (outlet_id, image_link) VALUES (?, ?)',
                [outletId, imageLink],
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
export async function deletePhotoFromGallery(outletId, imageLink){
    return new Promise(
        (resolve, reject) => {
            connection.query(
                'DELETE FROM gallery WHERE outlet_id = ? AND image_link = ?',

                [outletId, imageLink],
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



export default Outlet;