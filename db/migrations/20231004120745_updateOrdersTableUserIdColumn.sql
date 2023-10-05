-- migrate:up
UPDATE orders
SET user_id = NULL;

ALTER TABLE orders
MODIFY COLUMN user_id INT NULL;

-- migrate:down

