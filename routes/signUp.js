const express = require("express");
const router = express.Router();
const db = require("../dbConnection");
const bcrypt = require("bcryptjs");

router.post("/signup", (req, res) => {
    const { name, email, pass, confirmPass } = req.body;


    if (pass !== confirmPass) {
        res.status(400).send({
            mensagem: "A senhas não são iguais!"
        })

    }

    const checkEmailQuery = `SELECT * FROM usuarios WHERE email = ?`;




    db.query(checkEmailQuery, [email], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send({
                mensagem: "Erro ao verificar email no banco de dados!"
            });
        }

        if (result.length > 0) {
            return res.status(400).send({
                mensagem: "O email já está em uso!"
            });
        }
    })

    bcrypt.hash(pass, 6, (err, passHashed) => {
        if (err) {
            console.error(err);
            return res.status(500).send({
                mensagem: "Erro ao verificar email no banco de dados!"
            });
        }


        const query = `INSERT INTO usuarios (name, email, pass) VALUES (?, ?, ?)`;

        db.query(query, [name, email, passHashed], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send({ mensagem: "Erro ao salvar o usuário no banco de dados!" });
            }

            res.status(201).send({
                mensagem: "Usuário criado com sucesso!",
                usuarioCriado: {
                    id: result.insertId,
                    name,
                    email,
                    pass,
                }
            });
        });
    })

});



module.exports = router;

