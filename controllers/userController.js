import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

const userDTO = (user) => {
    return {
        id: user._id,
        username: user.username,
        email: user.email
    }
}

export const registerUser = async (req, res) => {
    try {
        const submitUser = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }
        if (await User.findOne({ email: submitUser.email })) {
            return res.status(400).json({ message: "Email đã tồn tại!!" })
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const createdUser = await User.create({ ...submitUser, password: hashedPassword });

        res.status(200).json(userDTO(createdUser));
    } catch (error) {
        res.status(400).json({
            message: "Tạo tài khoản không thành công!!"
        })
    }
}

export const loginUser = async (req, res) => {
    try {
        const submitUser = {
            username: req.body.username,
            password: req.body.password
        }

        const user = await User.findOne({ username: submitUser.username })
        if (user === null) {
            return res.status(401).json({ message: "Tài khoản không đúng!!" });
        }

        const isMatch = await bcrypt.compare(submitUser.password, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: "Mật khẩu không đúng!!" });
        }

        const token = jwt.sign({ userID: user._id, username: user.username, role: user.role }, 'Skbidi', { expiresIn: '1d' })

        return res.status(200).json({
            message: "login success!skibidi",
            token: token
        })
    } catch (error) {
        res.status(400).json({ message: "Đã xảy ra lỗi ở loginController!" })
    }
}