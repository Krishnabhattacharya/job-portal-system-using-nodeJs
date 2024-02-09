import jwt from 'jsonwebtoken';
import User from '../model/userSchema.js';
const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");  ///follow the udemy course middleware
        const decoded = jwt.verify(token, process.env.jwt_SECRET);
        // console.log(decoded.id);
        const user = await User.findOne({ _id: decoded.id, "tokens.token": token });
        // console.log(user);
        // console.log(token);
        if (!user) {
            next("User not found");
        }
        req.token = token;
        req.user = user;
        //console.log(token);
        next();
    } catch (error) {
        next("Auth failed");
    }
}
export default authMiddleware;