
module.exports = (sequelize, Sequelize) => {
    const delibModule = sequelize.define("delibModules", {
        DelibModuleId: {
            type: Sequelize.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        annee: {
            type: Sequelize.INTEGER
        },
        Moyenne: {
            type: Sequelize.DECIMAL
        },
        Coefficient: {
            type: Sequelize.INTEGER
        },
        Credit: {
            type: Sequelize.INTEGER
        },
    });

    return delibModule;
};
