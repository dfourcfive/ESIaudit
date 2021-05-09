
module.exports = (sequelize, Sequelize) => {
    const delibModule = sequelize.define("delibModules", {
        enseignementId: {
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        role: {
            type: Sequelize.STRING
        },
        anneés: {
            type: Sequelize.DATE
        },
        Moyenne: {
            type: Sequelize.DECIMAL
        },
    });

    return delibModule;
};
