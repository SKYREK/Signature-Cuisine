import Outlet, { deletePhotoFromGallery, getAllOutletsFromDB, getGalleryFromDB, insertPhotoIntoGallery } from "../models/outlet.js";

export async function addOutlet(req , res){
    if(req.admin){
        const { name, location, phone , openHrs , facebook , instagram , imgLink } = req.body;
        try{
            const outlet = new Outlet(0,name, location, phone , openHrs , facebook , instagram , [imgLink]);
            const result = await outlet.save();
            res.json({
                result
            })
        }catch(err){
            res.json({
                err
            })
        }
    }
   
}
export async function getAllOutlets(req, res){
    try{
        const result = await getAllOutletsFromDB();
        res.json({
            result
        })
    }catch(err){
        res.json({
            err
        })
    }
}
export async function getImagesFromOutletId(req, res){
    try{
        const { id } = req.params;
        const result = await getGalleryFromDB(id);
        res.json({
            result
        })
    }catch(err){
        res.json({
            err
        })
    }
}
export async function deleteOutlet(req, res){
    if(req.admin){        
        const { id } = req.params;
        
        try{
            const result = await new Outlet(id).delete();
            res.json({
                result
            })
        }catch(err){
            res.json({
                err
            })
        }
    }else{
        res.json({
            err: "Unauthorized"
        })
    }
}
export async function updateOutlet(req, res){
    if(req.admin){
        const { id, name, location, phone , openHrs , facebook , instagram } = req.body;
        try{
            const outlet = new Outlet(id,name, location, phone , openHrs , facebook , instagram );
            const result = await outlet.update();
            res.json({
                result
            })
        }catch(err){
            res.json({
                err
            })
        }
    }
}
export async function addImageToOutlet(req, res){
    
        const { id, imgLink } = req.body;
        try{
            const outlet = new Outlet(id);
            const result = await insertPhotoIntoGallery(id, imgLink);
            console.log(result)
            res.json({
                result
            })
        }catch(err){
            
            res.json({
                err
            })
        }
    
}
export async function deleteImageFromOutlet(req, res){
    
        const { id, imgLink } = req.body;
        try{
            const outlet = new Outlet(id);
            const result = await deletePhotoFromGallery(id, imgLink);
            res.json({
                result
            })
        }catch(err){
            
            res.json({
                err
            })
        }
    
}
