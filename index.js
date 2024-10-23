import express from "express"
import colors from "colors"
import morgan from "morgan"
import { dbConnection } from "./config/db.js"
import userRouter from './routes/user.routes.js'
import UserModel from "./models/user.model.js"


const app = express();
const PORT = process.env.PORT || 8000

app.use(morgan());
app.use(express.json());

app.use('/api/v1', userRouter);

UserModel.sync({force: false});

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`.bgMagenta.white);
    await dbConnection();
});