module.exports = (sequelize, Sequelize) => {
    const departement = sequelize.define("departements", {
        departementId: {
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

    return departement;
};
