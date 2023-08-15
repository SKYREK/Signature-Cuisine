import User from "../models/user.js";

export async function registerUser(req, res) {
    const { email, password, name } = req.body;
    const user = new User(email, password, name);
    try{
        const result = await user.save();
        res.json({
            result
        })
    }catch(err){
        res.json({
            err
        })
    }
}

export async function loginUser(req, res) {
    const { email, password } = req.body;
    const user = new User(email, password);
    try{
        const result = await user.login();
        res.json({
            result
        })
    }catch(err){
        res.json({
            err
        })
    }
}
export async function getCurrentUser(req, res) {
    if(req.user){
        res.json({
            result: req.user.user
        })
    }else{
        res.json({
            err: "Not logged in"
        })
    }
}