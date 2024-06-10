const express = require("express");
const router = express.Router();
router.use(express.json());

const { PrismaClient } = require("@prisma/client");
const e = require("express");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    /*
    #swagger.tags = ['Pregunta Video']
    #swagger.description = 'Endpoint para obtener todas las preguntas de video cuestionario.'
    #swagger.responses[200] = {
        description: 'Preguntas de video cuestionario obtenidas correctamente.',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id_preguntas_video_cuestionario: { type: 'integer' },
                            id_parte_video_cuestionario: { type: 'integer' },
                            pregunta: { type: 'string' },
                            indice: { type: 'integer' },
                            respuestas_video_cuestionario: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        id_respuestas_video_cuestionario: { type: 'integer' },
                                        id_preguntas_video_cuestionario: { type: 'integer' },
                                        respuesta: { type: 'string' },
                                        es_correcta: { type: 'boolean' }
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
        description: 'Error al obtener las preguntas de video cuestionario.',
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
        const preguntas = await prisma.preguntas_video_cuestionario.findMany({
            include: { respuestas_video_cuestionario: true },
            orderBy: { indice: "asc" },
        });
        res.json(preguntas);
    } catch (error) {
        res.status(500).json({ error: "No se pudo obtener las preguntas" });
    }
});

router.get("/byParte/:id_parte", async (req, res) => {
    /*
    #swagger.tags = ['Pregunta Video']
    #swagger.description = 'Endpoint para obtener todas las preguntas de video cuestionario de una parte.'
    #swagger.parameters['id_parte'] = { description: 'Id de la parte de video cuestionario.' }
    #swagger.responses[200] = {
        description: 'Preguntas de video cuestionario obtenidas correctamente.',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id_preguntas_video_cuestionario: { type: 'integer' },
                            pregunta: { type: 'string' },
                            indice: { type: 'integer' },
                            respuestas_video_cuestionario: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        id_respuestas_video_cuestionario: { type: 'integer' },
                                        respuesta: { type: 'string' },
                                        es_correcta: { type: 'boolean' }
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
        description: 'Error al obtener las preguntas de video cuestionario.',
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
    const { id_parte } = req.params;
    try {
        const preguntas = await prisma.preguntas_video_cuestionario.findMany({
            where: { id_parte_video_cuestionario: parseInt(id_parte) },
            select: {
                id_preguntas_video_cuestionario: true,
                pregunta: true,
                indice: true,
                respuestas_video_cuestionario: {
                    select: {
                        id_respuestas_video_cuestionario: true,
                        respuesta: true,
                        es_correcta: true,
                    },
                },
            },
            orderBy: { indice: "asc" },
        });
        res.json(preguntas);
    } catch (error) {
        res.status(500).json({ error: "No se pudo obtener las preguntas" });
    }
});

router.get("/:id", async (req, res) => {
    /*
    #swagger.tags = ['Pregunta Video']
    #swagger.description = 'Endpoint para obtener una pregunta de video cuestionario por id.'
    #swagger.parameters['id'] = { description: 'Id de la pregunta de video cuestionario.' }
    #swagger.responses[200] = {
        description: 'Pregunta de video cuestionario obtenida correctamente.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        id_preguntas_video_cuestionario: { type: 'integer' },
                        id_parte_video_cuestionario: { type: 'integer' },
                        pregunta: { type: 'string' },
                        indice: { type: 'integer' },
                        respuestas_video_cuestionario: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id_respuestas_video_cuestionario: { type: 'integer' },
                                    respuesta: { type: 'string' },
                                    es_correcta: { type: 'boolean' }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    #swagger.responses[404] = {
        description: 'Pregunta de video cuestionario no encontrada.',
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
        const pregunta = await prisma.preguntas_video_cuestionario.findUnique({
            where: { id_preguntas_video_cuestionario: parseInt(id) },
            select: {
                id_preguntas_video_cuestionario: true,
                id_parte_video_cuestionario: true,
                pregunta: true,
                indice: true,
                respuestas_video_cuestionario: {
                    select: {
                        id_respuestas_video_cuestionario: true,
                        respuesta: true,
                        es_correcta: true,
                    },
                },
            },
        });
        if (pregunta) {
            res.json(pregunta);
        } else {
            res.status(404).json({ error: "Pregunta no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ error: "No se pudo obtener la pregunta" });
    }
});

router.post("/", async (req, res) => {
    /*
    #swagger.tags = ['Pregunta Video']
    #swagger.description = 'Endpoint para crear una nueva pregunta de video cuestionario.'
    #swagger.requestBody = {
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        id_parte: { type: 'integer', description: 'Id de la parte de video cuestionario.' },
                        pregunta: { type: 'string', description: 'Texto de la pregunta.' }
                    }
                }
            }
        }
    }
    #swagger.responses[200] = {
        description: 'Pregunta de video cuestionario creada correctamente.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        id_preguntas_video_cuestionario: { type: 'integer' },
                        id_parte_video_cuestionario: { type: 'integer' },
                        pregunta: { type: 'string' },
                        indice: { type: 'integer' }
                    }
                }
            }
        }
    }
    #swagger.responses[500] = {
        description: 'Error al crear la pregunta de video cuestionario.',
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
    const { id_parte, pregunta } = req.body;
    try {
        // Obtener el indice mas grande de las preguntas de la parte de video
        // cuestionario
        const maxIndiceRecord =
            await prisma.preguntas_video_cuestionario.findFirst({
                where: {
                    id_parte_video_cuestionario: id_parte,
                },
                orderBy: {
                    indice: "desc",
                },
            });

        // Si no hay preguntas, el indice de la nueva pregunta es 0, de lo
        // contrario es el indice mas grande + 1
        const indice = maxIndiceRecord ? maxIndiceRecord.indice + 1 : 0;

        const response = await prisma.preguntas_video_cuestionario.create({
            data: {
                id_parte_video_cuestionario: id_parte,
                pregunta: pregunta,
                indice: indice,
            },
        });

        res.json(response);
    } catch (error) {
        res.status(500).json({ error: "No se pudo crear la pregunta" });
    }
});

router.get("/respuestas/:id", async (req, res) => {
    /*
    #swagger.tags = ['Pregunta Video']
    #swagger.description = 'Endpoint para obtener las respuestas de una pregunta
    de video cuestionario.'
    #swagger.parameters['id'] = { description: 'Id de la pregunta de video
    cuestionario.' }
    #swagger.responses[200] = {
        description: 'Respuestas de video cuestionario obtenidas correctamente.',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id_respuestas_video_cuestionario: { type: 'integer' },
                            respuesta: { type: 'string' },
                            es_correcta: { type: 'boolean' }
                        }
                    }
                }
            }
        }
    }
    #swagger.responses[500] = {
        description: 'Error al obtener las respuestas de video cuestionario.',
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
        const respuestas = await prisma.respuestas_video_cuestionario.findMany({
            where: { id_preguntas_video_cuestionario: parseInt(id) },
            select: {
                id_respuestas_video_cuestionario: true,
                respuesta: true,
                es_correcta: true,
            },
        });
        res.json(respuestas);
    } catch (error) {
        res.status(500).json({ error: "No se pudo obtener las respuestas" });
    }
});

router.post("/respuesta", async (req, res) => {
    /*
    #swagger.tags = ['Pregunta Video']
    #swagger.description = 'Endpoint para agregar una respuesta a una pregunta de video cuestionario.'
    #swagger.requestBody = {
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        id_pregunta: { type: 'integer', description: 'Id de la pregunta de video cuestionario.' },
                        respuesta: { type: 'string', description: 'Texto de la respuesta.' },
                        es_correcta: { type: 'boolean', description: 'Indica si la respuesta es correcta.' }
                    }
                }
            }
        }
    }
    #swagger.responses[200] = {
        description: 'Respuesta de video cuestionario agregada correctamente.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        id_respuestas_video_cuestionario: { type: 'integer' },
                        id_preguntas_video_cuestionario: { type: 'integer' },
                        respuesta: { type: 'string' },
                        es_correcta: { type: 'boolean' }
                    }
                }
            }
        }
    }
    #swagger.responses[500] = {
        description: 'Error al agregar la respuesta de video cuestionario.',
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
    const { id_pregunta, respuesta, es_correcta } = req.body;
    try {
        const response = await prisma.respuestas_video_cuestionario.create({
            data: {
                id_preguntas_video_cuestionario: id_pregunta,
                respuesta: respuesta,
                es_correcta: es_correcta,
            },
        });

        res.json(response);
    } catch (error) {
        res.status(500).json({ error: "No se pudo agregar la respuesta" });
    }
});

router.put("/respuesta/:id", async (req, res) => {
    /*
    #swagger.tags = ['Pregunta Video']
    #swagger.description = 'Endpoint para modificar una respuesta de video cuestionario.'
    #swagger.parameters['id'] = { description: 'Id de la respuesta de video cuestionario.' }
    #swagger.requestBody = {
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        respuesta: { type: 'string', description: 'Texto de la respuesta.' },
                        es_correcta: { type: 'boolean', description: 'Indica si la respuesta es correcta.' }
                    }
                }
            }
        }
    }
    #swagger.responses[200] = {
        description: 'Respuesta de video cuestionario modificada correctamente.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        id_respuestas_video_cuestionario: { type: 'integer' },
                        id_preguntas_video_cuestionario: { type: 'integer' },
                        respuesta: { type: 'string' },
                        es_correcta: { type: 'boolean' }
                    }
                }
            }
        }
    }
    #swagger.responses[404] = {
        description: 'Respuesta de video cuestionario no encontrada.',
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
        description: 'Error al modificar la respuesta de video cuestionario.',
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
    const { respuesta, es_correcta } = req.body;
    try {
        const response = await prisma.respuestas_video_cuestionario.update({
            where: { id_respuestas_video_cuestionario: parseInt(id) },
            data: { respuesta: respuesta, es_correcta: es_correcta },
        });
        res.json(response);
    } catch (error) {
        if (error.code === "P2025") {
            res.status(404).json({ error: "Respuesta no encontrada" });
        }
        res.status(500).json({ error: "No se pudo modificar la respuesta" });
    }
});

router.delete("/respuesta/:id", async (req, res) => {
    /*
    #swagger.tags = ['Pregunta Video']
    #swagger.description = 'Endpoint para eliminar una respuesta de video cuestionario.'
    #swagger.parameters['id'] = { description: 'Id de la respuesta de video cuestionario.' }
    #swagger.responses[200] = {
        description: 'Respuesta de video cuestionario eliminada correctamente.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        id_respuestas_video_cuestionario: { type: 'integer' },
                        id_preguntas_video_cuestionario: { type: 'integer' },
                        respuesta: { type: 'string' },
                        es_correcta: { type: 'boolean' }
                    }
                }
            }
        }
    }
    #swagger.responses[404] = {
        description: 'Respuesta de video cuestionario no encontrada.',
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
        description: 'Error al eliminar la respuesta de video cuestionario.',
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
        const response = await prisma.respuestas_video_cuestionario.delete({
            where: { id_respuestas_video_cuestionario: parseInt(id) },
        });
        res.json(response);
    } catch (error) {
        if (error.code === "P2025") {
            res.status(404).json({ error: "Respuesta no encontrada" });
        }
        res.status(500).json({ error: "No se pudo eliminar la respuesta" });
    }
});

router.put("/cambiarIndice/:id", async (req, res) => {
    /*
    #swagger.tags = ['Pregunta Video']
    #swagger.description = 'Endpoint para cambiar el índice de una pregunta de video cuestionario.'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID de la pregunta de video cuestionario cuyo índice se cambiará.',
        required: true,
        type: 'integer'
    }
    #swagger.requestBody = {
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        direccion: { type: 'string' },
                        id_parte_video_cuestionario: { type: 'integer' }
                    },
                    required: ['direccion', 'id_nivel']
                }
            }
        }
    }
    #swagger.responses[200] = {
        description: 'Índices actualizados correctamente.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        message: { type: 'string' }
                    }
                }
            }
        }
    }
    #swagger.responses[404] = {
        description: 'Pregunta de video cuestionario o pregunta de intercambio no encontrada.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        message: { type: 'string' }
                    }
                }
            }
        }
    }
    #swagger.responses[500] = {
        description: 'Error al cambiar el índice de la pregunta de video cuestionario.',
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
        const { id } = req.params;
        const { direccion, id_parte_video_cuestionario } = req.body;

        const question = await prisma.preguntas_video_cuestionario.findUnique({
            where: { id_preguntas_video_cuestionario: Number(id) },
        });
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        const swapQuestion =
            await prisma.preguntas_video_cuestionario.findFirst({
                where: {
                    AND: [
                        {
                            indice:
                                direccion === "up"
                                    ? question.indice - 1
                                    : question.indice + 1,
                        },
                        {
                            id_parte_video_cuestionario:
                                id_parte_video_cuestionario,
                        },
                    ],
                },
            });
        if (!swapQuestion) {
            return res.status(404).json({ message: "Swap question not found" });
        }

        const temp = question.indice;
        question.indice = swapQuestion.indice;
        swapQuestion.indice = temp;

        await prisma.preguntas_video_cuestionario.update({
            where: {
                id_preguntas_video_cuestionario:
                    question.id_preguntas_video_cuestionario,
            },
            data: { indice: question.indice },
        });
        await prisma.preguntas_video_cuestionario.update({
            where: {
                id_preguntas_video_cuestionario:
                    swapQuestion.id_preguntas_video_cuestionario,
            },
            data: { indice: swapQuestion.indice },
        });
        res.json({ message: "Indices updated successfully" });
    } catch (err) {
        res.status(500).json({ error: `${err}` });
    }
});

router.put("/:id", async (req, res) => {
    /*
    #swagger.tags = ['Pregunta Video']
    #swagger.description = 'Endpoint para modificar una pregunta de video cuestionario.'
    #swagger.parameters['id'] = { description: 'Id de la pregunta de video cuestionario.' }
    #swagger.requestBody = {
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        pregunta: { type: 'string', description: 'Texto de la pregunta.' }
                    }
                }
            }
        }
    }
    #swagger.responses[200] = {
        description: 'Pregunta de video cuestionario modificada correctamente.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        id_preguntas_video_cuestionario: { type: 'integer' },
                        id_parte_video_cuestionario: { type: 'integer' },
                        pregunta: { type: 'string' },
                        indice: { type: 'integer' }
                    }
                }
            }
        }
    }
    #swagger.responses[404] = {
        description: 'Pregunta de video cuestionario no encontrada.',
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
        description: 'Error al modificar la pregunta de video cuestionario.',
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
    const { pregunta } = req.body;
    try {
        const response = await prisma.preguntas_video_cuestionario.update({
            where: { id_preguntas_video_cuestionario: parseInt(id) },
            data: { pregunta: pregunta },
        });
        res.json(response);
    } catch (error) {
        if (error.code === "P2025") {
            res.status(404).json({ error: "Pregunta no encontrada" });
        } else {
            res.status(500).json({ error: "No se pudo modificar la pregunta" });
        }
    }
});

router.delete("/:id_parte/:id_pregunta", async (req, res) => {
    /*
    #swagger.tags = ['Pregunta Video']
    #swagger.description = 'Endpoint para eliminar una pregunta de video cuestionario.'
    #swagger.parameters['id_parte'] = { description: 'Id de la parte de video cuestionario.' }
    #swagger.parameters['id_pregunta'] = { description: 'Id de la pregunta de video cuestionario.' }
    #swagger.responses[200] = {
        description: 'Pregunta de video cuestionario eliminada correctamente.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        id_preguntas_video_cuestionario: { type: 'integer' },
                        id_parte_video_cuestionario: { type: 'integer' },
                        pregunta: { type: 'string' },
                        indice: { type: 'integer' }
                    }
                }
            }
        }
    }
    #swagger.responses[404] = {
        description: 'Pregunta de video cuestionario no encontrada.',
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
        description: 'Error al eliminar la pregunta de video cuestionario.',
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
    let { id_parte, id_pregunta } = req.params;
    id_parte = parseInt(id_parte);
    id_pregunta = parseInt(id_pregunta);

    try {
        // Obtener el registro a eliminar para poder obtener su indice y
        // actualizar los indices de los registros con un indice mayor
        const recordToDelete =
            await prisma.preguntas_video_cuestionario.findUnique({
                where: {
                    id_preguntas_video_cuestionario: id_pregunta,
                },
            });

        // Ya habiendo guardado el indice del registro que queremos eliminar,
        // podemos proceder a eliminarlo
        const resultado = await prisma.preguntas_video_cuestionario.delete({
            where: { id_preguntas_video_cuestionario: id_pregunta },
        });

        // Obtener los registros con un indice mayor al indice del registro
        const recordsToUpdate =
            await prisma.preguntas_video_cuestionario.findMany({
                where: {
                    AND: {
                        indice: {
                            gt: recordToDelete.indice,
                        },
                        id_parte_video_cuestionario: id_parte,
                    },
                },
            });

        // Actualizar los indices de los registros con un indice mayor
        const updatePromises = recordsToUpdate.map((record) =>
            prisma.preguntas_video_cuestionario.update({
                where: {
                    id_preguntas_video_cuestionario:
                        record.id_preguntas_video_cuestionario,
                },
                data: {
                    indice: record.indice - 1,
                },
            })
        );
        await Promise.all(updatePromises);

        // Retornar el registro eliminado
        res.json(resultado);
    } catch (error) {
        console.log(error);
        if (error.code === "P2025") {
            res.status(404).json({ error: "Pregunta no encontrada" });
        } else {
            res.status(500).json({ error: "No se pudo eliminar la pregunta" });
        }
    }
});

module.exports = router;
