module.exports = (sequelize, Sequelize) => {
  const outil_salle = sequelize.define("outil_salles", {
    outil_salleId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    outilId: {
      type: Sequelize.INTEGER,
    },
    salleId: {
      type: Sequelize.INTEGER,
    },
    quantity: {
      type: Sequelize.INTEGER,
    },
  });

  return outil_salle;
};
