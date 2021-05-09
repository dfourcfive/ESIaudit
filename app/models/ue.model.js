module.exports = (sequelize, Sequelize) => {
    const ue = sequelize.define("ues", {
        ueId: {
            type: DataTypes.INTEGER, 
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

    return ue;
};
