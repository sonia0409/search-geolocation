import express, {Request, Response, Router} from "express";
import calculateGeographicalRelevance from "../helperFunction/calculateGeographicRelevance";
import IUserData from "../models/IUserData";
import { error } from "console";




const geoLocations = (db: any) =>{
    //GET: / - all the geolocation data
    const router = express.Router();

    router.get('/locations', async (req: Request, res: Response) =>{
        const {q, latitude, longitude} = req.query;
            
        

        try{
            if(!latitude || !longitude){
                res.status(400).json({error:"Make sure latitude and longitude has a value!!"});
                return;
            }
            
            let userInput: IUserData = {
                "city":q.toString(),  
                "latitude":Number(latitude),
                "longitude": Number(longitude)
            }
            console.log(req.query, q);
            let query = `SELECT * FROM geolocations 
                            WHERE city like $1`
                     

            const result = await db.query(query, [q+"%"]);
            //need to build a helper function that takes in the return result values
            //and pass in the latitude and logitude query parameters for reference and calculate the
            //score
            //the function will take json, latitude, longitude
            //should return an array of objects
            let data = result.rows;
            let geoData = calculateGeographicalRelevance(data, userInput)
            console.log(geoData)
            // res.status(200).json({"suggestions": result.rows});
            res.status(200).json({"suggestions": geoData});
            
        }catch(e){
            res.status(500).json({error: 'Database error'});
        }
    });
    return router;
}
export default geoLocations;