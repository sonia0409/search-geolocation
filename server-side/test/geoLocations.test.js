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
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const geoLocations_1 = __importDefault(require("../routes/geoLocations"));
//jest.mock('../helperFunction/calculateGeographicalRelevance')
describe('geoLocatyion API', () => {
    //mock db
    const mockDb = {
        query: jest.fn(),
    };
    //Mock an express app
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use((0, geoLocations_1.default)(mockDb));
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should return 400 if no query parameter are provided', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/locations').query({ q: 'New York' });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: "Make sure latitude and longitude has a value!!" });
    }));
    it('should return an array of locations and status 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockQueryResult = {
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
                }
            ]
        };
        const mockGeoData = [
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
        ];
        //mockDB response
        mockDb.query.mockResolvedValue(mockQueryResult);
        const response = yield (0, supertest_1.default)(app).get(`/locations`).query({ q: 'city', latitude: '-80', longitude: '120' });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ suggestions: mockGeoData });
    }));
});
