import express from 'express';
import cors from 'cors';
import { router } from './src/routes/index.ts';
import { errorHandler, notFoundHandler } from './src/middlewares/error.ts';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
    res.json({ message: 'Hello from the server!' });
});

app.get('/api/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
});

app.use('/api', router);
app.use(errorHandler);
app.use(notFoundHandler);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});