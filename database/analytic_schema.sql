-- create database analytic_db
CREATE DATABASE analytic_db
CHARACTER
SET utf8
COLLATE utf8_general_ci;
GRANT ALL PRIVILEGES ON analytic_db.* To 'analytic_user'@'%' IDENTIFIED BY '123789xxx';
FLUSH PRIVILEGES;