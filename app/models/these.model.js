module.exports = (sequelize, Sequelize) => {
    const these = sequelize.define("theses", {
        theseId: {
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        titre: {
            type: Sequelize.STRING
        },
        domaine: {
            type: Sequelize.STRING
        },
        date_Lancement: {
            type: Sequelize.DATE
        },
    });

    return these;
};
