import Admin from "../models/admin.js";

export async function  loginAdmin(req, res) {
    const { email, password } = req.body;
    const admin = new Admin(email, password);
    try{
        const result = await admin.login();
        res.json({
            result
        })
    }catch(err){
        res.json({
            err
        })
    }
}

