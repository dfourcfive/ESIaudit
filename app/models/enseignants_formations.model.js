module.exports = (sequelize, Sequelize) => {
  const enseignants_formation = sequelize.define("enseignants_formations", {
    enseignants_formationId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    enseignantId: {
      type: Sequelize.INTEGER,
    },
    formationId: {
      type: Sequelize.INTEGER,
    },
  });

  return enseignants_formation;
};
