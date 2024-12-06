const express = require("express");
const app = express();
const rotaSignUp = require("./routes/signUp.js");
const rotaLogin = require("./routes/login.js");
const rotaConsulta = require("./routes/consulta.js");
const createUsersTable = require("./migrations/createUsersTable.js");
const createTableTables = require("./migrations/createTableTables.js");
const createTableReservation = require("./migrations/createTableReservations.js");

app.use(express.json());

createUsersTable();
createTableReservation();
createTableTables();


app.use("/usuarios", rotaSignUp);;
app.use("/usuarios", rotaLogin);;

module.exports = app;