-- DROP Table if it already exists
DROP TABLE IF EXISTS geolocations CASCADE;

--CREATE geolocations table
CREATE TABLE geolocations(
    id SERIAL PRIMARY KEY,
    street VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    zip_code VARCHAR(255) NOT NULL,
    county	VARCHAR(255) NOT NULL,
    country	VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    time_zone VARCHAR(255) NOT NULL
)