import express, { Request, Response } from "express";
import geoLocations from "../routes/geoLocations";
import db from '../configs/db.config';
import bodyParser from 'body-parser';
import 'dotenv/config';
import cors from 'cors';

const {PORT} = process.env


//middlewares
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

//routes
app.get("/", (req: Request, res: Response) => {
    res.send(200).json({message:"Connection Established successfully"});
});
app.get("/locations",geoLocations(db))


app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`);
});

export default app;
