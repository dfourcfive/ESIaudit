module.exports = (sequelize, Sequelize) => {
  const club = sequelize.define("clubs", {
    clubId: {
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

  return club;
};
