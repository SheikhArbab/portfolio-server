import { Auth } from '../models/Auth.schema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../middlewares/errorHandler.js';  
import { imageUploading } from './../utils/utils.js';


export const test = async (req, res, next) => {
 
    try {
                res.status(200).json({ message: 'aoa' ,success:true});
    } catch (error) {
        next(error);
    }
};

export const signup = async (req, res, next) => {
    const { fullName, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Auth({ fullName, email, password: hashedPassword });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully!' ,success:true});
    } catch (error) {
        next(error);
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
  

    try {
        const validUser = await Auth.findOne({ email });

        if (!validUser) {
            return next(errorHandler(404, 'User not found'));
        }

        const validPassword = await bcrypt.compare(password, validUser.password);

        if (!validPassword) {
            return next(errorHandler(401, 'Wrong credentials!'));
        }
        const expirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day 

        const token = jwt.sign({ id: validUser._id,  exp: expirationDate.getTime() / 1000 ,payload: validUser }, process.env.JWT_SECRET_KEY);

        const { password: _, ...rest } = validUser._doc;

        res.cookie('token', token, { httpOnly: true, expires: expirationDate }).status(200).json({ rest, token });
    } catch (error) {
        next(error);
    }
};

export const signout = (req, res, next) => {
    try { 
        res.clearCookie('token');
         
        res.status(200).json({ message: 'Logout successful',success: true });
    } catch (error) { 
        next(error);
    }
};


export const signinUpdate = async (req, res, next) => {
    let { fullName, email, password ,avatar} = req.body;
    const userId = req.params.id; 
    try {
        // Find the user by ID
        const userToUpdate = await Auth.findById(userId);

        if (!userToUpdate) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user fields
        userToUpdate.fullName = fullName || userToUpdate.fullName;
        userToUpdate.email = email || userToUpdate.email;
        userToUpdate.avatar = avatar || userToUpdate.avatar;
        userToUpdate.email = password || userToUpdate.password;


        // Check if a new avatar is provided
        if (avatar) {
            try {
                const fileName = await imageUploading({ image: avatar, folder: 'auth' }); 
                
                userToUpdate.avatar =  fileName;

            } catch (uploadError) {
                res.json({ message:'Error uploading image:', uploadError,success:false});
            }
        }


        // Check if a new password is provided
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            userToUpdate.password = hashedPassword;
        }

        // Save the updated user
        const updatedUser = await userToUpdate.save();

        res.json({
            updatedUser,
            success: true,
            message: `The user ${updatedUser.fullName} has been successfully updated.`,
        });
    } catch (error) {
        next(error);
    }
};


export const deleteUser = async (req, res, next) => {
    const userId = req.params.id;

    try {
        // Find the user by ID
        const userToDelete = await Auth.findById(userId);

        if (!userToDelete) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Delete the user
        await userToDelete.remove();

        res.json({
            message: `The user ${userToDelete.fullName} has been successfully deleted.`
        });

    } catch (error) {
        next(error);
    }
};

 
 