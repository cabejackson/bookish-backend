-- first remove any data that may be present
TRUNCATE goals RESTART IDENTITY CASCADE;

INSERT INTO goals
  (tbr_number, timeframe, reading_goals, bnb_users_id)
  VALUES
    (10,'October','some spectacular goal would go here BBBBB', 1),
    (10,'November','some spectacular goal would go here AAAAA', 1),
    (11,'November','some spectacular goal would go here CCCCC', 2),
    (16,'November','some spectacular goal would go here DDDDD', 3),
    (20,'December','some spectacular goal would go here EEEEE', 1),
    (6,'Labor Day Weekend','some spectacular goal would go here FFFFF', 5),
    (5,'December','some spectacular goal would go here GGGGG', 2),
    (5,'Fall break','some spectacular goal would go here HHHHH', 4);
   