const authService = require("../services/authServices");

const signup = (req, res) => {
    const { name, email, pass, confirmPass } = req.body;


    if (pass !== confirmPass) {
        res.status(400).send({
            mensagem: "A senhas não são iguais!"
        });

    }

    authService.checkEmail(email)
        .then(() => {
            return authService.createUser(name, email, pass)
        })

        .then((user) => {
            res.status(201).send({
                mensagem: "Usuário criado com sucessso",
                usuarioCriado: user
            });
        })

        .catch((err) => {
            res.status(err.status || 500).send({
                mensagem: err.message
            });
        });

}

const login = (req, res) => {
    const { userEmail, userPass } = req.body;

    authService.checkEmail(userEmail)
        .then((user) => {
            return authService.comparePass(userPass, user.pass)
        })

        .then((isMatch) => {
            if (isMatch) {
                const token = authService.generateToken(userEmail, user.id)

                return res.status(200).send({
                    mensagem: "Login bem-sucedido!",
                    token: token
                })
            } else {
                return res.status(400).send({
                    mensagem: "Senha incorreta!"
                })
            }
        })

        .catch((err) => {
            res.status(err.status || 500).send({
                mensagem: err.mensagem
            })
        })
}

module.exports = {
    signup,
    login
}