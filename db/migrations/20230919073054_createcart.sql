-- migrate:up
CREATE TABLE `carts` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `user_id` INTEGER NOT NULL,
  `product_id` INTEGER NOT NULL,
  `quantity` INTEGER NOT NULL
  


);
  ALTER TABLE `carts` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
  ALTER TABLE `carts` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

-- migrate:down

ALTER TABLE `carts` DROP FOREIGN KEY `carts_ibfk_1`;
ALTER TABLE `carts` DROP FOREIGN KEY `carts_ibfk_2`;

DROP TABLE `carts`;