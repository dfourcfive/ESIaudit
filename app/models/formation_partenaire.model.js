module.exports = (sequelize, Sequelize) => {
    const formation_partenaire = sequelize.define("formation_partenaires", {
        formation_partenaireId: {
            type: Sequelize.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        formationId: {
            type: Sequelize.INTEGER, 
        },
        partenaireId: {
            type: Sequelize.INTEGER, 
        },
     
    });

    return formation_partenaire;
};
