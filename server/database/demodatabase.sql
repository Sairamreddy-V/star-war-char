--CREATE TABLE user_table ( id INTEGER NOT NULL PRIMARY KEY,username VARCHAR NOT NULL,name VARCHAR NOT NULL,password VARCHAR NOT NULL );
BEGIN;
INSERT INTO cricket_teams(cricket_team_id,user_id,cricket_team_name)
VALUES(2,1,"Sai_team_two");
COMMIT;

--SELECT * FROM user_table

--DELETE FROM user_table
--WHERE username="SairamReddy"

--SELECT * FROM user_table

SELECT * FROM cricket_teams