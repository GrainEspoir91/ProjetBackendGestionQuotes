------------------------------------------------------------
-- 1) CRÉER LA BASE
------------------------------------------------------------
DROP DATABASE IF EXISTS quotesdb;
CREATE DATABASE quotesdb
    WITH OWNER = menjato
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8'
    TEMPLATE = template0;

\connect quotesdb;

------------------------------------------------------------
-- 2) TABLE users
------------------------------------------------------------

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

------------------------------------------------------------
-- 3) TABLE domains
------------------------------------------------------------

CREATE TABLE domains (
    id SERIAL PRIMARY KEY,
    domain VARCHAR(100) UNIQUE NOT NULL
);

------------------------------------------------------------
-- 4) TABLE Authors
------------------------------------------------------------

CREATE TABLE authors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) UNIQUE NOT NULL,
    bio TEXT
);

------------------------------------------------------------
-- 5) TABLE Quotes
------------------------------------------------------------

CREATE TABLE quotes (
    id SERIAL PRIMARY KEY,
    quote TEXT NOT NULL,
    reference TEXT,
    author_id INT REFERENCES authors(id),
    domain_id INT REFERENCES domains(id),
    created_at TIMESTAMP DEFAULT NOW()
);

------------------------------------------------------------
-- 6) GRANT table users
------------------------------------------------------------

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE users TO user_api;
GRANT USAGE, SELECT ON SEQUENCE users_id_seq TO user_api;

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE domains TO user_api;
GRANT USAGE, SELECT ON SEQUENCE domains_id_seq TO user_api;

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE authors TO user_api;
GRANT USAGE, SELECT ON SEQUENCE authors_id_seq TO user_api;


GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE quotes TO user_api;
GRANT USAGE, SELECT ON SEQUENCE quotes_id_seq TO user_api;

