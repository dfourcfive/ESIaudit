module.exports = (sequelize, Sequelize) => {
    const administratif = sequelize.define("administratifs", {
        administratifId: {
            type: Sequelize.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        nom: {
            type: Sequelize.STRING
        },
        prenom:{
            type: Sequelize.STRING
        },
        data_de_naissance:{
            type: Sequelize.DATE
        },
        lieu_naissance:{
            type: Sequelize.STRING
        },
        adresse:{
            type: Sequelize.STRING
        },
        diplome:{
            type: Sequelize.STRING
        },
        specialite:{
            type: Sequelize.STRING
        },
        role:{
            type: Sequelize.STRING
        },
        sex:{
            type: Sequelize.STRING
        },
    });

    return administratif;
};
