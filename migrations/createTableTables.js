const connection = require('../dbConnection');

const createTablesTable = () =>{
    const createTablesTableQuery = `
        CREATE TABLE IF NOT EXISTS tables (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome INT NOT NULL,
            capacity INT NOT NULL,
            stats ENUM('available', 'unavailable', 'reserved') NOT NULL
        );
    `;

    connection.query(createTablesTableQuery, (err, results) => {
        if(err){
            console.error("Erro ao criar a tabela de mesas", err)
            return
        }
        console.log("Tabela de mesas criada com sucesso");
    })
}

module.exports = createTablesTable;