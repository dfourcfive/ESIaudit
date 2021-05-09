module.exports = (sequelize, Sequelize) => {
    const partenaire = sequelize.define("partenaires", {
        partenaireId: {
            type: Sequelize.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        Nom: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.STRING
        }
    });

    return partenaire;
};
