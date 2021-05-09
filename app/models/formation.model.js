module.exports = (sequelize, Sequelize) => {
    const formation = sequelize.define("formations", {
        formationId: {
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        nom: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
    });

    return formation;
};
