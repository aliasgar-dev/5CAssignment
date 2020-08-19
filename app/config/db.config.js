module.exports = {
  HOST: "localhost",
  USER: "ali",
  PASSWORD: "123",
  DB: "ali",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
