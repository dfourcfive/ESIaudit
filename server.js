const express = require("express");
const cors = require("cors");
const db = require("./app/models");
const Role = db.role;
const app = express();

var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
db.sequelize.sync().then(() => {
    console.log('Resync Db');
});
// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to EsiAudit-API application." });
});
//routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/departement.routes')(app);
require('./app/routes/formation.routes')(app);
require('./app/routes/partenaire.routes')(app);
require('./app/routes/salle.routes')(app);
require('./app/routes/activite.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

