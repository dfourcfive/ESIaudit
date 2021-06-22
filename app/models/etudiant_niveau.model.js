module.exports = (sequelize, Sequelize) => {
    const etudiant_niveau = sequelize.define("etudiant_niveaux", {
        etudiant_niveauId: {
            type: Sequelize.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        etudiantId: {
            type: Sequelize.INTEGER, 
        },
        niveauId: {
            type: Sequelize.INTEGER, 
        },
     
    });

    return etudiant_niveau;
};
