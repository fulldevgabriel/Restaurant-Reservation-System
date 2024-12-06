const express = require("express");
const router = express.Router();
const db = require("../dbConnection");

router.get("/consultar", (req, res) => {
    const query = `SELECT * FROM usuarios`;

    db.query(query, (err, results) =>{
        if(err){
            console.error("Error: " + err);
            return res.status(500).send({
                message: "Erro na consulta"
            });
        }

        res.json(results);
    })
})

module.exports = router;