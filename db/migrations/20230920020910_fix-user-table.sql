-- migrate:up
ALTER TABLE users ADD pw varchar(200) NOT NULL;
ALTER TABLE products RENAME COLUMN descount_rate TO discount_rate;

-- migrate:down
ALTER TABLE users DROP COLUMN pw;
ALTER TABLE products RENAME COLUMN discount_rate TO descount_rate;

