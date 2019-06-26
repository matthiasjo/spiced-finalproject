DROP TABLE IF EXISTS animalsearch;

CREATE TABLE animalsearch(
    id SERIAL PRIMARY KEY,
    url VARCHAR(300) NOT NULL,
    name VARCHAR(255) NOT NULL,
    species VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL,
    chipped VARCHAR(255) NOT NULL,
    lastseen DATE,
    gender TEXT,
    breed VARCHAR(255),
    location TEXT,
    description VARCHAR(255),
    age VARCHAR(255)
);
