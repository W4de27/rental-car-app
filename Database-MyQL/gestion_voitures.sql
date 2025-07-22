-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 22, 2025 at 07:44 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gestion_voitures`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cars`
--

CREATE TABLE `cars` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `model` varchar(255) NOT NULL,
  `year` int(11) NOT NULL,
  `transmission` enum('Manual','Automatic') NOT NULL,
  `fuel_type` enum('Essence','Diesel','Hybride') NOT NULL,
  `daily_price` int(11) NOT NULL,
  `stars` int(11) NOT NULL DEFAULT 3,
  `reviews` int(11) NOT NULL DEFAULT 0,
  `slug` enum('City','Off-Road','Luxury','Family','Economic','Prestige') NOT NULL,
  `seats` int(11) DEFAULT NULL,
  `availability` enum('available','not_available') NOT NULL DEFAULT 'available',
  `image` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cars`
--

INSERT INTO `cars` (`id`, `model`, `year`, `transmission`, `fuel_type`, `daily_price`, `stars`, `reviews`, `slug`, `seats`, `availability`, `image`, `created_at`, `updated_at`) VALUES
(27, 'Dacia Sandero', 2023, 'Manual', 'Essence', 200, 4, 812192, 'City', 5, 'available', 'cars/TGvfwkHlNUHBwRV4m4Jr07bw6PKpKWhUTLYM2FKz.png', '2025-05-02 15:22:02', '2025-07-16 22:30:10'),
(28, 'Toyota Land Cruiser', 2023, 'Automatic', 'Diesel', 600, 4, 723708, 'Off-Road', 7, 'available', 'cars/HLKbju2XO7NcSLhRlWkJ57rHqefhWf6gtJ8wXC4i.png', '2025-05-02 15:24:29', '2025-05-02 15:24:29'),
(29, 'Mercedes-Benz C-Class', 2023, 'Automatic', 'Diesel', 900, 5, 821893, 'Luxury', 5, 'available', 'cars/RPvLj2z9Mkz7wvvAyvMyqlpLFJ8ORNcUbIJbnUlb.png', '2025-05-02 15:25:28', '2025-05-02 21:13:31'),
(30, 'Dacia Lodgy', 2022, 'Manual', 'Diesel', 400, 4, 818374, 'Family', 7, 'available', 'cars/hFCp96i8uFbBBufIg3OTYHK75vjFPbB6A4oIf5Fm.png', '2025-05-02 15:26:21', '2025-05-02 21:15:13'),
(31, 'BMW 7 Series', 2023, 'Automatic', 'Essence', 2200, 5, 343466, 'Prestige', 5, 'available', 'cars/CA9iKmzzkBm6duG3qGa9Xf7wnhTy6KWnOgaSDuNx.jpg', '2025-05-02 15:27:29', '2025-05-08 19:29:02'),
(32, 'Dacia Logan', 2023, 'Manual', 'Diesel', 250, 4, 285367, 'Economic', 5, 'available', 'cars/RwCZZI3ubCbIL3JadufaGHyLlS71bAFCCdNs2FYK.jpg', '2025-05-02 15:28:25', '2025-05-02 20:11:13'),
(33, 'Peugeot 208', 2023, 'Automatic', 'Essence', 250, 5, 572247, 'City', 5, 'available', 'cars/DDnsNQLIV483UZoG1KzT9GB4f87WhiqUVJULklbL.jpg', '2025-05-02 15:29:55', '2025-06-26 20:15:30'),
(34, 'Jeep Wrangler', 2023, 'Manual', 'Essence', 550, 5, 981193, 'Off-Road', 5, 'available', 'cars/xQ0R06uKadybbbG3sDezZA8FuD5krUELu1AGTzMB.png', '2025-05-02 15:37:55', '2025-05-02 21:17:01'),
(35, 'BMW 3 Series', 2022, 'Automatic', 'Diesel', 850, 5, 527989, 'Luxury', 5, 'available', 'cars/MSfZUXeYSbDe1wnaPYmUh93S8OUe1Esj3y2HRH2s.png', '2025-05-02 15:39:12', '2025-05-02 21:18:49'),
(36, 'Renault Kangoo', 2023, 'Manual', 'Diesel', 450, 4, 826452, 'Family', 5, 'available', 'cars/QrEqxEdiWVhNzCzecW5pPy2LCKtKinrIRbwrOtYR.jpg', '2025-05-02 15:39:59', '2025-05-02 15:39:59'),
(37, 'Mercedes CLS-Class', 2022, 'Automatic', 'Diesel', 2100, 5, 917126, 'Prestige', 5, 'available', 'cars/ZwElT8jcY3IQTLKG0pE2UaDdN0KiqxonBkNLWm55.png', '2025-05-02 15:41:18', '2025-05-02 21:41:21'),
(38, 'Kia Rio', 2022, 'Automatic', 'Essence', 300, 4, 960000, 'Economic', 5, 'not_available', 'cars/ZiQd41PCQNTVun5IOvcozzrFxOZ2qyyTL3oO94ef.webp', '2025-05-02 15:42:10', '2025-06-26 20:20:57'),
(39, 'Renault Clio 5', 2023, 'Manual', 'Diesel', 200, 4, 757167, 'City', 5, 'available', 'cars/9GPneybD9Y1vGM5dPDrdDEqSziR9MRvoqOwNcNxa.jpg', '2025-05-02 15:43:00', '2025-05-02 15:43:00'),
(40, 'Mitsubishi Pajero', 2022, 'Automatic', 'Diesel', 500, 4, 739896, 'Off-Road', 7, 'available', 'cars/OGNMA0B6tFDdhGLFgnoVekH57YrqDgT3IiIeYtgi.jpg', '2025-05-02 15:44:00', '2025-05-02 20:23:16'),
(41, 'Audi A4', 2022, 'Automatic', 'Diesel', 800, 5, 494356, 'Luxury', 5, 'available', 'cars/1BH3W6DrQlr2QZXdfka44FEZ5S31y8TD3zqwRaAu.jpg', '2025-05-02 15:44:38', '2025-05-02 20:24:38'),
(42, 'Peugeot Rifter', 2023, 'Manual', 'Diesel', 450, 4, 606979, 'Family', 5, 'available', 'cars/UJn6gKzbmfKxeZ2fBERo1Hc0oCL7NMCwUQ5YQkYq.webp', '2025-05-02 15:45:32', '2025-05-02 20:27:18'),
(43, 'Porsche Taycan', 2023, 'Automatic', 'Hybride', 2400, 5, 134467, 'Prestige', 4, 'available', 'cars/qOkuVKtBHQKqNnMqul254ZYiiBH9wfuF1EbPt4yr.jpg', '2025-05-02 15:48:00', '2025-05-02 20:29:19'),
(44, 'Hyundai Accent', 2023, 'Automatic', 'Essence', 300, 4, 168092, 'Economic', 4, 'available', 'cars/uPOHBIX637zo3BFnNlhwvpWGkiDvQkV8aWVax0QC.jpg', '2025-05-02 15:50:20', '2025-05-02 20:31:00'),
(45, 'Kia Picanto', 2022, 'Automatic', 'Essence', 200, 3, 172722, 'City', 4, 'available', 'cars/QUEIRMKEX3e0koocxSbf7qOIeUdbHk9xINZHlpZG.png', '2025-05-02 15:53:23', '2025-05-02 15:53:23'),
(46, 'Nissan Patrol', 2023, 'Automatic', 'Essence', 600, 4, 287513, 'Off-Road', 7, 'available', 'cars/4KIveGK8Ft1XFhfEEXevxH9TsymWCQy9WZCF0Rwg.png', '2025-05-02 15:54:08', '2025-05-02 21:42:54'),
(47, 'Range Rover Evoque', 2023, 'Automatic', 'Diesel', 1500, 5, 606538, 'Luxury', 5, 'available', 'cars/zR7yiGKMnY8LQdiNfJR9bRNl1L1hGSKgCqcraaNO.webp', '2025-05-02 15:55:11', '2025-05-02 15:55:11'),
(48, 'Citroen Berlingo', 2022, 'Manual', 'Diesel', 450, 4, 888052, 'Family', 5, 'available', 'cars/CunM9bIKEovB0wHU1KPy6EtJuZeaF9zcXk4uoTnB.jpg', '2025-05-02 15:56:19', '2025-05-02 20:33:55'),
(49, 'Audi e-tron GT', 2023, 'Automatic', 'Hybride', 2400, 5, 105293, 'Prestige', 5, 'available', 'cars/0w9jR4tPxr3C45izWuUNbmQlc4rsEO0gHDf51zax.jpg', '2025-05-02 15:59:24', '2025-05-02 15:59:24'),
(50, 'Renault Symbol', 2022, 'Manual', 'Diesel', 250, 4, 262473, 'Economic', 5, 'available', 'cars/QA2H6XKbQ0SE4OOkyO0oUtmrNVjn4CbYE3TX383o.png', '2025-05-02 16:02:03', '2025-05-02 21:22:35'),
(51, 'Hyundai i10', 2021, 'Manual', 'Essence', 150, 3, 109738, 'City', 4, 'available', 'cars/kurBCl1BbdMKF21jRjdSxIXz1nnIzSanV7wE4Xwd.png', '2025-05-02 16:05:52', '2025-05-02 16:05:52'),
(52, 'Ford Everest', 2022, 'Manual', 'Diesel', 500, 5, 816020, 'Off-Road', 7, 'available', 'cars/Fy0xxvcKU1rJXvAgmh3BdrMdTIl66voTOxbiM5Zz.png', '2025-05-02 16:06:38', '2025-05-02 21:44:37'),
(53, 'Mercedes-Benz GLC', 2023, 'Automatic', 'Diesel', 1600, 5, 954952, 'Luxury', 5, 'available', 'cars/gTaWFwaJsBu41BXo8vnK2qH0qsDt9JX9BlTK0nRT.png', '2025-05-02 16:09:10', '2025-05-02 21:46:27'),
(54, 'Volkswagen Touran', 2022, 'Automatic', 'Diesel', 600, 4, 776687, 'Family', 7, 'available', 'cars/gzV8T8PbTROsZLyhZvRdNGzVKPI4zkGYGnJx071C.png', '2025-05-02 16:10:13', '2025-05-02 21:25:08'),
(55, 'Range Rover Velar', 2023, 'Automatic', 'Diesel', 2300, 5, 923059, 'Prestige', 5, 'available', 'cars/WWHWsYcKpekM4ZRJmQvylobBoi9ElbuFRNmcVVzc.png', '2025-05-02 16:15:13', '2025-05-02 21:26:42'),
(56, 'Skoda Fabia', 2023, 'Manual', 'Essence', 300, 4, 796171, 'Economic', 5, 'available', 'cars/HQtoxz5kJ6kM0XCt9hZnhiFTZumn6VpB9nPyJXA5.png', '2025-05-02 16:18:17', '2025-05-02 21:28:55'),
(57, 'Toyota Yaris', 2023, 'Automatic', 'Hybride', 250, 4, 912302, 'City', 5, 'available', 'cars/PI1OtFhkWlKY9eb8VzFqrXf8gOR451IfJfci8pBB.png', '2025-05-02 17:06:43', '2025-05-02 17:06:43'),
(58, 'Land Rover Defender', 2023, 'Automatic', 'Diesel', 700, 4, 795157, 'Off-Road', 5, 'available', 'cars/Kx8I5eZicHbbypq3laPYED8CA1jcF68F5Xh8d0Q7.png', '2025-05-02 17:11:13', '2025-05-02 21:49:03'),
(59, 'BMW 3', 2022, 'Automatic', 'Diesel', 1450, 5, 599788, 'Luxury', 5, 'available', 'cars/CooyEHRXXnZlXcbLqKr262Cx2VFz0nFSCryQqqFS.png', '2025-05-02 17:12:33', '2025-05-02 21:30:39'),
(60, 'Toyota ProAce Verso', 2023, 'Manual', 'Diesel', 700, 4, 506021, 'Family', 8, 'available', 'cars/hgiUoros19uQVg4NsISU6CekonhpqD1i1Y4YWFkr.png', '2025-05-02 17:13:24', '2025-05-02 21:50:38'),
(61, 'Maserati Ghibli', 2022, 'Automatic', 'Essence', 2600, 5, 886686, 'Prestige', 5, 'available', 'cars/BAOX4509G4ujXa6QM9SsgFDE285PGgH5BXnrGmsk.jpg', '2025-05-02 17:14:14', '2025-05-02 20:49:02'),
(62, 'Dacia Spring', 2023, 'Automatic', 'Hybride', 300, 4, 651412, 'Economic', 5, 'available', 'cars/68DaRUYCvQLBQkU2PHtso5aGwMGEfnJRDDB1qwSI.webp', '2025-05-02 17:15:49', '2025-05-02 17:18:10'),
(63, 'Fiat Panda', 2020, 'Manual', 'Essence', 150, 3, 424419, 'City', 4, 'available', 'cars/nkukGx8r6IqYcpO4fvNlvu1W0IQ2N5NEWYAvqbNu.png', '2025-05-02 17:19:24', '2025-05-02 17:19:24'),
(64, 'Isuzu D-Max', 2021, 'Manual', 'Diesel', 500, 4, 893859, 'Off-Road', 5, 'available', 'cars/ahosPKDxmiIIbwTR1ZBFVjOjYf9odb28C5k1IhbP.webp', '2025-05-02 17:20:17', '2025-05-02 17:20:17'),
(65, 'Audi Q5', 2023, 'Automatic', 'Diesel', 1400, 5, 430230, 'Luxury', 5, 'available', 'cars/zLaFhyzJfyEB2b60UWo9cWZmvufwZxbj7LYnahQT.webp', '2025-05-02 17:21:07', '2025-05-02 20:54:04'),
(66, 'Dacia Dokker', 2021, 'Manual', 'Essence', 400, 4, 261775, 'Family', 5, 'available', 'cars/KwlsfwPMNLQ4AwJMBQizR865xRL2JR2U26YXZdBE.png', '2025-05-02 17:21:43', '2025-05-02 21:03:15'),
(67, 'Lexus LS 500', 2022, 'Automatic', 'Essence', 2250, 4, 148513, 'Prestige', 5, 'available', 'cars/rkUUrwwDdEk7Xu5VE4uE7CfVCc4K52CIf1L5eGsh.png', '2025-05-02 17:22:32', '2025-05-02 21:05:30'),
(68, 'Peugeot 301', 2022, 'Manual', 'Diesel', 300, 4, 190687, 'Economic', 5, 'available', 'cars/6YS9VkEdX9painsC7M9jRktA2e8i6N63ED3qQTsJ.png', '2025-05-02 17:23:12', '2025-05-02 21:52:34'),
(69, 'Suzuki Swift', 2022, 'Automatic', 'Essence', 200, 3, 266154, 'City', 5, 'available', 'cars/FnYBMJg7vHLSBMpiT8h5GjKW04YoWAoE9rbysm5P.png', '2025-05-02 17:23:59', '2025-05-02 17:23:59'),
(70, 'Toyota Hilux', 2022, 'Manual', 'Diesel', 500, 4, 864206, 'Off-Road', 5, 'available', 'cars/n209dblbE8JtTaW2CL7KkfhoLnOIwTmYnoyIdyJh.png', '2025-05-02 17:24:33', '2025-05-02 21:07:44'),
(71, 'Porsche Macan', 2022, 'Automatic', 'Essence', 1800, 5, 957040, 'Luxury', 5, 'available', 'cars/qW0uKSaJ5IhukJriGT2Ps09d6EUcMUYCS8hcVv8Q.png', '2025-05-02 17:25:21', '2025-05-02 21:54:03'),
(72, 'Ford Toureno Connect', 2022, 'Manual', 'Diesel', 500, 4, 353265, 'Family', 7, 'available', 'cars/CXqLSIQjg7QZVClJcu8JlF2lNViL5bHw0W04HQpk.png', '2025-05-02 17:26:04', '2025-05-02 21:10:02'),
(73, 'Jaguar XF', 2022, 'Automatic', 'Diesel', 2150, 5, 841787, 'Prestige', 5, 'available', 'cars/BYYBLnylqxZPT1KDGwHvkr3Xi8j75o3CCzwoyW5x.jpg', '2025-05-02 17:28:42', '2025-05-02 17:28:42'),
(74, 'Citroen C3', 2023, 'Automatic', 'Essence', 300, 4, 846947, 'Economic', 5, 'available', 'cars/87ejKZIc2nUbnzUk9dZpjxLNmoqCj7KZwCDGyrR3.png', '2025-05-02 17:29:31', '2025-05-02 21:55:28'),
(75, 'Volkswagen Polo', 2023, 'Manual', 'Essence', 250, 3, 473086, 'City', 5, 'available', 'cars/keyx1Lwk1WAU7gX60E1MUTqFu0hWPULBTObdYg5T.png', '2025-05-02 17:30:10', '2025-05-02 17:30:10'),
(76, 'Suzuki Jimny', 2022, 'Manual', 'Essence', 450, 5, 449514, 'Off-Road', 4, 'available', 'cars/gViC5loGLIkLD0P1fjGAGLcOACsA9XHlN0lrmhv4.jpg', '2025-05-02 17:30:58', '2025-05-02 17:30:58'),
(77, 'Jaguar F-Pace', 2022, 'Automatic', 'Diesel', 1700, 5, 549766, 'Luxury', 5, 'available', 'cars/TOp89brbZ2Z1vWCMj0YDMurSjZm6iV09Mj9fFPJs.webp', '2025-05-02 17:33:30', '2025-05-02 17:33:30'),
(78, 'Fiat Doblo', 2021, 'Manual', 'Diesel', 400, 4, 635652, 'Family', 5, 'available', 'cars/X09JMrUEGn7F2ITdmn0Q2oMNe6sKyDHgMSBxDy49.png', '2025-05-02 17:34:08', '2025-05-02 21:11:11'),
(79, 'Genesis G80', 2023, 'Automatic', 'Essence', 2100, 5, 400290, 'Prestige', 5, 'available', 'cars/stxNhthF4HaSwFuyjO8C6VBqpp5lwo1yCqtIVv0u.png', '2025-05-02 17:39:07', '2025-05-02 21:57:25'),
(80, 'Nissan Sunny', 2021, 'Automatic', 'Essence', 300, 4, 496754, 'Economic', 5, 'available', 'cars/PFLq3U5Ujj2y4Q7OddP7N09QUBfxXteVP2H5wUqd.png', '2025-05-02 17:39:58', '2025-05-02 21:59:18'),
(81, 'Opel Corsa', 2022, 'Automatic', 'Diesel', 250, 5, 721936, 'City', 5, 'available', 'cars/rWzsmzpLe67jXbMgSwc1GusL69PpK9qMWXsokO2R.png', '2025-05-02 17:40:42', '2025-05-02 17:40:42'),
(82, 'Mercedes G-Class', 2023, 'Automatic', 'Essence', 900, 5, 691080, 'Off-Road', 5, 'available', 'cars/rbdZlETLfn2DVBen4kFL0Gnig0CyKxZGQqJdLGX9.jpg', '2025-05-02 17:41:39', '2025-05-02 17:41:39'),
(83, 'Mercedes E-Class Coupe', 2023, 'Automatic', 'Diesel', 1700, 5, 595790, 'Luxury', 5, 'available', 'cars/SeZS87f1vshKgqZKXJw84GR3XeZ8jR8qutHbrcQA.png', '2025-05-02 17:42:30', '2025-05-02 22:01:05'),
(84, 'Mercedes-Benz Vito', 2023, 'Automatic', 'Diesel', 1200, 5, 727304, 'Family', 8, 'available', 'cars/7hQGUXqFVSyqnxArUaVsEUNDdY0ECdviaBrsCA6Y.jpg', '2025-05-02 17:43:14', '2025-05-02 17:43:14'),
(85, 'Cadillac CT5', 2023, 'Automatic', 'Essence', 2050, 4, 100786, 'Prestige', 5, 'available', 'cars/pQfMFu6wzucGbfFvkox8wX4ql1X2hBsfcKba6qBf.webp', '2025-05-02 17:44:42', '2025-05-02 17:44:42'),
(86, 'Chery Arrizo 5', 2023, 'Automatic', 'Essence', 300, 4, 833670, 'Economic', 5, 'available', 'cars/I2UAINZENeTAO7DGffQWXcq8X4brwR8GSrXiqTIh.png', '2025-05-02 17:45:19', '2025-05-02 22:04:06');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_03_22_203220_posts', 1),
(5, '2025_04_12_165728_add_role_to_users_table', 2),
(6, '2025_04_18_174915_cars', 3),
(7, '2025_04_18_175324_reservations', 3),
(8, '2025_04_20_170841_cars', 4),
(9, '2025_04_21_120119_reservations', 5),
(10, '2025_04_21_133847_add_copy_pass_to_users_table', 6),
(11, '2025_04_24_123029_reservations', 7),
(12, '2025_04_25_150911_add_availability_to_cars_table', 8);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `password_reset_tokens`
--

INSERT INTO `password_reset_tokens` (`email`, `token`, `created_at`) VALUES
('wademsi01@gmail.com', '$2y$12$jCUhdi9wWR1qR/xMeQ.tm.RnT7RqxCzt1M9CEauC2KLX1izhJHXyi', '2025-05-08 18:56:33');

-- --------------------------------------------------------

--
-- Table structure for table `reservations`
--

CREATE TABLE `reservations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `car_id` bigint(20) UNSIGNED NOT NULL,
  `phone` varchar(255) NOT NULL,
  `reservation_code` bigint(20) UNSIGNED NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `duration` int(11) NOT NULL,
  `total_price` int(11) NOT NULL,
  `price_paid` int(11) NOT NULL DEFAULT 0,
  `status` enum('Pending','Confirmed','Active','Completed','Cancelled') NOT NULL DEFAULT 'Pending',
  `validation` enum('Validate','No Validate') NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('Ixynpm3vCzBKrErqdN1ag2UeFOroMd05BaeXfVOc', 32, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 Edg/137.0.0.0', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiUFR3MXpFNDByblU0bFVjWW9CMTY3MG9jZWpzd1Fobkd1S1o1dVhoSiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MzI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9yZXNlcnZhdGlvbi8zMy9lZGl0Ijt9fQ==', 1750973484),
