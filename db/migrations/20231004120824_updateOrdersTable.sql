-- migrate:up
ALTER TABLE orders
ADD COLUMN customer_name VARCHAR(255) NOT NULL,
ADD COLUMN customer_email VARCHAR(255) NOT NULL,
ADD COLUMN customer_phone_number VARCHAR(255) NOT NULL,
ADD COLUMN shipper_name VARCHAR(255) NOT NULL;

-- migrate:down

