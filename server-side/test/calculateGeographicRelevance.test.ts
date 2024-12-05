import calculateGeographicalRelevance from "../helperFunction/calculateGeographicRelevance";
import IUserData from "../models/IUserData";
import IData from "../models/IData";

//test if the return data is sorted as per the score in descending order

//test result doesn't contain score =0.00

describe('calculateGeographicRelevance function', () =>{

    //mock IData
    const mockData: IData[] = [
        { "id": 1,
            "street": "street1",
            "city": "city1",
            "zip_code": "zip_code1",
            "county": "county1",
            "country": "country1",
            "latitude": 10.00,
            "longitude": 20.00,       
            "time_zone": "time_zone1"
        },
        { "id": 2,
            "street": "street2",
            "city": "city2",
            "zip_code": "zip_code2",
            "county": "county2",
            "country": "country2",
            "latitude": 20.00,
            "longitude": 30.00,       
            "time_zone": "time_zone2"
        },
        { 
            "id": 3,
            "street": "street2",
            "city": "city2",
            "zip_code": "zip_code2",
            "county": "county2",
            "country": "country2",
            "latitude":200,
            "longitude": 290.00,       
            "time_zone": "time_zone2"
        }
    ]

    //mock IUserData
    const mockUserData : IUserData = {
        "city":"UserCity",
        "latitude": 10.5,
        "longitude": 20.5,
    }

    it('should calculate scores for each data and sort them by score in descending order',()=>{
      const result = calculateGeographicalRelevance(mockData,mockUserData)

      console.log("Results: ", result)
      const expectedResults =  [
            {
              id: 1,
              street: 'street1',
              city: 'city1',
              zip_code: 'zip_code1',
              county: 'county1',
              country: 'country1',
              latitude: 10,
              longitude: 20,
              time_zone: 'time_zone1',
              score: '0.99'
            },
            {
              id: 2,
              street: 'street2',
              city: 'city2',
              zip_code: 'zip_code2',
              county: 'county2',
              country: 'country2',
              latitude: 20,
              longitude: 30,
              time_zone: 'time_zone2',
              score: '0.85'
            }
          ]

            expect(result).toEqual(
                expect.arrayContaining([
                    expect.objectContaining(expectedResults[0]),
                    expect.objectContaining(expectedResults[1])
                ]),
            )
    })
    it('filter out the score with zero values',()=>{
        const result = calculateGeographicalRelevance(mockData,mockUserData)
        
        const dataWithZeroScore = { 
            id: 3,
            street: "street2",
            city: "city2",
            zip_code: "zip_code2",
            county: "county2",
            country: "country2",
            latitude:200,
            longitude: 290.00,       
            time_zone: "time_zone2",
            score: '0.00'
        }
       
            expect(result).not.toEqual(
                expect.arrayContaining([
                    expect.objectContaining(dataWithZeroScore)
                ])
            )
      })

    //edge cases
    //if empty data or userData

    it('should handle empty input values', ()=>{
        const result = calculateGeographicalRelevance([], mockUserData);

        //should return an empty array
        expect(result).toEqual([]);
    })

    it('should handle invalid query userData', ()=>{
        const invalidQuery : IUserData = {
            "city":"UserCity",
            "latitude": NaN,
            "longitude": 20.5,
        }
        const result = calculateGeographicalRelevance(mockData, invalidQuery);

        //should return an empty array
        expect(result).toEqual("Invalid latitude or longitude values");
    })

})