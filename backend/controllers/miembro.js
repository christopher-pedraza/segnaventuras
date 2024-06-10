const express = require("express");
const router = express.Router();
router.use(express.json());

const { PrismaClient } = require("@prisma/client");
const e = require("express");
const prisma = new PrismaClient();

const sha512 = require("js-sha512");

const jwt = require("jsonwebtoken");
const TOKEN_SECRET = process.env.TOKEN_SECRET;

router.post("/login", async (req, res) => {
    /*
    #swagger.tags = ['Miembro']
    #swagger.description = 'Endpoint para iniciar sesión como administrador.'
    #swagger.requestBody = {
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        usuario: { type: 'string' },
                        contrasegna: { type: 'string' }
                    }
                }
            }
        }
    }
    #swagger.responses[200] = {
        description: 'Inicio de sesión exitoso.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        autenticado: { type: 'boolean' },
                        token: { type: 'string' }
                    }
                }
            }
        }
    }
    #swagger.responses[403] = {
        description: 'Inicio de sesión fallido.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        autenticado: { type: 'boolean', example: false },
                        token: { type: 'string' }
                    }
                }
            }
        }
    }
    #swagger.responses[500] = {
        description: 'Error al iniciar sesión.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        autenticado: { type: 'boolean', example: false },
                        token: { type: 'string' },
                        message: { type: 'string' }
                    }
                }
            }
        }
    }
    */
    console.log(req.body);
    const { usuario, contrasegna } = req.body;
    try {
        const resultado = await prisma.miembro.findMany({
            where: {
                AND: {
                    usuario: usuario.toLowerCase(),
                    contrasegna: sha512(contrasegna),
                    es_administrador: { equals: true },
                },
            },
        });

        console.log(resultado.length);

        if (resultado.length != 0) {
            console.log(TOKEN_SECRET);
            const token = jwt.sign(
                { usuario: usuario.toLowerCase() },
                TOKEN_SECRET,
                {
                    expiresIn: "1d",
                }
            );
            console.log("Token: ", token);
            res.status(200).json({ autenticado: true, token: token });
        } else {
            res.status(403).json({ autenticado: false, token: "" });
        }
    } catch (err) {
        res.status(500).json({
            autenticado: false,
            token: "",
            error: `${err}`,
        });
    }
});

router.post("/registro", async (req, res) => {
    /*
    #swagger.tags = ['Miembro']
    #swagger.description = 'Endpoint para registrar un nuevo miembro.'
    #swagger.requestBody = {
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        usuario: { type: 'string' },
                        contrasegna: { type: 'string' },
                        es_administrador: { type: 'boolean' }
                    }
                }
            }
        }
    }
    #swagger.responses[200] = {
        description: 'Registro exitoso.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        id_miembro: { type: 'integer' },
                        usuario: { type: 'string' }
                    }
                }
            }
        }
    }
    #swagger.responses[409] = {
        description: 'Registro fallido. Usuario ya existe.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        error: { type: 'string' }
                    }
                }
            }
        }
    }
    #swagger.responses[500] = {
        description: 'Error al registrar.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        error: { type: 'string' }
                    }
                }
            }
        }
    }
    */
    const { usuario, contrasegna, es_administrador } = req.body;
    try {
        const existencia = await prisma.miembro.findMany({
            where: {
                usuario: usuario.toLowerCase(),
            },
        });

        if (existencia.length === 0) {
            const resultado = await prisma.miembro.create({
                data: {
                    usuario: usuario.toLowerCase(),
                    contrasegna: sha512(contrasegna),
                    es_administrador: es_administrador,
                },
            });
            res.status(200).json({
                id_miembro: resultado.id_miembro,
                usuario: resultado.usuario,
            });
        } else {
            res.status(409).json({ error: "Usuario ya existe." });
        }
    } catch (err) {
        res.status(500).json({ error: `${err}` });
    }
});

router.post("/authToken", async (req, res) => {
    /*
    #swagger.tags = ['Miembro']
    #swagger.description = 'Endpoint para autenticar un token.'
    #swagger.requestBody = {
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        token: { type: 'string' }
                    }
                }
            }
        }
    }
    #swagger.responses[200] = {
        description: 'Token autenticado correctamente.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        autenticado: { type: 'boolean' },
                        usuario: { type: 'string' }
                    }
                }
            }
        }
    }
    #swagger.responses[403] = {
        description: 'Token no autenticado.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        autenticado: { type: 'boolean', example: false },
                        usuario: { type: 'string', example: "" }
                    }
                }
            }
        }
    }
    #swagger.responses[500] = {
        description: 'Error al autenticar el token.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        error: { type: 'string' }
                    }
                }
            }
        }
    }
    */
    const { token } = req.body;

    try {
        var decoded = jwt.verify(token, TOKEN_SECRET);
        res.status(200).json({ autenticado: true, usuario: decoded.usuario });
    } catch (err) {
        res.status(403).json({ autenticado: false, usuario: "" });
    }
});

module.exports = router;
