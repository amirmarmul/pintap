import express, { NextFunction, Request, Response } from 'express';
import dependencies from '../config/dependencies';
import routes from './routes';

declare global {
  namespace Express {
    interface Request {
      dependencies?: any;
    }
  }
}

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Register Dependencies
app.use((req, res, next) => {
  req.dependencies = dependencies;
  next()
})

// Register app routes
app.use(routes);

// Error Handler
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send({ message: error.message })
})

export default app;
