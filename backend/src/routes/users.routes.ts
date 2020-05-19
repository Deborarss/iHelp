import { Router } from 'express';

const usersRouter = Router();

usersRouter.post('/', (req, res) => res.json({ message: 'ok' }));

export default usersRouter;
