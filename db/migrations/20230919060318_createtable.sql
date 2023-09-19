-- migrate:up
CREATE TABLE `products` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` integer NOT NULL,
  `descount_rate` float NOT NULL default 0,
  `description` varchar(1000),
  `label` varchar(255),
  `category_id` integer NOT NULL,
  `product_type_id` integer,
  `provideBag` tinyint(1) NOT NULL default 0,
  `pakage_service` tinyint(1) NOT NULL default 0,
  `created_at` timestamp NOT NULL DEFAULT NOW(),
  `updated_at` timestamp NULL ON UPDATE NOW()
);

CREATE TABLE `product_images` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `url` varchar(2000) NOT NULL,
  `order` integer,
  `product_id` integer NOT NULL
);

CREATE TABLE `info` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `product_id` integer NOT NULL,
  `content` varchar(2000)
);

CREATE TABLE `categories` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255)
);

CREATE TABLE `product_types` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255)
);

CREATE TABLE `reviews` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `content` varchar(1000),
  `author_id` integer NOT NULL, 
  `rating` integer NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT NOW(),
  `updated_at` timestamp NULL ON UPDATE NOW(),
  `product_id` integer NOT NULL
);

CREATE TABLE `review_images` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `review_id` integer NOT NULL,
  `url` varchar(2000) NOT NULL
);

CREATE TABLE `users` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `email` varchar(255),
  `default_destination` integer
);

CREATE TABLE `destinations` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `address` varchar(255) NOT NULL,
  `address_name` varchar(255) NOT NULL,
  `receiver_name` varchar(255) NOT NULL,
  `receiver_phone_number` varchar(255) NOT NULL,
  `user_id` integer NOT NULL
);


CREATE TABLE `orders` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `user_id` integer NOT NULL,
  `receiver_name` varchar(255) NOT NULL,
  `receiver_phone_number` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `payment` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT NOW(),
  `updated_at` timestamp NULL ON UPDATE NOW()
);

CREATE TABLE `ordered_goods` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `order_id` integer NOT NULL,
  `product_id` integer NOT NULL
);

ALTER TABLE `product_images` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

ALTER TABLE `info` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

ALTER TABLE `products` ADD FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;

ALTER TABLE `products` ADD FOREIGN KEY (`product_type_id`) REFERENCES `product_types` (`id`) ON DELETE CASCADE;

ALTER TABLE `reviews` ADD FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

ALTER TABLE `review_images` ADD FOREIGN KEY (`review_id`) REFERENCES `reviews` (`id`) ON DELETE CASCADE;

ALTER TABLE `reviews` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

ALTER TABLE `destinations` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

ALTER TABLE `orders` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

ALTER TABLE `ordered_goods` ADD FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;


-- migrate:down

