import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import UserRoute from './routes/UserRoute';
import PostRoute from './routes/PostRoute';
import CommentRoute from './routes/CommentRoute';
import ItemRoute from './routes/ItemRoute';


import cors from 'cors';


dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', UserRoute);
app.use('/api/post', PostRoute);
app.use('/api/comment', CommentRoute);
app.use('/api/item', ItemRoute);



app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});