import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class authController{
    public async auth(req: Request, res: Response){
        const { email, password } = req.body;

        //validações

        if(!email){
            return res.status(402).json({
                message: 'Email is required'
            });
        }

        if(!password){
            return res.status(402).json({
                message: 'Password is required'
            });
        }

        //check if user exists

        const user = await User.findOne({ email: email});

        if(!user){
            return res.status(404).json({
                message: 'User not found'
            });
        }

        //check if password match

        const checkPassword = await bcrypt.compare(password, user.password);

        if(!checkPassword){
            return res.status(422).json({
                message:'Invalid password'
            });
        }

        try{
            const secret = process.env.SECRET;

            const token = jwt.sign(
                {
                    id: user._id
                },
            secret as string
            );

            return res.status(200).json({
                message: 'Logged in user', token
            });
        }catch(error){
            return res.status(500).json({message: 'Server error please try later'});
        }
    }
}


export default new authController();
