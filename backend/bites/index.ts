import express from 'express';
import appRouters from './routes/index.router.js';
import { errorHandler } from './middlewares/errorHandler.js';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use('/', appRouters);


app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}).on('error', (err) => {
    console.error('Error starting server:', err);
    throw new Error(err.message);
});

