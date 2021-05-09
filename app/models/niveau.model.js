module.exports = (sequelize, Sequelize) => {
    const niveau = sequelize.define("niveaux", {
        niveauId: {
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        nom: {
            type: Sequelize.STRING
        },
        desc: {
            type: Sequelize.STRING
        },
       
        Durée: {
            type: Sequelize.INTEGER
        },
    });

    return niveau;
};
