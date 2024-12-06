const db = require("../dbConnection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const checkEmail = (email) => {
    return new Promise((resolve, reject) => {
        const checkEmailQuery = `SELECT * FROM users WHERE email = ?`;

        db.query(checkEmailQuery, [email], (err, result) => {
            if (err) {
                return reject({
                    mensagem: "Erro ao verificar email no banco de dados!",
                    status: 500
                });
            }

            if (result.length > 0) {
                return reject({
                    mensagem: "O email já está em uso!",
                    status: 400
                });
            }

            resolve();
        });
    });
};

const createUser = (name, email, pass) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(pass, 6, (err, passHashed) => {
            if (err) {
                return reject({
                    mensagem: "Erro ao fazer hash da senha",
                    status: 500
                });
            }

            const query = `INSERT INTO users (name, email, pass) VALUES (?, ?, ?)`;

            db.query(query, [name, email, passHashed], (err, result) => {
                if (err) {
                    return reject({
                        mensagem: "Erro ao salvar o usuário no banco de dados!",
                        status: 500
                    });
                }

                const user = {
                    id: result.insertId,
                    name,
                    email,
                    pass,
                }

                resolve(user);
            });
        })
    })
}

const comparePass = (inputPass, storedPass) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(inputPass, storedPass, (err, isMatch) => {
            if (err) {
                return reject({
                    mensagem: "Erro ao comparar as senhas",
                    status: 500
                });
            }

            resolve(isMatch);
        })
    })
}

const generateToken = (email, userId) => {
    const payload = {
        id: userId,
        email: email
    };

    const secret = process.env.JWT_TOKEN

    return jwt.sign(payload, secret, { expiresIn: '1h' })
}

module.exports = {
    checkEmail,
    createUser,
    comparePass,
    generateToken
}