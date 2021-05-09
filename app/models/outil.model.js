module.exports = (sequelize, Sequelize) => {
    const outil = sequelize.define("outils", {
        outilId: {
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        titre: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.STRING
        },
    });

    return outil;
};
