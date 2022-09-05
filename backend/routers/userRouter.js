import express from 'express';
import User from "../models/usermodel";

const userRouter = express.Router();

userRouter.get('/createadmin', async(req, res) => {
    try {
        const user = new User({
            name: 'Elin',
            email: 'elin_0327@hotmail.com',
            password: 'cdesignelin',
            isAdmin: true,

        });
        const createUser = await user.save();
        res.send(createUser);
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
});

userRouter.post('/signin', async(req, res) => {
    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password,
    });
    if (!signinUser) {
        res.status(401).send({
            message: 'Fel e-post eller lösenord!'
        });
    }
});

export default userRouter;