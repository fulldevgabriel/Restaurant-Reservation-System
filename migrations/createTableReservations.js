const connection = require('../dbConnection');

const createTableReservations = () => {
    const createTableReservationsQuery = `
        CREATE TABLE IF NOT EXISTS reservations (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            mesa_id INT NOT NULL,
            date_reservation TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            stats ENUM('active', 'canceled') NOT NULL
        );
    `;

    connection.query(createTableReservationsQuery, (err, results) => {
        if(err){
            console.error("Erro ao criar a tabela de mesas", err)
            return
        }
        console.log("Tabela de reservas criada com sucesso");
    })
}

module.exports = createTableReservations;