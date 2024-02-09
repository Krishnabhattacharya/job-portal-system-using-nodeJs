import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { token } from 'morgan';
const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        required: true,
        type: String,
        unique: true,
        validator: validator.isEmail
    },
    password: {
        type: String,
        required: true,
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],


}, { timestamps: true });
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})


userSchema.methods.createjwt = async function () {
    const user = this;
    const token = jwt.sign({ id: this._id }, process.env.jwt_SECRET);
    user.tokens = user.tokens.concat({ token });
    await user.save();
    console.log(user);
    return token;
}
userSchema.methods.comparePass = async function (enteredPassword) {
    const isMatch = await bcrypt.compare(enteredPassword, this.password);
    return isMatch;
};

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}
const User = mongoose.model("User", userSchema);
export default User;