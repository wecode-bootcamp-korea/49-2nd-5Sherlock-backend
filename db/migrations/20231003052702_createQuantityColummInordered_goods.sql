-- migrate:up
ALTER TABLE ordered_goods ADD quantity INTEGER NOT NULL DEFAULT 0;

-- migrate:down

ALTER TABLE ordered_goods DROP COLUMN quantity;