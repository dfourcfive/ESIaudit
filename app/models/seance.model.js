
module.exports = (sequelize, Sequelize) => {
    const seance = sequelize.define("seances", {
        seanceId: {
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },

        type: {
            type: Sequelize.STRING
        },

        ChargeHoraire: {
            type: Sequelize.INTEGER
        },
    });

    return seance;
};
