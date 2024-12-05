
--geolocation data migration

COPY geolocations(street,city,zip_code,county,country,latitude,longitude,time_zone) FROM 'C:\Users\Sonia\dev\search-geolocation\server-side\db\csvFile\geolocationData.csv' DELIMITER ',' CSV HEADER
