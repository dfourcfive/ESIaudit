
module.exports = (sequelize, Sequelize) => {
    const delibModule = sequelize.define("delibModules", {
        DelibModuleId: {
            type: Sequelize.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        annee: {
            type: Sequelize.DOUBLE
        },
        Moyenne: {
            type: Sequelize.DECIMAL
        },
        Confs: {
            type: Sequelize.INTEGER
        },
    });

    return delibModule;
};
