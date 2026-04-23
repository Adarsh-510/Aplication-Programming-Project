Application Programming Project for IIITN CSE Sem-2

FUN GAMES!

How to run:

1. Download and move the folder named Application-Programming-Project to the htdocs folder (it should directly be in the htdocs folder or the APIs wont work)
   the path to index.html, from htdocs should look like: /htdocs/Application-Programming-Project/index.html

2. Make sql data base. Run the following command in https://localhost/phpmyadmin/index.php?route=/server/sql
   this code makes the necessary database and tables, and adds random scores (so the leaderboard isnt empty)

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
  INSERT INTO `scores`(userID) VALUES ('BT25CSE001', 'BT25CSE002', 'BT25CSE003', 'BT25CSE004', 'BT25CSE005', 'BT25CSE006', 'BT25CSE007', 'BT25CSE008', 'BT25CSE009', 'BT25CSE010', 'BT25CSE011', 'BT25CSE012', 'BT25CSE013', 'BT25CSE014', 'BT25CSE015', 'BT25CSE016', 'BT25CSE017', 'BT25CSE018', 'BT25CSE019', 'BT25CSE020', 'BT25CSE021', 'BT25CSE022', 'BT25CSE023', 'BT25CSE024', 'BT25CSE025');
  UPDATE `scores`
  SET tictactoe = FLOOR(300 + (RAND() * 401)),
    rockpaperscissors = FLOOR(300 + (RAND() * 401)),
    matchcards = FLOOR(300 + (RAND() * 401)),
    memorygame = FLOOR(300 + (RAND() * 401));

3. Then open the website: http://localhost/Application-Programming-Project/



EXTRA INFORMATION: 

1. The userID should be in the format BT + 2 numbers + 3 characters + 3 numbers
   for example: BT25CSE170, BT25CSE174, BT76HTW111

2. In the leaderboards page, click on any game name in any column heading to see the leaderboards of that game.

3. Login to see the Profile page and see your scores update!