module.exports = (sequelize, Sequelize) => {
  const doctorant = sequelize.define("doctorants", {
    doctorantId: {
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
    date_naissance: {
      type: Sequelize.DATEONLY,
    },
    lieu_de_nissance: {
      type: Sequelize.STRING,
    },
    adresse: {
      type: Sequelize.STRING,
    },
    sex: {
      type: Sequelize.STRING,
    },
  });

  return doctorant;
};
