module.exports = (sequelize, Sequelize) => {
    const Semestre = sequelize.define("Semestres", {
        SemestreId: {
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        numero: {
            type: Sequelize.STRING
        },
        desc: {
            type: Sequelize.STRING
        },
    });

    return Semestre;
};
