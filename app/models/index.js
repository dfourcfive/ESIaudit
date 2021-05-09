const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false,

        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.salle = require("../models/salle.model.js")(sequelize, Sequelize);
db.these = require("../models/these.model.js")(sequelize, Sequelize);
db.outil = require("../models/outil.model.js")(sequelize, Sequelize);
db.club = require("../models/club.model.js")(sequelize, Sequelize);
db.activite = require("../models/activite.model.js")(sequelize, Sequelize);
db.departement = require("../models/departement.model.js")(sequelize, Sequelize);
db.doctorant = require("../models/doctorant.model.js")(sequelize, Sequelize);
db.formation = require("../models/formation.model.js")(sequelize, Sequelize);
db.administratif = require("../models/administratif.model.js")(sequelize, Sequelize);
db.PfeMaster = require("../models/PfeMaster.model.js")(sequelize, Sequelize);
db.DelibNiveau = require("../models/DelibNiveau.model.js")(sequelize, Sequelize);
db.niveau = require("../models/niveau.model.js")(sequelize, Sequelize);
db.enseignant = require("../models/enseignant.model.js")(sequelize, Sequelize);
db.enseignement = require("../models/enseignement.model.js")(sequelize, Sequelize);
db.etudiant = require("../models/etudiant.model.js")(sequelize, Sequelize);
db.seance = require("../models/seance.model.js")(sequelize, Sequelize);
db.semestre = require("../models/semestre.model.js")(sequelize, Sequelize);
db.ue = require("../models/ue.model.js")(sequelize, Sequelize);
db.matiere = require("../models/matiere.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});
db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});
db.ROLES = ["user", "admin", "moderator"];
//departement with salle
db.departement.HasMany(
    db.salle,
    {
        as:'departement',
        foreignKey : 'departementId'
    }
)
db.salle.belongsTo(
    db.departement,
    {
        foreignKey : 'departementId'
    }
)
//Activité with club
db.club.HasMany(
    db.activite,
    {
        as:'club',
        foreignKey : 'clubId'
    }
)
db.activite.belongsTo(
    db.club,
    {
        foreignKey : 'clubId'
    }
)
//Activité with salle
db.club.HasMany(
    db.activite,
    {
        as:'club',
        foreignKey : 'clubId'
    }
)
db.activite.belongsTo(
    db.club,
    {
        foreignKey : 'clubId'
    }
)




module.exports = db;
