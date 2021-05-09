module.exports = (sequelize, Sequelize) => {
    const enseignant = sequelize.define("enseignants", {
        enseignantId: {
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        nom: {
            type: Sequelize.STRING
        },
        prenom: {
            type: Sequelize.STRING
        },
        data_naissance: {
            type: Sequelize.DATE
        },
        lieu_naissance: {
            type: Sequelize.STRING
        },
        adresse: {
            type: Sequelize.STRING
        },
        diplome: {
            type: Sequelize.STRING
        },
        grade: {
            type: Sequelize.STRING
        },
        specialite: {
            type: Sequelize.STRING
        },
        situationSocial: {
            type: Sequelize.STRING
        },
        Sex: {
            type: Sequelize.STRING
        },
    });

    return enseignant;
};
