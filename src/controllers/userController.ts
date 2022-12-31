import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User';

class UserController {
    public async index(req: Request, res: Response){
        const users = await User.find({}, '-password');
        res.json(users);
    }
    public async store(req: Request, res: Response){
        const { name, email, phone, password, confirmedPassword } = req.body;

        //validações
        if(!name){
            return res.status(402).json({
                message: 'Name is required'
            });
        }

        if(!email){
            return res.status(402).json({
                message: 'Email is required'
            });
        }
        if(!phone){
            return res.status(403).json({
                message: 'Phone is required'
            });
        }
        if(!password){
            return res.status(402).json({
                message: 'Password is required'
            });
        }

        if(!confirmedPassword){
            return res.status(402).json({
                message: 'Confirmation password is required'
            });
        }

        if(password !== confirmedPassword){
            return res.status(402).json({
                messsage: 'Passwords must be the same'
            });
        }

        const userExists = await User.findOne({ email: email});

        if(userExists){
            return res.status(422).json({
                message: 'Please use another email'
            });
        }

        //Create password

        const salt = await bcrypt.genSalt(12);
        const passwrodHash = await bcrypt.hash(password, salt);

        //Create user
        const user = new User({
            name,
            email,
            phone,
            password: passwrodHash
        });

        try {

            await user.save();

            return res.status(201).json({
                message: 'User created successfully'
            });

        }catch(error){
            return res.status(500).json({message: 'Server error please try later'});
        }

    }
    public async update(req: Request, res: Response){
        const _id  = req.params.id;
        const { name, email, password, confirmedPassword } = req.body;

        if(password !== confirmedPassword){
            return res.status(402).json({
                messsage: 'Passwords must be the same'
            });
        }

        const salt = await bcrypt.genSalt(12);
        const passwrodHash = await bcrypt.hash(password, salt);

        const data = {
            name,
            email,
            password: passwrodHash,
        };

        try {

            await User.findByIdAndUpdate({_id}, data);

            return res.status(201).json({
                message: 'User successfully edited'
            });

        }catch(error){
            return res.status(500).json({message: 'Server error please try later'});
        }

    }
    public async delete(req: Request, res: Response){
        const _id  = req.params.id;

        try {

            await User.findByIdAndDelete({_id});

            return res.status(201).json({
                message: 'User deleted successfully'
            });

        }catch(error){
            return res.status(500).json({message: 'Server error please try later'});
        }
    }
}

export default new UserController();
