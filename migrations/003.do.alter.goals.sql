ALTER TABLE goals
  ADD COLUMN
  bnb_users_id INTEGER REFERENCES bnb_users(id) ON DELETE CASCADE NOT NULL;
-- removed this bc it was giving errors "ON DELETE SET NULL"