const connection = require('../dbConnection');

const createUsersTable = () => {
    const createUsersTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            pass VARCHAR(255) NOT NULL,
            role ENUM('admin', 'client') NOT NULL
        );
    `;

    connection.query(createUsersTableQuery, (err, results) => {
        if(err){
            console.error("Erro ao criar a tabela de mesas", err)
            return
        }
        console.log("Tabela de usuários criada com sucesso");
    })
}

module.exports = createUsersTable;