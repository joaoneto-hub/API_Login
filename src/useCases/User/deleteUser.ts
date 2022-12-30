import { Request, Response } from 'express';
import User from '../../models/User';

export async function deleteUser(req: Request, res: Response){
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
