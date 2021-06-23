const config = require("../config/db.config.js");
const Sequelize = require("sequelize");

//import models
const UserModel = require("../models/user.model.js");
const RoleModel = require("../models/role.model.js");
const SalleModel = require("../models/salle.model.js");
const TheseModel = require("../models/these.model.js");
const OutilModel = require("../models/outil.model.js");
const ClubModel = require("../models/club.model.js");
const ActiviteModel = require("../models/activite.model.js");
const DepartementModel = require("../models/departement.model.js");
const DoctorantModel = require("../models/doctorant.model.js");
const FormationModel = require("../models/formation.model.js");
const AdministratifModel = require("../models/administratif.model.js");
const PfeMasterModel = require("../models/PfeMaster.model.js");
const DelibNiveauModel = require("../models/DelibNiveau.model.js");
const NiveauModel = require("../models/niveau.model.js");
const EnseignantModel = require("../models/enseignant.model.js");
const EnseignementModel = require("../models/enseignement.model.js");
const EtudiantModel = require("../models/etudiant.model.js");
const SeanceModel = require("../models/seance.model.js");
const SemestreModel = require("../models/semestre.model.js");
const UEModel = require("../models/ue.model.js");
const MatiereModel = require("../models/matiere.model.js");
const PartenaireModel = require("../models/partenaire.model.js");
const formation_partenaireModel = require("./formation_partenaire.model.js");
const etudiant_niveauModel = require("./etudiant_niveau.model.js");
const enseignants_formationModel = require("./enseignants_formations.model.js");

//sequelize connection
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

//Connect model with sequelize
db.user = UserModel(sequelize, Sequelize);
db.role = RoleModel(sequelize, Sequelize);
db.salle = SalleModel(sequelize, Sequelize);
db.these = TheseModel(sequelize, Sequelize);
db.outil = OutilModel(sequelize, Sequelize);
db.club = ClubModel(sequelize, Sequelize);
db.activite = ActiviteModel(sequelize, Sequelize);
db.departement = DepartementModel(sequelize, Sequelize);
db.doctorant = DoctorantModel(sequelize, Sequelize);
db.formation = FormationModel(sequelize, Sequelize);
db.administratif = AdministratifModel(sequelize, Sequelize);
db.PfeMaster = PfeMasterModel(sequelize, Sequelize);
db.DelibNiveau = DelibNiveauModel(sequelize, Sequelize);
db.niveau = NiveauModel(sequelize, Sequelize);
db.enseignant = EnseignantModel(sequelize, Sequelize);
db.enseignement = EnseignementModel(sequelize, Sequelize);
db.etudiant = EtudiantModel(sequelize, Sequelize);
db.seance = SeanceModel(sequelize, Sequelize);
db.semestre = SemestreModel(sequelize, Sequelize);
db.ue = UEModel(sequelize, Sequelize);
db.matiere = MatiereModel(sequelize, Sequelize);
db.partenaire = PartenaireModel(sequelize, Sequelize);
db.formation_partenaire = formation_partenaireModel(sequelize, Sequelize);
db.etudiant_niveau=etudiant_niveauModel(sequelize, Sequelize);
db.enseignants_formation=enseignants_formationModel(sequelize, Sequelize)
//user has many roles and role has many users
db.role.belongsToMany(db.user, {through: "user_roles"})
db.user.belongsToMany(db.role, {through: "user_roles"})
db.ROLES = ["user", "admin", "moderator"]
//departement has many salles and salle belongs to one departement
db.departement.hasMany(db.salle)
db.salle.belongsTo(db.departement)
//Club has many activites and activite belongs to one club
db.club.hasMany(db.activite)
db.activite.belongsTo(db.club)
//Activite belongs to salle ...
db.salle.hasMany(db.activite)
db.activite.belongsTo(db.salle)
//salle has many outils and outil belongs to salle
db.salle.hasMany(db.outil)
db.outil.belongsTo(db.salle)
//club belongs to salle
db.club.belongsTo(db.salle)
//db.salle.belongsTo(db.club)
//departement has many administratifs and administratif belongs to one departement
db.departement.hasMany(db.administratif)
db.administratif.belongsTo(db.departement)
//departement has many formations and formation belongs to one departement
db.departement.hasMany(db.formation)
db.formation.belongsTo(db.departement)
//formation has many partenaires and partenaire has many formations
//db.formation.belongsTo(db.formation_partenaire);
//db.formation_partenaire.hasMany(db.formation);
//db.partenaire.belongsTo(db.formation_partenaire);
//db.formation_partenaire.hasMany(db.partenaire)
//formation has many niveaux and niveau belongs to one formation
db.formation.hasMany(db.niveau)
db.niveau.belongsTo(db.formation)
//departement has many these and these belongs to departement
db.departement.hasMany(db.these)
db.these.belongsTo(db.departement)
//departement has many doctorant and doctorant belongs to many departement
db.departement.hasMany(db.doctorant)
db.doctorant.belongsTo(db.departement)
//
//const etudiant_niveau = sequelize.define('etudiant_niveau', {}, { timestamps: false });
//db.etudiant.belongsToMany(db.niveau,{through: etudiant_niveau})
//db.niveau.belongsToMany(db.etudiant,{through: etudiant_niveau})
//
//const enseignants_formations = sequelize.define('enseignants_formations', {}, { timestamps: false });
//db.enseignant.belongsToMany(db.formation, {through: enseignants_formations})
//db.formation.belongsToMany(db.enseignant, {through: enseignants_formations})
//
db.DelibNiveau.belongsTo(db.etudiant)
db.DelibNiveau.belongsTo(db.niveau)
//
db.semestre.belongsTo(db.niveau)
db.niveau.hasMany(db.semestre)
//
db.ue.belongsTo(db.semestre)
db.semestre.hasMany(db.ue)
//
db.matiere.belongsTo(db.ue)
db.ue.hasMany(db.matiere)








module.exports = db;