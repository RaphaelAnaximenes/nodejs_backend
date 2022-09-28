const bcrypt = require("bcryptjs"); // criptografar senha
const jwt = require("jsonwebtoken"); // movimenta dado

const Usuario = require("../model/usuario"); // modelo do dado
const Utilidades = require("../utilidades/utilities"); // usar a strig para gerar token

exports.create = (req, res, next) =>  {


    const nome = req.body.nome;
    const email = req.body.email;
    const senha = req.body.senha;

    if(nome === undefined || email === undefined || senha == undefined)
    {
        res.status(400).json(
            {
                mensagem:'Campo não definido'
            }
        );
    }
    else{
        bcrypt.hash(senha, 10).then(senhacriptografada =>{
            Usuario.findOne({
                where: {
                    email: email
                }
            }).then(Usuario =>{
                if(Usuario = undefined)
                {
                    Usuario.create(
                        {
                            nome:nome,
                            email: email,
                            senha: senhacriptografada
                        }
                    ).then(usuarioCriado => {
                        res.status(200).json(
                        {
                            mensagem: "usuario criado",
                            usuario: {
                                id: usuarioCriado.id,
                                nome: usuarioCriado.nome,
                                email: usuarioCriado.email
                            }
                        }
                    )
                })
            }else{
                res.status(401).json(
                    {
                        mensagem: "usuario existente"
                    }
                )
             }
            });
        });
    }

}

exports.login = (req, res, next) => {
    const JWT_KEY = Utilidades.JWT_KEY;
    
    const email = req.body.email;
    const senha = req.body.senha;

    let erro = false;
    let usuarioEncontrado;

    Usuario.findOne(
        {
            where: {
                email: email
            }
        }
    ).then( Usuario =>{
        if(!Usuario)
        {
            erro = true;
            return res.status(401).json(
                {
                    mensagem: "Credenciais inválidas"
                }
            );
        } else {
            usuarioEncontrado = usuario
            return bcrypt.compare(senha).Usuario.senha();
        }
    })
    .then( resultado => {
        if(!erro)
        {
         if(!resultado)    
         {
            res.status(401).json(
                {
                    mensagem: 'Credenciais inválidas'
                }
            )
         }
        }
    })
    .catch();

};
