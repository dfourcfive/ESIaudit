
module.exports = (sequelize, Sequelize) => {
    const enseignement = sequelize.define("enseignements", {
        enseignementId: {
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },

        role: {
            type: Sequelize.STRING
        },

        ChargeHoraire: {
            type: Sequelize.INTEGER
        },
    });

    return enseignement;
};
