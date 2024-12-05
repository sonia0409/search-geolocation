import  request  from "supertest";
import express from "express";
import geoLocations from "../routes/geoLocations";
import calculateGeographicalRelevance from "../helperFunction/calculateGeographicRelevance";


//jest.mock('../helperFunction/calculateGeographicalRelevance')


describe('geoLocatyion API', () => {
    //mock db
    const mockDb ={
        query: jest.fn(),
    };
    //Mock an express app
    const app = express();
    app.use(express.json());
    app.use(geoLocations(mockDb));

    afterEach(() =>{
        jest.clearAllMocks();
    });

    it('should return 400 if no query parameter are provided', async() =>{
        const response = await request(app).get('/locations').query({q:'New York'});

        expect(response.status).toBe(400);
        expect(response.body).toEqual({error:"Make sure latitude and longitude has a value!!"})
    })
    
    it('should return an array of locations and status 200', async()=>{
        const mockQueryResult =  
        {
            rows: [
            {
        
            "city": "city1",
            "latitude": -81.546,
            "longitude": 112.382,

            },
            {

                "city": "city2",
                "latitude": -81.546,
                "longitude": 112.382,

            }]
        }
        const mockGeoData = 
            [
                {
                  city: 'city1',
                  latitude: -81.546,
                  longitude: 112.382,
                  score: '0.98'
                },
                {
                  city: 'city2',
                  latitude: -81.546,
                  longitude: 112.382,
                  score: '0.98'
                }
              ]
        


        
        //mockDB response
        mockDb.query.mockResolvedValue(mockQueryResult)
        const response = await request(app).get(`/locations`).query({q: 'city', latitude: '-80', longitude:'120'});
        expect(response.status).toBe(200);
        expect(response.body).toEqual({suggestions: mockGeoData});

    })
 })