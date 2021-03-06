module.exports = (sequelize, Sequelize) => {
  const etudiant = sequelize.define("etudiants", {
    etudiantId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nom: {
      type: Sequelize.STRING,
    },
    prenom: {
      type: Sequelize.STRING,
    },
    data_naissance: {
      type: Sequelize.DATE,
    },
    lieu_naissance: {
      type: Sequelize.STRING,
    },
    adresse: {
      type: Sequelize.STRING,
    },
    Sex: {
      type: Sequelize.STRING,
    },
    intern: {
      type: Sequelize.STRING,
    },
  });

  return etudiant;
};
