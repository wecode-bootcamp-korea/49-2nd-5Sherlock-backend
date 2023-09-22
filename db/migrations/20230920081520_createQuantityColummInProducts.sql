-- migrate:up
ALTER TABLE products ADD quantity INTEGER NOT NULL DEFAULT 0;

-- migrate:down

ALTER TABLE products DROP COLUMN quantity;