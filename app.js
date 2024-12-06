const express = require("express");
const app = express();

const rotaSignUp = require("./routes/signUp.js");
const rotaLogin = require("./routes/login.js");
const rotaConsulta = require("./routes/consulta.js");

app.use(express.json());

app.use("/home", rotaSignUp);;
app.use("/home", rotaLogin)
app.use("/home", rotaConsulta);

module.exports = app;