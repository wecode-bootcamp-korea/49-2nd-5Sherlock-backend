-- migrate:up
CREATE TABLE `likes` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `user_id` INTEGER NOT NULL,
  `product_id` INTEGER NOT NULL
);

ALTER TABLE `likes` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
ALTER TABLE `likes` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

-- migrate:down

ALTER TABLE `likes` DROP FOREIGN KEY `likes_ibfk_1`;
ALTER TABLE `likes` DROP FOREIGN KEY `likes_ibfk_2`;

DROP TABLE `likes`;