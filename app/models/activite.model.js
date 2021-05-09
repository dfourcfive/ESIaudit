module.exports = (sequelize, Sequelize) => {
    const activite = sequelize.define("activites", {
        activiteId: {
            type: Sequelize.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        titre: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.STRING
        },
        date_debut: {
            type: Sequelize.DATE
        },
        date_fin: {
            type: Sequelize.DATE
        },
    });

    return activite;
};
