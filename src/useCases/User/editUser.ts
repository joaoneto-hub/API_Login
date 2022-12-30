import { Request, Response } from 'express';
import User from '../../models/User';
import bcrypt from 'bcrypt';
export async function editUser(req: Request, res: Response){

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
