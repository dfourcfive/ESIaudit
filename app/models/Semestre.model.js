module.exports = (sequelize, Sequelize) => {
    const semestre = sequelize.define("semestres", {
        SemestreId: {
            type: Sequelize.INTEGER, 
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

    return semestre;
};
