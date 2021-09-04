const express = require("express");
const cors = require("cors");
const db = require("./app/models");
const app = express();
const faker = require("./app/faker/generator/generator");
//const bi_db_provider = require("./app/BI/bi_data_provider");
//const bi_query_parser = require("./app/BI/bi_query_parser");
const produce = require("./app/kafkaClient/producer");
var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync().then(() => {
  console.log("Resync Db");
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to EsiAudit-API application." });
});
//routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/departement.routes")(app);
require("./app/routes/formation.routes")(app);
require("./app/routes/partenaire.routes")(app);
require("./app/routes/salle.routes")(app);
require("./app/routes/activite.routes")(app);
require("./app/routes/outil.routes")(app);
require("./app/routes/niveau.routes")(app);
require("./app/routes/club.routes")(app);
require("./app/routes/these.routes")(app);
require("./app/routes/doctorant.routes")(app);
require("./app/routes/niveau.routes")(app);
require("./app/routes/etudiant.routes")(app);
require("./app/routes/enseignant.routes")(app);
require("./app/routes/DelibNiveau.routes")(app);
require("./app/routes/administratif.routes")(app);
require("./app/routes/semestre.routes")(app);
require("./app/routes/delibmodule.routes")(app);
require("./app/routes/ue.routes")(app);
require("./app/routes/matiere.routes")(app);
require("./app/routes/statistics/count.routes")(app);
require("./app/routes/statistics/data.routes")(app);
require("./app/routes/BI/bi_db_routes")(app);

//faker functions here in order
//faker.FakeDepartement();
//faker.FakeSalles();
//faker.FakeClubes();
//faker.FakeActivities();

//faker.FakeOutils();
//faker.FakeLinkSalleWithOutils();
//faker.FakeAdministratifs();

//faker.FakeFormations();
//faker.FakePartenaires();
//faker.FakeLinkManyToManyFormatParte();
//****/
//faker.FakeNiveaux();
//faker.FakeTheses();
//faker.FakeDoctorants();
//faker.FakeEtudiants();
//faker.FakeLinkManyToManyEtudNiv();
//****/
//faker.FakeEnseignant();
//faker.FakeLinkEnsWithForma();
//*****/
//faker.FakePfeMaster();
//faker.FakeLinkEtudWithPfeMaster();
/****/
//faker.FakeSemestres();
//faker.FakeUes();
//faker.FakeMatiers();
//faker.FakerDelivModule();
//faker.FakerDelibNiveaux();

/*****/
//faker.FakeCite();
//here if you want to generate good linking change excute this method and change the j each time (1,2,3,4,5) each time
//faker.FakeLinkEtudiantWithCite();
//produce("hello latif nakchhhhh","key").then(()=>console.log('success'));
produce('testing','fff');


//set port, listen for requests
const PORT = process.env.PORT || 8090;
server=app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
var io = require("socket.io")(server);
const consumer = require("./app/kafkaClient/consumer");
consumer.run(io).then(()=>{
  console.log('socket is running');
});