BEGIN TRANSACTION;

CREATE TABLE login (
  id serial PRIMARY KEY,
  email text UNIQUE NOT NULL,
  hashed_password varchar(100) NOT NULL
);

COMMIT;
