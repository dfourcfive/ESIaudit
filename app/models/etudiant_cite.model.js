module.exports = (sequelize, Sequelize) => {
  const etudiant_cite = sequelize.define("etudiant_cites", {
    etudiant_citeetudiant_niveauId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    etudiantId: {
      type: Sequelize.INTEGER,
    },
    citeId: {
      type: Sequelize.INTEGER,
    },
  });

  return etudiant_cite;
};
