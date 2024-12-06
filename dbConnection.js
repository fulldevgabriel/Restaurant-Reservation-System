const mysql = require("mysql2");

const nameDb = "restaurantdb";

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: nameDb
});

connection.connect((err) => {
    if (err) {
        console.error("Erro ao conectar ao banco de dados:", err);
        return;
    }
    console.log(`Conectado ao banco de dados '${nameDb}' com sucesso!`);
})


module.exports = connection;
