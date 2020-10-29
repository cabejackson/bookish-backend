module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://dunder_mifflin@localhost/bnb-tests',
  // DB_URL: process.env.DB_URL || "postgresql://dunder_mifflin@localhost/bnb-tests",
  TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://dunder_mifflin@localhost/bnb-actual-tests',
  JWT_SECRET: process.env.JWT_SECRET || 'october'
};
