-- migrate:up
ALTER TABLE orders ADD COLUMN shipping_message VARCHAR(255) NULL;

-- migrate:down

ALTER TABLE orders DROP COLUMN shipping_message