

module.exports = (sequelize, Sequelize) => {
    const salle = sequelize.define("salles", {
        salleId: {
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
        capacite: {
            type: Sequelize.INTEGER
        }
    });

    return salle;
};
