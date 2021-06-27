module.exports = (sequelize, Sequelize) => {
    const PfeMaster = sequelize.define("PfeMasters", {
        PfeMasterId: {
        type: Sequelize.INTEGER, 
        primaryKey: true,
        autoIncrement: true
    },
        titre: {
            type: Sequelize.STRING
        },
        domain: {
            type: Sequelize.STRING
        },
        type:{
            type: Sequelize.STRING
        },
        date_Lancement: {
            type: Sequelize.DATE
        },
        date_fin: {
            type: Sequelize.DATE
        },
    });

    return PfeMaster;
};
