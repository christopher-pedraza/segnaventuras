const express = require("express");
const router = express.Router();
router.use(express.json());

const { PrismaClient } = require("@prisma/client");
const e = require("express");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    /*
    #swagger.tags = ['Isla']
    #swagger.description = 'Endpoint para obtener todas las islas.'
    #swagger.responses[200] = {
        description: 'Islas obtenidas correctamente.',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id_isla: { type: 'integer' },
                            nombre: { type: 'string' },
                            modelo_general: { type: 'string', nullable: true },
                            modelo_especifico: { type: 'string', nullable: true }
                        }
                    }
                }
            }
        }
    }
    #swagger.responses[500] = {
        description: 'Error al obtener las islas.',
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
    try {
        const resultado = await prisma.isla.findMany();
        res.status(200).json(resultado);
    } catch (err) {
        res.status(500).json({ error: `${err}` });
    }
});

router.get("/withNiveles", async (req, res) => {
    /*
    #swagger.tags = ['Isla']
    #swagger.description = 'Endpoint para obtener todas las islas con sus niveles.'
    #swagger.responses[200] = {
        description: 'Islas obtenidas correctamente.',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id_isla: { type: 'integer' },
                            nombre: { type: 'string' },
                            nivel: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        id_nivel: { type: 'integer' },
                                        nombre: { type: 'string' }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    #swagger.responses[500] = {
        description: 'Error al obtener las islas.',
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
    try {
        const islas = await prisma.isla.findMany({
            select: {
                id_isla: true,
                nombre: true,
                nivel: {
                    select: {
                        id_nivel: true,
                        nombre: true,
                    },
                },
            },
        });
        res.status(200).json(islas);
    } catch (err) {
        res.status(500).json({ error: `${err}` });
    }
});

router.get("/:id", async (req, res) => {
    /*
    #swagger.tags = ['Isla']
    #swagger.description = 'Endpoint para obtener una isla por id.'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID de la isla.',
        required: true
    }
    #swagger.responses[200] = {
        description: 'Isla obtenida correctamente.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        id_isla: { type: 'integer' },
                        nombre: { type: 'string' },
                        modelo_general: { type: 'string', nullable: true },
                        modelo_especifico: { type: 'string', nullable: true }
                    }
                }
            }
        }
    }
    #swagger.responses[404] = {
        description: 'Isla no encontrada.'
    }
    #swagger.responses[500] = {
        description: 'Error al obtener la isla.',
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
    const { id } = req.params;
    try {
        const resultado = await prisma.isla.findUnique({
            where: {
                id_isla: parseInt(id),
            },
        });
        if (resultado === null) {
            res.status(404).json({ error: "Isla no encontrada." });
        } else {
            res.status(200).json(resultado);
        }
    } catch (err) {
        res.status(500).json({ error: `${err}` });
    }
});

router.post("/", async (req, res) => {
    /*
    #swagger.tags = ['Isla']
    #swagger.description = 'Endpoint para crear una isla.'
    #swagger.requestBody = {
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        nombre: { type: 'string', example: 'nombre' },
                        modelo_general: { type: 'string', example: null },
                        modelo_especifico: { type: 'string', example: null }
                    }
                }
            }
        }
    }
    #swagger.responses[201] = {
        description: 'Isla creada correctamente.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        id_isla: { type: 'integer' },
                        nombre: { type: 'string' },
                        modelo_general: { type: 'string', nullable: true },
                        modelo_especifico: { type: 'string', nullable: true }
                    }
                }
            }
        }
    }
    #swagger.responses[500] = {
        description: 'Error al crear la isla.',
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
    const { nombre, modelo_general, modelo_especifico } = req.body;
    try {
        const resultado = await prisma.isla.create({
            data: {
                nombre: nombre,
                modelo_general: modelo_general,
                modelo_especifico: modelo_especifico,
            },
        });
        res.status(201).send(resultado);
    } catch (err) {
        res.status(500).json({ error: `${err}` });
    }
});

router.put("/:id", async (req, res) => {
    /*
    #swagger.tags = ['Isla']
    #swagger.description = 'Endpoint para actualizar una isla.'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID de la isla.',
        required: true
    }
    #swagger.requestBody = {
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        nombre: { type: 'string', example: 'nombre' },
                        modelo_general: { type: 'string', example: null },
                        modelo_especifico: { type: 'string', example: null }
                    }
                }
            }
        }
    }
    #swagger.responses[200] = {
        description: 'Isla actualizada correctamente.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        id_isla: { type: 'integer' },
                        nombre: { type: 'string' },
                        modelo_general: { type: 'string', nullable: true },
                        modelo_especifico: { type: 'string', nullable: true }
                    }
                }
            }
        }
    }
    #swagger.responses[404] = {
        description: 'Isla no encontrada.'
    }
    #swagger.responses[500] = {
        description: 'Error al actualizar la isla.',
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
    const { id } = req.params;
    const { nombre, modelo_general, modelo_especifico } = req.body;
    try {
        const resultado = await prisma.isla.update({
            where: {
                id_isla: parseInt(id),
            },
            data: {
                nombre: nombre,
                modelo_general: modelo_general,
                modelo_especifico: modelo_especifico,
            },
        });
        if (resultado === null) {
            res.status(404).json({ error: "Isla no encontrada." });
        } else {
            res.status(200).json(resultado);
        }
    } catch (err) {
        res.status(500).json({ error: `${err}` });
    }
});

router.delete("/:id", async (req, res) => {
    /*
    #swagger.tags = ['Isla']
    #swagger.description = 'Endpoint para eliminar una isla.'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID de la isla.',
        required: true
    }
    #swagger.responses[200] = {
        description: 'Isla eliminada correctamente.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        id_isla: { type: 'integer' },
                        nombre: { type: 'string' },
                        modelo_general: { type: 'string', nullable: true },
                        modelo_especifico: { type: 'string', nullable: true }
                    }
                }
            }
        }
    }
    #swagger.responses[404] = {
        description: 'Isla no encontrada.'
    }
    #swagger.responses[500] = {
        description: 'Error al eliminar la isla.',
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
    const { id } = req.params;
    try {
        const resultado = await prisma.isla.delete({
            where: {
                id_isla: parseInt(id),
            },
        });
        if (resultado === null) {
            res.status(404).json({ error: "Isla no encontrada." });
        } else {
            res.status(200).json(resultado);
        }
    } catch (err) {
        res.status(500).json({ error: `${err}` });
    }
});

module.exports = router;
