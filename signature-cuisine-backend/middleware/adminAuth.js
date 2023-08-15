import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
function authenticateAdminToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
              next();
            }else{
              req.admin = decodedToken;
              next();
            }
        
            // Store the decoded token in the request object for further use
            
          });
    }else{        
        next();
    }
  
    
  }
  export default authenticateAdminToken;