('JaSBOEgJSCWKKxPctUeZQsA7nwcTqvmq8IaR2uxC', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiVGxrZlRpem5vSjFjZTR2bXhrY0oycHU4TlBTNmxQTTFPVUJxSFBWaCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1752709010);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` enum('admin','manager','user') NOT NULL DEFAULT 'user',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `copy_pass` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `role`, `email_verified_at`, `password`, `copy_pass`, `remember_token`, `created_at`, `updated_at`) VALUES
(32, 'Admin User', 'admin@gmail.com', 'admin', NULL, '$2y$12$zqYSAUA8yS94EFnApW3Zwekw6sSPK/rcrdeJN8LyR6wqCghVZ7YeW', 'admin123', NULL, NULL, NULL),
(33, 'Manager User', 'manager@gmail.com', 'manager', NULL, '$2y$12$SbldanaLiniTwrDk2HgEh.vCYfePl0VtAtgoJYjJj2jlO1WRmb.4y', 'manager123', NULL, NULL, NULL),
(34, 'Regular User', 'user@gmail.com', 'user', NULL, '$2y$12$AlSIFTfnJs5YYLrhB2RiCujOCFIgxbbX.ZuyAIdQMUxB/jdMSSxoa', 'user123', NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `reservations_reservation_code_unique` (`reservation_code`),
  ADD KEY `reservations_user_id_foreign` (`user_id`),
  ADD KEY `reservations_car_id_foreign` (`car_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cars`
--
ALTER TABLE `cars`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `reservations_car_id_foreign` FOREIGN KEY (`car_id`) REFERENCES `cars` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reservations_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

DELIMITER $$
--
-- Events
--
CREATE DEFINER=`root`@`localhost` EVENT `delete_unvalidated_reservations` ON SCHEDULE EVERY 1 DAY STARTS '2025-04-25 22:50:34' ON COMPLETION NOT PRESERVE ENABLE DO DELETE FROM reservations
  WHERE validation = 'No Validate'
  AND created_at < NOW() - INTERVAL 3 DAY$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
