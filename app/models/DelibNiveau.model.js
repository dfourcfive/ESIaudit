module.exports = (sequelize, Sequelize) => {
  const DelibNiveau = sequelize.define("DelibNiveaux", {
    DelibNiveauId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    année: {
      type: Sequelize.INTEGER,
    },
    MoyenneS1: {
      type: Sequelize.DECIMAL,
    },
    MoyenneS2: {
      type: Sequelize.DECIMAL,
    },
    CreditS1: {
      type: Sequelize.INTEGER,
    },
    CreditS2: {
      type: Sequelize.INTEGER,
    },
    Observation: {
      type: Sequelize.STRING,
    },
  });

  return DelibNiveau;
};
