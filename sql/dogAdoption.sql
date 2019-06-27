DROP TABLE IF EXISTS adoptions;

CREATE TABLE adoptions(
    id SERIAL PRIMARY KEY,
    url VARCHAR(300) NOT NULL,
    name VARCHAR(255) NOT NULL,
    adoption_status VARCHAR(255) NOT NULL,
    dob DATE,
    sex TEXT,
    breed VARCHAR(255),
    dogsize TEXT,
    training VARCHAR(255),
    manner VARCHAR(255)
);
