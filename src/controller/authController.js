
import User from '../model/userSchema.js';
const registerController = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (!name) {
            next("name is require");
        }
        if (!email) {
            next("email is require");
        }
        if (!password) {
            next("password is require");
        }
        const existinguser = await User.findOne({ email });
        if (existinguser) {
            next("Email is already taken");
        }
        const user = await User.create({ name, email, password });
        const token = await user.createjwt();
        console.log("token is" + token);
        res.status(201).send({
            success: true,
            message: "Login successfull",
            user,
            token
        })

    } catch (error) {
        console.log(error);
        next(error);
    }
}
const loginController = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        next("provide all fields");
    }
    const user = await User.findOne({ email });
    if (!user) {
        next("Invalid user");
    }
    const isPassMatch = user.comparePass(password);
    if (!isPassMatch) {
        next("invalid userName or password");
    }
    const token = await user.createjwt();
    res.status(200).send({
        success: true,
        message: "Login successfull",
        user,
        token
    })
}

export { registerController, loginController };