module.exports = (sequelize, Sequelize) => {
  const etudiant_pfeMaster = sequelize.define("etudiant_pfeMaster", {
    etudiant_pfeMasterId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    etudiantId: {
      type: Sequelize.INTEGER,
    },
    PfeMasterId: {
      type: Sequelize.INTEGER,
    },
  });

  return etudiant_pfeMaster;
};
