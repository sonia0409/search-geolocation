"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const geoLocations_1 = __importDefault(require("../routes/geoLocations"));
const db_config_1 = __importDefault(require("../configs/db.config"));
const body_parser_1 = __importDefault(require("body-parser"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const { PORT } = process.env;
//middlewares
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//routes
app.get("/", (req, res) => {
    res.send(200).json({ message: "Connection Established successfully" });
});
app.get("/locations", (0, geoLocations_1.default)(db_config_1.default));
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
exports.default = app;
