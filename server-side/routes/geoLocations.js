"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const calculateGeographicRelevance_1 = __importDefault(require("../helperFunction/calculateGeographicRelevance"));
const geoLocations = (db) => {
    //GET: / - all the geolocation data
    const router = express_1.default.Router();
    router.get('/locations', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { q, latitude, longitude } = req.query;
        try {
            if (!latitude || !longitude) {
                res.status(400).json({ error: "Make sure latitude and longitude has a value!!" });
                return;
            }
            let userInput = {
                "city": q.toString(),
                "latitude": Number(latitude),
                "longitude": Number(longitude)
            };
            console.log(req.query, q);
            let query = `SELECT * FROM geolocations 
                            WHERE city like $1`;
            const result = yield db.query(query, [q + "%"]);
            //need to build a helper function that takes in the return result values
            //and pass in the latitude and logitude query parameters for reference and calculate the
            //score
            //the function will take json, latitude, longitude
            //should return an array of objects
            let data = result.rows;
            let geoData = (0, calculateGeographicRelevance_1.default)(data, userInput);
            console.log(geoData);
            // res.status(200).json({"suggestions": result.rows});
            res.status(200).json({ "suggestions": geoData });
        }
        catch (e) {
            res.status(500).json({ error: 'Database error' });
        }
    }));
    return router;
};
exports.default = geoLocations;
