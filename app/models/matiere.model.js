module.exports = (sequelize, Sequelize) => {
    const matiere = sequelize.define("matieres", {
        matiereId: {
            type: Sequelize.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        nom: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.STRING
        },
        Coefficient: {
            type: Sequelize.INTEGER
        },
        credit: {
            type: Sequelize.INTEGER
        },
        ChargeHoraire: {
            type: Sequelize.INTEGER
        },
    });

    return matiere;
};
