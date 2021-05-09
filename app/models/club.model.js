module.exports = (sequelize, Sequelize) => {
    const club = sequelize.define("clubs", {
        clubId: {
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
        type: {
            type: Sequelize.DATE
        },
    });

    return club;
};
