import bcrypt, { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import Token from '../model/token.js'
import User from '../model/user.js';

dotenv.config();

export const singupUser = async (request, response) => {
    try {
        const hashedPassword = await bcrypt.hash(request.body.password, 10);
        const user = { name: request.body.name, email: request.body.email, password: hashedPassword, education: request.body.education, interests: request.body.interests }

        const newUser = new User(user);
        await newUser.save();

        // console.log("Done with successful signup");
        return response.status(200).json({ msg: 'Signup successfull' });
    } catch (error) {
        // console.log("You are in server singup");
        return response.status(500).json({ msg: 'Error! Could not signup' });
    }
}


export const loginUser = async (request, response) => {
    let user = await User.findOne({ email: request.body.email });
    if (!user) {
        return response.status(400).json({ msg: 'Email does not exist' });
    }

    try {
        let match = await bcrypt.compare(request.body.password, user.password);
        if (match) {
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '15m'});
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);

            const newToken = new Token({ token: refreshToken });
            await newToken.save();
            
            return response.status(200).json({ _id: user._id, accessToken: accessToken, refreshToken: refreshToken, name: user.name, email: user.email, password: request.body.password, education: user.education, interests: user.interests });
        
        } else {
            return response.status(400).json({ msg: 'Incorrect Password entered, please try again.' })
        }
    } catch (error) {
        return response.status(500).json({ msg: 'Error while performing login for the user' })
    }
}

// export const logoutUser = async (request, response) => {
//     const token = request.body.token;
//     await Token.deleteOne({ token: token });

//     response.status(204).json({ msg: 'logout successfull' });
// }

export const updateUser = async (request, response) => {
    try {

        let user = await User.findOne({ email: request.body.email });

        if (!user) {
            response.status(404).json({ msg: 'User not found' })
        }

        const hashedPassword = await bcrypt.hash(request.body.password, 10);

        request.body.password = hashedPassword;

        await User.findByIdAndUpdate( user._id, { $set: request.body })

        response.status(200).json('User Updated Successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}