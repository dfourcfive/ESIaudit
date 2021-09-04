module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "123",
  DB: "postgres",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 900000,
    idle: 10000,
  },
};
