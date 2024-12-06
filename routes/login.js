const express = require("express");
const router = express.Router();
const db = require("../dbConnection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/login", (req, res) => {
    const {userEmail, userPass} = req.body;

    const emailExist = `SELECT * FROM usuarios WHERE email = ?`

    db.query(emailExist, [userEmail], (err, result) => {
        if(err){
            console.error(err);
            return res.status(500).send({
                mensagem: "Erro ao consultar o banco de dados"

            })
        }

        if(result.length === 0){
            return res.status(400).send({
                mensagem: "Este email não existe!"
            })
        }


        const storedHash = result[0].pass;

        bcrypt.compare(userPass, storedHash, (err, isMatch) => {
            if (err) {
                console.error(err);
                return res.status(500).send({
                    mensagem: "Erro ao comparar as senhas"
                });
            }

            if (isMatch) {
                const secret = process.env.JWT_TOKEN;
                const userId = result[0].id

                const payload = {
                    id: userId,
                    email: userEmail
                }

                const token = jwt.sign(payload, secret, { expiresIn: "1h" });
                
                return res.status(200).send({
                    mensagem: "Login bem-sucedido!",
                    token: token
                });
            } else {
                return res.status(400).send({
                    mensagem: "Senha incorreta!"
                });
            }
        })


    })

    
})

module.exports = router;