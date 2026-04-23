Application Programming Project for IIITN CSE Sem-2

FUN GAMES!

How to run:
  Make sql data base. Run the following command in https://localhost/phpmyadmin/index.php?route=/server/sql

    CREATE DATABASE `game-data`;
    USE `game-data`;

    CREATE TABLE `scores`(
      userID VARCHAR(10),
      tictactoe INT(10),
      rockpaperscissors INT(10),
      matchcards INT(10),
      memorygame INT(10)
    );

    ALTER TABLE `scores` ADD COLUMN total INT GENERATED ALWAYS AS (tictactoe + rockpaperscissors + matchcards + memorygame) STORED;

    CREATE TABLE users(
      userID VARCHAR(10),
      username VARCHAR(50),
      password VARCHAR(100)
    );
    ALTER TABLE users ADD COLUMN timeOfCreation DATE DEFAULT CURRENT_TIMESTAMP;


    INSERT INTO `scores`(userID) VALUES ('BT25CSE001');
    INSERT INTO `scores`(userID) VALUES ('BT25CSE002');
    INSERT INTO `scores`(userID) VALUES ('BT25CSE003');
    INSERT INTO `scores`(userID) VALUES ('BT25CSE004');
    INSERT INTO `scores`(userID) VALUES ('BT25CSE005');
    INSERT INTO `scores`(userID) VALUES ('BT25CSE006');
    INSERT INTO `scores`(userID) VALUES ('BT25CSE007');
    INSERT INTO `scores`(userID) VALUES ('BT25CSE008');
    INSERT INTO `scores`(userID) VALUES ('BT25CSE009');
    INSERT INTO `scores`(userID) VALUES ('BT25CSE010');
    INSERT INTO `scores`(userID) VALUES ('BT25CSE011');
    INSERT INTO `scores`(userID) VALUES ('BT25CSE012');
    INSERT INTO `scores`(userID) VALUES ('BT25CSE013');
    INSERT INTO `scores`(userID) VALUES ('BT25CSE014');
    INSERT INTO `scores`(userID) VALUES ('BT25CSE015');
    INSERT INTO `scores`(userID) VALUES ('BT25CSE016');
    INSERT INTO `scores`(userID) VALUES ('BT25CSE017');
    INSERT INTO `scores`(userID) VALUES ('BT25CSE018');
    INSERT INTO `scores`(userID) VALUES ('BT25CSE019');
    INSERT INTO `scores`(userID) VALUES ('BT25CSE020');
    INSERT INTO `scores`(userID) VALUES ('BT25CSE021');
    INSERT INTO `scores`(userID) VALUES ('BT25CSE022');
    INSERT INTO `scores`(userID) VALUES ('BT25CSE023');
    INSERT INTO `scores`(userID) VALUES ('BT25CSE024');
    INSERT INTO `scores`(userID) VALUES ('BT25CSE025');

    UPDATE `scores`
    SET tictactoe = FLOOR(300 + (RAND() * 401)),
      rockpaperscissors = FLOOR(300 + (RAND() * 401)),
      matchcards = FLOOR(300 + (RAND() * 401)),
      memorygame = FLOOR(300 + (RAND() * 401));

this code makes the necessary database and tables, and adds random 