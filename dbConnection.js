const mysql = require("mysql2")

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "usuarios",

})

connection.connect((err) => {
    if(err){
        console.error("Error de conexão: " + err.stack);
        return;
    } else{
        console.log("Conectado ao banco de dados!");
    }
})

module.exports = connection;