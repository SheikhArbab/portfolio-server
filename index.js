import express from 'express'; 
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import testiRoutes from './routes/Testimonial.routes.js';
import projectRouter from './routes/project.routes.js';
import authRouter from './routes/auth.routes.js';
import { connectDB } from './config/config.js';
import { errorHandler } from './middlewares/errorHandler.js';


const app = express();
dotenv.config();
connectDB();

app.use(bodyParser.json({ limit: '1gb' }), cookieParser(), cors({ credentials: true, origin: true }));
app.use("/", express.static('public'), authRouter, testiRoutes, projectRouter);
// image url  http://localhost:4000/uploads/(your Image).png

app.use(errorHandler);

app.listen(4000, () => console.log(`Server: 4000`));
