import Router from 'express';

const authRouter = Router();

authRouter.post('/sign-up', (req, res) => {
    // Handle user registration
    res.send('Signup endpoint');
});

authRouter.post('/sign-in', (req, res) => {
    // Handle user login
    res.send('Login endpoint');
});

authRouter.post('/sign-out', (req, res) => {
    // Handle user logout
    res.send('Logout endpoint');
});

export default authRouter;