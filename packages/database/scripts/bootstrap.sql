CREATE USER 'tchr_db_user'@'%' IDENTIFIED BY 'your_db_password_here';
CREATE DATABASE IF NOT EXISTS tchr CHARACTER SET utf8 COLLATE utf8_general_ci;
GRANT ALL PRIVILEGES ON tchr.* TO 'tchr_db_user'@'%';
SHOW GRANTS FOR 'tchr_db_user'@'%';
FLUSH PRIVILEGES;