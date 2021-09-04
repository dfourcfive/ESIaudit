module.exports = (sequelize, Sequelize) => {
  const cite = sequelize.define("cites", {
    citeId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nom: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.STRING,
    },
  });

  return cite;
};
